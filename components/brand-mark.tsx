import Image from "next/image";

export function BrandMark() {
  return (
    <div className="flex items-center gap-3" aria-label="Equity Bridge Foundation brand mark">
      <div className="brand-mark" aria-hidden="true">
        <Image src="/brand/logo.png" alt="Equity Bridge Foundation logo" width={52} height={52} priority />
      </div>
      <div className="leading-none">
        <div className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-[var(--brand-gold)]">
          Equity Bridge
        </div>
        <div className="text-sm font-semibold tracking-[0.16em] text-[var(--brand-ink)] uppercase">
          Foundation
        </div>
      </div>
    </div>
  );
}
