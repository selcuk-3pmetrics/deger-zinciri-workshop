
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const IMPACT_VALUES = [
  { value: 1, label: "Düşük", description: "Düşük etki" },
  { value: 2, label: "Orta", description: "Orta seviye etki" },
  { value: 3, label: "Yüksek", description: "Yüksek seviye etki" },
  { value: 4, label: "Kritik", description: "Kritik seviye etki" },
];

const PROBABILITY_VALUES = [
  { value: 1, label: "Düşük", description: "Düşük olasılık" },
  { value: 2, label: "Orta", description: "Orta seviye olasılık" },
  { value: 3, label: "Yüksek", description: "Yüksek seviye olasılık" },
  { value: 4, label: "Kritik", description: "Kritik seviye olasılık" },
];

interface RiskInputsProps {
  impact: string;
  setImpact: (value: string) => void;
  probability: string;
  setProbability: (value: string) => void;
}

export const RiskInputs = ({
  impact,
  setImpact,
  probability,
  setProbability,
}: RiskInputsProps) => {
  return (
    <div className="space-y-4">
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="impact">Etki</Label>
        <Select
          value={impact}
          onValueChange={setImpact}
        >
          <SelectTrigger>
            <SelectValue placeholder="Etki seviyesi seçin" />
          </SelectTrigger>
          <SelectContent>
            {IMPACT_VALUES.map(({ value, label, description }) => (
              <SelectItem key={value} value={value.toString()}>
                {value} - {label} ({description})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="probability">Olasılık</Label>
        <Select
          value={probability}
          onValueChange={setProbability}
        >
          <SelectTrigger>
            <SelectValue placeholder="Olasılık seviyesi seçin" />
          </SelectTrigger>
          <SelectContent>
            {PROBABILITY_VALUES.map(({ value, label, description }) => (
              <SelectItem key={value} value={value.toString()}>
                {value} - {label} ({description})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
