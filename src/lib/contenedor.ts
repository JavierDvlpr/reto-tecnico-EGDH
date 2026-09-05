import { ProveedorFakeStore } from "./providers/ProveedorFakeStore";
import { ProveedorCatalogoConCache } from "./providers/ProveedorCatalogoConCache";
import { ServicioPrecios } from "./services/ServicioPrecios";
import { ServicioCatalogo } from "./services/ServicioCatalogo";
import { ServicioAnalitica } from "./services/ServicioAnalitica";
import { ServicioOportunidades } from "./services/ServicioOportunidades";

// composicion de dependencias centralizada para evitar instanciacion repetida
const proveedorConCache = new ProveedorCatalogoConCache(new ProveedorFakeStore());
const servicioPrecios = new ServicioPrecios();

export const servicioCatalogo = new ServicioCatalogo(proveedorConCache, servicioPrecios);
export const servicioAnalitica = new ServicioAnalitica();
export const servicioOportunidades = new ServicioOportunidades();
