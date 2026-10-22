'use client';

import React from 'react';
import { LaunchItem } from '@/types/launch';
import { 
  DollarSign, TrendingUp, Calendar, MapPin, Award, 
  ExternalLink, Calculator, Sparkles, Bookmark, BookmarkCheck,
  Send, Mail, Repeat
} from 'lucide-react';

interface LaunchCardProps {
  launch: LaunchItem;
  onOpenDetails: (launch: LaunchItem) => void;
  onOpenRoi: (launch: LaunchItem) => void;
  onOpenAi: (launch: LaunchItem) => void;
  isBookmarked: boolean;
  onToggleBookmark: (launch: LaunchItem) => void;
}

export function LaunchCard({
  launch,
  onOpenDetails,
  onOpenRoi,
  onOpenAi,
  isBookmarked,
  onToggleBookmark,
}: LaunchCardProps) {
  // Score color
  const getScoreColor = (score: number) => {
    if (score >= 92) return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
    if (score >= 84) return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
    if (score >= 76) return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40';
    return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 hover:shadow-xl hover:shadow-indigo-950/20 group relative backdrop-blur">
      
      {/* Top Tag Bar */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              {launch.niche}
            </span>
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
              {launch.type}
            </span>
            {launch.recurring && (
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20 flex items-center gap-1">
                <Repeat className="w-2.5 h-2.5" /> MRR
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${getScoreColor(launch.profitabilityScore)}`}>
              Score {launch.profitabilityScore}
            </span>
            <button
              onClick={() => onToggleBookmark(launch)}
              className={`p-1.5 rounded-lg border transition-all ${
                isBookmarked
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
              title={isBookmarked ? 'Salvo' : 'Salvar Campanha'}
            >
              {isBookmarked ? <BookmarkCheck className="w-3.5 h-3.5 text-amber-400" /> : <Bookmark className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Title & Tagline */}
        <h3 
          onClick={() => onOpenDetails(launch)}
          className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors cursor-pointer line-clamp-1 mb-1"
        >
          {launch.name}
        </h3>
        <p className="text-xs text-slate-400 line-clamp-2 mb-3 leading-relaxed">
          {launch.tagline}
        </p>

        {/* Date & Location */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 border-y border-slate-800/80 py-2 mb-3">
          <div className="flex items-center gap-1.5 truncate pr-2">
            <Calendar className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span className="truncate">{launch.dateDisplay}</span>
          </div>
          <div className="flex items-center gap-1 shrink-0 text-slate-300 font-medium">
            <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            <span>{launch.location.split(',')[0]}</span>
          </div>
        </div>

        {/* Economics Highlight Grid */}
        <div className="grid grid-cols-2 gap-2 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 mb-3">
          {/* Commission */}
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Comissão Afiliado</span>
            <div className="text-sm sm:text-base font-extrabold text-emerald-400 mt-0.5">
              ${launch.commissionPayoutUSD} <span className="text-[11px] font-normal text-slate-400">({launch.commissionPercent}%)</span>
            </div>
            <span className="text-[10px] text-slate-400 block truncate">Ticket: ${launch.ticketPrice} USD</span>
          </div>

          {/* EPC & CVR */}
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">EPC Estimado</span>
            <div className="text-sm sm:text-base font-extrabold text-amber-400 mt-0.5">
              ${launch.estimatedEPC} <span className="text-[11px] font-normal text-slate-400">/clique</span>
            </div>
            <span className="text-[10px] text-slate-400 block">CVR est.: {launch.conversionRateEst}%</span>
          </div>
        </div>

        {/* Producer & Platform row */}
        <div className="flex items-center justify-between text-xs mb-3 text-slate-300">
          <div className="truncate pr-2">
            <span className="text-[10px] text-slate-500 block uppercase tracking-wider font-semibold">Produtor</span>
            <span className="font-medium text-slate-200 truncate block text-xs">{launch.producer.name}</span>
          </div>
          <div className="text-right shrink-0">
            <span className="text-[10px] text-slate-500 block uppercase tracking-wider font-semibold">Plataforma</span>
            <span className="text-xs font-semibold text-indigo-400">{launch.affiliatePlatform}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-2 border-t border-slate-800/80 space-y-2">
        <div className="grid grid-cols-2 gap-1.5">
          <button
            onClick={() => onOpenRoi(launch)}
            className="py-1.5 px-2 bg-slate-800/80 hover:bg-slate-700 text-emerald-300 border border-slate-700/80 rounded-lg text-xs font-medium flex items-center justify-center gap-1 transition-colors"
          >
            <Calculator className="w-3.5 h-3.5 text-emerald-400" /> ROI
          </button>

          <button
            onClick={() => onOpenAi(launch)}
            className="py-1.5 px-2 bg-purple-950/40 hover:bg-purple-900/60 text-purple-300 border border-purple-800/40 rounded-lg text-xs font-medium flex items-center justify-center gap-1 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" /> Anúncios IA
          </button>
        </div>

        <button
          onClick={() => onOpenDetails(launch)}
          className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm"
        >
          <span>Ver Dossiê Completo & Contatos</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
