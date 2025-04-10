
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import * as XLSX from 'xlsx';
import { RiskInputs } from "./RiskInputs";
import { SavedRiskAssessments } from "./SavedRiskAssessments";
import { getDepartmentName, getValueChainStepName } from "@/utils/translations";

export type RiskAssessmentData = {
  department: string;
  risk: string;
  valueChainStep: string;
  term?: string;
  impact: number;
  probability: number;
  riskScore: number;
  financialImpact: string;
  date: string;
};

interface RiskAssessmentProps {
  onCalculate: (riskScore: number, financialImpact: string) => void;
  selectedDepartment: string | null;
  selectedRisk: string | null;
  selectedStep: string | null;
}

const getFinancialImpact = (riskScore: number): string => {
  if (riskScore >= 12) return ">20M Dolar";
  if (riskScore >= 9) return "20 - 10M Dolar";
  if (riskScore >= 6) return "10 - 5M Dolar";
  if (riskScore >= 3) return "5 - 1M Dolar";
  return "1 - 0M Dolar";
};

export const RiskAssessment = ({ 
  onCalculate, 
  selectedDepartment,
  selectedRisk,
  selectedStep 
}: RiskAssessmentProps) => {
  const [impact, setImpact] = useState("");
  const [probability, setProbability] = useState("");
  const [savedAssessments, setSavedAssessments] = useState<RiskAssessmentData[]>([]);

  useEffect(() => {
    const savedData = localStorage.getItem('riskAssessments');
    if (savedData) {
      setSavedAssessments(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('riskAssessments', JSON.stringify(savedAssessments));
  }, [savedAssessments]);

  const handleCalculate = () => {
    const impactValue = Number(impact);
    const probabilityValue = Number(probability);

    if (!selectedDepartment || !selectedRisk || !selectedStep) {
      toast.error("Lütfen departman, risk ve değer zinciri adımı seçin");
      return;
    }

    if (!impactValue || !probabilityValue) {
      toast.error("Lütfen etki ve olasılık değerlerini girin");
      return;
    }

    const riskScore = impactValue * probabilityValue;
    const financialImpact = getFinancialImpact(riskScore);
    onCalculate(riskScore, financialImpact);

    const newAssessment: RiskAssessmentData = {
      department: selectedDepartment,
      risk: selectedRisk,
      valueChainStep: selectedStep,
      impact: impactValue,
      probability: probabilityValue,
      riskScore,
      financialImpact,
      date: new Date().toISOString(),
    };

    setSavedAssessments(prev => [...prev, newAssessment]);
    toast.success("Risk değerlendirmesi kaydedildi");
  };

  const handleDelete = (index: number) => {
    setSavedAssessments(prev => prev.filter((_, i) => i !== index));
    toast.success("Risk değerlendirmesi silindi");
  };

  const handleExport = () => {
    if (savedAssessments.length === 0) {
      toast.error("Dışa aktarılacak değerlendirme bulunamadı");
      return;
    }

    const exportData = savedAssessments.map(assessment => ({
      department: getDepartmentName(assessment.department),
      risk: assessment.risk,
      valueChainStep: getValueChainStepName(assessment.valueChainStep),
      etki: assessment.impact,
      olasılık: assessment.probability,
      riskScore: assessment.riskScore,
      financialImpact: assessment.financialImpact,
      date: assessment.date
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Risk Değerlendirmeleri");
    XLSX.writeFile(wb, "risk_degerlendirmeleri.xlsx");
    toast.success("Değerlendirmeler Excel dosyası olarak indirildi");
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold mb-4">Risk Değerlendirmesi</h2>
      
      <RiskInputs
        impact={impact}
        setImpact={setImpact}
        probability={probability}
        setProbability={setProbability}
      />

      <div className="flex gap-2">
        <Button onClick={handleCalculate} className="flex-1">
          Hesapla ve Kaydet
        </Button>
        <Button onClick={handleExport} variant="outline">
          Excel'e Aktar
        </Button>
      </div>

      <SavedRiskAssessments
        assessments={savedAssessments}
        onDelete={handleDelete}
      />
    </div>
  );
};
