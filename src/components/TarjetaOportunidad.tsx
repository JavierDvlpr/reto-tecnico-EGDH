import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PricedProduct } from "@/lib/types";

// tarjeta destacada para productos de alto potencial con calificacion superior y alto volumen
export default function TarjetaOportunidad(producto: PricedProduct) {
  return (
    <Card className="border-2 border-amber-500/60 shadow-sm transition-shadow hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-base font-semibold line-clamp-2 leading-snug">{producto.title}</CardTitle>
          <Badge variant="secondary" className="shrink-0 font-medium">
            ★ {producto.rating.rate} ({producto.rating.count})
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 text-sm pt-2">
        <div className="flex justify-between text-muted-foreground">
          <span>Costo base (COP):</span>
          <span>${producto.costoCOP.toLocaleString("es-CO", { maximumFractionDigits: 0 })}</span>
        </div>
        <div className="flex justify-between font-semibold text-foreground">
          <span>Precio venta sugerido:</span>
          <span>${producto.precioVentaCOP.toLocaleString("es-CO", { maximumFractionDigits: 0 })}</span>
        </div>
        <div className="flex justify-between text-xs text-emerald-600 dark:text-emerald-400 font-medium pt-1 border-t">
          <span>Margen unitario esperado:</span>
          <span>+${producto.utilidadCOP.toLocaleString("es-CO", { maximumFractionDigits: 0 })}</span>
        </div>
      </CardContent>
    </Card>
  );
}
