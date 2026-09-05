import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PricedProduct } from "@/lib/types";

interface Props {
  producto: PricedProduct;
  posicion?: number;
}

export default function TarjetaOportunidad({ producto, posicion }: Props) {
  const margenPorcentual =
    producto.costoCOP > 0
      ? Math.round((producto.utilidadCOP / producto.costoCOP) * 100)
      : 0;

  return (
    <Card className="overflow-hidden border border-amber-300/80 bg-gradient-to-b from-amber-50/40 via-white to-white shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between">
      <CardContent className="p-5 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            {posicion !== undefined && (
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold bg-amber-500 text-white shadow-2xs">
                {posicion}
              </span>
            )}
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800/90 bg-amber-100/80 px-2 py-0.5 rounded-sm">
              Alta rotación
            </span>
          </div>
          <Badge variant="outline" className="bg-white border-slate-200 font-semibold text-slate-700 shrink-0 text-xs">
            <svg
              className="w-3 h-3 text-amber-500 fill-amber-500 mr-1"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            {producto.rating.rate.toFixed(1)}
            <span className="text-slate-400 font-normal ml-1">({producto.rating.count})</span>
          </Badge>
        </div>

        <div className="flex gap-4 items-center">
          <div className="w-20 h-20 shrink-0 bg-white rounded-lg border border-slate-200/70 p-2 flex items-center justify-center overflow-hidden">
            <img
              src={producto.image}
              alt={producto.title}
              className="max-h-full max-w-full object-contain"
              loading="lazy"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold line-clamp-1">
              {producto.category}
            </p>
            <h3 className="text-sm font-semibold text-slate-900 line-clamp-2 leading-snug mt-0.5" title={producto.title}>
              {producto.title}
            </h3>
          </div>
        </div>

        <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
          <div className="flex justify-between items-center text-slate-500">
            <span>Costo base importación:</span>
            <span className="font-semibold text-slate-700">
              ${producto.costoCOP.toLocaleString("es-CO", { maximumFractionDigits: 0 })} COP
            </span>
          </div>
          <div className="flex justify-between items-center text-slate-900 font-semibold">
            <span>Venta sugerida:</span>
            <span className="text-sm font-bold">
              ${producto.precioVentaCOP.toLocaleString("es-CO", { maximumFractionDigits: 0 })} COP
            </span>
          </div>
          <div className="flex justify-between items-center bg-emerald-50 text-emerald-800 p-2 rounded-md font-medium border border-emerald-200/60 mt-1">
            <span>Utilidad estimada:</span>
            <span className="font-bold">
              +${producto.utilidadCOP.toLocaleString("es-CO", { maximumFractionDigits: 0 })} COP
              <span className="text-[10px] font-semibold text-emerald-700 ml-1">
                (+{margenPorcentual}%)
              </span>
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
