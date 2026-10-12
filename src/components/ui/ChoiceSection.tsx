import React from "react";
import { ShieldCheck, CheckCircle2, MessageCircle, ArrowRight, Sparkles, Send, Laptop, ThumbsUp, Lock } from "lucide-react";

export function ChoiceSection() {
  const whatsappUrl = "https://wa.me/5583993595124?text=Ol%C3%A1!%20Quero%20que%20a%20equipe%20fa%C3%A7a%20o%20site%20da%20minha%20empresa%20com%20a%20condi%C3%A7%C3%A3o%20de%20s%C3%B3%20pagar%20ap%C3%B3s%20a%20aprova%C3%A7%C3%A3o%20do%20projeto.";

  const trackWhatsAppClick = () => {
    try {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: "whatsapp_click",
        location: "block_2_zero_risk_offer",
      });
    } catch {
      // Ignora erro se dataLayer não existir
    }
  };

  return (
    <section id="servico-especialistas" className="relative bg-[#070d1e] text-white py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-white/5">
      {/* Luzes de ambientação de fundo */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Cabeçalho do Bloco 2 */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 mb-5 shadow-lg shadow-emerald-950/40">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>🛡️ 100% Sem Risco • Pague Só se Aprovar</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-5 text-white leading-[1.15]">
            Peça Seu Site Feito por{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-cyan-300 to-teal-200">
              Nossos Especialistas
            </span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg sm:leading-relaxed max-w-2xl mx-auto">
            Nós criamos o design, a copy persuasiva e toda a estrutura técnica da sua empresa. Você avalia o projeto pronto no ar e <strong className="text-white font-semibold">só paga se gostar e aprovar o resultado</strong>.
          </p>
        </div>

        {/* Card Principal de Destaque - Proposta Risco Zero */}
        <div className="relative rounded-3xl bg-gradient-to-b from-slate-900/90 via-[#0b142b]/90 to-slate-950/95 border-2 border-emerald-500/40 backdrop-blur-2xl p-6 sm:p-10 lg:p-12 shadow-2xl shadow-emerald-950/40">
          
          {/* Tarja Flutuante de Confiança */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-8 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300 font-bold">
                ✓
              </div>
              <div>
                <h4 className="text-white font-bold text-base sm:text-lg">Garantia de Satisfação Total</h4>
                <p className="text-xs sm:text-sm text-slate-400">Zero adiantamento. Zero risco de golpe ou decepção.</p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-white/10 text-xs text-slate-300 font-medium">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Você só investe após validar o projeto</span>
            </div>
          </div>

          {/* Como Funciona em 3 Passos */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-300">
                Como Funciona o Processo (Simples e Rápido):
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              {/* Passo 1 */}
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-800/50 border border-white/5 hover:border-cyan-500/30 transition-all">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-300 font-black flex items-center justify-center mb-4 text-sm border border-cyan-500/30">
                  01
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Send className="w-4 h-4 text-cyan-400" />
                  <h4 className="font-bold text-white text-base">Você Fala Conosco</h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  No WhatsApp em menos de 5 minutos: você envia nome da empresa, serviços, fotos e diferenciais.
                </p>
              </div>

              {/* Passo 2 */}
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-800/50 border border-white/5 hover:border-emerald-500/30 transition-all">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-300 font-black flex items-center justify-center mb-4 text-sm border border-emerald-500/30">
                  02
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Laptop className="w-4 h-4 text-emerald-400" />
                  <h4 className="font-bold text-white text-base">Nós Criamos Tudo</h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Design premium sob medida, copywriting persuasivo de vendas, versão mobile e integração de botões.
                </p>
              </div>

              {/* Passo 3 */}
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-800/50 border border-emerald-500/30 bg-emerald-950/20 transition-all">
                <div className="w-9 h-9 rounded-xl bg-emerald-500 text-slate-950 font-black flex items-center justify-center mb-4 text-sm shadow-md shadow-emerald-500/30">
                  03
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <ThumbsUp className="w-4 h-4 text-emerald-400" />
                  <h4 className="font-bold text-white text-base">Você Aprova e Paga</h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Você recebe o link funcional no seu celular, testa, aprova e <strong>só então realiza o pagamento</strong>.
                </p>
              </div>

            </div>
          </div>

          {/* O Que Está Incluso / Benefícios */}
          <div className="mb-10 p-6 sm:p-7 rounded-2xl bg-slate-950/60 border border-white/10">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-5">
              O Que Você Recebe No Seu Projeto Pronto:
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-200">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">Risco Zero Absoluto:</strong> você vê o site no ar e funcionando antes de gastar 1 centavo.</span>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">Projeto sob medida:</strong> visual profissional, moderno e 100% responsivo para smartphones.</span>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">Copywriting de vendas:</strong> textos pensados para converter visitantes curiosos em clientes pagantes.</span>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">Configuração completa:</strong> domínio oficial (.com.br), SSL de segurança e botões diretos pro seu WhatsApp.</span>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">Entrega rápida:</strong> sem esperar semanas ou meses como acontece em agências convencionais.</span>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">Sem fidelidade ou pegadinhas:</strong> o site é seu, com total autonomia e clareza.</span>
              </div>
            </div>
          </div>

          {/* Caixa de Ação Principal (CTA) */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
            <div className="text-center sm:text-left">
              <p className="text-white font-bold text-lg sm:text-xl">
                Pronto para ter o site da sua empresa no ar?
              </p>
              <p className="text-xs sm:text-sm text-slate-400">
                Fale agora direto conosco no WhatsApp e solicite o seu sem pagar adiantado.
              </p>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackWhatsAppClick}
              className="w-full sm:w-auto px-8 py-4 sm:py-5 rounded-2xl font-extrabold text-base bg-emerald-400 hover:bg-emerald-300 text-slate-950 shadow-xl shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer inline-flex items-center justify-center gap-3 active:scale-[0.98] shrink-0"
            >
              <MessageCircle className="w-5 h-5 text-slate-950 fill-slate-950" />
              <span>Solicitar Meu Site Sem Pagar Nada Antes</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
