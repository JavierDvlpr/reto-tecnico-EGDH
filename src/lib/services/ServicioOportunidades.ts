import { PricedProduct } from "../types";

// clasifica y filtra productos candidatos a importacion segun volumen de valoraciones y promedio
export class ServicioOportunidades {
  constructor(private calificacionMinima = 4.0, private reseñasMinimas = 100) {}

  obtenerTop(productos: PricedProduct[], limite = 3): PricedProduct[] {
    return productos
      .filter((p) => p.rating.rate >= this.calificacionMinima && p.rating.count > this.reseñasMinimas)
      .sort((a, b) => b.rating.rate - a.rating.rate || b.rating.count - a.rating.count)
      .slice(0, limite);
  }
}
