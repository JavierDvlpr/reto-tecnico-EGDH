// centraliza las formulas de conversion de divisa y calculo de margen comercial
export class ServicioPrecios {
  constructor(private trm = 4000, private markupPorDefecto = 0.35) {}

  convertirACOP(precioUSD: number): number {
    return precioUSD * this.trm;
  }

  aplicarMarkup(precioCOP: number, markup?: number): number {
    const porcentaje = markup ?? this.markupPorDefecto;
    return precioCOP * (1 + porcentaje);
  }
}
