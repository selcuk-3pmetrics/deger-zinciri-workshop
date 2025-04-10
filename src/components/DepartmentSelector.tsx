
import { Circle, Triangle, Hexagon, Square, Star, Leaf, BarChart, Server, ShieldCheck, Users, HardHat, Wrench, Factory, Lightbulb, BarChart3, Truck, PieChart, LineChart } from "lucide-react";
import { cn } from "@/lib/utils";

export type Department = {
  id: string;
  name: string;
  icon: typeof Circle;
  color: string;
};

const departments: Department[] = [
  { id: "cfo", name: "CFO, Konsolidasyon ve Yatırımcı İlişkileri", icon: BarChart, color: "text-[#9b87f5]" },
  { id: "it", name: "IT", icon: Server, color: "text-[#7E69AB]" },
  { id: "quality", name: "Kalite Güvence", icon: ShieldCheck, color: "text-[#F97316]" },
  { id: "hr", name: "İK ve Kurumsal İletişim", icon: Users, color: "text-[#0EA5E9]" },
  { id: "isg", name: "İSG", icon: HardHat, color: "text-[#D946EF]" },
  { id: "technical", name: "Teknik", icon: Wrench, color: "text-[#8B5CF6]" },
  { id: "production", name: "Üretim", icon: Factory, color: "text-[#1EAEDB]" },
  { id: "rnd", name: "Ar-ge / Amb. Ar-ge", icon: Lightbulb, color: "text-[#221F26]" },
  { id: "marketing", name: "Pazarlama", icon: BarChart3, color: "text-[#D946EF]" },
  { id: "supply", name: "Tedarik Zinciri", icon: Truck, color: "text-[#403E43]" },
  { id: "sales", name: "Satış", icon: PieChart, color: "text-[#FEC6A1]" },
  { id: "analytics", name: "İş Analitiği ve İş Süreçleri Geliştirme", icon: LineChart, color: "text-[#FDE1D3]" }
];

interface DepartmentSelectorProps {
  selectedDepartment: string | null;
  onSelect: (id: string) => void;
}

export const DepartmentSelector = ({
  selectedDepartment,
  onSelect,
}: DepartmentSelectorProps) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Departman Seçimi</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {departments.map((dept) => {
          const Icon = dept.icon;
          return (
            <button
              key={dept.id}
              onClick={() => onSelect(dept.id)}
              className={cn(
                "department-shape flex flex-col items-center p-4 rounded-lg transition-all duration-200",
                selectedDepartment === dept.id ? "bg-gray-100" : "hover:bg-gray-50"
              )}
            >
              <Icon className={cn("w-8 h-8 mb-2", dept.color)} />
              <span className="text-sm font-medium text-center">{dept.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
