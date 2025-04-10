
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Welcome = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "kervangıda") {
      navigate("/dashboard");
    } else {
      toast.error("Yanlış şifre!");
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#ED1C24]/20 to-black/5 flex flex-col items-center justify-between p-4">
      <div className="max-w-4xl w-full flex-grow flex flex-col items-center justify-center space-y-8">
        <div className="flex flex-col items-center">
          <img src="/lovable-uploads/ea3f2808-762e-4388-9c7d-d6f3ac66d5d7.png" alt="Kervan Gıda Logo" className="h-24" />
        </div>
        
        <h1 className="text-4xl font-bold text-center text-[#ED1C24] mb-6">
          Değer Zinciri Çalışmasına Hoşgeldiniz
        </h1>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Merhabalar, Hoş Geldiniz!<br/><br/>
            Bu çalışmada, Kervan Gıda Değer Zinciri Adımları ile risk, fırsat ve önemlilik konularını eşleştirerek kapsamlı bir analiz gerçekleştireceğiz. Her bir değer zinciri adımını detaylı şekilde ele alarak, süreçlerdeki olası riskleri tanımlayacak, bu risklerin derecelerini ortaya koyacak ve fırsatları belirleyeceğiz. Ayrıca, her adımın şirketin sürdürülebilirliği ve stratejik hedefleri açısından önemlilik derecesini değerlendireceğiz.<br/><br/>
            Bu analiz, hem operasyonel süreçlerin iyileştirilmesine hem de uzun vadeli büyüme ve başarı hedeflerinin daha sağlam temellere oturtulmasına katkı sağlayacaktır.
          </p>
          
          <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-4">
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Şifre
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Şifrenizi giriniz"
                className="w-full"
              />
            </div>
            <Button type="submit" className="w-full bg-[#ED1C24] hover:bg-[#ED1C24]/90">
              Giriş Yap
            </Button>
          </form>
        </div>
      </div>
      
      <div className="mt-8 mb-4">
        <img src="/lovable-uploads/455373df-f660-42a6-976d-a005c691c821.png" alt="3P Metrics Logo" className="h-16" />
      </div>
    </div>
  );
};

export default Welcome;
