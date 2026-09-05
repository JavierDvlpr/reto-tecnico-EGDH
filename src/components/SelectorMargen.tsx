"use client";

import { Slider } from "@/components/ui/slider";

interface Props {
  markup: number;
  onChange: (valor: number) => void;
}

// selector de margen comercial para simular variacion de rentabilidad
export default function SelectorMargen({ markup, onChange }: Props) {
  return (
    <div className="flex flex-col gap-2 max-w-sm">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-foreground">Markup comercial</label>
        <span className="text-sm font-semibold text-primary">{markup}%</span>
      </div>
      <Slider
        min={10}
        max={50}
        step={1}
        value={[markup]}
        onValueChange={(val) => {
          const valor = Array.isArray(val) ? val[0] : val;
          if (typeof valor === "number") onChange(valor);
        }}
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Min: 10%</span>
        <span>Max: 50%</span>
      </div>
    </div>
  );
}
