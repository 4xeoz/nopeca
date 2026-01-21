import { MarqueeDemo } from "../ui/HeroSectionUI/InfiniteMarquee";
import { Marquee } from "../ui/Magic/marquee";

export default function AnimatedLogoBand() {
  return (
    <section className="w-full py-12 px-4 bg-brown-50">
      <div className="max-w-7xl mx-auto ">
        <MarqueeDemo />
      </div>
    </section>
  );
}
