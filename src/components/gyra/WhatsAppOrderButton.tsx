import { MessageCircle } from "lucide-react";
import type { Product } from "@/lib/products";
import { productOrderLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export function WhatsAppOrderButton({ product, variant, needsVariant, className, compact }: {
  product: Product; variant?: string | undefined; needsVariant?: boolean; className?: string; compact?: boolean;
}) {
  const href = productOrderLink(product, variant);
  if (!href) {
    return <p className="text-sm text-muted-foreground">WhatsApp ordering is unavailable right now. Please reach us via the Contact page.</p>;
  }
  if (needsVariant && !variant) {
    return (
      <button type="button" disabled className={cn("btn-primary w-full", className)}>
        <MessageCircle className="h-4 w-4" /> Select {product.variants?.label.toLowerCase() ?? "an option"}
      </button>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cn("btn-primary", !compact && "w-full", className)}>
      <MessageCircle className="h-4 w-4" /> {compact ? "Order" : "Order on WhatsApp"}
    </a>
  );
}
