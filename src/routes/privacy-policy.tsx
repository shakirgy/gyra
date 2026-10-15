import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/gyra/PolicyPage";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({ meta: seo("Privacy Policy — GYRA", "How GYRA handles your information when you browse and order via WhatsApp.") }),
  component: () => (
    <PolicyPage enquiry="privacy" title="Privacy Policy" sections={[
      { h: "What we collect", p: "This website does not require an account. Your wishlist is stored only in your own browser on this device." },
      { h: "WhatsApp orders", p: "When you message us on WhatsApp, we receive the details you choose to share (such as your name, number and delivery address) and use them only to handle your enquiry or order." },
      { h: "Questions", p: "Message us on WhatsApp if you'd like to know more about how your information is used." },
    ]} />
  ),
});
