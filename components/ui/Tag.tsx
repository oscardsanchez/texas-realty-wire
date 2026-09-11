import Link from "next/link";
import { cn } from "@/lib/cn";

export function Tag({
  href,
  children,
  variant = "default",
  className,
}: {
  href?: string;
  children: React.ReactNode;
  variant?: "default" | "accent";
  className?: string;
}) {
  const classes = cn(
    "inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-medium",
    variant === "accent" ? "bg-accent/10 text-accent" : "bg-navy/[0.06] text-navy-soft",
    href && "transition-colors hover:bg-accent/15 hover:text-accent",
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return <span className={classes}>{children}</span>;
}
