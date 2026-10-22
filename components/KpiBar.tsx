'use client';

import React from 'react';
import { LAUNCH_STATS } from '@/data/launches';
import { TrendingUp, DollarSign, Award, Calendar, Zap, Users } from 'lucide-react';

interface KpiBarProps {
  onFilterMonth?: (month: string) => void;
  onFilterHighTicket?: () => void;
  onFilterScore90?: () => void;
}

export function KpiBar({ onFilterMonth, onFilterHighTicket, onFilterScore90 }: KpiBarProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
      {/* 500 Total Launches */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 backdrop-blur shadow-sm hover:border-indigo-500/40 transition-all">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-medium text-slate-400">Total Catalogado</span>
          <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
            <Calendar className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-bold text-white tracking-tight">{LAUNCH_STATS.total}</div>
        <div className="text-[11px] text-slate-400 mt-0.5">
          Out ({LAUNCH_STATS.totalOct}) • Nov ({LAUNCH_STATS.totalNov}) • Dez ({LAUNCH_STATS.totalDec})
        </div>
      </div>

      {/* Avg Commission */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 backdrop-blur shadow-sm hover:border-emerald-500/40 transition-all">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-medium text-slate-400">Comissão Média</span>
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
            <DollarSign className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-bold text-emerald-400 tracking-tight">
          ${LAUNCH_STATS.avgCommissionPayout} <span className="text-xs font-normal text-slate-400">USD</span>
        </div>
        <div className="text-[11px] text-slate-400 mt-0.5">
          Payout máximo de <span className="text-emerald-300 font-semibold">${LAUNCH_STATS.maxCommission}</span>
        </div>
      </div>

      {/* EPC Médio */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 backdrop-blur shadow-sm hover:border-amber-500/40 transition-all">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-medium text-slate-400">EPC Médio Est.</span>
          <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-bold text-amber-400 tracking-tight">
          ${LAUNCH_STATS.avgEPC} <span className="text-xs font-normal text-slate-400">/clique</span>
        </div>
        <div className="text-[11px] text-slate-400 mt-0.5">
          Métrica chave para tráfego pago
        </div>
      </div>

      {/* High-Ticket Opportunities */}
      <button 
        onClick={onFilterHighTicket}
        className="text-left bg-slate-900/80 border border-slate-800 hover:border-purple-500/50 rounded-xl p-3.5 backdrop-blur shadow-sm transition-all group cursor-pointer"
      >
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-medium text-slate-400 group-hover:text-purple-300 transition-colors">High-Ticket ($1k+)</span>
          <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
            <Zap className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-bold text-purple-300 tracking-tight">{LAUNCH_STATS.highTicketCount}</div>
        <div className="text-[11px] text-purple-400/80 mt-0.5 flex items-center gap-1">
          Filtrar ofertas premium →
        </div>
      </button>

      {/* Score 90+ */}
      <button 
        onClick={onFilterScore90}
        className="text-left bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 rounded-xl p-3.5 backdrop-blur shadow-sm transition-all group cursor-pointer"
      >
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-medium text-slate-400 group-hover:text-cyan-300 transition-colors">Score 90+ (Grade A)</span>
          <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
            <Award className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-bold text-cyan-400 tracking-tight">{LAUNCH_STATS.topRatedCount}</div>
        <div className="text-[11px] text-cyan-400/80 mt-0.5 flex items-center gap-1">
          Maior lucratividade →
        </div>
      </button>

      {/* Produtores & JV Contatos */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 backdrop-blur shadow-sm hover:border-blue-500/40 transition-all">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-medium text-slate-400">Contatos JV</span>
          <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
            <Users className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-bold text-white tracking-tight">100%</div>
        <div className="text-[11px] text-slate-400 mt-0.5">
          Email + Telegram + WhatsApp
        </div>
      </div>
    </div>
  );
}
