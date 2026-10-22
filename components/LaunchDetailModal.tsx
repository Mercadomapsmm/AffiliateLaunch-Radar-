'use client';

import React, { useState } from 'react';
import { LaunchItem } from '@/types/launch';
import { 
  X, DollarSign, TrendingUp, Calendar, MapPin, Award, CheckCircle2, 
  AlertTriangle, Mail, Send, Phone, Globe, ExternalLink, Bookmark, 
  BookmarkCheck, Calculator, Sparkles, ShieldCheck, Layers, Eye
} from 'lucide-react';

interface LaunchDetailModalProps {
  launch: LaunchItem | null;
  onClose: () => void;
  onOpenRoi: (launch: LaunchItem) => void;
  onOpenAi: (launch: LaunchItem) => void;
  isBookmarked: boolean;
  onToggleBookmark: (launch: LaunchItem) => void;
}

export function LaunchDetailModal({
  launch,
  onClose,
  onOpenRoi,
  onOpenAi,
  isBookmarked,
  onToggleBookmark
}: LaunchDetailModalProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!launch) return null;

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-5 sm:p-7 text-slate-100 my-6 flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4 mb-5">
          <div className="pr-4">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                {launch.niche}
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                {launch.type}
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Score {launch.profitabilityScore}/100 • Grade {launch.profitabilityGrade}
              </span>
              {launch.recurring && (
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                  Recorrente (MRR)
                </span>
              )}
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {launch.name}
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              {launch.tagline}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onToggleBookmark(launch)}
              className={`p-2.5 rounded-xl border transition-all ${
                isBookmarked
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
              title={isBookmarked ? 'Salvo nas minhas campanhas' : 'Salvar no meu pipeline'}
            >
              {isBookmarked ? <BookmarkCheck className="w-5 h-5 text-amber-400" /> : <Bookmark className="w-5 h-5" />}
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 pr-1 space-y-6">

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/60">
              <span className="text-[11px] text-slate-400 block font-medium">Ticket do Produto / Evento</span>
              <div className="text-xl font-bold text-white mt-1">${launch.ticketPrice} USD</div>
              <span className="text-[10px] text-slate-400 mt-0.5 block">{launch.ticketTier}</span>
            </div>

            <div className="bg-emerald-950/30 p-3.5 rounded-xl border border-emerald-500/30">
              <span className="text-[11px] text-emerald-400/90 block font-medium">Comissão Afiliado / Venda</span>
              <div className="text-xl font-bold text-emerald-400 mt-1">${launch.commissionPayoutUSD} USD</div>
              <span className="text-[10px] text-emerald-300/80 mt-0.5 block">{launch.commissionPercent}% de comissão</span>
            </div>

            <div className="bg-amber-950/30 p-3.5 rounded-xl border border-amber-500/30">
              <span className="text-[11px] text-amber-400/90 block font-medium">EPC Médio Esperado</span>
              <div className="text-xl font-bold text-amber-400 mt-1">${launch.estimatedEPC} USD</div>
              <span className="text-[10px] text-amber-300/80 mt-0.5 block">Conversão est.: {launch.conversionRateEst}%</span>
            </div>

            <div className="bg-purple-950/30 p-3.5 rounded-xl border border-purple-500/30">
              <span className="text-[11px] text-purple-400/90 block font-medium">Duração do Cookie</span>
              <div className="text-base font-bold text-purple-200 mt-1 truncate">{launch.cookieDuration}</div>
              <span className="text-[10px] text-purple-300/80 mt-0.5 block">Atribuição garantida</span>
            </div>
          </div>

          {/* Date, Location & JV Contest Banner */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/60 space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-300 font-semibold uppercase tracking-wider">
                <Calendar className="w-4 h-4 text-indigo-400" /> Data & Localização (EUA 2026)
              </div>
              <div className="text-sm font-bold text-white">
                {launch.dateDisplay} ({launch.month})
              </div>
              <div className="text-xs text-slate-300 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span>{launch.location} • {launch.venue}</span>
              </div>
              {launch.recurringDetails && (
                <div className="text-xs text-purple-300 bg-purple-900/30 p-2 rounded-lg border border-purple-700/30 mt-2">
                  <strong>Modelo Recorrente:</strong> {launch.recurringDetails}
                </div>
              )}
            </div>

            <div className="bg-gradient-to-br from-amber-950/30 to-slate-800/40 p-4 rounded-xl border border-amber-500/30 space-y-2">
              <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold uppercase tracking-wider">
                <Award className="w-4 h-4 text-amber-400" /> Premiação do Concurso JV (Leaderboard)
              </div>
              <div className="text-sm font-bold text-amber-200">
                {launch.jvContestPrizes}
              </div>
              <p className="text-xs text-slate-300">
                Os principais afiliados com maior volume de vendas no período recebem bonificação extra direto em dinheiro ou prêmios físicos de luxo.
              </p>
            </div>
          </div>

          {/* Section: Producer Profile & Contact Info (CRITICAL USER REQUEST) */}
          <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700">
            <div className="flex items-center justify-between mb-3 border-b border-slate-700/60 pb-2">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Dados do Produtor & Contato Direto JV
              </h3>
              <span className="text-xs text-emerald-400 font-medium bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                Reputação: ★ {launch.producer.reputationScore} / 5.0
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block mb-0.5">Empresa / Produtora</span>
                <span className="text-white font-semibold text-sm">{launch.producer.name}</span>
                <span className="text-slate-300 block mt-1">
                  Host Principal: <strong>{launch.producer.host}</strong> ({launch.producer.title})
                </span>
              </div>

              <div>
                <span className="text-slate-400 block mb-0.5">Gerente de Afiliados (JV Manager)</span>
                <span className="text-white font-semibold text-sm">{launch.producer.jvManager}</span>
                <span className="text-emerald-400 block mt-1">Dedicado para suporte e liberação de comissões</span>
              </div>
            </div>

            {/* Direct contact channels */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-4 pt-3 border-t border-slate-700/60">
              {/* Email */}
              <div className="flex items-center justify-between bg-slate-900/80 p-2.5 rounded-xl border border-slate-700">
                <div className="flex items-center gap-2 truncate pr-1">
                  <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                  <div className="truncate">
                    <span className="text-[10px] text-slate-400 block">Email JV</span>
                    <span className="text-xs text-slate-200 truncate block">{launch.producer.contactEmail}</span>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(launch.producer.contactEmail, 'email')}
                  className="text-[11px] px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-600 shrink-0 ml-1"
                >
                  {copiedField === 'email' ? 'Copiado' : 'Copiar'}
                </button>
              </div>

              {/* Telegram */}
              <div className="flex items-center justify-between bg-slate-900/80 p-2.5 rounded-xl border border-slate-700">
                <div className="flex items-center gap-2 truncate pr-1">
                  <Send className="w-4 h-4 text-cyan-400 shrink-0" />
                  <div className="truncate">
                    <span className="text-[10px] text-slate-400 block">Telegram JV</span>
                    <span className="text-xs text-slate-200 truncate block">{launch.producer.telegram}</span>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(launch.producer.telegram, 'telegram')}
                  className="text-[11px] px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-600 shrink-0 ml-1"
                >
                  {copiedField === 'telegram' ? 'Copiado' : 'Copiar'}
                </button>
              </div>

              {/* Phone / WhatsApp */}
              <div className="flex items-center justify-between bg-slate-900/80 p-2.5 rounded-xl border border-slate-700">
                <div className="flex items-center gap-2 truncate pr-1">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div className="truncate">
                    <span className="text-[10px] text-slate-400 block">Telefone / WhatsApp EUA</span>
                    <span className="text-xs text-slate-200 truncate block">{launch.producer.skypeOrWhatsApp}</span>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(launch.producer.skypeOrWhatsApp, 'phone')}
                  className="text-[11px] px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-600 shrink-0 ml-1"
                >
                  {copiedField === 'phone' ? 'Copiado' : 'Copiar'}
                </button>
              </div>
            </div>

            {/* Affiliate Portal & Website */}
            <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-slate-700/60 bg-slate-900/50 p-3 rounded-xl">
              <div>
                <span className="text-[11px] text-slate-400 block">Plataforma & Status do Programa:</span>
                <span className="text-xs font-bold text-white flex items-center gap-1.5 mt-0.5">
                  <Layers className="w-3.5 h-3.5 text-indigo-400" />
                  {launch.affiliatePlatform} • <span className="text-emerald-400">{launch.affiliateStatus}</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={launch.producer.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1.5 transition-colors"
                >
                  <Globe className="w-3.5 h-3.5" /> Página Oficial
                </a>
                <a
                  href={launch.affiliateSignupUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs py-1.5 px-3.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5 transition-colors shadow-md"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Cadastrar como Afiliado
                </a>
              </div>
            </div>
          </div>

          {/* Marketing Assets & Target Audience */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Assets */}
            <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/60">
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-400" /> Materiais Fornecidos pelo Produtor
              </h4>
              <ul className="space-y-1.5">
                {launch.marketingAssets.map((asset, idx) => (
                  <li key={idx} className="text-xs text-slate-300 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{asset}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Audience & Channels */}
            <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/60">
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-purple-400" /> Público-Alvo & Canais de Tráfego
              </h4>
              <p className="text-xs text-slate-300 mb-3 leading-relaxed">
                {launch.targetAudience}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {launch.recommendedTraffic.map((channel, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-medium"
                  >
                    {channel}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Pros & Cautions (Rentabilidade Afiliado) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-emerald-950/20 border border-emerald-500/30 p-4 rounded-xl">
              <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Fatores de Alta Lucratividade
              </h4>
              <ul className="space-y-1.5">
                {launch.affiliatePros.map((pro, idx) => (
                  <li key={idx} className="text-xs text-emerald-200/90 flex items-start gap-1.5">
                    <span className="text-emerald-400 font-bold shrink-0">•</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-950/20 border border-amber-500/30 p-4 rounded-xl">
              <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-400" /> Cuidados & Recomendações Táticas
              </h4>
              <ul className="space-y-1.5">
                {launch.affiliateCautions.map((caution, idx) => (
                  <li key={idx} className="text-xs text-amber-200/90 flex items-start gap-1.5">
                    <span className="text-amber-400 font-bold shrink-0">•</span>
                    <span>{caution}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="border-t border-slate-800 pt-4 mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-400">
            ID: #{launch.id} • Lançamento dos Estados Unidos (Q4 2026)
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => onOpenRoi(launch)}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5"
            >
              <Calculator className="w-4 h-4 text-emerald-400" /> Simular ROI
            </button>

            <button
              onClick={() => onOpenAi(launch)}
              className="px-3.5 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-purple-200" /> Criar Campanha com IA
            </button>

            <a
              href={launch.affiliateSignupUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md"
            >
              <ExternalLink className="w-4 h-4" /> Ir para Programa de Afiliados
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
