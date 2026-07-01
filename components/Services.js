const icons = {
  pintura: (
    <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.364 15.364 0 01-1.372 8.377 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128m0 0V6.375c0-.621-.504-1.125-1.125-1.125H4.125C3.504 5.25 3 5.754 3 6.375v11.25c0 .621.504 1.125 1.125 1.125h4.125M9.53 16.122L12 14.25m-2.47 1.872L7.5 14.25m4.5 0V6.375" />
    </svg>
  ),
  lanternagem: (
    <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>
  ),
  parachoque: (
    <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
};

export default function Services({ services }) {
  return (
    <section id="servicos" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <p className="font-display mb-2 text-sm font-medium uppercase tracking-[0.3em] text-garage-yellow">
            O que fazemos
          </p>
          <h2 className="font-serif text-3xl font-bold sm:text-4xl">
            Nossos Serviços
          </h2>
          <div className="mx-auto mt-4 h-px w-24 gold-line" />
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="group rounded-sm border border-white/10 bg-garage-gray-dark p-8 transition-all hover:border-garage-yellow/40 gold-glow"
            >
              <div className="mb-6 text-garage-yellow transition-transform group-hover:scale-110">
                {icons[service.id] || icons.pintura}
              </div>
              <h3 className="font-display mb-3 text-xl font-semibold uppercase tracking-wide">
                {service.title}
              </h3>
              <p className="leading-relaxed text-garage-gray">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
