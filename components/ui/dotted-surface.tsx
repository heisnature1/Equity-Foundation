"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface DottedSurfaceProps {
  size?: number;
  opacity?: number;
  sizeAttenuation?: boolean;
  vertexColors?: boolean;
  className?: string;
}

export default function DottedSurface({
  size = 10,
  opacity = 0.92,
  sizeAttenuation = true,
  vertexColors = true,
  className = "",
}: DottedSurfaceProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let count = 0;

    // Grid configuration: 45 x 45 points
    const AMOUNTX = 45;
    const AMOUNTY = 45;
    const SEPARATION = 65;
    const numParticles = AMOUNTX * AMOUNTY;

    // Scene setup
    const scene = new THREE.Scene();
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(55, width / height, 1, 10000);
    // Position camera looking down toward the lower hero area
    camera.position.set(0, 390, 740);
    camera.lookAt(0, -110, 0);

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
      gradient.addColorStop(0.82, "rgba(255, 255, 255, 1)");
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

    // Tri-color palette: Gold, Deep Ink Black, and Royal Emerald Green
    const colorGold = new THREE.Color("hsl(43, 85%, 38%)"); // Rich brand gold
    const colorBlack = new THREE.Color("hsl(0, 0%, 14%)"); // Deep charcoal ink
    const colorEmerald = new THREE.Color("hsl(164, 76%, 26%)"); // Royal forest emerald

    let pIdx = 0;
    let cIdx = 0;
    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        // Center the lattice grid
        positions[pIdx] = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
        positions[pIdx + 1] = 0;
        positions[pIdx + 2] = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;

        if (vertexColors) {
          const ratioX = ix / (AMOUNTX - 1);
          const ratioY = iy / (AMOUNTY - 1);
          // Harmonic tri-color wave distribution across the particle grid
          const waveFactor = (Math.sin(ix * 0.28) + Math.cos(iy * 0.32) + 2) / 4;
          let pointColor: THREE.Color;
          if (waveFactor < 0.36) {
            pointColor = colorBlack.clone().lerp(colorEmerald, waveFactor / 0.36);
          } else if (waveFactor < 0.72) {
            pointColor = colorEmerald.clone().lerp(colorGold, (waveFactor - 0.36) / 0.36);
          } else {
            pointColor = colorGold.clone().lerp(colorBlack, (waveFactor - 0.72) / 0.28 * 0.6);
          }

          colors[cIdx] = pointColor.r;
          colors[cIdx + 1] = pointColor.g;
          colors[cIdx + 2] = pointColor.b;
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
      size: Math.max(size, 10),
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
    // Lower wave plane to position strictly below the lede paragraph
    points.position.set(0, -210, 0);
    scene.add(points);

    const positionAttribute = geometry.attributes.position as THREE.BufferAttribute;

    // Animation render loop
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      let idx = 0;
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          // Double sine wave displacement for gentle flowing water/wave effect
          const waveY =
            Math.sin((ix + count) * 0.28) * 35 +
            Math.sin((iy + count * 0.9) * 0.38) * 30;
          positions[idx + 1] = waveY;
          idx += 3;
        }
      }

      positionAttribute.needsUpdate = true;
      count += 0.035;

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
  }, [size, opacity, sizeAttenuation, vertexColors]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_0%,transparent_48%,rgba(0,0,0,0.5)_58%,black_68%,black_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,transparent_48%,rgba(0,0,0,0.5)_58%,black_68%,black_100%)] ${className}`}
    />
  );
}
