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
  "raw-material": "Ham madde tedarigi",
  "production": "Uretim",
  "packaging": "Ambalajlama",
  "storage": "Depolama",
  "distribution": "Dagitim ve lojistik",
  "sales": "Satis",
  "consumption": "Tuketim"
} as const;

export const getDepartmentName = (departmentId: string): string => {
  return departments[departmentId as keyof typeof departments] || departmentId;
};

export const getValueChainStepName = (stepId: string): string => {
  return valueChainSteps[stepId as keyof typeof valueChainSteps] || stepId;
};
