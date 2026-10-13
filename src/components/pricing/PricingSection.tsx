import React, { useState } from 'react';
import { Check, ArrowRight, Sparkles, ChevronDown, MessageCircle, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

export function PricingSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "Preciso saber programar ou ter experiência técnica?",
      a: "Não! O manual foi desenhado passo a passo com prompts prontos. Você apenas preenche o Briefing Mestre e cola as instruções nas ferramentas de IA indicadas."
    },
    {
      q: "Domínio e hospedagem já estão inclusos no valor?",
      a: "O manual ensina como registrar o domínio oficial (.com.br por cerca de R$ 40/ano no Registro.br) e usar opções de publicação gratuitas ou de baixíssimo custo. O valor do manual cobre todo o método e prompts."
    },
    {
      q: "Funciona para qualquer tipo de negócio ou serviço?",
      a: "Sim! O Briefing Mestre é flexível para prestadores de serviços, lojas locais, autônomos, consultórios, advogados, restaurantes e profissionais liberais."
    },
    {
      q: "E se eu já tiver Instagram e WhatsApp ativos?",
      a: "Excelente! O site não substitui suas redes, ele se conecta a elas para direcionar o tráfego do Google direto para o seu WhatsApp de atendimento."
    }
  ];

  return (
    <section id="pricing" className="relative bg-[#070d1e] text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 mb-4 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            Acesso Imediato
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">
            Garanta sua Presença Digital
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Acesso vitalício ao manual online interativo, prompts atualizados e suporte.
          </p>
        </div>

        {/* Pricing Single Card */}
        <div className="flex justify-center max-w-lg mx-auto mb-20">
          {/* Card Principal R$ 149,00 */}
          <div className="relative w-full flex flex-col justify-between p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-slate-900/90 via-[#0b142b]/90 to-slate-950/95 border-2 border-emerald-500/40 backdrop-blur-xl shadow-2xl shadow-emerald-950/40">
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="text-xs font-bold uppercase text-emerald-300 tracking-wider px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30">
                  Presença Digital Completa
                </span>
                <span className="text-xs text-slate-400 font-medium">Acesso Vitalício</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                Garanta sua Presença Digital
              </h3>
              <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                Acesso vitalício ao manual online interativo, prompts atualizados e suporte.
              </p>
              
              <div className="mb-6 p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/20">
                <span className="text-xs text-emerald-300 font-medium uppercase tracking-wider">Investimento Único</span>
                <div className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mt-1">
                  R$ 149<span className="text-2xl font-bold text-emerald-300">,00</span>
                </div>
                <span className="text-xs text-slate-400 block mt-1">pagamento único vitalício • sem mensalidades recorrentes</span>
              </div>

              <div className="space-y-3.5 text-sm text-slate-200 border-t border-white/10 pt-6 mb-8">
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Manual Online Interativo:</strong> método passo a passo com estrutura profissional.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Prompts Mestres Atualizados:</strong> textos de alta conversão e design sob medida.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Domínio & Publicação:</strong> instruções práticas para domínio oficial (.com.br) e SSL.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Apareça no Google:</strong> SEO local e Google Meu Negócio configurados.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Suporte Direto no WhatsApp:</strong> tire todas as dúvidas com nossa equipe.</span>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/5583993595124?text=Ol%C3%A1!%20Quero%20garantir%20minha%20presen%C3%A7a%20digital%20por%20R$%20149,00."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                try {
                  (window as any).dataLayer = (window as any).dataLayer || [];
                  (window as any).dataLayer.push({ event: 'whatsapp_click', location: 'pricing_149_vitalicio' });
                } catch {}
              }}
              className="w-full py-4 px-6 rounded-2xl font-extrabold text-sm sm:text-base bg-emerald-400 hover:bg-emerald-300 text-slate-950 shadow-xl shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer inline-flex items-center justify-center gap-2.5 active:scale-[0.98] group"
            >
              <MessageCircle className="w-5 h-5 text-slate-950 fill-slate-950 shrink-0" />
              <span>Garantir Presença Digital no WhatsApp</span>
              <ArrowRight className="w-4 h-4 text-slate-950 shrink-0 group-hover:translate-x-1.5 transition-transform" />
            </a>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Atendimento direto • Liberação imediata • WhatsApp: (83) 99359-5124</span>
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest block mb-2">Tire suas dúvidas</span>
            <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Perguntas Frequentes
            </h3>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className={cn(
                    "rounded-2xl border transition-all duration-300 overflow-hidden shadow-lg",
                    isOpen 
                      ? "bg-slate-900 border-cyan-500/50 shadow-cyan-950/30" 
                      : "bg-slate-900/80 border-slate-800 hover:border-slate-700"
                  )}
                >
                  <button onClick={() => setOpenFaq(isOpen ? null : index)} aria-expanded={isOpen} aria-controls={`faq-content-${index}`} id={`faq-header-${index}`} className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-white hover:text-cyan-300 transition-colors cursor-pointer"
                  >
                    <span className="leading-snug">{faq.q}</span>
                    <ChevronDown className={cn("w-5 h-5 text-cyan-400 transition-transform duration-300 shrink-0", isOpen && "rotate-180 text-cyan-300")} />
                  </button>
                  {isOpen && (
                    <div id={`faq-content-${index}`} role="region" aria-labelledby={`faq-header-${index}`} className="px-6 pb-6 text-slate-100 text-sm sm:text-base leading-relaxed border-t border-slate-800/80 pt-4 bg-slate-950/70 font-normal">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}




