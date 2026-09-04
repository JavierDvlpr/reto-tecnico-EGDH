// almacena datos temporalmente en memoria del proceso con expiracion configurable
export class CacheEnMemoria<T> {
  private valor: T | null = null;
  private guardadoEn = 0;

  constructor(private ttlMs: number) {}

  obtener(): T | null {
    if (this.valor === null) return null;
    const vencida = Date.now() - this.guardadoEn > this.ttlMs;
    return vencida ? null : this.valor;
  }

  // sirve como respaldo en contingencia cuando el upstream esta caido
  obtenerAunVencida(): T | null {
    return this.valor;
  }

  guardar(valor: T): void {
    this.valor = valor;
    this.guardadoEn = Date.now();
  }
}
