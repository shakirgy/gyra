import { Heart } from "lucide-react";
import { useWishlist } from "@/lib/wishlist";
import { cn } from "@/lib/utils";

export function WishlistButton({ id, name, className, withLabel }: { id: string; name: string; className?: string; withLabel?: boolean }) {
  const { has, toggle } = useWishlist();
  const active = has(id);
  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={active ? `Remove ${name} from wishlist` : `Save ${name} to wishlist`}
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(id); }}
      className={cn(
        withLabel
          ? "btn-outline w-full"
          : "grid h-9 w-9 place-items-center rounded-full bg-card/90 text-plum backdrop-blur transition hover:scale-105",
        className,
      )}
    >
      <Heart className={cn("h-4 w-4 transition", active && "fill-primary text-primary")} />
      {withLabel && (active ? "Saved" : "Save to wishlist")}
    </button>
  );
}
