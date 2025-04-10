
export const departments = {
  "cfo": "CFO, Konsolidasyon ve Yatırımcı İlişkileri",
  "it": "IT",
  "quality": "Kalite Güvence",
  "hr": "İK ve Kurumsal İletişim",
  "isg": "İSG",
  "technical": "Teknik",
  "production": "Üretim",
  "rnd": "Ar-ge / Amb. Ar-ge",
  "marketing": "Pazarlama",
  "supply": "Tedarik Zinciri",
  "sales": "Satış",
  "analytics": "İş Analitiği ve İş Süreçleri Geliştirme"
} as const;

export const valueChainSteps = {
  "vehicle-supply": "Araç Tedariği",
  "fleet-management": "Filo Yönetimi",
  "reservation-rental": "Rezervasyon ve Kiralama",
  "customer-service": "Müşteri Hizmetleri",
  "marketing-sales": "Pazarlama ve Satış",
  "technology-it": "Teknoloji ve Bilgi Sistemleri",
  "legal-compliance": "Hukuk ve Uyumluluk",
  "finance-accounting": "Finans ve Muhasebe"
} as const;

export const getDepartmentName = (departmentId: string): string => {
  return departments[departmentId as keyof typeof departments] || departmentId;
};

export const getValueChainStepName = (stepId: string): string => {
  return valueChainSteps[stepId as keyof typeof valueChainSteps] || stepId;
};
