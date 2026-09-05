import { NextRequest, NextResponse } from "next/server";
import { servicioCatalogo, servicioOportunidades } from "@/lib/contenedor";

export async function GET(req: NextRequest) {
  const markupParam = req.nextUrl.searchParams.get("markup");
  const markup = markupParam ? Number(markupParam) : undefined;

  try {
    const productos = await servicioCatalogo.obtenerProductosProcesados(markup);
    const oportunidades = servicioOportunidades.obtenerTop(productos);
    return NextResponse.json({ productos, oportunidades });
  } catch {
    return NextResponse.json(
      { error: "no se pudo obtener el catalogo en este momento" },
      { status: 503 }
    );
  }
}
