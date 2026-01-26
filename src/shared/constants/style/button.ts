import clsx from "clsx";

export const STYLE_BUTTON_BASE = clsx(
    "inline-flex items-center justify-center",
    "rounded-full transition",
    "cursor-pointer",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    "disabled:pointer-events-none disabled:opacity-50"
);

export const STYLE_BUTTON_VARIANT = {
    color: "bg-primary text-primary-foreground hover:bg-accent/90",
    monocrome_white: "text-background border border-background/20 hover:bg-background/20",
    monocrome_black: "border border-foreground/20 hover:bg-background/20",
    muted: "hover:bg-muted",
} as const;

export const STYLE_BUTTON_SIZE = {
    sm: "px-[var(--space-3)] py-[var(--space-1)] text-sm",
    md: "px-6 py-2",
    lg: "px-8 py-3 max-md:px-6 max-sm:px-4 max-md:py-2 max-md:text-sm max-sm:text-xs",
} as const;
