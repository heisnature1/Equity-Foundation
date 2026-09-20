import Image from "next/image";

export function BrandMark() {
  return (
    <div className="flex items-center gap-3.5" aria-label="Equity Bridge Foundation brand mark">
      <div className="brand-mark" aria-hidden="true">
        <Image src="/brand/logo.png" alt="Equity Bridge Foundation logo" width={72} height={72} priority />
      </div>
      <div className="leading-none">
        <div className="text-[0.95rem] font-bold uppercase tracking-[0.22em] text-[var(--brand-gold)]">
          Equity Bridge
        </div>
        <div className="mt-0.5 text-[1.15rem] font-bold tracking-[0.14em] text-[var(--brand-ink)] uppercase">
          Foundation
        </div>
      </div>
    </div>
  );
}
