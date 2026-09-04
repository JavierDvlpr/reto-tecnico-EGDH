import { ProveedorCatalogo } from "../interfaces/ProveedorCatalogo";
import { CacheEnMemoria } from "../services/CacheEnMemoria";
import { RawProduct } from "../types";

// decorador que añade estrategia de cache y tolerancia a fallos sobre cualquier ProveedorCatalogo
export class ProveedorCatalogoConCache implements ProveedorCatalogo {
  private cache: CacheEnMemoria<RawProduct[]>;

  constructor(private proveedorBase: ProveedorCatalogo, ttlMs = 5 * 60 * 1000) {
    this.cache = new CacheEnMemoria<RawProduct[]>(ttlMs);
  }

  async obtenerProductos(): Promise<RawProduct[]> {
    const enCache = this.cache.obtener();
    if (enCache) return enCache;

    try {
      const productos = await this.proveedorBase.obtenerProductos();
      this.cache.guardar(productos);
      return productos;
    } catch (error) {
      // resiliencia: si el servicio externo falla devolvemos datos previos antes de colapsar la vista
      const respaldo = this.cache.obtenerAunVencida();
      if (respaldo) return respaldo;
      throw error;
    }
  }
}
