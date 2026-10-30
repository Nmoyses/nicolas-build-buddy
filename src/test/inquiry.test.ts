import { describe, it, expect } from "vitest";
import { validateInquiry, buildInquiryMessage, whatsappLink } from "@/config/site";

const ok = { checkIn: "2026-11-10", checkOut: "2026-11-12", guests: "2" };

describe("consulta WhatsApp", () => {
  it("exige entrada", () => expect(validateInquiry({ ...ok, checkIn: "" })).toBe("Informe a data de entrada."));
  it("exige saída", () => expect(validateInquiry({ ...ok, checkOut: "" })).toBe("Informe a data de saída."));
  it("saída posterior à entrada", () => expect(validateInquiry({ ...ok, checkOut: "2026-11-10" })).not.toBeNull());
  it("hóspedes inteiro >= 1", () => {
    expect(validateInquiry({ ...ok, guests: "0" })).not.toBeNull();
    expect(validateInquiry({ ...ok, guests: "1.5" })).not.toBeNull();
    expect(validateInquiry({ ...ok, guests: "4" })).toBeNull();
  });
  it("sem nome não mostra linha de nome", () => expect(buildInquiryMessage({ ...ok, name: " " })).not.toContain("Nome"));
  it("com nome inclui o nome e datas formatadas", () => {
    const m = buildInquiryMessage({ ...ok, name: "Ana" });
    expect(m).toContain("🙋 *Nome:* Ana");
    expect(m).toContain("📅 *Data de entrada:* 10/11/2026");
  });
  it("link usa número oficial e codifica quebras de linha", () => {
    const l = whatsappLink(buildInquiryMessage(ok))!;
    expect(l.startsWith("https://wa.me/5519978155601?text=")).toBe(true);
    expect(l).toContain("%0A");
  });
});
