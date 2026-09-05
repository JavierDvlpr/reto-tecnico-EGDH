"use client";

import { Slider } from "@/components/ui/slider";

interface Props {
  markup: number;
  onChange: (valor: number) => void;
}

const PRESETS = [
  { valor: 15, etiqueta: "15% Conservador" },
  { valor: 25, etiqueta: "25% Moderado" },
  { valor: 35, etiqueta: "35% Base" },
  { valor: 45, etiqueta: "45% Dinamico" },
  { valor: 50, etiqueta: "50% Maximo" },
];

export default function SelectorMargen({ markup, onChange }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <label className="text-sm font-semibold text-slate-800 tracking-tight">
            Margen comercial simulado
          </label>
          <p className="text-xs text-slate-500">
            Ajusta el porcentaje aplicado sobre el costo en pesos colombianos para recalcular precio y utilidad.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Markup aplicado:</span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-slate-900 text-white shadow-xs">
            +{markup}%
          </span>
        </div>
      </div>

      <div className="pt-2 pb-1">
        <Slider
          min={10}
          max={50}
          step={1}
          value={[markup]}
          onValueChange={(val) => {
            const valor = Array.isArray(val) ? val[0] : val;
            if (typeof valor === "number") onChange(valor);
          }}
          className="cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-slate-400 font-medium mt-2">
          <span>Minimo: 10%</span>
          <span>Defecto: 35%</span>
          <span>Maximo: 50%</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-slate-100">
        <span className="text-xs text-slate-400 font-medium mr-1">Preajustes rapidos:</span>
        {PRESETS.map((preset) => {
          const activo = markup === preset.valor;
          return (
            <button
              key={preset.valor}
              type="button"
              onClick={() => onChange(preset.valor)}
              className={`text-xs px-2.5 py-1 rounded-md font-medium transition-all duration-150 cursor-pointer ${
                activo
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
              }`}
            >
              {preset.etiqueta}
            </button>
          );
        })}
      </div>
    </div>
  );
}
