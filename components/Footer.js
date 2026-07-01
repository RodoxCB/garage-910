export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="font-serif text-lg font-semibold">
            Garage<span className="text-garage-red">910</span>
          </p>
          <p className="text-sm text-garage-gray">Reparação Automotiva</p>
        </div>
        <p className="text-sm text-garage-gray">
          © {year} Garage 910. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
