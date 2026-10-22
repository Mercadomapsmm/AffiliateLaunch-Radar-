'use client';

import React, { useState } from 'react';
import { LaunchItem } from '@/types/launch';
import { 
  ArrowUpDown, ExternalLink, Calculator, Sparkles, Bookmark, 
  BookmarkCheck, Mail, Send, CheckCircle2, ChevronRight 
} from 'lucide-react';

interface TableViewProps {
  launches: LaunchItem[];
  onOpenDetails: (launch: LaunchItem) => void;
  onOpenRoi: (launch: LaunchItem) => void;
  onOpenAi: (launch: LaunchItem) => void;
  bookmarkedIds: number[];
  onToggleBookmark: (launch: LaunchItem) => void;
}

export function TableView({
  launches,
  onOpenDetails,
  onOpenRoi,
  onOpenAi,
  bookmarkedIds,
  onToggleBookmark,
}: TableViewProps) {
  const [sortField, setSortField] = useState<'score' | 'payout' | 'ticket' | 'epc' | 'date'>('score');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: 'score' | 'payout' | 'ticket' | 'epc' | 'date') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const sortedLaunches = [...launches].sort((a, b) => {
    let diff = 0;
    if (sortField === 'score') diff = a.profitabilityScore - b.profitabilityScore;
    if (sortField === 'payout') diff = a.commissionPayoutUSD - b.commissionPayoutUSD;
    if (sortField === 'ticket') diff = a.ticketPrice - b.ticketPrice;
    if (sortField === 'epc') diff = a.estimatedEPC - b.estimatedEPC;
    if (sortField === 'date') diff = new Date(a.date).getTime() - new Date(b.date).getTime();
    return sortOrder === 'asc' ? diff : -diff;
  });

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800 uppercase tracking-wider text-[11px]">
            <tr>
              <th className="py-3 px-3 w-10 text-center">Salvar</th>
              <th className="py-3 px-3">
                <button 
                  onClick={() => handleSort('score')} 
                  className="flex items-center gap-1 hover:text-white"
                >
                  Score <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="py-3 px-4 min-w-[220px]">Lançamento & Nicho</th>
              <th className="py-3 px-3">
                <button 
                  onClick={() => handleSort('date')} 
                  className="flex items-center gap-1 hover:text-white"
                >
                  Mês / Data <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="py-3 px-3">
                <button 
                  onClick={() => handleSort('ticket')} 
                  className="flex items-center gap-1 hover:text-white"
                >
                  Ticket <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="py-3 px-3">
                <button 
                  onClick={() => handleSort('payout')} 
                  className="flex items-center gap-1 hover:text-emerald-400"
                >
                  Comissão ($) <ArrowUpDown className="w-3 h-3 text-emerald-400" />
                </button>
              </th>
              <th className="py-3 px-3">
                <button 
                  onClick={() => handleSort('epc')} 
                  className="flex items-center gap-1 hover:text-amber-400"
                >
                  EPC Est. <ArrowUpDown className="w-3 h-3 text-amber-400" />
                </button>
              </th>
              <th className="py-3 px-3">Produtor & Contato</th>
              <th className="py-3 px-3">Plataforma</th>
              <th className="py-3 px-3 text-right">Ações Rápidas</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {sortedLaunches.map((launch) => {
              const isBookmarked = bookmarkedIds.includes(launch.id);
              return (
                <tr 
                  key={launch.id}
                  className="hover:bg-slate-800/40 transition-colors group"
                >
                  {/* Bookmark */}
                  <td className="py-3 px-3 text-center">
                    <button
                      onClick={() => onToggleBookmark(launch)}
                      className="p-1 text-slate-500 hover:text-amber-400 transition-colors"
                      title={isBookmarked ? 'Salvo' : 'Salvar Campanha'}
                    >
                      {isBookmarked ? (
                        <BookmarkCheck className="w-4 h-4 text-amber-400" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>
                  </td>

                  {/* Score */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className={`inline-block text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                      launch.profitabilityScore >= 90
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : launch.profitabilityScore >= 80
                        ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                        : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'
                    }`}>
                      {launch.profitabilityScore} • {launch.profitabilityGrade}
                    </span>
                  </td>

                  {/* Name & Niche */}
                  <td className="py-3 px-4">
                    <div 
                      onClick={() => onOpenDetails(launch)}
                      className="font-bold text-white hover:text-indigo-400 cursor-pointer line-clamp-1 transition-colors"
                    >
                      {launch.name}
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5 text-[11px] text-slate-400">
                      <span className="text-indigo-400 font-medium">{launch.niche}</span>
                      <span>•</span>
                      <span>{launch.type}</span>
                      {launch.recurring && (
                        <>
                          <span>•</span>
                          <span className="text-purple-400 font-semibold">MRR</span>
                        </>
                      )}
                    </div>
                  </td>

                  {/* Month & Date */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <div className="font-medium text-slate-200">{launch.month}</div>
                    <div className="text-[11px] text-slate-400">{launch.dateDisplay}</div>
                  </td>

                  {/* Ticket */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <div className="font-semibold text-white">${launch.ticketPrice}</div>
                    <div className="text-[10px] text-slate-400">{launch.ticketTier.split(' ')[0]}</div>
                  </td>

                  {/* Commission */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <div className="font-bold text-emerald-400 text-sm">
                      ${launch.commissionPayoutUSD}
                    </div>
                    <div className="text-[11px] text-emerald-300/80">
                      {launch.commissionPercent}% comissão
                    </div>
                  </td>

                  {/* EPC */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <div className="font-bold text-amber-400">
                      ${launch.estimatedEPC}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      CVR: {launch.conversionRateEst}%
                    </div>
                  </td>

                  {/* Producer & Contact */}
                  <td className="py-3 px-3">
                    <div className="font-medium text-slate-200 truncate max-w-[140px]">
                      {launch.producer.name}
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <Send className="w-3 h-3 text-cyan-400 shrink-0" />
                      <span className="truncate max-w-[110px]">{launch.producer.telegram}</span>
                    </div>
                  </td>

                  {/* Platform */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 text-[11px] font-medium">
                      {launch.affiliatePlatform}
                    </span>
                    <div className="text-[10px] text-emerald-400 mt-0.5">
                      {launch.affiliateStatus}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-3 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onOpenRoi(launch)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700 transition-colors"
                        title="Simular ROI"
                      >
                        <Calculator className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onOpenAi(launch)}
                        className="p-1.5 rounded-lg bg-purple-950/40 hover:bg-purple-900/60 text-purple-300 border border-purple-800/50 transition-colors"
                        title="Gerar Anúncios IA"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onOpenDetails(launch)}
                        className="px-2.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs transition-colors flex items-center gap-1 shadow-sm"
                      >
                        <span>Dossiê</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
