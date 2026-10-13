"use client";

import React, { useState } from 'react';
import { Check, ArrowRight, Sparkles, ChevronDown, MessageCircle, ShieldCheck, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

export function PricingSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "Como funciona a entrega em menos de 24 horas?",
      a: "Assim que você entra em contato pelo WhatsApp, alinhamos os dados essenciais do seu negócio (ramo, serviços e fotos). Em menos de 24 horas nossa equipe coloca a primeira versão completa do seu site no ar para você testar no seu celular."
    },
    {
      q: "É verdade que só pago depois do site pronto e aprovado?",
      a: "Sim, risco zero absoluto! Você não paga nenhum centavo adiantado. Você recebe o link do seu site funcionando, navega, confere o design e a copy e só realiza o pagamento de R$ 149,00 se aprovar e gostar do resultado."
    },
    {
      q: "Existe algum risco de eu cair em golpe?",
      a: "Zero chance de golpe! Ao contrário de freelancers ou agências que exigem 50% de sinal antes mesmo de começar, conosco você não gasta 1 centavo antes de ver o seu projeto publicado e funcionando."
    },
    {
      q: "Por que o valor é de apenas R$ 149,00? Tem mensalidade escondida?",
      a: "Não há nenhuma mensalidade surpresa. Conseguimos praticar esse valor acessível de pagamento único porque usamos nosso método estruturado com Inteligência Artificial para eliminar semanas de desenvolvimento manual. O site é seu em definitivo."
    },
    {
      q: "O que está incluso no site da minha empresa por R$ 149,00?",
      a: "Estrutura moderna completa: design sob medida e adaptado para celular, copywriting persuasiva focada em vendas, botão do WhatsApp integrado para atendimento imediato e estrutura técnica indexada no Google."
    },
    {
      q: "E se eu quiser fazer alguma alteração antes de aprovar?",
      a: "Sem problemas! Quando enviamos o link no seu WhatsApp para revisão, você pode solicitar os ajustes que desejar (textos, fotos, cores ou links). Só liberamos a chave de pagamento quando você estiver 100% satisfeito."
    },
    {
      q: "Preciso já ter domínio (.com.br) ou hospedagem contratada?",
      a: "Não se preocupe com nada técnico. Nós orientamos você no registro oficial (.com.br por cerca de R$ 40/ano no Registro.br) ou disponibilizamos publicação imediata em hospedagem de alta velocidade sem complicações."
    }
  ];

  return (
    <section id="pricing" className="relative bg-[#070d1e] text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-white/10">
      {/* Background Subtle Cyan/Blue Glows */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 mb-3 uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            Condição Especial • Risco Zero Absoluto
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Garanta sua Presença Digital
          </h2>
          <p className="mt-2 text-slate-300 text-sm sm:text-base">
            Seu site profissional no ar em menos de 24 horas por valor único. Você só paga após aprovar.
          </p>
        </div>

        {/* Compact Pricing Single Card - Matching Image 1 Navy/Cyan Theme */}
        <div className="max-w-md mx-auto mb-16 sm:mb-20">
          <div className="relative rounded-3xl bg-gradient-to-b from-blue-950/80 via-slate-900/95 to-[#070d1e] border-2 border-cyan-400 p-6 sm:p-8 shadow-[0_0_50px_rgba(34,211,238,0.2)] backdrop-blur-xl transition-transform">
            
            {/* Top Tag */}
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-cyan-300 tracking-wide px-3 py-1 rounded-full bg-cyan-950/90 border border-cyan-400/40">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                Pague Só se Aprovar
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-cyan-300/80 font-medium font-mono">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                Entrega &lt; 24h
              </span>
            </div>

            {/* Title & Description */}
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Peça Seu Site Feito por Especialistas
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 leading-relaxed font-normal">
              Criamos o design, a copy e a estrutura completa. Você avalia no ar e só paga se aprovar.
            </p>
            
            {/* Price Box */}
            <div className="my-5 p-4 rounded-2xl bg-cyan-950/30 border border-cyan-400/30">
              <span className="text-[11px] font-medium text-cyan-300 uppercase tracking-wider block">
                Investimento Único Promocional
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1 flex items-baseline gap-1">
                <span className="text-xl text-cyan-400 font-bold">R$</span>
                <span>149</span>
                <span className="text-xl text-cyan-400 font-bold">,00</span>
              </div>
              <span className="text-[11px] text-slate-400 block mt-1 font-normal">
                pagamento único • sem mensalidade recorrente • pague após aprovação
              </span>
            </div>

            {/* Benefits Checkmarks with harmonious typography */}
            <div className="space-y-2.5 text-xs sm:text-sm text-slate-300 border-t border-white/10 pt-4 mb-6 font-normal">
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Risco Zero: você vê o site no ar antes de gastar 1 centavo</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Entrega rápida em menos de 24 horas</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Projeto sob medida e otimizado para celulares</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Configuração completa com domínio e WhatsApp</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Sem mensalidades: pagamento único após aprovação</span>
              </div>
            </div>

            {/* CTA Button - Compact, Single-line, No wrapping */}
            <a
              href="https://wa.me/5583993595124?text=Ol%C3%A1!%20Quero%20solicitar%20meu%20site%20por%20R$%20149,00%20(pagamento%20s%C3%B3%20ap%C3%B3s%20aprovar%20o%20resultado)."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                try {
                  (window as any).dataLayer = (window as any).dataLayer || [];
                  (window as any).dataLayer.push({ event: 'whatsapp_click', location: 'pricing_149_solicitar' });
                } catch {}
              }}
              className="w-full h-12 px-5 rounded-xl font-bold text-sm sm:text-base bg-gradient-to-r from-blue-600 via-cyan-400 to-cyan-300 hover:brightness-110 text-slate-950 shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer inline-flex items-center justify-center gap-2 active:scale-[0.98] whitespace-nowrap group"
            >
              <MessageCircle className="w-4 h-4 text-slate-950 fill-slate-950 shrink-0" />
              <span>Solicitar Meu Site</span>
              <ArrowRight className="w-4 h-4 text-slate-950 shrink-0 group-hover:translate-x-1 transition-transform" />
            </a>

            <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-slate-400 text-center font-normal">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Você só paga após aprovação • WhatsApp: (83) 99359-5124</span>
            </div>
          </div>
        </div>

        {/* 6+ FAQ Questions based on Meta Ads Pitch */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest block mb-1.5">Tire todas as suas dúvidas</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Perguntas Frequentes
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className={cn(
                    "rounded-2xl border transition-all duration-300 overflow-hidden",
                    isOpen 
                      ? "bg-slate-900/90 border-cyan-400/50 shadow-md shadow-cyan-950/40" 
                      : "bg-slate-900/60 border-white/10 hover:border-white/20"
                  )}
                >
                  <button 
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)} 
                    aria-expanded={isOpen} 
                    aria-controls={`faq-content-${index}`} 
                    id={`faq-header-${index}`} 
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-white hover:text-cyan-300 transition-colors cursor-pointer"
                  >
                    <span className="leading-snug">{faq.q}</span>
                    <ChevronDown className={cn("w-4 h-4 text-cyan-400 transition-transform duration-300 shrink-0", isOpen && "rotate-180 text-cyan-300")} />
                  </button>
                  {isOpen && (
                    <div 
                      id={`faq-content-${index}`} 
                      role="region" 
                      aria-labelledby={`faq-header-${index}`} 
                      className="px-4 sm:px-5 pb-5 text-slate-200 text-xs sm:text-sm leading-relaxed border-t border-white/5 pt-3 bg-slate-950/60 font-normal"
                    >
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
