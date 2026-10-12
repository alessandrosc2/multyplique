import React from "react";
import { Zap, ShieldCheck, Check, ArrowRight, MessageCircle, Sparkles } from "lucide-react";

export function ChoiceSection() {
  const handleScrollToPricing = () => {
    const el = document.getElementById("pricing");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="escolha-seu-caminho" className="relative bg-[#070d1e] text-white py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-white/5">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 mb-4 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Dois Caminhos, Mais Vendas Para Sua Empresa
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white leading-tight">
            Ter um site profissional na sua empresa nunca foi tão simples e seguro.
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Sem um site oficial, quem pesquisa pelo seu produto ou serviço no Google acaba comprando do seu concorrente. Para resolver isso hoje, escolha como prefere ter a sua empresa no ar:
          </p>
        </div>

        {/* 2 Choice Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Card 1: Faça Você Mesmo (Site-IA) */}
          <div className="flex flex-col justify-between p-8 sm:p-10 rounded-3xl bg-slate-900/60 border border-white/10 hover:border-cyan-500/40 backdrop-blur-xl transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-950/40 group">
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300">
                  <Zap className="w-3.5 h-3.5 text-cyan-400" />
                  Mais Econômico • Controle Total
                </span>
                <span className="text-xs text-slate-500 font-medium">Opção 01</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
                Acesse a Plataforma e Crie com IA
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                Apenas responda ao formulário guiado do seu negócio, copie os prompts prontos de alta conversão e coloque seu site no ar no mesmo dia, sem precisar saber programação.
              </p>

              <div className="space-y-3.5 text-sm text-slate-200 border-t border-white/10 pt-6 mb-8">
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span><strong>Zero código:</strong> método 100% visual e passo a passo.</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span><strong>Prompts de alta conversão:</strong> copywriting e design sob medida.</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span><strong>No ar no mesmo dia:</strong> domínio oficial e WhatsApp configurados.</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span><strong>Acesso vitalício:</strong> pagamento único, sem mensalidades abusivas.</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleScrollToPricing}
              className="w-full py-4 px-6 rounded-2xl font-bold text-sm sm:text-base bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:brightness-110 shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer inline-flex items-center justify-center gap-2 group/btn"
            >
              <span>Quero Acessar a Plataforma</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform" />
            </button>
          </div>

          {/* Card 2: Nós Fazemos Por Você (Risco Zero) */}
          <div className="relative flex flex-col justify-between p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-emerald-950/30 via-slate-900/80 to-slate-900/90 border-2 border-emerald-500/50 hover:border-emerald-400 backdrop-blur-xl transition-all duration-300 shadow-2xl shadow-emerald-950/30 group">
            
            {/* Top highlight pill */}
            <div className="absolute -top-3.5 left-8 px-4 py-1 rounded-full bg-emerald-500 text-slate-950 text-xs font-extrabold uppercase tracking-wider shadow-lg shadow-emerald-500/30 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              Risco Zero Absoluto
            </div>

            <div>
              <div className="flex items-center justify-between gap-4 mb-6 mt-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Pague Só Após Aprovar o Projeto
                </span>
                <span className="text-xs text-emerald-400 font-bold">Opção 02</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
                Peça Seu Site Feito por Nossos Especialistas
              </h3>
              
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mb-6">
                <p className="text-emerald-300 text-sm sm:text-base font-semibold leading-relaxed">
                  Nós criamos o design, a copy e a estrutura completa. Você avalia o projeto pronto no ar e <u>só paga se gostar e aprovar o resultado</u>.
                </p>
              </div>

              <div className="space-y-3.5 text-sm text-slate-200 border-t border-white/10 pt-6 mb-8">
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>100% Sem Risco:</strong> você vê o site funcionando antes de gastar 1 centavo.</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Projeto sob medida:</strong> copywriting persuasivo e design profissional.</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Configuração completa:</strong> domínio oficial (.com.br) e WhatsApp integrados.</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Entrega ágil:</strong> sem burocracia ou semanas de espera de agências comuns.</span>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/5583993595124?text=Ol%C3%A1!%20Quero%20que%20a%20equipe%20fa%C3%A7a%20o%20site%20da%20minha%20empresa%20com%20a%20condi%C3%A7%C3%A3o%20de%20s%C3%B3%20pagar%20ap%C3%B3s%20a%20aprova%C3%A7%C3%A3o%20do%20projeto."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                (window as any).dataLayer = (window as any).dataLayer || [];
                (window as any).dataLayer.push({ event: "whatsapp_click", location: "choice_section_zero_risk" });
              }}
              className="w-full py-4 px-6 rounded-2xl font-bold text-sm sm:text-base bg-emerald-400 hover:bg-emerald-300 text-slate-950 shadow-lg shadow-emerald-500/30 transition-all transform hover:-translate-y-0.5 cursor-pointer inline-flex items-center justify-center gap-2 group/btn active:scale-[0.98]"
            >
              <MessageCircle className="w-5 h-5 text-slate-950" />
              <span>Solicitar Meu Site Sem Pagar Nada Antes</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
