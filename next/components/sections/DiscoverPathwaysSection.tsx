import Image from "next/image";
import studentsImg from "@/public/students-university.png";

export default function DiscoverPathwaysSection() {
  return (
    <section className="relative w-full h-screen max-h-[1120px] py-20 px-4 overflow-hidden bg-[#f5f0e8] flex items-stretch justify-center">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Vertical stripes */}
        <div className="absolute inset-0 flex justify-between px-16">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="w-px h-full bg-[color:var(--color-stripe-wisp-60)]"
            />
          ))}
        </div>

        {/* Decorative arcs */}
        <svg
          className="absolute -left-32 top-0 h-[600px] w-[600px] opacity-40"
          viewBox="0 0 600 600"
          fill="none"
        >
          <path
            d="M-100 600 C 100 400, 300 200, 600 100"
            stroke="var(--color-accent-arc)"
            strokeWidth="120"
            fill="none"
          />
        </svg>
        <svg
          className="absolute -right-32 bottom-0 h-[500px] w-[500px] opacity-30"
          viewBox="0 0 500 500"
          fill="none"
        >
          <path
            d="M500 -50 C 400 150, 200 300, -50 400"
            stroke="var(--color-accent-arc)"
            strokeWidth="100"
            fill="none"
          />
        </svg>
      </div>

      <div className="relative mx-auto h-auto w-full max-w-6xl">
        {/* Main content grid - 2 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-[40%_1fr] gap-6 items-stretch h-full">
          {/* Left column - White card */}
          <div className="bg-white rounded-3xl p-8 lg:p-12 flex flex-col h-full">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#f5f0e8] rounded-full px-4 py-2 w-fit mb-8 mx-auto">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0a1628]" />
              <span className="text-sm font-medium text-[#0a1628]">
                Why we are loved
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl font-bold text-[#0a1628] leading-tight text-center text-balance">
              Discover your pathways
            </h2>

            {/* Spacer to push button to bottom */}
            <div className="flex-1" />

            {/* CTA Button */}
            <button
              type="button"
              className="w-full bg-[#d4a84b] hover:bg-[#c49a3d] text-white font-medium py-4 px-8 rounded-full transition-colors text-lg"
            >
              Next Step
            </button>
          </div>

          {/* Right column - Image with overlapping cards */}
          <div className="relative">
            {/* Main image */}
            <div className="relative w-full h-full rounded-3xl overflow-hidden">
              <Image
                src={studentsImg}
                alt="Students walking towards historic university building"
                fill
                className="object-cover "
                priority
              />
            </div>

            {/* Overlapping cards on the right */}
            <div className="absolute right-4 bottom-4  flex flex-col gap-4">
              {/* White card */}
              <div className="bg-white rounded-2xl w-[200px] lg:w-[280px] h-[140px] lg:h-[160px] shadow-lg" />

              {/* Gold card */}
              <div className="bg-[#d4a84b] rounded-2xl w-[200px] lg:w-[280px] h-[120px] lg:h-[140px] shadow-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
