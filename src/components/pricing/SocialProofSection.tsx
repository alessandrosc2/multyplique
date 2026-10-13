import React from 'react';
import { Star } from 'lucide-react';

export function SocialProofSection() {
  return (
    <section className="py-16 border-y border-white/5 bg-[#0a1128]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-xs sm:text-sm font-medium tracking-widest text-slate-400 uppercase mb-8">
          Método testado e validado por dezenas de profissionais
        </p>
        <div className="flex flex-wrap justify-center gap-10 sm:gap-14 opacity-80 hover:opacity-100 transition-all duration-300">
          <div className="flex flex-col items-center gap-1.5">
            <div className="flex text-amber-400"><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/></div>
            <span className="text-slate-200 font-semibold text-base sm:text-lg">"Dobrou meus orçamentos"</span>
            <span className="text-xs text-slate-400">Dr. Marcos — Advogado</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <div className="flex text-amber-400"><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/></div>
            <span className="text-slate-200 font-semibold text-base sm:text-lg">"Site no ar no mesmo dia"</span>
            <span className="text-xs text-slate-400">Ana — Arquiteta</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <div className="flex text-amber-400"><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/></div>
            <span className="text-slate-200 font-semibold text-base sm:text-lg">"Parei de depender só do Instagram"</span>
            <span className="text-xs text-slate-400">Clínica Odontológica</span>
          </div>
        </div>
      </div>
    </section>
  );
}
