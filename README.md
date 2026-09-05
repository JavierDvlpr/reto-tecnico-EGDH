# Simulador de Rentabilidad e-Commerce

Solucion desarrollada para el reto tecnico de El Gigante del Hogar. La aplicacion consume el catalogo de productos de fakestoreapi.com, convierte sus costos de USD a COP bajo una tasa representativa (TRM $4.000), aplica un margen comercial variable (entre 10% y 50%) y entrega analitica por categoria junto a un ranking de productos recomendados para importacion.

## Como correrlo localmente

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/JavierDvlpr/reto-tecnico-EGDH.git
   cd reto-tecnico-EGDH
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Iniciar el entorno de desarrollo:
   ```bash
   npm run dev
   ```

4. Abrir http://localhost:3000 en el navegador (redirecciona automaticamente al dashboard gerencial en /dashboard).

Para validar la version empaquetada de produccion:
```bash
npm run build
npm run start
```

## Endpoints

- GET /api/analytics
  Calcula y devuelve el costo promedio en COP y el total de productos agrupados por categoria.

- GET /api/products/opportunities?markup=35
  Procesa el catalogo completo aplicando el porcentaje de markup indicado (por defecto 35%) y devuelve:
  - productos: lista completa con costoCOP, precioVentaCOP y utilidadCOP calculada.
  - oportunidades: top 3 de productos filtrados con calificacion mayor o igual a 4.0 y mas de 100 reseñas, ordenados de forma descendente por reputacion y volumen.

## Arquitectura

El proyecto adopta un enfoque orientado a objetos guiado por principios SOLID:

- Inversion de dependencias: se define la interfaz ProveedorCatalogo (src/lib/interfaces/ProveedorCatalogo.ts). La capa de servicios no interactua de forma directa con la API externa ni con bibliotecas de red, sino con esta abstraccion.
- Responsabilidad unica:
  - ProveedorFakeStore: se encarga unicamente de consumir el endpoint remoto.
  - CacheEnMemoria: maneja de manera aislada el almacenamiento temporal y los tiempos de expiracion.
  - ServicioPrecios: encapsula las operaciones aritmeticas de conversion a pesos colombianos y el factor de margen comercial.
  - ServicioCatalogo: orquesta la transformacion del catalogo incorporando la logica de precios.
  - ServicioAnalitica: procesa la agregacion de articulos por categoria y los promedios.
  - ServicioOportunidades: aplica las reglas de clasificacion y ordenamiento de articulos con alto potencial de venta.
- Patron decorador (Open/Closed): ProveedorCatalogoConCache envuelve al proveedor base para incorporar almacenamiento temporal y rescate ante fallos sin necesidad de modificar el codigo del cliente original.
- Inyeccion de dependencias: src/lib/contenedor.ts centraliza las instancias de los servicios y proveedores, evitando llamadas dispersas a new dentro de las rutas de Next.js.

## Gestion de recursos (cache)

Para no saturar el servicio externo ni ralentizar la experiencia cuando el usuario desplaza el control de markup en el dashboard, la aplicacion utiliza el decorador ProveedorCatalogoConCache con una ventana de validez de 5 minutos (300.000 ms).

Durante ese lapso, cualquier llamada subsecuente (por ejemplo, al mover el slider entre 10% y 50%) reutiliza los datos en memoria. La recalculacion de precios y margenes se ejecuta localmente sobre dicha copia sin generar trafico adicional hacia fakestoreapi.com. Para despliegues horizontales multi-instancia en la nube, esta misma interfaz puede sustituirse por un adaptador conectado a Redis sin alterar el resto de servicios.

## Continuidad del negocio

En caso de que fakestoreapi.com experimente fallas, caidas de conectividad o respuestas no exitosas, el decorador activa su mecanismo de contingencia: consulta el metodo obtenerAunVencida de la cache y sirve los ultimos datos validos que tenga registrados, evitando que el panel gerencial quede inoperativo.

Si la falla ocurre en frio durante el primer arranque y no existe ninguna copia previa disponible, los endpoints responden con un estado HTTP 503 controlado en formato JSON, permitiendo que la interfaz informe al usuario de manera clara en lugar de provocar excepciones no controladas.
