import { PricedProduct, ResumenCategoria } from "../types";

// agrupa catalogo por categoria para obtener metricas consolidadas
export class ServicioAnalitica {
  calcularResumenPorCategoria(productos: PricedProduct[]): ResumenCategoria[] {
    const grupos = new Map<string, PricedProduct[]>();

    for (const producto of productos) {
      const grupo = grupos.get(producto.category) ?? [];
      grupo.push(producto);
      grupos.set(producto.category, grupo);
    }

    return Array.from(grupos.entries()).map(([categoria, items]) => ({
      categoria,
      precioPromedioCOP: items.reduce((suma, p) => suma + p.costoCOP, 0) / items.length,
      totalProductos: items.length,
    }));
  }
}
