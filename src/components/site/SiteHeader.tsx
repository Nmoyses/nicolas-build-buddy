import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { site, track } from "@/config/site";
import logo from "@/assets/logo-vila-terroir.png.asset.json";

export const navItems = [
  { href: "#chale", label: "O Chalé" },
  { href: "#experiencia", label: "A Experiência" },
  { href: "#regiao", label: "A Região" },
{ label: "Contato", href: "#contato" }
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
        solid ? "bg-ivory/95 text-wood shadow-sm backdrop-blur" : "bg-transparent text-ivory"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <a href="#topo" className="flex items-center gap-3 leading-none">
          <img src={logo.url} alt="Vila Terroir" width={112} height={112} className="h-12 w-12 rounded-full object-cover md:h-14 md:w-14" />
          <span>
            <span className="block font-display text-2xl">{site.name}</span>
            <span className="eyebrow mt-1 block opacity-80">{site.unit}</span>
          </span>
        </a>
        <nav aria-label="Principal" className="hidden items-center gap-10 md:flex">
          {navItems.map((n) => (
            <a key={n.href} href={n.href} className="text-sm tracking-wide opacity-90 hover:opacity-100">
              {n.label}
            </a>
          ))}
          <a
            href={site.airbnbUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("airbnb_click", { from: "header" })}
            className="btn bg-clay text-ivory hover:bg-wood"
          >
            Reservar
          </a>
        </nav>
        <button
          className="md:hidden p-2"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav aria-label="Menu móvel" className="border-t border-border bg-ivory px-6 pb-6 md:hidden">
          {navItems.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="block border-b border-border py-4 font-display text-xl">
              {n.label}
            </a>
          ))}
          <a href={site.airbnbUrl} target="_blank" rel="noopener noreferrer" onClick={() => track("airbnb_click", { from: "menu" })} className="btn mt-6 w-full bg-clay text-ivory">
            Reservar
          </a>
        </nav>
      )}
    </header>
  );
}
