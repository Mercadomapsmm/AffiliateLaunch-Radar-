'use client';

import React from 'react';
import { 
  Compass, LayoutGrid, Table, Calendar, Calculator, BookmarkCheck, 
  Download, Sparkles, ExternalLink, ShieldCheck, Flame 
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'grid' | 'table' | 'calendar' | 'my-campaigns' | 'roi';
  onTabChange: (tab: 'grid' | 'table' | 'calendar' | 'my-campaigns' | 'roi') => void;
  savedCount: number;
  onExportAllCsv: () => void;
}

export function Header({
  activeTab,
  onTabChange,
  savedCount,
  onExportAllCsv,
}: HeaderProps) {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Branding Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between py-4 gap-3 border-b border-slate-800/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Compass className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                  AffiliateLaunch <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Radar USA</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  Q4 2026 • 500 Lançamentos
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Radar de Lucratividade, Contatos dos Produtores e Criação de Campanhas nos EUA (Out, Nov, Dez 2026)
              </p>
            </div>
          </div>

          {/* Quick Tools */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            <button
              onClick={onExportAllCsv}
              className="text-xs py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700 transition-all flex items-center gap-1.5 shadow-sm font-medium"
              title="Baixar lista completa dos 500 lançamentos em planilha CSV"
            >
              <Download className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Exportar 500 Lançamentos</span>
              <span className="sm:hidden">Exportar</span>
            </button>

            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
              <Flame className="w-4 h-4 text-emerald-400" />
              <span>US Q4 Season 2026 Ativa</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center justify-between overflow-x-auto py-2.5 gap-2 scrollbar-none">
          <nav className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => onTabChange('grid')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'grid'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Catálogo Completo (500)</span>
            </button>

            <button
              onClick={() => onTabChange('table')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'table'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Table className="w-4 h-4" />
              <span>Tabela Media Buyer</span>
            </button>

            <button
              onClick={() => onTabChange('calendar')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'calendar'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Calendário Q4 2026</span>
            </button>

            <button
              onClick={() => onTabChange('my-campaigns')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'my-campaigns'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <BookmarkCheck className="w-4 h-4" />
              <span>Minhas Campanhas</span>
              {savedCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black">
                  {savedCount}
                </span>
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
