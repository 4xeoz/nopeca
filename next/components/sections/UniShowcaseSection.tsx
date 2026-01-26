export default function UniShowcaseSection() {
  const universities = [
    { id: 1, name: "University 1" },
    { id: 2, name: "University 2" },
    { id: 3, name: "University 3" },
    { id: 4, name: "University 4" },
    { id: 5, name: "University 5" },
    { id: 6, name: "University 6" },
  ];

  return (
    <section id="universities" className="w-full py-20 px-4 bg-[--color-brand-primary] h-[80vh] max-h-[920px] overflow-hidden flex items-center ">
      <div className="max-w-6xl mx-auto flex h-1/2 gap-6">
        {/* Left column - 30% */}
        <div className="w-[30%] shrink-0 flex flex-col gap-8">
          {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#f5f0e8] rounded-full px-4 py-2 w-fit">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0a1628]" />
              <span className="text-sm font-medium text-[#0a1628]">
                Why we are loved
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl font-bold text-[#f5f0e8] leading-tight text-balance">
              World's Top Education
            </h2>

        </div>

        {/* Right column - remaining space */}
        <div className="flex-1">
          {/* University boxes grid */}
          <div className="flex gap-4">
            {universities.map((uni) => (
              <div
                key={uni.id}
                className="h-[280px] w-[280px] rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white text-lg font-medium hover:bg-white/20 transition-colors cursor-pointer"
              >
                {uni.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
