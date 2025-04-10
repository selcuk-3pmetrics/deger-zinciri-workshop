import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import * as XLSX from 'xlsx';
import { RiskInputs } from "./RiskInputs";
import { SavedRiskAssessments } from "./SavedRiskAssessments";
import { getDepartmentName, getValueChainStepName } from "@/utils/translations";
import { RiskAssessmentData } from "./RiskAssessment";

interface ClimateRiskAssessmentProps {
  onCalculate: (riskScore: number, financialImpact: string) => void;
  selectedDepartment: string | null;
  selectedRisk: string | null;
  selectedStep: string | null;
  selectedTerm: string | null;
}

const getFinancialImpact = (riskScore: number): string => {
  if (riskScore >= 12) return "+1.000.000 TL";
  if (riskScore >= 8) return "500.000 - 1.000.000 TL";
  if (riskScore >= 4) return "200.000 - 500.000 TL";
  return "0 - 200.000 TL";
};

const getTermLabel = (term: string): string => {
  switch (term) {
    case "short":
      return "Kısa (0-5 Yıl)";
    case "medium":
      return "Orta (5-10 Yıl)";
    case "long":
      return "Uzun (10-25)";
    default:
      return "";
  }
};

export const ClimateRiskAssessment = ({ 
  onCalculate, 
  selectedDepartment,
  selectedRisk,
  selectedStep,
  selectedTerm
}: ClimateRiskAssessmentProps) => {
  const [impact, setImpact] = useState("");
  const [probability, setProbability] = useState("");
  const [savedAssessments, setSavedAssessments] = useState<RiskAssessmentData[]>([]);

  useEffect(() => {
    const savedData = localStorage.getItem('climateRiskAssessments');
    if (savedData) {
      setSavedAssessments(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('climateRiskAssessments', JSON.stringify(savedAssessments));
  }, [savedAssessments]);

  const handleCalculate = () => {
    const impactValue = Number(impact);
    const probabilityValue = Number(probability);

    if (!selectedDepartment || !selectedRisk || !selectedStep || !selectedTerm) {
      toast.error("Lütfen departman, risk, değer zinciri adımı ve vade seçin");
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
      term: selectedTerm,
      impact: impactValue,
      probability: probabilityValue,
      riskScore,
      financialImpact,
      date: new Date().toISOString(),
    };

    setSavedAssessments(prev => [...prev, newAssessment]);
    toast.success("İklim riski değerlendirmesi kaydedildi");
  };

  const handleDelete = (index: number) => {
    setSavedAssessments(prev => prev.filter((_, i) => i !== index));
    toast.success("İklim riski değerlendirmesi silindi");
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
      term: getTermLabel(assessment.term),
      etki: assessment.impact,
      olasılık: assessment.probability,
      riskScore: assessment.riskScore,
      financialImpact: assessment.financialImpact,
      date: assessment.date
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "İklim Riski Değerlendirmeleri");
    XLSX.writeFile(wb, "iklim_riski_degerlendirmeleri.xlsx");
    toast.success("Değerlendirmeler Excel dosyası olarak indirildi");
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold mb-4">İklim Riski Değerlendirmesi</h2>
      
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
