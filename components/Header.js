import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const navItems = [
    { href: "#servicos", label: "Serviços" },
    { href: "#trabalhos", label: "Trabalhos" },
    { href: "#sobre", label: "Sobre" },
    { href: "#contato", label: "Contato" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-garage-black/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-full border border-garage-yellow/30">
            <Image
              src="/logo.svg"
              alt="Garage 910"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="leading-none">
            <span className="font-serif text-lg font-semibold tracking-wide">
              Garage
            </span>
            <span className="font-display ml-1 text-lg font-bold text-garage-red">
              910
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium uppercase tracking-wider text-garage-gray transition-colors hover:text-garage-yellow"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
