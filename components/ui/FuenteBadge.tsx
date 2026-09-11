import { cn } from "@/lib/cn";
import { FUENTES } from "@/lib/taxonomy";

export function FuenteBadge({ fuenteSlug, className }: { fuenteSlug: string; className?: string }) {
  const fuente = FUENTES[fuenteSlug];
  if (!fuente) return null;

  const esPrimaria = fuente.tipo === "primaria";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide",
        esPrimaria
          ? "border-primaria/30 bg-primaria/[0.07] text-primaria"
          : "border-navy/20 bg-navy/[0.04] text-navy-soft",
        className
      )}
      title={esPrimaria ? "Dato primario" : "Cobertura periodística"}
    >
      <span
        className={cn("h-1.5 w-1.5 rounded-full", esPrimaria ? "bg-primaria" : "bg-navy-soft")}
        aria-hidden
      />
      {fuente.nombre}
    </span>
  );
}
