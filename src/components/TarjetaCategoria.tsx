import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ResumenCategoria } from "@/lib/types";

// traduccion contextual y amigable para el mercado hispanohablante
const NOMBRES_CATEGORIA: Record<string, string> = {
  "men's clothing": "Ropa Masculina",
  "women's clothing": "Ropa Femenina",
  "jewelery": "Joyería y Accesorios",
  "electronics": "Tecnología y Electrónica",
};

export default function TarjetaCategoria({
  categoria,
  precioPromedioCOP,
  totalProductos,
}: ResumenCategoria) {
  const nombreMostrado = NOMBRES_CATEGORIA[categoria] ?? categoria;

  return (
    <Card className="border border-slate-200/80 bg-white hover:border-slate-300 transition-all duration-150 shadow-xs hover:shadow-sm">
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {nombreMostrado}
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600">
            {totalProductos} {totalProductos === 1 ? "artículo" : "artículos"}
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-1 space-y-2">
        <div>
          <p className="text-[11px] text-slate-400 font-medium">Costo promedio de importación</p>
          <p className="text-xl font-bold tracking-tight text-slate-900 font-sans mt-0.5">
            ${precioPromedioCOP.toLocaleString("es-CO", { maximumFractionDigits: 0 })}
            <span className="text-xs font-normal text-slate-500 ml-1">COP</span>
          </p>
        </div>
        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-slate-700 h-full rounded-full transition-all duration-300"
            style={{ width: `${Math.min(100, (totalProductos / 10) * 100)}%` }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
