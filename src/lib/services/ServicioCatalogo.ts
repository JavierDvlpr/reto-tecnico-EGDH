import { ProveedorCatalogo } from "../interfaces/ProveedorCatalogo";
import { ServicioPrecios } from "./ServicioPrecios";
import { PricedProduct } from "../types";

// orquesta la recuperacion de datos con la conversion de precios y utilidad
export class ServicioCatalogo {
  constructor(
    private proveedor: ProveedorCatalogo,
    private precios: ServicioPrecios
  ) {}

  async obtenerProductosProcesados(markupPorcentaje?: number): Promise<PricedProduct[]> {
    const productos = await this.proveedor.obtenerProductos();
    const markup = markupPorcentaje !== undefined ? markupPorcentaje / 100 : undefined;

    return productos.map((producto) => {
      const costoCOP = this.precios.convertirACOP(producto.price);
      const precioVentaCOP = this.precios.aplicarMarkup(costoCOP, markup);

      return {
        ...producto,
        costoCOP,
        precioVentaCOP,
        utilidadCOP: precioVentaCOP - costoCOP,
      };
    });
  }
}
