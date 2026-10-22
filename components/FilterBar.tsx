'use client';

import React from 'react';
import { LaunchNiche, LaunchType, MonthQ4, TicketTier, AffiliatePlatform, AffiliateStatus } from '@/types/launch';
import { Search, Filter, SlidersHorizontal, RotateCcw, Sparkles } from 'lucide-react';

interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedMonth: string;
  onMonthChange: (value: string) => void;
  selectedNiche: string;
  onNicheChange: (value: string) => void;
  selectedType: string;
  onTypeChange: (value: string) => void;
  selectedTicketTier: string;
  onTicketTierChange: (value: string) => void;
  selectedPlatform: string;
  onPlatformChange: (value: string) => void;
  selectedStatus: string;
  onStatusChange: (value: string) => void;
  onlyRecurring: boolean;
  onOnlyRecurringChange: (value: boolean) => void;
  onlyTopScore: boolean;
  onOnlyTopScoreChange: (value: boolean) => void;
  sortBy: string;
  onSortByChange: (value: string) => void;
  onReset: () => void;
  totalFiltered: number;
}

const NICHES: LaunchNiche[] = [
  'IA & Automação',
  'E-Commerce & Amazon',
  'Biohacking & Saúde',
  'Investimentos & Imóveis',
  'Tráfego & Marketing',
  'Finanças & Trading',
  'Infoprodutos & Mentoria',
  'Cripto & Web3',
  'B2B SaaS & Tech',
];

const TYPES: LaunchType[] = [
  'Software SaaS',
  'Summit Presencial',
  'Treinamento / Bootcamp',
  'Mastermind High-Ticket',
  'Produto Físico / DTC',
];

const PLATFORMS: AffiliatePlatform[] = [
  'ClickBank',
  'PartnerStack',
  'Impact Radius',
  'JVZoo',
  'ShareASale',
  'Everflow',
  'Skool / Stripe',
  'CJ Affiliate',
  'Direct / Portal Próprio',
];

const STATUSES: AffiliateStatus[] = [
  'Aberto Imediato',
  'Aprovação Rápida (<24h)',
  'Convite / Whitelist',
  'Pré-Cadastro Aberto',
];

export function FilterBar({
  searchTerm,
  onSearchChange,
  selectedMonth,
  onMonthChange,
  selectedNiche,
  onNicheChange,
  selectedType,
  onTypeChange,
  selectedTicketTier,
  onTicketTierChange,
  selectedPlatform,
  onPlatformChange,
  selectedStatus,
  onStatusChange,
  onlyRecurring,
  onOnlyRecurringChange,
  onlyTopScore,
  onOnlyTopScoreChange,
  sortBy,
  onSortByChange,
  onReset,
  totalFiltered,
}: FilterBarProps) {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 backdrop-blur shadow-lg mb-6 space-y-4">
      {/* Top Search & Primary Month Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar por nome do lançamento, produtor, cidade dos EUA (Vegas, Miami, Austin...), plataforma..."
            className="w-full bg-slate-950/80 border border-slate-800 focus:border-indigo-500 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>

        {/* Month Selector Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {[
            { id: 'all', label: 'Todos (500)' },
            { id: 'Outubro 2026', label: 'Outubro 2026' },
            { id: 'Novembro 2026', label: 'Novembro 2026' },
            { id: 'Dezembro 2026', label: 'Dezembro 2026' },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => onMonthChange(m.id)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedMonth === m.id
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Select Filters Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {/* Niche */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-400 mb-1">Nicho:</label>
          <select
            value={selectedNiche}
            onChange={(e) => onNicheChange(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">Todos os 9 Nichos</option>
            {NICHES.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>

        {/* Ticket Tier */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-400 mb-1">Faixa de Ticket:</label>
          <select
            value={selectedTicketTier}
            onChange={(e) => onTicketTierChange(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">Todas as Faixas</option>
            <option value="Low-Ticket (<$100)">Low-Ticket (&lt;$100)</option>
            <option value="Mid-Ticket ($100-$999)">Mid-Ticket ($100 - $999)</option>
            <option value="High-Ticket ($1.000-$4.999)">High-Ticket ($1.000 - $4.999)</option>
            <option value="Ultra High-Ticket ($5.000+)">Ultra High-Ticket ($5.000+)</option>
          </select>
        </div>

        {/* Launch Type */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-400 mb-1">Formato / Tipo:</label>
          <select
            value={selectedType}
            onChange={(e) => onTypeChange(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">Todos os Tipos</option>
            {TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Platform */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-400 mb-1">Plataforma:</label>
          <select
            value={selectedPlatform}
            onChange={(e) => onPlatformChange(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">Todas as Redes</option>
            {PLATFORMS.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        {/* Program Status */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-400 mb-1">Status Programa:</label>
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">Todos os Status</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-400 mb-1">Ordenar por:</label>
          <select
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-indigo-300 font-semibold focus:outline-none focus:border-indigo-500"
          >
            <option value="score-desc">🔥 Maior Rentabilidade (Score)</option>
            <option value="payout-desc">💰 Maior Comissão em $ (USD)</option>
            <option value="epc-desc">📈 Maior EPC Médio</option>
            <option value="ticket-desc">🏷️ Maior Preço Ticket</option>
            <option value="ticket-asc">🏷️ Menor Preço Ticket</option>
            <option value="date-asc">📅 Data Mais Próxima</option>
          </select>
        </div>
      </div>

      {/* Quick Filter Toggles & Counter */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/80 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          {/* Top Score Toggle */}
          <button
            onClick={() => onOnlyTopScoreChange(!onlyTopScore)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all flex items-center gap-1.5 ${
              onlyTopScore
                ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>🔥 Score 90+ (Grade A)</span>
          </button>

          {/* Recurring Toggle */}
          <button
            onClick={() => onOnlyRecurringChange(!onlyRecurring)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all flex items-center gap-1.5 ${
              onlyRecurring
                ? 'bg-purple-500/20 border-purple-500 text-purple-300'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>🔄 Com Recorrência (MRR)</span>
          </button>

          {/* Reset Filters */}
          <button
            onClick={onReset}
            className="px-2.5 py-1.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800 text-xs transition-colors flex items-center gap-1"
            title="Resetar filtros"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Limpar Filtros
          </button>
        </div>

        {/* Counter */}
        <div className="text-xs text-slate-400 font-medium">
          Exibindo <strong className="text-white font-bold">{totalFiltered}</strong> de 500 lançamentos encontrados
        </div>
      </div>
    </div>
  );
}
