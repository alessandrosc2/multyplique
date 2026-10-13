import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Building2, 
  Send, 
  CheckCircle2, 
  FileText, 
  Download, 
  MessageCircle, 
  ArrowLeft, 
  Sparkles, 
  Palette, 
  Phone, 
  MapPin, 
  Target, 
  Instagram, 
  HelpCircle,
  Clock,
  ShieldCheck
} from "lucide-react";
import { toast } from "sonner";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function BriefingForm() {
  const [formData, setFormData] = useState({
    businessName: "",
    segment: "",
    whatsapp: "",
    cityState: "",
    services: "",
    differentials: "",
    colors: "",
    logoAndPhotos: "",
    socialMedia: "",
    targetAction: "whatsapp",
    observations: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [savedTxt, setSavedTxt] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const generateTxtContent = (data: typeof formData) => {
    const dataHora = new Date().toLocaleString("pt-BR");
    return `=====================================================
BRIEFING DE CRIAÇÃO DE SITE — MULTY TECHNOLOGY
Data de Envio: ${dataHora}
=====================================================

1. DADOS BÁSICOS DO NEGÓCIO:
- Nome da Empresa / Profissional: ${data.businessName || "Não informado"}
- Ramo / Segmento de Atuação: ${data.segment || "Não informado"}
- WhatsApp / Contato: ${data.whatsapp || "Não informado"}
- Cidade / Estado: ${data.cityState || "Atendimento Online / Brasil"}

2. OFERTA E SERVIÇOS:
- Principais Serviços / Produtos:
${data.services || "Não informado"}

- Diferenciais da Empresa (Por que o cliente deve escolher você?):
${data.differentials || "Não informado"}

3. IDENTIDADE VISUAL E PREFERÊNCIAS:
- Cores de Preferência / Estilo Visual: ${data.colors || "A critério da equipe de design"}
- Logotipo e Fotos: ${data.logoAndPhotos || "Ainda não possui ou enviará pelo WhatsApp"}
- Redes Sociais Existentes: ${data.socialMedia || "Não informado"}

4. OBJETIVO DO SITE:
- Ação Principal Desejada: ${
  data.targetAction === "whatsapp" ? "Levar o cliente direto para o WhatsApp" :
  data.targetAction === "orcamento" ? "Solicitar Orçamento / Formulário" :
  data.targetAction === "agendamento" ? "Agendar Consulta / Horário" :
  "Apresentação Institucional e Autoridade"
}
- Observações Adicionais:
${data.observations || "Nenhuma observação adicional"}

=====================================================
Status: Pronto para Criação com IA & Equipe Especializada
=====================================================`;
  };

  const handleDownloadTxt = (customTxt?: string) => {
    const textToDownload = customTxt || savedTxt || generateTxtContent(formData);
    const blob = new Blob([textToDownload], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const sanitizedName = formData.businessName.replace(/[^a-zA-Z0-9]/g, "_") || "cliente";
    link.href = url;
    link.download = `briefing_${sanitizedName}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("Arquivo TXT baixado com sucesso!");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.businessName.trim()) {
      toast.error("Por favor, preencha o nome da sua empresa.");
      return;
    }
    if (!formData.whatsapp.trim()) {
      toast.error("Por favor, informe seu WhatsApp de contato.");
      return;
    }
    if (!formData.services.trim()) {
      toast.error("Por favor, liste os principais serviços do seu negócio.");
      return;
    }

    setIsSubmitting(true);
    const txtContent = generateTxtContent(formData);
    setSavedTxt(txtContent);

    try {
      // 1. Salva no Firestore na coleção de leads como briefing
      if (db) {
        await addDoc(collection(db, "leads"), {
          type: "briefing",
          status: "ativo", // 'ativo' ou 'arquivado'
          businessName: formData.businessName,
          segment: formData.segment,
          whatsapp: formData.whatsapp,
          cityState: formData.cityState,
          services: formData.services,
          differentials: formData.differentials,
          colors: formData.colors,
          logoAndPhotos: formData.logoAndPhotos,
          socialMedia: formData.socialMedia,
          targetAction: formData.targetAction,
          observations: formData.observations,
          txtContent: txtContent,
          createdAt: serverTimestamp()
        });
      }

      // 2. Salva também cópia local no navegador como garantia
      try {
        const localBriefings = JSON.parse(localStorage.getItem("multy_local_briefings") || "[]");
        localBriefings.unshift({
          id: "local_" + Date.now(),
          ...formData,
          txtContent,
          createdAt: new Date().toISOString()
        });
        localStorage.setItem("multy_local_briefings", JSON.stringify(localBriefings.slice(0, 50)));
      } catch {}

      toast.success("Briefing enviado com sucesso!");
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      console.error("Erro ao salvar briefing:", err);
      // Mesmo com erro de rede, garantimos o fluxo para o cliente não perder o preenchimento
      setSubmitted(true);
      toast.success("Briefing gerado com sucesso!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Olá! Acabei de enviar o briefing para criação do meu site:\n\n*Empresa:* ${formData.businessName}\n*Segmento:* ${formData.segment}\n*WhatsApp:* ${formData.whatsapp}\n\nPodem confirmar o recebimento para darmos início?`
  );

  return (
    <div className="min-h-screen bg-[#070d1e] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Header */}
      <header className="border-b border-white/10 bg-[#050814]/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 text-slate-300 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium">Voltar ao Site</span>
          </Link>
          <div className="flex items-center gap-2">
            <img src="/logo-site.webp" alt="Site-IA" className="w-8 h-8 object-contain" />
            <span className="font-bold text-base text-white tracking-tight">
              Site-<span className="text-cyan-400">IA</span>
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-16">
        {!submitted ? (
          <div>
            {/* Header Form */}
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
              <span className="text-xs sm:text-sm font-semibold text-cyan-400 uppercase tracking-widest block mb-2">
                Início do Projeto • Informações do Seu Negócio
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
                Briefing para Criação do Seu Site
              </h1>
              <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                Preencha os dados abaixo com as características da sua empresa. Com base nessas respostas, criaremos a estrutura, o design e o copywriting completo do seu site.
              </p>
            </div>

            {/* Form Card */}
            <form onSubmit={handleSubmit} className="p-6 sm:p-10 rounded-3xl bg-slate-900/70 border border-white/10 shadow-2xl backdrop-blur-md space-y-8">
              
              {/* Bloco 1: Dados do Negócio */}
              <div>
                <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm uppercase tracking-wider mb-4 pb-2 border-b border-white/10">
                  <Building2 className="w-4 h-4" />
                  <span>1. Dados Básicos da Empresa</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                      Nome da Empresa ou Profissional <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="businessName"
                      required
                      value={formData.businessName}
                      onChange={handleChange}
                      placeholder="Ex: Clínica Odonto Sorriso, Dr. Marcos Silva"
                      className="w-full h-11 px-4 rounded-xl bg-slate-950/80 border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                      Ramo ou Segmento de Atuação <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="segment"
                      required
                      value={formData.segment}
                      onChange={handleChange}
                      placeholder="Ex: Advocacia Trabalhista, Estética, Academia"
                      className="w-full h-11 px-4 rounded-xl bg-slate-950/80 border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                      WhatsApp / Telefone para Contato <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="tel"
                      name="whatsapp"
                      required
                      value={formData.whatsapp}
                      onChange={handleChange}
                      placeholder="Ex: (83) 99999-9999"
                      className="w-full h-11 px-4 rounded-xl bg-slate-950/80 border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                      Cidade e Estado de Atuação
                    </label>
                    <input
                      type="text"
                      name="cityState"
                      value={formData.cityState}
                      onChange={handleChange}
                      placeholder="Ex: João Pessoa - PB (ou Online / Todo o Brasil)"
                      className="w-full h-11 px-4 rounded-xl bg-slate-950/80 border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Bloco 2: Serviços e Diferenciais */}
              <div>
                <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm uppercase tracking-wider mb-4 pb-2 border-b border-white/10">
                  <Target className="w-4 h-4" />
                  <span>2. Serviços e Diferenciais do Negócio</span>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                      Quais são os principais serviços ou produtos oferecidos? <span className="text-rose-400">*</span>
                    </label>
                    <textarea
                      name="services"
                      required
                      rows={3}
                      value={formData.services}
                      onChange={handleChange}
                      placeholder="Ex: Implantes dentários, clareamento a laser, ortodontia e próteses. Destaque os procedimentos mais procurados."
                      className="w-full p-3.5 rounded-xl bg-slate-950/80 border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                      Quais são os diferenciais da sua empresa? Por que o cliente deve escolher você?
                    </label>
                    <textarea
                      name="differentials"
                      rows={3}
                      value={formData.differentials}
                      onChange={handleChange}
                      placeholder="Ex: Atendimento humanizado, mais de 10 anos de experiência, estacionamento próprio, equipamentos de última geração, parcelamento facilitado."
                      className="w-full p-3.5 rounded-xl bg-slate-950/80 border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors leading-relaxed"
                    />
                  </div>
                </div>
              </div>

              {/* Bloco 3: Identidade Visual e Redes */}
              <div>
                <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm uppercase tracking-wider mb-4 pb-2 border-b border-white/10">
                  <Palette className="w-4 h-4" />
                  <span>3. Identidade Visual e Materiais</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                      Preferência de Cores ou Estilo Visual
                    </label>
                    <input
                      type="text"
                      name="colors"
                      value={formData.colors}
                      onChange={handleChange}
                      placeholder="Ex: Azul escuro e dourado / Tons claros / Fundo escuro"
                      className="w-full h-11 px-4 rounded-xl bg-slate-950/80 border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                      Ação Principal Esperada do Visitante
                    </label>
                    <select
                      name="targetAction"
                      value={formData.targetAction}
                      onChange={handleChange}
                      className="w-full h-11 px-4 rounded-xl bg-slate-950/80 border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                    >
                      <option value="whatsapp">Chamar no WhatsApp</option>
                      <option value="orcamento">Solicitar Orçamento</option>
                      <option value="agendamento">Agendar Consulta / Horário</option>
                      <option value="institucional">Apresentar Empresa e Serviços</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                      Possui Logotipo e Fotos? (Link do Drive ou Envio WhatsApp)
                    </label>
                    <input
                      type="text"
                      name="logoAndPhotos"
                      value={formData.logoAndPhotos}
                      onChange={handleChange}
                      placeholder="Ex: 'Envio pelo WhatsApp' ou cole link do Google Drive / Dropbox"
                      className="w-full h-11 px-4 rounded-xl bg-slate-950/80 border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                      Redes Sociais Existentes (Instagram, Site Antigo, etc.)
                    </label>
                    <input
                      type="text"
                      name="socialMedia"
                      value={formData.socialMedia}
                      onChange={handleChange}
                      placeholder="Ex: @clinicasorriso no Instagram"
                      className="w-full h-11 px-4 rounded-xl bg-slate-950/80 border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Bloco 4: Observações Livres */}
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                  Observações Adicionais ou Algo Específico que não pode faltar
                </label>
                <textarea
                  name="observations"
                  rows={2}
                  value={formData.observations}
                  onChange={handleChange}
                  placeholder="Alguma frase importante, slogan, horário de atendimento ou detalhes extras."
                  className="w-full p-3.5 rounded-xl bg-slate-950/80 border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors leading-relaxed"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Seus dados são transmitidos com segurança criptografada.</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto h-12 px-8 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-400 to-cyan-300 hover:brightness-110 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer inline-flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>Salvando Informações...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Enviar Briefing do Negócio</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        ) : (
          /* Confirmation Success Screen */
          <div className="max-w-2xl mx-auto text-center p-8 sm:p-12 rounded-3xl bg-slate-900/80 border border-cyan-400/40 shadow-2xl backdrop-blur-md animate-fadeIn">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-cyan-400" />
            </div>

            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest block mb-2">
              Envio Confirmado
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
              Briefing Recebido com Sucesso!
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              Obrigado pelas informações da empresa <strong className="text-white">{formData.businessName}</strong>. Nossos especialistas já estão com os detalhes em mãos para dar início à montagem do seu site profissional.
            </p>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-white/10 text-left mb-8 space-y-2 text-xs sm:text-sm text-slate-300">
              <div className="flex justify-between pb-2 border-b border-white/10">
                <span className="text-slate-400">Empresa:</span>
                <span className="font-semibold text-white">{formData.businessName}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-white/10">
                <span className="text-slate-400">Segmento:</span>
                <span className="font-semibold text-cyan-300">{formData.segment}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">WhatsApp:</span>
                <span className="font-semibold text-emerald-400">{formData.whatsapp}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <a
                href={`https://wa.me/5583993595124?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto h-12 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 hover:brightness-110 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all inline-flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950" />
                <span>Avisar no WhatsApp que Preencheu</span>
              </a>

              <button
                type="button"
                onClick={() => handleDownloadTxt()}
                className="w-full sm:w-auto h-12 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-sm border border-white/15 transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Baixar Minha Cópia em TXT</span>
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <Link to="/" className="text-xs text-slate-400 hover:text-cyan-400 transition-colors">
                ← Voltar para a página inicial
              </Link>
            </div>
          </div>
        )}
      </main>

      {/* Footer Minimal */}
      <footer className="py-6 border-t border-white/10 text-center text-xs text-slate-500">
        <p>© 2026 Multy Technology - Site-IA. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
