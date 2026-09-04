import { RawProduct } from "../types";

// contrato desacoplado para permitir sustitucion de la fuente de datos
export interface ProveedorCatalogo {
  obtenerProductos(): Promise<RawProduct[]>;
}
