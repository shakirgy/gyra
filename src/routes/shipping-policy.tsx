import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/gyra/PolicyPage";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/shipping-policy")({
  head: () => ({ meta: seo("Shipping Policy — GYRA", "How GYRA orders are confirmed and shipped.") }),
  component: () => (
    <PolicyPage enquiry="shipping" cta="Shipping Questions" title="Shipping Policy" sections={[
      { h: "Order confirmation", p: "Orders are confirmed over WhatsApp. We'll share availability, delivery charges and timelines before you pay." },
      { h: "Delivery", p: "Delivery areas, timelines and charges will be confirmed by GYRA for each order." },
    ]} />
  ),
});
