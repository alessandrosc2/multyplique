"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, ExternalLink, X, ZoomIn } from "lucide-react";

interface ShowcaseItem {
  id: string;
  n: string;
  segment: string;
  image: string;
}

const SHOWCASE_ITEMS: ShowcaseItem[] = [
  { id: "01", n: "01", segment: "SaaS / CRM comercial", image: "/showcase/01.webp" },
  { id: "02", n: "02", segment: "Alta gastronomia", image: "/showcase/02.webp" },
  { id: "03", n: "03", segment: "Imobiliária de alto padrão", image: "/showcase/03.webp" },
  { id: "04", n: "04", segment: "Skincare natural", image: "/showcase/04.webp" },
  { id: "05", n: "05", segment: "Academia / performance", image: "/showcase/05.webp" },
  { id: "06", n: "06", segment: "Advocacia empresarial", image: "/showcase/06.webp" },
  { id: "07", n: "07", segment: "Psicoterapia online", image: "/showcase/07.webp" },
  { id: "08", n: "08", segment: "Posicionamento de marca", image: "/showcase/08.webp" },
  { id: "09", n: "09", segment: "Planejamento financeiro", image: "/showcase/09.webp" },
  { id: "10", n: "10", segment: "Estética avançada", image: "/showcase/10.webp" },
];

export function ResultadosSection() {
  const [selectedItem, setSelectedItem] = useState<ShowcaseItem | null>(null);

  return (
    <section id="resultados" className="relative py-24 sm:py-32 bg-[#070d1e] text-slate-100 overflow-hidden border-t border-white/10">
      {/* Background Glows */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs sm:text-sm font-semibold tracking-wide uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Portfólio & Resultados Reais
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Com o processo certo, é <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">este nível</span> que sai daqui.
          </h2>

          <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
            Cada página abaixo nasce do mesmo caminho: oferta definida, prompt na ordem correta, revisão de conversão e publicação. Nichos diferentes, mesma estrutura.
          </p>
        </div>

        {/* Vitrine Grid */}
        <div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-5"
          role="list"
          aria-label="Exemplos de páginas criadas com o método"
        >
          {SHOWCASE_ITEMS.map((item) => (
            <figure 
              key={item.id}
              className="group cursor-pointer m-0 transition-transform duration-300 hover:-translate-y-1.5"
              onClick={() => setSelectedItem(item)}
            >
              <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-[#0a1228] shadow-[0_20px_40px_-20px_rgba(0,0,0,0.8)] transition-all duration-300 group-hover:border-cyan-400/60 group-hover:shadow-[0_20px_45px_-15px_rgba(34,211,238,0.35)]">
                {/* Visual Image */}
                <div className="relative aspect-[3/4] overflow-hidden bg-slate-900">
                  <img
                    src={item.image}
                    alt={`Página modelo ${item.segment}`}
                    loading="lazy"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070d1e]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="p-2.5 rounded-full bg-cyan-500/80 text-slate-950 backdrop-blur-sm shadow-md">
                      <ZoomIn className="w-5 h-5" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Caption */}
              <figcaption className="mt-2.5 flex items-baseline gap-2 px-1">
                <span className="font-mono text-xs font-semibold text-cyan-400 tracking-wider">
                  {item.n}
                </span>
                <span className="text-xs sm:text-sm text-slate-300 font-medium group-hover:text-white transition-colors truncate">
                  {item.segment}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Bottom Banner & Quick Action */}
        <div className="mt-14 sm:mt-18 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-950/60 via-slate-900/90 to-blue-950/60 border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Quer o site da sua empresa no ar com esse mesmo acabamento?
            </h3>
            <p className="text-sm text-slate-300 mt-1">
              Entregamos seu site pronto em menos de 24 horas por apenas R$ 149,00. Pague somente após ver e aprovar.
            </p>
          </div>

          <a
            href="https://wa.me/5583993595124?text=Ol%C3%A1!%20Vi%20os%20exemplos%20de%20sites%20e%20quero%20um%20neste%20mesmo%20padr%C3%A3o%20por%20R$%20149,00%20(pagamento%20s%C3%B3%20ap%C3%B3s%20aprovar)."
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-400 to-cyan-300 hover:brightness-110 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-2"
          >
            <span>Pedir Meu Site Por R$ 149,00</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Modal Zoom Preview */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center animate-fadeIn"
          onClick={() => setSelectedItem(null)}
        >
          <div 
            className="relative max-w-2xl w-full max-h-[90vh] bg-[#070d1e] border border-cyan-500/40 rounded-3xl p-4 sm:p-6 overflow-hidden flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="font-mono text-cyan-400 font-bold text-sm">{selectedItem.n}</span>
                <span className="font-bold text-white text-base">{selectedItem.segment}</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Fechar prévia"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 overflow-y-auto max-h-[70vh] rounded-xl border border-white/10 bg-slate-950">
              <img
                src={selectedItem.image}
                alt={selectedItem.segment}
                className="w-full h-auto object-contain"
              />
            </div>

            <div className="pt-4 flex items-center justify-between gap-4">
              <span className="text-xs text-slate-400">
                Design estruturado com foco em conversão e mobile.
              </span>
              <a
                href="https://wa.me/5583993595124?text=Ol%C3%A1!%20Gostei%20do%20modelo%20de%20site%20e%20quero%20um%20para%20minha%20empresa."
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs transition-colors whitespace-nowrap"
              >
                Solicitar Este Modelo
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
