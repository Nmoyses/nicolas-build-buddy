import { useState, type FormEvent } from "react";
import { ChevronLeft, ChevronRight, MessageCircle, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { site, track, whatsappLink, validateContact, buildContactMessage } from "@/config/site";
import { navItems } from "./SiteHeader";
import logo from "@/assets/logo-vila-terroir.png.asset.json";
import hero from "@/assets/hero.avif.asset.json";
import quarto from "@/assets/quarto.avif.asset.json";
import banheira from "@/assets/banheira.avif.asset.json";
import banheiro from "@/assets/banheiro.avif.asset.json";
import fogo from "@/assets/fogo.avif.asset.json";
import varanda from "@/assets/varanda2.avif.asset.json";
import paisagem from "@/assets/paisagem.avif.asset.json";
import paisagem2 from "@/assets/paisagem2.avif.asset.json";
import finalsite from "@/assets/finalsite.avif.asset.json";

const photos = [
  { src: hero.url, alt: "Chalé Malbec entre a lavanda ao entardecer", cat: "Exterior", w: 720, h: 960 },
  { src: quarto.url, alt: "Quarto com teto de madeira e vista para a varanda", cat: "Quarto", w: 720, h: 540 },
  { src: banheiro.url, alt: "Banheiro com banheira de pedra, bancada de madeira e janela com vista para as montanhas", cat: "Banheiro", w: 1440, h: 1081 },
  { src: fogo.url, alt: "Fogo de chão no deck ao pôr do sol", cat: "Área externa", w: 1200, h: 900 },
  { src: varanda.url, alt: "Varanda com mesa e bancos de frente para o pôr do sol na serra", cat: "Área externa", w: 720, h: 960 },
  { src: paisagem2.url, alt: "Vista das montanhas com neblina ao amanhecer", cat: "Paisagem", w: 720, h: 540 },
];

function AirbnbButton({ label, from, className = "" }: { label: string; from: string; className?: string }) {
  return (
    <a href={site.airbnbUrl} target="_blank" rel="noopener noreferrer" onClick={() => track("airbnb_click", { from })} className={`btn bg-clay text-ivory hover:bg-wood ${className}`}>
      {label}
    </a>
  );
}

function WhatsAppButton({ label, from, className = "" }: { label: string; from: string; className?: string }) {
  const href = whatsappLink(site.whatsappMessage);
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", { from })} className={`btn border border-ivory/60 text-ivory hover:bg-ivory hover:text-pine ${className}`}>
      {label}
    </a>
  );
}

function SectionHead({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="max-w-2xl">
      <p className="eyebrow text-clay">{eyebrow}</p>
      <h2 className="mt-4 text-4xl leading-tight md:text-6xl">{title}</h2>
      {children && <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">{children}</div>}
    </div>
  );
}

export function Sections() {
  const [index, setIndex] = useState<number | null>(null);
  const openAt = (i: number) => { setIndex(i); track("gallery_open", { i }); };
  const step = (d: number) => setIndex((i) => (i === null ? i : (i + d + photos.length) % photos.length));

  return (
    <main id="topo">
      {/* HERO */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden text-ivory">
        <img src={hero.url} alt="Chalé Malbec entre a lavanda ao entardecer" width={720} height={960} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-overlay via-overlay/40 to-transparent" />
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-20 md:pb-28">
          <p className="eyebrow opacity-90">Vila Terroir | Chalé Malbec</p>
          <h1 className="mt-6 max-w-4xl text-5xl leading-[1.05] md:text-8xl">Existe um lugar onde o tempo <em>desacelera.</em></h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed opacity-90 md:text-lg">
            Entre as montanhas da Mantiqueira, um refúgio para respirar fundo, reencontrar a tranquilidade e viver momentos que merecem ser lembrados.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <AirbnbButton label="Reserve sua estadia" from="hero" />
            <a href="#chale" className="btn border border-ivory/60 hover:bg-ivory hover:text-wood">Descubra o chalé</a>
          </div>
        </div>
      </section>

      {/* EXPERIÊNCIA */}
      <section id="experiencia" className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-12 md:py-36">
        <div className="md:col-span-6 md:pt-16">
          <SectionHead eyebrow="A experiência" title="Mais do que se hospedar. Permita-se viver a Mantiqueira.">
            <p>Há viagens que preenchem o álbum de fotografias. Outras preenchem a alma.</p>
            <p>Na Vila Terroir, a proposta é simples: trocar a pressa pela contemplação, os ruídos da rotina pelo som da natureza e os dias corridos por momentos vividos de verdade.</p>
            <p>O Chalé Malbec convida você a descobrir o prazer das coisas simples, com aconchego, privacidade e a beleza singular das montanhas ao redor.</p>
          </SectionHead>
        </div>
        <figure className="relative md:col-span-5 md:col-start-8">
          <img src={paisagem.url} alt="Pôr do sol sobre as montanhas da Mantiqueira" loading="lazy" width={1200} height={900} className="aspect-[4/5] w-full object-cover" />
        </figure>
      </section>

      {/* CHALÉ + GALERIA */}
      <section id="chale" className="bg-linen py-24 md:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHead eyebrow="Conheça o Chalé Malbec" title="Seu refúgio, do seu jeito.">
            <p>Aconchegante, exclusivo e cheio de estilo, com 75 m² de área interna e privacidade em meio à natureza. Uma arquitetura bem pensada, que chama atenção pela beleza.</p>
            <p>Na suíte, uma cama super king linha hotel com duas bicamas de solteiro: o espaço ideal para casais que procuram conforto, romantismo e privacidade, e para famílias de até quatro pessoas em um ambiente seguro e acolhedor.</p>
            <p>Água quentinha em todas as torneiras, com aquecimento solar e a gás, banheira de imersão para duas pessoas, lareira a lenha dentro do chalé e um aconchegante fogo de chão na área externa.</p>
          </SectionHead>
          {site.features.length > 0 && (
            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-2 text-sm">{site.features.map((f) => <li key={f}>{f}</li>)}</ul>
          )}
          <div className="mt-16 columns-2 gap-3 md:columns-3 md:gap-4">
            {photos.map((p, i) => (
              <button
                key={i}
                onClick={() => openAt(i)}
                aria-label={`Ampliar: ${p.alt}`}
                className="group relative mb-3 block w-full break-inside-avoid overflow-hidden md:mb-4"
              >
                <img src={p.src} alt={p.alt} loading="lazy" width={p.w} height={p.h} className="h-auto w-full transition-transform duration-700 group-hover:scale-105" />
                <span className="eyebrow absolute left-3 top-3 text-[0.6rem] text-ivory">{p.cat}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={index !== null} onOpenChange={(o) => !o && setIndex(null)}>
        <DialogContent className="max-w-6xl border-none bg-wood p-0 text-ivory [&>button]:hidden" onKeyDown={(e) => { if (e.key === "ArrowRight") step(1); if (e.key === "ArrowLeft") step(-1); }}>
          {index !== null && (
            <>
              <DialogTitle className="sr-only">{photos[index]!.alt}</DialogTitle>
              <img src={photos[index]!.src} alt={photos[index]!.alt} className="max-h-[85vh] w-full object-contain" />
              <div className="flex items-center justify-between p-3">
                <button onClick={() => step(-1)} aria-label="Foto anterior" className="p-3"><ChevronLeft /></button>
                <span className="eyebrow">{index + 1} / {photos.length}</span>
                <button onClick={() => step(1)} aria-label="Próxima foto" className="p-3"><ChevronRight /></button>
                <button onClick={() => setIndex(null)} aria-label="Fechar" className="p-3"><X /></button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* DETALHES */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:py-36">
        <SectionHead eyebrow="Detalhes" title="A beleza está nos detalhes.">
          <p>O aconchego de uma noite fria junto à lareira a lenha. O prazer de não ter compromissos. A paisagem que convida a olhar mais longe. A conversa que se estende sem perceber a hora.</p>
        </SectionHead>
        <div className="mt-16 grid gap-16 md:grid-cols-2">
          {[
            { img: banheira, w: 1200, h: 901, t: "Um banho sem pressa", d: "Banheira de imersão para duas pessoas, com água quente garantida pelo aquecimento solar e a gás." },
            { img: fogo, w: 1200, h: 900, t: "Noites ao redor do fogo", d: "Fogo de chão na área externa para conversas que se estendem sob o céu da serra." },
          ].map((m, i) => (
            <figure key={m.t} className={i === 1 ? "md:mt-32" : ""}>
              <div className="relative"><img src={m.img.url} alt={m.t} loading="lazy" width={m.w} height={m.h} className="aspect-[4/3] w-full object-cover" /></div>
              <figcaption className="mt-6"><h3 className="text-3xl">{m.t}</h3><p className="mt-2 text-muted-foreground">{m.d}</p></figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-12 text-sm text-muted-foreground">Comodidades confirmadas estão descritas no anúncio oficial do Airbnb.</p>
      </section>

      {/* REGIÃO */}
      <section id="regiao" className="bg-pine py-24 text-ivory md:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <p className="eyebrow text-linen/80">A região</p>
          <h2 className="mt-4 max-w-3xl text-4xl leading-tight md:text-6xl">A Mantiqueira tem seu próprio ritmo.</h2>
          <div className="mt-6 max-w-2xl space-y-4 text-lg leading-relaxed text-linen/85">
            <p>Aos 1.700 m de altitude e com a temática do vinho, a Vila Terroir tem a vista mais incrível do Chalé Malbec: belíssimas paisagens, esportes de aventura, charmosas cidades e diversos passeios pela região.</p>
            <p>O acesso é fácil: a estrada asfaltada fica a cerca de 4 minutos. E tudo o que a serra tem de melhor está pertinho.</p>
          </div>
          <ul className="mt-16 grid gap-px bg-ivory/15 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Pedra do Baú", "4,8 km"],
              ["Campos do Jordão", "20 km"],
              ["Vinícolas e olivais premiados", "Na vizinhança"],
              ["São Bento do Sapucaí", "Na vizinhança"],
            ].map(([a, d]) => (
              <li key={a} className="bg-pine p-8">
                <h3 className="text-2xl">{a}</h3>
                <p className="eyebrow mt-3 text-linen/70">{d}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-linen/70">Também pertinho: excelentes restaurantes, queijarias artesanais e o Caminho da Fé. De carro: 200 km de São Paulo, 250 km de Campinas, 385 km de Ribeirão Preto, 360 km do Rio de Janeiro e 460 km de Belo Horizonte.</p>
        </div>
      </section>

      {/* AVALIAÇÕES */}
      <section className="mx-auto max-w-4xl px-6 py-24 text-center md:py-36">
        <p className="eyebrow text-clay">Avaliações</p>
        <h2 className="mt-4 text-4xl md:text-6xl">Memórias que inspiram novas viagens.</h2>
        <p className="mx-auto mt-6 max-w-xl text-muted-foreground">Leia as experiências de quem já se hospedou, diretamente na plataforma oficial.</p>
        <div className="mt-10"><AirbnbButton label="Leia as avaliações no Airbnb" from="reviews" /></div>
      </section>

      {/* LOCALIZAÇÃO */}
      <section className="border-t border-border bg-linen">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-2 md:py-32">
          <SectionHead eyebrow="Localização" title="Longe da pressa. Perto do que importa.">
            <p>A Serra da Mantiqueira oferece o cenário para uma estadia de tranquilidade, natureza e contemplação. Planeje sua chegada e prepare-se para viver a experiência Vila Terroir.</p>
          </SectionHead>
          <div className="self-end">
            <p className="font-display text-2xl">{site.address ?? site.region}</p>
            {site.city && <p className="text-muted-foreground">{site.city}</p>}
            {!site.address && <p className="mt-2 text-sm text-muted-foreground">O endereço completo é enviado aos hóspedes após a reserva.</p>}
            {site.mapsUrl && (
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" onClick={() => track("directions_click")} className="btn mt-8 bg-pine text-ivory hover:bg-wood">Como chegar</a>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-6 py-24 md:py-32">
        <p className="eyebrow text-clay">Perguntas frequentes</p>
        <h2 className="mt-4 text-4xl md:text-5xl">Antes de chegar</h2>
        <Accordion type="single" collapsible className="mt-10">
          {([
            ["Como reservar?", "As reservas são feitas exclusivamente pelo Airbnb, no anúncio oficial do Chalé Malbec."],
            ["Posso reservar ou consultar datas pelo WhatsApp?", "Não. O WhatsApp é um canal apenas para dúvidas e informações gerais. Datas, disponibilidade e reservas acontecem somente no Airbnb."],
            ["Qual é a capacidade do chalé?", "O Chalé Malbec acomoda até 4 hóspedes, com 75 m² de área interna: ideal para casais e para famílias."],
            ["Quais são as comodidades disponíveis?", "A lista completa e atualizada está no anúncio oficial do Airbnb."],
            ["Como chegar?", "As instruções de acesso são enviadas aos hóspedes após a confirmação da reserva."],
            ["Como consultar disponibilidade?", "Escolha suas datas diretamente no Airbnb, que mostra a disponibilidade em tempo real."],
            ["Quais são os horários de entrada e saída?", "Os horários estão informados no anúncio do Airbnb."],
            ["Qual é a política para animais de estimação?", "Consulte as regras da casa no Airbnb antes de reservar."],
            ["Como funciona o cancelamento?", "A política de cancelamento aplicável é exibida no Airbnb no momento da reserva."],
          ] as [string, string][]).map(([q, a]) => (
            <AccordionItem key={q} value={q}>
              <AccordionTrigger className="text-left font-display text-xl font-normal">{q}</AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CONTATO + CTA FINAL */}
      <section id="contato" className="relative overflow-hidden bg-pine text-ivory">
        <img src={finalsite.url} alt="" aria-hidden loading="lazy" width={720} height={960} className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="relative mx-auto max-w-4xl px-6 py-28 text-center md:py-40">
          <p className="eyebrow text-linen/90">Contato</p>
          <h2 className="mt-4 text-4xl leading-tight md:text-7xl">Sua próxima história pode começar aqui.</h2>
          <p className="mx-auto mt-8 max-w-xl text-lg text-linen/90">Às vezes, tudo o que precisamos é de alguns dias em um lugar especial.</p>
          <p className="mx-auto mt-2 max-w-xl text-lg text-linen/90">Reserve pelo Airbnb, nosso canal oficial. E se quiser saber mais sobre o chalé, a região ou qualquer outra coisa, é só deixar sua mensagem abaixo.</p>
          <div className="mt-12 flex flex-col justify-center gap-3 sm:flex-row">
            <AirbnbButton label="Reservar no Airbnb" from="cta" />
            <WhatsAppButton label="Tirar dúvidas pelo WhatsApp" from="cta" />
          </div>
          <ContactForm />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-wood text-linen">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-3">
          <div>
            <img src={logo.url} alt="Vila Terroir" width={112} height={112} className="h-20 w-20 rounded-full object-cover" />
            <p className="eyebrow mt-4 opacity-70">{site.unit} · {site.region}</p>
          </div>
          <nav aria-label="Rodapé" className="flex flex-col gap-2 text-sm">
            {navItems.map((n) => <a key={n.href} href={n.href} className="hover:text-ivory">{n.label}</a>)}
          </nav>
          <div className="flex flex-col gap-2 text-sm">
            <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-ivory">Instagram {site.instagramHandle}</a>
            <a href={site.airbnbUrl} target="_blank" rel="noopener noreferrer" className="hover:text-ivory">Airbnb</a>
          </div>
        </div>
        <p className="border-t border-ivory/10 px-6 py-6 text-center text-xs opacity-60">© {new Date().getFullYear()} {site.name}. Reservas exclusivamente pelo Airbnb.</p>
      </footer>

      {whatsappLink() && (
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="Tirar dúvidas pelo WhatsApp" onClick={() => track("whatsapp_click", { from: "float" })} className="fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-pine text-ivory shadow-lg">
          <MessageCircle />
        </a>
      )}
    </main>
  );
}

function ContactForm() {
  const [error, setError] = useState("");
  if (!site.whatsappNumber) return null;
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const data = {
      name: String(f.get("name") || ""),
      contact: String(f.get("contact") || ""),
      message: String(f.get("message") || ""),
    };
    const err = validateContact(data);
    if (err) { setError(err); return; }
    setError("");
    track("contact_submit");
    window.open(whatsappLink(buildContactMessage(data)), "_blank", "noopener");
  };
  const field = "mt-1 h-12 w-full border border-ivory/30 bg-pine/70 px-3 text-ivory placeholder:text-linen/80 focus-visible:border-ivory/60";
  return (
    <form onSubmit={submit} className="mx-auto mt-16 max-w-2xl rounded-sm border border-ivory/15 bg-pine/90 px-6 py-8 text-left backdrop-blur-sm md:px-10 md:py-10">
      <p className="eyebrow text-linen/90">Fale conosco</p>
      <h3 className="mt-3 font-display text-3xl">Tire suas dúvidas</h3>
      <p className="mt-2 text-sm leading-relaxed text-linen/85">
        Este é um canal para perguntas e informações gerais. Para reservar, use o Airbnb, nosso canal oficial.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="text-sm">Nome (opcional)<input name="name" placeholder="Como podemos te chamar" className={field} /></label>
        <label className="text-sm">Contato para resposta (opcional)<input name="contact" placeholder="E-mail ou WhatsApp" className={field} /></label>
      </div>
      <label className="mt-4 block text-sm">
        Mensagem
        <textarea name="message" rows={4} placeholder="Escreva sua dúvida sobre o chalé, a região ou o acesso" className={`${field} h-auto py-3`} />
      </label>
      {error && <p role="alert" className="mt-3 text-sm text-linen">{error}</p>}
      <button className="btn mt-6 w-full bg-clay text-ivory hover:bg-wood">Enviar mensagem pelo WhatsApp</button>
      <p className="mt-3 text-xs leading-relaxed text-linen/85">
        As reservas são feitas somente pelo Airbnb. Esta mensagem serve apenas para dúvidas e contato geral.
      </p>
    </form>
  );
}
