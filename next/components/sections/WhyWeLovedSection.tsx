export default function WhyWeLovedSection() {
  return (
    <section
      id="why"
      className="relative flex h-screen max-h-[1120px] w-full items-center justify-center overflow-hidden  px-4 py-20"
    >
      

      <div className="relative mx-auto flex h-full max-w-6xl items-center justify-center">
        {/* Main content grid - 3 columns, 3 rows */}
        <div className="grid h-full grid-cols-1 gap-6 lg:grid-cols-3 lg:grid-rows-[0.9fr_1.5fr_0.9fr]">


          {/* Row 1, Col 1: First heading */}
          {/* Badge */}
          <div className=" col-span-2">
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-[#d4a84b]" />
              <span className="text-sm font-medium text-[#0a1628]">Why we are loved</span>
            </div>
            <h2 className="text-balance text-4xl font-black leading-tight text-[--color-brand-primary] md:text-5xl lg:max-w-xl ">
              Built by students for students.
            </h2>
          </div>

          {/* Row 1, Col 3: Third card - Navy (top right) */}
          <div className="rounded-3xl bg-[--color-brand-primary] lg:col-start-3 lg:row-span-2 lg:row-start-1 lg:h-auto" />

          {/* Row 2-3, Col 1: First card - Navy with blue border/glow (spans 2 rows) */}
          <div className=" rounded-3xl bg-[--color-brand-primary] lg:col-start-1 lg:row-span-2 lg:row-start-2" />

          {/* Row 2, Col 2: Second card - Golden/Mustard */}
          <div className="rounded-3xl bg-[--color-brand-secondary] lg:col-start-2 lg:row-start-2" />

          {/* Row 3, Col 2-3: Second heading */}
          <div className="col-span-2 flex my-auto">
            <h3 className="self-end text-balance text-4xl leading-tight text-[color:var(--color-ink-deep)] md:text-5xl font-black ">
            We've been there before and, We know how to get you there.
          </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
