export interface Rating {
  rate: number;
  count: number;
}

export interface RawProduct {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: Rating;
}

// estructura enriquecida con los calculos en moneda local y margen
export interface PricedProduct extends RawProduct {
  costoCOP: number;
  precioVentaCOP: number;
  utilidadCOP: number;
}

// consolidado para las tarjetas de analitica por categoria
export interface ResumenCategoria {
  categoria: string;
  precioPromedioCOP: number;
  totalProductos: number;
}
