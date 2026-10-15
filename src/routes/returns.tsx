import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/gyra/PolicyPage";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/returns")({
  head: () => ({ meta: seo("Returns & Exchanges — GYRA", "GYRA's approach to returns and exchanges.") }),
  component: () => (
    <PolicyPage enquiry="returns" cta="Returns and Exchanges help" title="Returns & Exchanges" sections={[
      { h: "Damaged or incorrect items", p: "If something arrives damaged or isn't what you ordered, message us on WhatsApp with photos as soon as possible and we'll help." },
      { h: "Exchanges", p: "Eligibility and timelines for exchanges will be confirmed by GYRA." },
    ]} />
  ),
});
