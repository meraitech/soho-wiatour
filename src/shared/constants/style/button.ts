import clsx from "clsx";

export const BUTTON_BASE = clsx(
    "inline-flex items-center justify-center",
    "rounded-md transition",
    "cursor-pointer",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    "disabled:pointer-events-none disabled:opacity-50"
);

export const BUTTON_VARIANT = {
    color: "bg-accent text-accent-foreground hover:bg-accent/90",
    monocrome: "text-background hover:bg-background/20",
    muted: "hover:bg-muted",
} as const;

export const BUTTON_SIZE = {
    sm: "px-[var(--space-3)] py-[var(--space-1)] text-sm",
    md: "px-button-x py-button-y",
    lg: "px-[var(--space-6)] py-[var(--space-3)] text-lg",
} as const;
