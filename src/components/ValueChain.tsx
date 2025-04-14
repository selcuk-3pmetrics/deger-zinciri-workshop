
import { cn } from "@/lib/utils";

export const valueChainSteps = [
  {
    id: "raw-material",
    name: "Ham madde tedariği",
    description: "Ham madde tedarik süreçleri",
  },
  {
    id: "production",
    name: "Üretim",
    description: "Üretim süreçleri",
  },
  {
    id: "packaging",
    name: "Ambalajlama",
    description: "Ürün ambalajlama süreçleri",
  },
  {
    id: "storage",
    name: "Depolama",
    description: "Ürün depolama süreçleri",
  },
  {
    id: "distribution",
    name: "Dağıtım ve Lojistik",
    description: "Dağıtım ve lojistik süreçleri",
  },
  {
    id: "sales",
    name: "Satış",
    description: "Satış süreçleri",
  },
  {
    id: "consumption",
    name: "Tüketim",
    description: "Tüketim sonrası süreçler",
  },
];

interface ValueChainProps {
  selectedStep: string | null;
  onSelect: (id: string) => void;
}

export const ValueChain = ({ selectedStep, onSelect }: ValueChainProps) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Değer Zinciri Adımları</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {valueChainSteps.map((step) => (
          <button
            key={step.id}
            onClick={() => onSelect(step.id)}
            className={cn(
              "value-chain-step text-left p-4 rounded-lg border transition-all duration-200",
              selectedStep === step.id 
                ? "bg-brand-teal/10 border-brand-teal shadow-md transform scale-105" 
                : "hover:bg-gray-50 border-gray-200"
            )}
          >
            <h3 className="font-medium mb-2">{step.name}</h3>
            <p className="text-sm text-gray-600">{step.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};
