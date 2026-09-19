"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface DottedSurfaceProps {
  size?: number;
  opacity?: number;
  sizeAttenuation?: boolean;
  vertexColors?: boolean;
  className?: string;
  waveAmplitude?: number;
  waveSpeed?: number;
  pointsY?: number;
  cameraY?: number;
  cameraZ?: number;
  lookAtY?: number;
}

export default function DottedSurface({
  size = 10,
  opacity = 0.9,
  sizeAttenuation = true,
  vertexColors = true,
  className = "",
  waveAmplitude = 12,
  waveSpeed = 0.02,
  pointsY = -260,
  cameraY = 340,
  cameraZ = 700,
  lookAtY = -150,
}: DottedSurfaceProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let count = 0;

    // Grid configuration: 48 x 42 points with clean uniform spacing
    const AMOUNTX = 48;
    const AMOUNTY = 42;
    const SEPARATION = 64;
    const numParticles = AMOUNTX * AMOUNTY;

    // Scene setup
    const scene = new THREE.Scene();
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(52, width / height, 1, 10000);
    // Angle camera looking down toward the lower ground plane
    camera.position.set(0, cameraY, cameraZ);
    camera.lookAt(0, lookAtY, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    renderer.domElement.style.pointerEvents = "none";
    container.appendChild(renderer.domElement);

    // Create crisp anti-aliased round dot texture
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    let circleTexture: THREE.CanvasTexture | null = null;
    if (ctx) {
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.85, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(32, 32, 30, 0, Math.PI * 2);
      ctx.fill();
      circleTexture = new THREE.CanvasTexture(canvas);
    }

    // Geometry buffers
    const positions = new Float32Array(numParticles * 3);
    const colors = new Float32Array(numParticles * 3);

    // Organized palette: Rich Gold, Deep Forest Emerald, and Charcoal Ink
    const colorGold = new THREE.Color("hsl(43, 88%, 42%)");
    const colorEmerald = new THREE.Color("hsl(164, 78%, 27%)");
    const colorDeepInk = new THREE.Color("hsl(215, 25%, 16%)");

    let pIdx = 0;
    let cIdx = 0;
    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        // Center the lattice grid symmetrically
        positions[pIdx] = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
        positions[pIdx + 1] = 0;
        positions[pIdx + 2] = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;

        if (vertexColors) {
          const ratioX = ix / (AMOUNTX - 1);
          const ratioY = iy / (AMOUNTY - 1); // 0 (far horizon) -> 1 (closest foreground)

          // Organized depth gradient: deep atmospheric emerald in distance, transitioning
          // cleanly to radiant gold and vibrant emerald toward the foreground
          const baseColor = colorDeepInk.clone().lerp(colorEmerald, ratioY * 0.7);
          const lateralColor = Math.sin(ratioX * Math.PI); // Peak gold towards the center
          const finalColor = baseColor.lerp(colorGold, lateralColor * (0.35 + ratioY * 0.45));

          colors[cIdx] = finalColor.r;
          colors[cIdx + 1] = finalColor.g;
          colors[cIdx + 2] = finalColor.b;
        }

        pIdx += 3;
        cIdx += 3;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    if (vertexColors) {
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    }

    const material = new THREE.PointsMaterial({
      size: Math.max(size, 9),
      opacity,
      transparent: true,
      sizeAttenuation,
      vertexColors,
      color: vertexColors ? 0xffffff : 0x0c5e46,
      map: circleTexture || undefined,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });

    const points = new THREE.Points(geometry, material);
    // Lower wave plane to anchor strictly below the content cards
    points.position.set(0, pointsY, 0);
    scene.add(points);

    const positionAttribute = geometry.attributes.position as THREE.BufferAttribute;

    // Animation render loop
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      let idx = 0;
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          // Clean, organized perspective wave propagating forward along the depth axis (iy)
          // Preserves perfectly straight columns and parallel perspective lines
          const waveY =
            Math.sin((iy * 0.26) - count) * (waveAmplitude * 0.8) +
            Math.sin(ix * 0.16) * (waveAmplitude * 0.2);
          positions[idx + 1] = waveY;
          idx += 3;
        }
      }

      positionAttribute.needsUpdate = true;
      count += waveSpeed;

      renderer.render(scene, camera);
    };

    animate();

    // Resize observer
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      if (newWidth === 0 || newHeight === 0) return;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      circleTexture?.dispose();
      renderer.dispose();
    };
  }, [size, opacity, sizeAttenuation, vertexColors, waveAmplitude, waveSpeed, pointsY, cameraY, cameraZ, lookAtY]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_0%,transparent_42%,rgba(0,0,0,0.35)_58%,black_75%,black_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,transparent_42%,rgba(0,0,0,0.35)_58%,black_75%,black_100%)] ${className}`}
    />
  );
}
