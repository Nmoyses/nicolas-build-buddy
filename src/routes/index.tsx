import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Sections } from "@/components/site/Sections";

const title = "Vila Terroir | Chalé Malbec na Serra da Mantiqueira";
const description =
  "Conheça a Vila Terroir, um refúgio de montanha na Serra da Mantiqueira. Explore o Chalé Malbec, descubra a região e consulte as opções de reserva.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <SiteHeader />
      <Sections />
    </>
  );
}
