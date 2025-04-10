
import * as React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

type RiskMapping = {
  area: string;
  risk: string;
};

const riskMappings: RiskMapping[] = [
  { area: "İklim Fiziksel Riskleri", risk: "Aşırı Hava Olayları" },
  { area: "İklim Fiziksel Riskleri", risk: "Enerji Maliyetlerinde Artış" },
  { area: "İklim Fiziksel Riskleri", risk: "Su Stresi ve Kıtlığı" },
  { area: "İklim Fiziksel Riskleri", risk: "Biyoçeşitlilik" },
  { area: "İklim Geçiş Riskleri", risk: "Düzenleyici Riskler" },
  { area: "İklim Geçiş Riskleri", risk: "Ar-Ge Yatırımları" },
  { area: "İklim Geçiş Riskleri", risk: "Paydaş Beklentilerindeki Değişimler" },
  { area: "Çevre", risk: "İklim Değişikliği" },
  { area: "Çevre", risk: "Doğal Kaynak Kıtlığı" },
  { area: "Çevre", risk: "Kritik Düzeyde Küresel Sistem Değişimi" },
  { area: "Çevre", risk: "Atık Yönetimi" },
  { area: "Çevre", risk: "Ambalaj Atıkları" },
  { area: "Çevre", risk: "Gıda İsrafı ve Atıkları" },
  { area: "Çevre", risk: "Karbon Ayak İzi" },
  { area: "Çevre", risk: "Temiz ve Kaliteli Suya Erişim" },
  { area: "Çevre", risk: "Enerji Yönetimi" },
  { area: "Çevre", risk: "Temiz Enerji Fırsatları" },
  { area: "Çevre", risk: "Atık Su Arıtma Maliyetleri" },
  { area: "Çevre", risk: "Sürdürülebilirlik" },
  { area: "Çalışan", risk: "İşgücü Yönetimi" },
  { area: "Çalışan", risk: "Yetenek Kaybı" },
  { area: "Çalışan", risk: "Adil Ücretlendirme" },
  { area: "Çalışan", risk: "Ürün Etiketleme" },
  { area: "Çalışan", risk: "Çalışan Memnuniyeti" },
  { area: "Ekonomi", risk: "Alım gücünde azalma/daralma" },
  { area: "Ekonomi", risk: "Ekonomik Durgunluk ve Eflasyon" },
  { area: "Ekonomi", risk: "Likidite Riski" },
  { area: "Ekonomi", risk: "Kur Farkı Riski" },
  { area: "Teknoloji", risk: "Yanlış bilgi ve dezenformasyon" },
  { area: "Teknoloji", risk: "Siber güvensizlik" },
  { area: "Teknoloji", risk: "Teknolojik Gelişmelere Uyum Sağlayamama" },
  { area: "Teknoloji", risk: "Mevcut Yenilikler ve Gelişen Teknoloji" },
  { area: "Teknoloji", risk: "Dijital kapasite" },
  { area: "Yönetişim", risk: "İş Kazaları" },
  { area: "Yönetişim", risk: "Müşteri Memnuniyeti" },
  { area: "Yönetişim", risk: "Ürün Kalitesi" },
  { area: "Yönetişim", risk: "Stratejik Marka Algısı ve Pazar Payı Kaybı" },
  { area: "Tedarik Zinciri Yönetimi", risk: "Tedarik Zinciri Yönetimi" },
  { area: "Tedarik Zinciri Yönetimi", risk: "Tedarik Zinciri Çeşitliliği" },
  { area: "Tedarik Zinciri Yönetimi", risk: "Tedarik Zinciri Çevresel Uygunluk" },
  { area: "Tedarik Zinciri Yönetimi", risk: "Tedarik Zinciri Sosyal Uygunluk" },
  { area: "Düzenlemeler ve Uyum", risk: "İhracat Kotaları/Yasakları" },
  { area: "Düzenlemeler ve Uyum", risk: "Yasal Kısıtlamalar ve Vergiler" },
  { area: "Doğal Afet", risk: "Deprem" },
  { area: "Doğal Afet", risk: "Yangın" },
  { area: "Gıda Sektörü", risk: "Gıda Güvenliği ve Ürün Kalitesi" },
  { area: "Gıda Sektörü", risk: "Hammaddeye Erişim" },
  { area: "Gıda Sektörü", risk: "Tüketici alışkanlıklarındaki değişimler" }
];

const uniqueAreas = Array.from(new Set(riskMappings.map(rm => rm.area))).sort();

interface RiskSelectorProps {
  selectedRisk: string | null;
  onSelect: (risk: string) => void;
}

export const RiskSelector = ({ selectedRisk, onSelect }: RiskSelectorProps) => {
  const [selectedArea, setSelectedArea] = React.useState<string | null>(null);

  const filteredRisks = selectedArea
    ? riskMappings.filter(rm => rm.area === selectedArea).map(rm => rm.risk)
    : [];

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold mb-4">Risk Seçimi</h2>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Risk Alanı</label>
          <Select value={selectedArea || undefined} onValueChange={setSelectedArea}>
            <SelectTrigger className={cn("w-full")}>
              <SelectValue placeholder="Risk alanı seçiniz" />
            </SelectTrigger>
            <SelectContent>
              {uniqueAreas.map((area) => (
                <SelectItem key={area} value={area}>
                  {area}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedArea && (
          <div>
            <label className="text-sm font-medium mb-2 block">Risk</label>
            <Select value={selectedRisk || undefined} onValueChange={onSelect}>
              <SelectTrigger className={cn("w-full")}>
                <SelectValue placeholder="Risk seçiniz" />
              </SelectTrigger>
              <SelectContent>
                {filteredRisks.map((risk) => (
                  <SelectItem key={risk} value={risk}>
                    {risk}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </div>
  );
};
