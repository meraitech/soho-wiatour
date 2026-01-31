import clsx from "clsx";

export const STYLE_BUTTON_BASE = clsx(
    "inline-flex items-center justify-center",
    "rounded-full transition",
    "cursor-pointer shrink-0",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    "disabled:pointer-events-none disabled:opacity-50"
);

export const STYLE_BUTTON_VARIANT = {
    color: "bg-primary text-background hover:bg-black/80",
    monocrome_white: "text-background border border-background/20 hover:bg-background/20 backdrop-blur-sm",
    monocrome_black: "border border-foreground/20 hover:bg-background/20 backdrop-blur-sm",
    muted: "hover:bg-muted",
} as const;

export const STYLE_BUTTON_SIZE = {
    sm: "px-4 py-2 text-sm max-md:text-xs",
    md: "px-6 py-2 max-md:text-sm",
    lg: "px-8 py-3 max-md:px-6 max-sm:px-4 max-md:py-2 max-md:text-sm",
} as const;
