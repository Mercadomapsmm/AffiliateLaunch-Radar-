'use client';

import React, { useState } from 'react';
import { LaunchItem, CampaignPlanItem } from '@/types/launch';
import { 
  BookmarkCheck, Trash2, ExternalLink, Calculator, Sparkles, 
  Download, Send, Mail, DollarSign, Layers, PlusCircle, CheckCircle2 
} from 'lucide-react';

interface MyCampaignsViewProps {
  savedLaunches: LaunchItem[];
  campaignPlans: { [launchId: number]: CampaignPlanItem };
  onUpdatePlan: (launchId: number, updates: Partial<CampaignPlanItem>) => void;
  onRemoveBookmark: (launchId: number) => void;
  onOpenDetails: (launch: LaunchItem) => void;
  onOpenRoi: (launch: LaunchItem) => void;
  onOpenAi: (launch: LaunchItem) => void;
}

export function MyCampaignsView({
  savedLaunches,
  campaignPlans,
  onUpdatePlan,
  onRemoveBookmark,
  onOpenDetails,
  onOpenRoi,
  onOpenAi,
}: MyCampaignsViewProps) {
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filtered = savedLaunches.filter((item) => {
    if (filterStatus === 'all') return true;
    const plan = campaignPlans[item.id];
    return plan?.status === filterStatus;
  });

  // Calculate totals
  const totalProjectedCommissions = savedLaunches.reduce((acc, curr) => acc + curr.commissionPayoutUSD, 0);
  const totalPlannedBudget = Object.values(campaignPlans).reduce((acc, curr) => acc + (curr.plannedBudgetUSD || 0), 0);

  // CSV Export
  const exportToCsv = () => {
    if (savedLaunches.length === 0) return;

    const headers = [
      'ID', 'Nome', 'Nicho', 'Mês', 'Data', 'Local', 'Ticket USD', 
      'Comissao %', 'Comissao USD', 'EPC Est', 'Status Programa', 
      'Plataforma', 'Produtor', 'Email JV', 'Telegram JV', 'Meu Status', 'Orcamento Planejado USD', 'Notas'
    ];

    const rows = savedLaunches.map((item) => {
      const plan = campaignPlans[item.id] || { status: 'Pesquisa', plannedBudgetUSD: 0, notes: '' };
      return [
        item.id,
        `"${item.name.replace(/"/g, '""')}"`,
        item.niche,
        item.month,
        item.date,
        `"${item.location.replace(/"/g, '""')}"`,
        item.ticketPrice,
        item.commissionPercent,
        item.commissionPayoutUSD,
        item.estimatedEPC,
        item.affiliateStatus,
        item.affiliatePlatform,
        `"${item.producer.name.replace(/"/g, '""')}"`,
        item.producer.contactEmail,
        item.producer.telegram,
        plan.status,
        plan.plannedBudgetUSD,
        `"${(plan.notes || '').replace(/"/g, '""')}"`,
      ].join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `minhas_campanhas_afiliado_eua_2026_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (savedLaunches.length === 0) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 text-center max-w-xl mx-auto my-8">
        <BookmarkCheck className="w-12 h-12 text-slate-600 mx-auto mb-3" />
        <h3 className="text-base font-bold text-white mb-1">Nenhuma Campanha Salva Ainda</h3>
        <p className="text-xs text-slate-400 mb-5 leading-relaxed">
          Navegue pelo catálogo com os 500 lançamentos de Outubro, Novembro e Dezembro de 2026 nos EUA e clique no ícone de marcador para salvar e organizar seu pipeline de afiliado aqui.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Banner Pipeline Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-900 border border-slate-800 p-4 rounded-2xl">
        <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
          <span className="text-[11px] text-slate-400 block font-medium">Lançamentos no Pipeline</span>
          <div className="text-2xl font-bold text-white mt-0.5">{savedLaunches.length}</div>
          <span className="text-[10px] text-indigo-400">Ofertas selecionadas</span>
        </div>

        <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
          <span className="text-[11px] text-slate-400 block font-medium">Potencial de Comissão (1 venda cada)</span>
          <div className="text-2xl font-bold text-emerald-400 mt-0.5">${totalProjectedCommissions} USD</div>
          <span className="text-[10px] text-emerald-300">Payout acumulado</span>
        </div>

        <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 block font-medium">Orçamento Total Planejado</span>
            <div className="text-2xl font-bold text-amber-400 mt-0.5">${totalPlannedBudget} USD</div>
            <span className="text-[10px] text-slate-400">Investimento em tráfego</span>
          </div>
          <button
            onClick={exportToCsv}
            className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md"
          >
            <Download className="w-4 h-4" /> Exportar CSV
          </button>
        </div>
      </div>

      {/* Status Filter */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 text-xs">
        <span className="text-slate-400 font-medium px-2">Filtrar por Status:</span>
        {['all', 'Pesquisa', 'Candidatura Enviada', 'Aprovado', 'Campanha Ativa', 'Pausado'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-3 py-1.5 rounded-lg transition-all font-medium ${
              filterStatus === status
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {status === 'all' ? `Todos (${savedLaunches.length})` : status}
          </button>
        ))}
      </div>

      {/* Cards List */}
      <div className="space-y-4">
        {filtered.map((item) => {
          const plan: CampaignPlanItem = campaignPlans[item.id] || {
            launchId: item.id,
            status: 'Pesquisa',
            plannedBudgetUSD: 300,
            notes: '',
            addedAt: new Date().toISOString(),
          };

          return (
            <div
              key={item.id}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 sm:p-5 transition-all shadow-md"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400">
                      {item.niche}
                    </span>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {item.month} • {item.dateDisplay}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                      Score {item.profitabilityScore}
                    </span>
                  </div>

                  <h3
                    onClick={() => onOpenDetails(item)}
                    className="text-base font-bold text-white hover:text-indigo-400 cursor-pointer transition-colors"
                  >
                    {item.name}
                  </h3>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Produtor: <strong className="text-slate-300">{item.producer.name}</strong> • Local: {item.location}
                  </div>
                </div>

                {/* Economics summary */}
                <div className="flex items-center gap-3 bg-slate-950/70 p-3 rounded-xl border border-slate-800 shrink-0">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Comissão</span>
                    <strong className="text-emerald-400 text-sm font-bold">${item.commissionPayoutUSD} ({item.commissionPercent}%)</strong>
                  </div>
                  <div className="border-l border-slate-800 pl-3">
                    <span className="text-[10px] text-slate-400 block font-medium">EPC Est.</span>
                    <strong className="text-amber-400 text-sm font-bold">${item.estimatedEPC}</strong>
                  </div>
                  <div className="border-l border-slate-800 pl-3">
                    <span className="text-[10px] text-slate-400 block font-medium">Ticket</span>
                    <strong className="text-white text-sm font-bold">${item.ticketPrice}</strong>
                  </div>
                </div>
              </div>

              {/* Status and Notes Configuration Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4 text-xs">
                {/* Status selector */}
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Status da Minha Campanha:</label>
                  <select
                    value={plan.status}
                    onChange={(e) => onUpdatePlan(item.id, { status: e.target.value as any })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-indigo-500 font-medium"
                  >
                    <option value="Pesquisa">🔍 Pesquisa & Análise Inicial</option>
                    <option value="Candidatura Enviada">📩 Candidatura Enviada ao Produtor</option>
                    <option value="Aprovado">✅ Aprovado no Programa / Link Liberado</option>
                    <option value="Campanha Ativa">🚀 Campanha de Anúncios Ativa</option>
                    <option value="Pausado">⏸️ Campanha Pausada</option>
                  </select>
                </div>

                {/* Ad Budget Input */}
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Orçamento Planejado (USD):</label>
                  <input
                    type="number"
                    value={plan.plannedBudgetUSD || ''}
                    onChange={(e) => onUpdatePlan(item.id, { plannedBudgetUSD: Number(e.target.value) })}
                    placeholder="Ex: 500"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-indigo-500 font-medium"
                  />
                </div>

                {/* Personal Notes */}
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Anotações / Estratégia:</label>
                  <input
                    type="text"
                    value={plan.notes || ''}
                    onChange={(e) => onUpdatePlan(item.id, { notes: e.target.value })}
                    placeholder="Ex: Falar com JV no Telegram, pedir criativos VSL..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Footer actions */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-800 text-xs">
                <div className="flex items-center gap-2 text-slate-400">
                  <Send className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Telegram JV: <strong className="text-slate-200">{item.producer.telegram}</strong></span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenRoi(item)}
                    className="p-1.5 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700 transition-colors flex items-center gap-1 font-medium"
                  >
                    <Calculator className="w-3.5 h-3.5" /> ROI
                  </button>

                  <button
                    onClick={() => onOpenAi(item)}
                    className="p-1.5 px-2.5 rounded-lg bg-purple-950/40 hover:bg-purple-900/60 text-purple-300 border border-purple-800/50 transition-colors flex items-center gap-1 font-medium"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" /> Criar Anúncios IA
                  </button>

                  <button
                    onClick={() => onOpenDetails(item)}
                    className="p-1.5 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors"
                  >
                    Dossiê
                  </button>

                  <button
                    onClick={() => onRemoveBookmark(item.id)}
                    className="p-1.5 px-2 rounded-lg bg-rose-950/30 hover:bg-rose-900/50 text-rose-300 border border-rose-800/40 transition-colors"
                    title="Remover do meu pipeline"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
