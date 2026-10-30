// Configuração central da Vila Terroir | Chalé Malbec.
// Regra de negócio: reservas somente pelo Airbnb (link oficial).
// O WhatsApp é canal apenas para dúvidas e contato geral — nunca datas ou reserva direta.

export const site = {
  name: "Vila Terroir",
  unit: "Chalé Malbec",
  region: "Serra da Mantiqueira",
  airbnbUrl: "https://airbnb.com/h/vilaterroir",
  instagramUrl: "https://www.instagram.com/vilaterroir/",
  instagramHandle: "@vilaterroir",
  whatsappNumber: "5519978155601",
  whatsappMessage:
    "Olá! Conheci a Vila Terroir pelo site e gostaria de tirar uma dúvida sobre o Chalé Malbec.",
  address: "Estr. da Candelária - Distrito de Candelária",
  city: "Brazópolis, Minas Gerais",
  mapsUrl: "https://maps.app.goo.gl/Qk8NUGieJKPjjWMZ7",
  features: [
    "75 m² de área interna",
    "Até 4 hóspedes",
    "Cama super king + 2 bicamas de solteiro",
    "Banheira de imersão para duas pessoas",
    "Lareira a lenha e fogo de chão",
    "Aquecimento solar a gás",
    "Estacionamento amplo",
  ],
};

export const whatsappLink = (msg: string = site.whatsappMessage) => {
  if (!site.whatsappNumber) return "";
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(msg)}`;
};

export const whatsapplink = whatsappLink;

// Contato geral: sem datas, sem check-in/check-out, sem hóspedes.
export type Contact = { name?: string; contact?: string; message: string };

export function validateContact(data: Contact): string | null {
  const message = (data.message ?? "").trim();
  if (!message) return "Escreva sua dúvida ou mensagem.";
  if (message.length < 5) return "Conte um pouco mais para podermos te responder.";
  return null;
}

export function buildContactMessage(data: Contact): string {
  const lines = [data.message.trim()];
  const name = (data.name ?? "").trim();
  const contact = (data.contact ?? "").trim();
  if (name) lines.push(`Nome: ${name}`);
  if (contact) lines.push(`Contato para resposta: ${contact}`);
  return lines.join("\n\n");
}

export function track(event: string, data?: Record<string, unknown>) {
  console.log(`[Tracking] ${event}`, data);
}
