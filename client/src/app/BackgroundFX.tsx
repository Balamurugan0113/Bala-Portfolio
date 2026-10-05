/**
 * Global layered background — pure CSS, GPU friendly:
 *  1. deep charcoal base gradient
 *  2. fixed atmospheric amber/cyan glows (parallax-ish via attachment)
 *  3. vignette + noise handled by the noise overlay in App
 */
export default function BackgroundFX() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none bg-[#050508]" aria-hidden="true">
      {/* atmospheric glows */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 42% at 18% 8%, rgba(245,158,11,0.07), transparent 60%),' +
            'radial-gradient(ellipse 55% 38% at 85% 32%, rgba(249,115,22,0.05), transparent 60%),' +
            'radial-gradient(ellipse 50% 45% at 50% 100%, rgba(34,211,238,0.035), transparent 65%),' +
            'radial-gradient(ellipse 60% 50% at 90% 88%, rgba(245,158,11,0.045), transparent 60%)',
        }}
      />
      {/* vertical depth gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #07070c 0%, #050508 30%, #060607 65%, #05050a 100%)',
        }}
      />
      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 120% 90% at 50% 45%, transparent 55%, rgba(0,0,0,0.5) 100%)',
        }}
      />
    </div>
  );
}
