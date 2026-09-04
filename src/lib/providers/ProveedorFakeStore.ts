import { ProveedorCatalogo } from "../interfaces/ProveedorCatalogo";
import { RawProduct } from "../types";

const URL_FAKESTORE = "https://fakestoreapi.com/products";

// cliente de red dedicado a fakestore sin logica de negocio adicional
export class ProveedorFakeStore implements ProveedorCatalogo {
  async obtenerProductos(): Promise<RawProduct[]> {
    const respuesta = await fetch(URL_FAKESTORE, { next: { revalidate: 300 } });

    if (!respuesta.ok) {
      throw new Error(`fakestore api respondio con estado ${respuesta.status}`);
    }

    return respuesta.json();
  }
}
