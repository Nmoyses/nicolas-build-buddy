// Configuração central da Vila Terroir | Chalé Malbec.

export const site = {
  name: "Vila Terroir",
  unit: "Chalé Malbec",
  region: "Serra da Mantiqueira",
  airbnbUrl: "https://airbnb.com/h/vilaterroir",
  instagramUrl: "https://www.instagram.com/vilaterroir/",
  instagramHandle: "@vilaterroir",
  whatsappNumber: "5519978155601",
  whatsappMessage:
    "Olá! Conheci a Vila Terroir pelo site e gostaria de saber mais sobre a disponibilidade do Chalé Malbec.",
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

export const whatsappLink = (msg: string) => {
  if (!site.whatsappNumber) return "";
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(msg)}`;
};

export const whatsapplink = whatsappLink;

export type Inquiry = { checkin: string; checkout: string; guests: string; name?: string };

export function validateInquiry(data: Inquiry) {
  const errors: Record<string, string> = {};
  if (!data.checkin) errors.checkin = "Informe a data de check-in";
  if (!data.checkout) errors.checkout = "Informe a data de check-out";
  return errors;
}

export function buildInquiryMessage(data: Inquiry) {
  return `${site.whatsappMessage}\n\nPeríodo: ${data.checkin} até ${data.checkout}\nHóspedes: ${data.guests}`;
}

export function track(event: string, data?: Record<string, any>) {
  console.log(`[Tracking] ${event}`, data);
}