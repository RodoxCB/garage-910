import { buildWhatsAppUrl } from "@/lib/whatsapp";

export default function Contact({ contact }) {
  const whatsappUrl = buildWhatsAppUrl(
    contact.whatsapp,
    contact.whatsappMessage
  );

  return (
    <section id="contato" className="relative bg-garage-gray-dark/50 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <p className="font-display mb-2 text-sm font-medium uppercase tracking-[0.3em] text-garage-yellow">
            Fale conosco
          </p>
          <h2 className="font-serif text-3xl font-bold sm:text-4xl">Contato</h2>
          <div className="mx-auto mt-4 h-px w-24 gold-line" />
        </div>

        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          <div className="rounded-sm border border-white/10 bg-garage-black p-8">
            <h3 className="font-display mb-6 text-lg font-semibold uppercase tracking-wide">
              Informações
            </h3>
            <ul className="space-y-4 text-garage-gray">
              {contact.phone && (
                <li className="flex items-start gap-3">
                  <PhoneIcon />
                  <a
                    href={`tel:+${contact.whatsapp}`}
                    className="transition-colors hover:text-garage-yellow"
                  >
                    {contact.phone}
                  </a>
                </li>
              )}
              {contact.address && (
                <li className="flex items-start gap-3">
                  <LocationIcon />
                  <span>{contact.address}</span>
                </li>
              )}
              {contact.hours && (
                <li className="flex items-start gap-3">
                  <ClockIcon />
                  <span>{contact.hours}</span>
                </li>
              )}
            </ul>

            {contact.mapsUrl && (
              <a
                href={contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-sm border border-garage-yellow/40 bg-garage-yellow/10 px-6 py-3 font-display text-sm font-semibold uppercase tracking-wider text-garage-yellow transition-all hover:bg-garage-yellow hover:text-garage-black"
              >
                <MapsIcon />
                Como chegar
              </a>
            )}
          </div>

          <div className="flex flex-col items-center justify-center rounded-sm border border-garage-yellow/30 bg-garage-black p-8 text-center gold-glow">
            <p className="mb-2 font-display text-sm uppercase tracking-wider text-garage-yellow">
              Atendimento rápido
            </p>
            <h3 className="font-serif mb-4 text-2xl font-bold">
              Chame no WhatsApp
            </h3>
            <p className="mb-8 text-garage-gray">
              Envie fotos do seu veículo e receba um orçamento personalizado.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm bg-[#25D366] px-8 py-4 font-display text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-[#20bd5a] hover:shadow-[0_0_30px_rgba(37,211,102,0.3)]"
            >
              <WhatsAppIcon />
              Abrir WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="mt-0.5 h-5 w-5 shrink-0 text-garage-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg className="mt-0.5 h-5 w-5 shrink-0 text-garage-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="mt-0.5 h-5 w-5 shrink-0 text-garage-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function MapsIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
    </svg>
  );
}
