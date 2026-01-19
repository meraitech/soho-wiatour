import clsx from "clsx";

export const BUTTON_BASE = clsx(
    "inline-flex items-center justify-center",
    "rounded-full transition",
    "cursor-pointer",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    "disabled:pointer-events-none disabled:opacity-50"
);

export const BUTTON_VARIANT = {
    color: "bg-primary text-primary-foreground hover:bg-accent/90",
    monocrome_white: "text-background hover:bg-background/20",
    monocrome_black: "border border-foreground/20 hover:bg-background/20",
    muted: "hover:bg-muted",
} as const;

export const BUTTON_SIZE = {
    sm: "px-[var(--space-3)] py-[var(--space-1)] text-sm",
    md: "px-6 py-2",
    lg: "px-8 py-3",
} as const;
