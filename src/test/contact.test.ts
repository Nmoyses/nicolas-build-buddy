import { describe, it, expect } from "vitest";
import { validateContact, buildContactMessage, whatsappLink, site } from "@/config/site";

const msg = "Vocês aceitam pets no Chalé Malbec?";

describe("contato pelo WhatsApp", () => {
  it("exige mensagem", () => expect(validateContact({ message: "" })).toBe("Escreva sua dúvida ou mensagem."));
  it("mensagem só com espaços conta como vazia", () =>
    expect(validateContact({ message: "   \n " })).toBe("Escreva sua dúvida ou mensagem."));
  it("mensagem muito curta é recusada", () =>
    expect(validateContact({ message: "oi" })).toBe("Conte um pouco mais para podermos te responder."));
  it("mensagem válida passa", () => expect(validateContact({ message: msg })).toBeNull());
  it("sem nome e sem contato não aparece rodapé", () => {
    const m = buildContactMessage({ message: msg, name: "  ", contact: "" });
    expect(m).not.toContain("Nome:");
    expect(m).not.toContain("Contato para resposta:");
  });
  it("nome e contato preenchidos entram na mensagem", () => {
    const m = buildContactMessage({ message: msg, name: "Ana", contact: "ana@mail.com" });
    expect(m).toContain("Nome: Ana");
    expect(m).toContain("Contato para resposta: ana@mail.com");
    expect(m.startsWith(msg)).toBe(true);
  });
  it("mensagem de contato não traz datas, hóspedes ou pedido de reserva", () => {
    const m = buildContactMessage({ message: msg, name: "Ana", contact: "19 99999-0000" }).toLowerCase();
    for (const ban of ["check-in", "check-out", "checkin", "checkout", "data de", "hóspedes", "reservar", "diárias"]) {
      expect(m).not.toContain(ban);
    }
  });
  it("mensagem padrão do botão é só de dúvida", () => {
    expect(site.whatsappMessage.toLowerCase()).not.toContain("disponibilidade");
    expect(site.whatsappMessage).toContain("dúvida");
  });
  it("link usa o número oficial e codifica quebras de linha", () => {
    const l = whatsappLink(buildContactMessage({ message: msg }))!;
    expect(l.startsWith("https://wa.me/5519978155601?text=")).toBe(true);
    expect(l).toContain("%0A");
  });
});
