import Lenis from "lenis";

export function smoothScroll() {
  const lenis = new Lenis({
    duration: 1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  const handleScroll = (time: number) => {
    lenis.raf(time);
    requestAnimationFrame(handleScroll);
  };

  requestAnimationFrame(handleScroll);

  return lenis;
}
