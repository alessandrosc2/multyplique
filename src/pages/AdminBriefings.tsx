import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Lock, 
  Unlock, 
  FileText, 
  Download, 
  Copy, 
  Archive, 
  ArchiveRestore, 
  Search, 
  MessageCircle, 
  ExternalLink, 
  Check, 
  Eye, 
  X, 
  RefreshCw, 
  Sparkles, 
  LogOut, 
  ShieldCheck, 
  FolderArchive, 
  Building2, 
  Clock, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";
import { toast } from "sonner";
import { auth, db } from "@/lib/firebase";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs, doc, updateDoc, orderBy } from "firebase/firestore";

interface BriefingItem {
  id: string;
  businessName: string;
  segment: string;
  whatsapp: string;
  cityState?: string;
  services: string;
  differentials?: string;
  colors?: string;
  logoAndPhotos?: string;
  socialMedia?: string;
  targetAction?: string;
  observations?: string;
  txtContent: string;
  status: "ativo" | "arquivado";
  createdAt?: any;
}

export default function AdminBriefings() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authChecking, setAuthChecking] = useState<boolean>(true);
  
  // Login form states
  const [email, setEmail] = useState("admin@multyplique.com.br");
  const [password, setPassword] = useState("admin123456");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Dashboard states
  const [briefings, setBriefings] = useState<BriefingItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"ativos" | "arquivados">("ativos");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBriefing, setSelectedBriefing] = useState<BriefingItem | null>(null);

  // Monitor auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setAuthChecking(false);
      if (user) {
        fetchBriefings();
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login de Administrador realizado com sucesso!");
    } catch (err: any) {
      console.error("Erro no login:", err);
      toast.error("Credenciais inválidas: " + (err.message || "Tente novamente."));
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setIsAuthenticated(false);
    setBriefings([]);
    toast.info("Sessão finalizada.");
  };

  const fetchBriefings = async () => {
    setIsLoading(true);
    try {
      const items: BriefingItem[] = [];

      // 1. Busca do Firestore
      if (db) {
        try {
          const q = query(collection(db, "leads"), where("type", "==", "briefing"));
          const snapshot = await getDocs(q);
          snapshot.forEach((docSnap) => {
            const data = docSnap.data();
            items.push({
              id: docSnap.id,
              businessName: data.businessName || "Empresa sem nome",
              segment: data.segment || "Geral",
              whatsapp: data.whatsapp || "",
              cityState: data.cityState || "",
              services: data.services || "",
              differentials: data.differentials || "",
              colors: data.colors || "",
              logoAndPhotos: data.logoAndPhotos || "",
              socialMedia: data.socialMedia || "",
              targetAction: data.targetAction || "whatsapp",
              observations: data.observations || "",
              txtContent: data.txtContent || "",
              status: data.status === "arquivado" ? "arquivado" : "ativo",
              createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(data.createdAt || Date.now())
            });
          });
        } catch (dbErr) {
          console.warn("Erro ao buscar Firestore, lendo backup local:", dbErr);
        }
      }

      // 2. Inclui cópias de contingência do localStorage (caso haja algum enviado offline)
      try {
        const local = JSON.parse(localStorage.getItem("multy_local_briefings") || "[]");
        local.forEach((locItem: any) => {
          if (!items.some(it => it.id === locItem.id || (it.businessName === locItem.businessName && it.whatsapp === locItem.whatsapp))) {
            items.push({
              id: locItem.id,
              businessName: locItem.businessName || "Empresa sem nome",
              segment: locItem.segment || "Geral",
              whatsapp: locItem.whatsapp || "",
              cityState: locItem.cityState || "",
              services: locItem.services || "",
              differentials: locItem.differentials || "",
              colors: locItem.colors || "",
              logoAndPhotos: locItem.logoAndPhotos || "",
              socialMedia: locItem.socialMedia || "",
              targetAction: locItem.targetAction || "whatsapp",
              observations: locItem.observations || "",
              txtContent: locItem.txtContent || "",
              status: locItem.status === "arquivado" ? "arquivado" : "ativo",
              createdAt: new Date(locItem.createdAt || Date.now())
            });
          }
        });
      } catch {}

      // Ordena por data decrescente
      items.sort((a, b) => {
        const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return timeB - timeA;
      });

      setBriefings(items);
    } catch (err: any) {
      console.error("Erro geral ao carregar briefings:", err);
      toast.error("Erro ao carregar dados dos briefings.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleArchive = async (briefing: BriefingItem) => {
    const newStatus = briefing.status === "ativo" ? "arquivado" : "ativo";
    try {
      // 1. Atualiza no Firestore se for doc do Firestore
      if (db && !briefing.id.startsWith("local_")) {
        await updateDoc(doc(db, "leads", briefing.id), { status: newStatus });
      }

      // 2. Atualiza no localStorage
      try {
        const local = JSON.parse(localStorage.getItem("multy_local_briefings") || "[]");
        const updated = local.map((item: any) => item.id === briefing.id ? { ...item, status: newStatus } : item);
        localStorage.setItem("multy_local_briefings", JSON.stringify(updated));
      } catch {}

      // Atualiza estado local
      setBriefings(prev => prev.map(item => item.id === briefing.id ? { ...item, status: newStatus } : item));
      
      if (newStatus === "arquivado") {
        toast.success(`Briefing de "${briefing.businessName}" movido para a pasta de Arquivados!`);
      } else {
        toast.success(`Briefing de "${briefing.businessName}" restaurado para os Ativos!`);
      }

      if (selectedBriefing?.id === briefing.id) {
        setSelectedBriefing(prev => prev ? { ...prev, status: newStatus } : null);
      }
    } catch (err: any) {
      console.error("Erro ao alterar status:", err);
      toast.error("Não foi possível atualizar o status.");
    }
  };

  const handleDownloadTxt = (briefing: BriefingItem) => {
    const blob = new Blob([briefing.txtContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const sanitizedName = briefing.businessName.replace(/[^a-zA-Z0-9]/g, "_") || "briefing";
    link.href = url;
    link.download = `briefing_${sanitizedName}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success(`Arquivo TXT de ${briefing.businessName} baixado com sucesso!`);
  };

  const handleCopyTxt = (briefing: BriefingItem) => {
    navigator.clipboard.writeText(briefing.txtContent);
    toast.success("Conteúdo TXT copiado para a área de transferência!");
  };

  const handleCopyPrompt = (briefing: BriefingItem) => {
    const aiPrompt = `Atue como um Especialista Sênior em UI/UX e Copywriting de Alta Conversão.
Crie um site profissional, elegante e focado em vendas com as seguintes informações do briefing:

NOME DA EMPRESA: ${briefing.businessName}
NICHO/SEGMENTO: ${briefing.segment}
CIDADE/ESTADO: ${briefing.cityState || "Atendimento Brasil"}
WHATSAPP: ${briefing.whatsapp}

SERVIÇOS PRINCIPAIS:
${briefing.services}

DIFERENCIAIS COMPETITIVOS:
${briefing.differentials || "Atendimento de excelência, agilidade e confiança"}

ESTILO VISUAL & CORES:
${briefing.colors || "Dark theme sofisticado com detalhes em ciano e branco"}

LOGOTIPO/IMAGENS:
${briefing.logoAndPhotos || "Utilizar placeholders modernos com fotos reais do nicho via Unsplash"}

OBJETIVO DA PÁGINA:
${briefing.targetAction === "whatsapp" ? "Levar o visitante diretamente para conversar e fechar no WhatsApp" : "Geração de orçamentos e agendamentos"}

OBSERVAÇÕES:
${briefing.observations || "Focar em autoridade, títulos fortes sem exagero e navegação ultra rápida para celular."}

Gere a estrutura completa com Hero Section de alto impacto, Bento Grid de serviços, prova social, comparativo de autoridade e botão direto de WhatsApp.`;

    navigator.clipboard.writeText(aiPrompt);
    toast.success("🤖 Prompt mestre de IA copiado! Cole no Claude ou ChatGPT para gerar o site.");
  };

  // Filtragem
  const filteredBriefings = briefings.filter(item => {
    const matchesTab = item.status === activeTab;
    const matchesSearch = 
      item.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.segment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.whatsapp.includes(searchQuery);
    return matchesTab && matchesSearch;
  });

  const countAtivos = briefings.filter(b => b.status === "ativo").length;
  const countArquivados = briefings.filter(b => b.status === "arquivado").length;

  if (authChecking) {
    return (
      <div className="min-h-screen bg-[#070d1e] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
      </div>
    );
  }

  // Tela de Login caso não esteja autenticado
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070d1e] text-slate-100 flex flex-col justify-center items-center px-4 py-12">
        <div className="max-w-md w-full p-8 rounded-3xl bg-slate-900/80 border border-cyan-500/30 shadow-2xl backdrop-blur-xl">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-6 h-6 text-cyan-400" />
            </div>
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest block mb-1">
              Acesso Restrito
            </span>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Painel Admin • Briefings
            </h1>
            <p className="text-xs text-slate-400 mt-2">
              Área exclusiva para visualização, download de TXTs e arquivamento dos briefings recebidos.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">E-mail de Administrador</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 px-4 rounded-xl bg-slate-950/80 border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Senha de Acesso</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 px-4 rounded-xl bg-slate-950/80 border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400"
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full h-11 mt-2 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-400 to-cyan-300 hover:brightness-110 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 transition-all inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoggingIn ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Entrando...</span>
                </>
              ) : (
                <>
                  <Unlock className="w-4 h-4" />
                  <span>Acessar Painel de Briefings</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-white/10 text-center">
            <Link to="/" className="text-xs text-slate-400 hover:text-cyan-400 transition-colors">
              ← Voltar ao site público
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard de Gestão de Briefings
  return (
    <div className="min-h-screen bg-[#070d1e] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Navbar */}
      <header className="border-b border-white/10 bg-[#050814]/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo-site.webp" alt="Site-IA" className="w-8 h-8 object-contain" />
            <div>
              <span className="font-bold text-base text-white tracking-tight block leading-tight">
                Painel Admin <span className="text-cyan-400">Briefings</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Multy Technology</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link 
              to="/briefing" 
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 text-xs font-semibold hover:bg-cyan-900/60 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Ver Formulário Público</span>
            </Link>

            <button
              onClick={handleLogout}
              className="p-2 rounded-lg bg-slate-800 hover:bg-rose-950/40 hover:text-rose-400 text-slate-300 border border-white/10 transition-colors cursor-pointer inline-flex items-center gap-1.5 text-xs"
              title="Sair do painel"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-cyan-500/30 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block">Novos / Em Produção</span>
              <div className="text-3xl font-bold text-white tracking-tight mt-1">{countAtivos}</div>
              <span className="text-[11px] text-slate-400">Prontos para criar o site</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center">
              <FileText className="w-6 h-6 text-cyan-400" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/70 border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-amber-300 uppercase tracking-wider block">Pasta de Arquivados</span>
              <div className="text-3xl font-bold text-white tracking-tight mt-1">{countArquivados}</div>
              <span className="text-[11px] text-slate-400">Projetos já finalizados / guardados</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center">
              <FolderArchive className="w-6 h-6 text-amber-400" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/70 border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">Total Recebido</span>
              <div className="text-3xl font-bold text-white tracking-tight mt-1">{briefings.length}</div>
              <span className="text-[11px] text-slate-400">Clientes atendidos pelo método</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-slate-800 text-slate-300 flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Action Bar: Tabs & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
          
          {/* Tabs */}
          <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-900/90 border border-white/10 w-fit">
            <button
              onClick={() => setActiveTab("ativos")}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "ativos"
                  ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Ativos ({countAtivos})</span>
            </button>

            <button
              onClick={() => setActiveTab("arquivados")}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "arquivados"
                  ? "bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20 font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Archive className="w-4 h-4" />
              <span>Pasta de Arquivados ({countArquivados})</span>
            </button>
          </div>

          {/* Search & Refresh */}
          <div className="flex items-center gap-2.5">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar empresa, nicho..."
                className="w-full h-10 pl-9 pr-4 rounded-xl bg-slate-950/80 border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400"
              />
            </div>

            <button
              onClick={fetchBriefings}
              disabled={isLoading}
              className="h-10 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-white/10 transition-colors inline-flex items-center justify-center cursor-pointer"
              title="Recarregar briefings"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-cyan-400" : ""}`} />
            </button>
          </div>

        </div>

        {/* Briefings List */}
        {isLoading ? (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-slate-400">Carregando briefings dos clientes...</p>
          </div>
        ) : filteredBriefings.length === 0 ? (
          <div className="text-center py-20 p-8 rounded-3xl bg-slate-900/40 border border-white/5">
            <div className="w-14 h-14 rounded-2xl bg-slate-800 text-slate-400 flex items-center justify-center mx-auto mb-3">
              {activeTab === "ativos" ? <FileText className="w-6 h-6" /> : <Archive className="w-6 h-6" />}
            </div>
            <h3 className="text-lg font-bold text-white mb-1">
              {activeTab === "ativos" ? "Nenhum briefing ativo encontrado" : "Nenhum briefing na pasta de arquivados"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mb-6">
              {activeTab === "ativos" 
                ? "Envie o link https://multyplique.com.br/briefing para seus clientes preencherem."
                : "Quando você terminar um projeto e clicar em 'Arquivar', ele ficará salvo aqui com segurança."}
            </p>
            {activeTab === "ativos" && (
              <Link
                to="/briefing"
                target="_blank"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-semibold hover:bg-cyan-500/30 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Abrir Link do Formulário para Testar</span>
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredBriefings.map((briefing) => {
              const formattedDate = briefing.createdAt 
                ? new Date(briefing.createdAt).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }) 
                : "Recente";

              return (
                <div
                  key={briefing.id}
                  className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 hover:border-cyan-500/40 transition-all flex flex-col justify-between shadow-xl backdrop-blur-md group"
                >
                  <div>
                    {/* Top Status & Date */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded-md border border-cyan-500/30">
                        {briefing.segment}
                      </span>
                      <span className="text-[11px] text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formattedDate}
                      </span>
                    </div>

                    {/* Business Name */}
                    <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors mb-1 line-clamp-1">
                      {briefing.businessName}
                    </h3>

                    {briefing.cityState && (
                      <p className="text-xs text-slate-400 flex items-center gap-1 mb-3">
                        <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                        <span className="truncate">{briefing.cityState}</span>
                      </p>
                    )}

                    {/* Services Snippet */}
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-white/5 mb-4 text-xs text-slate-300 line-clamp-3">
                      <strong className="text-white block mb-0.5">Serviços:</strong>
                      {briefing.services}
                    </div>

                    {/* WhatsApp Quick Link */}
                    {briefing.whatsapp && (
                      <div className="flex items-center gap-2 text-xs mb-4">
                        <a
                          href={`https://wa.me/55${briefing.whatsapp.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-400 hover:text-emerald-300 font-medium inline-flex items-center gap-1.5 transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-emerald-400/20" />
                          <span>{briefing.whatsapp}</span>
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Actions Footer */}
                  <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      {/* Baixar TXT */}
                      <button
                        onClick={() => handleDownloadTxt(briefing)}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-white/10 transition-colors cursor-pointer"
                        title="Baixar arquivo TXT"
                      >
                        <Download className="w-4 h-4 text-cyan-400" />
                      </button>

                      {/* Copiar Prompt IA */}
                      <button
                        onClick={() => handleCopyPrompt(briefing)}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-white/10 transition-colors cursor-pointer"
                        title="Copiar como Prompt Mestre para IA"
                      >
                        <Sparkles className="w-4 h-4 text-cyan-400" />
                      </button>

                      {/* Ver Detalhes */}
                      <button
                        onClick={() => setSelectedBriefing(briefing)}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-white/10 transition-colors cursor-pointer"
                        title="Ver todos os detalhes"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Arquivar / Desarquivar */}
                    <button
                      onClick={() => handleToggleArchive(briefing)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                        briefing.status === "ativo"
                          ? "bg-slate-800 hover:bg-amber-950/40 text-slate-300 hover:text-amber-300 border-white/10"
                          : "bg-amber-500/20 text-amber-300 hover:bg-cyan-500/20 hover:text-cyan-300 border-amber-500/30"
                      }`}
                      title={briefing.status === "ativo" ? "Mover para pasta de arquivados" : "Restaurar para ativos"}
                    >
                      {briefing.status === "ativo" ? (
                        <>
                          <Archive className="w-3.5 h-3.5" />
                          <span>Arquivar</span>
                        </>
                      ) : (
                        <>
                          <ArchiveRestore className="w-3.5 h-3.5" />
                          <span>Restaurar</span>
                        </>
                      )}
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </main>

      {/* Modal de Detalhes Completos */}
      {selectedBriefing && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md p-4 sm:p-6 flex items-center justify-center animate-fadeIn"
          onClick={() => setSelectedBriefing(null)}
        >
          <div 
            className="relative max-w-2xl w-full max-h-[90vh] bg-[#070d1e] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 overflow-y-auto flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Modal */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div>
                <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest block mb-0.5">
                  Detalhes do Briefing
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {selectedBriefing.businessName}
                </h2>
              </div>
              <button
                onClick={() => setSelectedBriefing(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Conteúdo Completo Formatado */}
            <div className="space-y-4 text-xs sm:text-sm text-slate-300">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-950/70 border border-white/10">
                <div>
                  <span className="text-slate-400 block text-xs">Segmento:</span>
                  <span className="font-semibold text-white">{selectedBriefing.segment}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">WhatsApp:</span>
                  <a 
                    href={`https://wa.me/55${selectedBriefing.whatsapp.replace(/\D/g, '')}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="font-semibold text-emerald-400 hover:underline"
                  >
                    {selectedBriefing.whatsapp}
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Cidade/Estado:</span>
                  <span className="font-semibold text-white">{selectedBriefing.cityState || "Não informado"}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Cores / Estilo:</span>
                  <span className="font-semibold text-white">{selectedBriefing.colors || "A critério"}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/10">
                <span className="text-slate-400 block text-xs mb-1 font-semibold text-cyan-300">Serviços Oferecidos:</span>
                <p className="whitespace-pre-wrap text-slate-200 leading-relaxed">{selectedBriefing.services}</p>
              </div>

              {selectedBriefing.differentials && (
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/10">
                  <span className="text-slate-400 block text-xs mb-1 font-semibold text-cyan-300">Diferenciais Competitivos:</span>
                  <p className="whitespace-pre-wrap text-slate-200 leading-relaxed">{selectedBriefing.differentials}</p>
                </div>
              )}

              {selectedBriefing.logoAndPhotos && (
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/10">
                  <span className="text-slate-400 block text-xs mb-1 font-semibold text-cyan-300">Logotipo / Fotos:</span>
                  <p className="text-slate-200">{selectedBriefing.logoAndPhotos}</p>
                </div>
              )}

              {selectedBriefing.socialMedia && (
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/10">
                  <span className="text-slate-400 block text-xs mb-1 font-semibold text-cyan-300">Redes Sociais:</span>
                  <p className="text-slate-200">{selectedBriefing.socialMedia}</p>
                </div>
              )}

              {selectedBriefing.observations && (
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/10">
                  <span className="text-slate-400 block text-xs mb-1 font-semibold text-cyan-300">Observações Extras:</span>
                  <p className="whitespace-pre-wrap text-slate-200 leading-relaxed">{selectedBriefing.observations}</p>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownloadTxt(selectedBriefing)}
                  className="h-10 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs inline-flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Baixar TXT</span>
                </button>

                <button
                  onClick={() => handleCopyPrompt(selectedBriefing)}
                  className="h-10 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs border border-white/15 inline-flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>Copiar Prompt IA</span>
                </button>
              </div>

              <button
                onClick={() => handleToggleArchive(selectedBriefing)}
                className="h-10 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-medium text-xs border border-white/15 inline-flex items-center gap-2 transition-colors cursor-pointer"
              >
                {selectedBriefing.status === "ativo" ? (
                  <>
                    <Archive className="w-4 h-4" />
                    <span>Mover para Arquivados</span>
                  </>
                ) : (
                  <>
                    <ArchiveRestore className="w-4 h-4" />
                    <span>Restaurar para Ativos</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
