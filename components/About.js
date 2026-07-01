export default function About({ content }) {
  return (
    <section id="sobre" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="font-display mb-2 text-sm font-medium uppercase tracking-[0.3em] text-garage-yellow">
              Quem somos
            </p>
            <h2 className="font-serif mb-6 text-3xl font-bold sm:text-4xl">
              {content.title}
            </h2>
            <div className="mb-6 h-px w-24 gold-line" />
            <p className="text-lg leading-relaxed text-garage-gray">
              {content.text}
            </p>
          </div>

          <div className="relative">
            <div className="rounded-sm border border-garage-yellow/20 bg-garage-gray-dark p-8 gold-glow">
              <div className="grid grid-cols-2 gap-6">
                <Stat value="10+" label="Anos de experiência" />
                <Stat value="500+" label="Veículos atendidos" />
                <Stat value="100%" label="Compromisso com qualidade" />
                <Stat value="3" label="Especialidades" />
              </div>
            </div>
            <div className="absolute -bottom-3 -right-3 -z-10 h-full w-full rounded-sm border border-garage-red/30" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }) {
  return (
    <div className="text-center">
      <p className="font-display text-3xl font-bold text-garage-yellow">
        {value}
      </p>
      <p className="mt-1 text-sm text-garage-gray">{label}</p>
    </div>
  );
}
