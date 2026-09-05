import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResumenCategoria } from "@/lib/types";

// tarjeta sintetica para visualizar el costo promedio y volumen por categoria
export default function TarjetaCategoria({ categoria, precioPromedioCOP, totalProductos }: ResumenCategoria) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground capitalize">{categoria}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xl font-bold tracking-tight">
          ${precioPromedioCOP.toLocaleString("es-CO", { maximumFractionDigits: 0 })}
        </p>
        <p className="text-xs text-muted-foreground mt-1">{totalProductos} productos en catalogo</p>
      </CardContent>
    </Card>
  );
}
