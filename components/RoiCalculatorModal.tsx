'use client';

import React, { useState } from 'react';
import { LaunchItem } from '@/types/launch';
import { X, Calculator, DollarSign, TrendingUp, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';

interface RoiCalculatorModalProps {
  launch: LaunchItem | null;
  onClose: () => void;
}

export function RoiCalculatorModal({ launch, onClose }: RoiCalculatorModalProps) {
  // Simulator state with default values matching the launch economics
  const [adSpend, setAdSpend] = useState<number>(500); // USD
  const [cpc, setCpc] = useState<number>(1.5); // USD
  const [conversionRate, setConversionRate] = useState<number>(launch?.conversionRateEst || 3.5); // %
  const [commissionPerSale, setCommissionPerSale] = useState<number>(launch?.commissionPayoutUSD || 200); // USD

  if (!launch) return null;

  // Calculations
  const estimatedClicks = cpc > 0 ? Math.floor(adSpend / cpc) : 0;
  const estimatedSales = Number(((estimatedClicks * (conversionRate / 100))).toFixed(1));
  const estimatedRevenue = Math.round(estimatedSales * commissionPerSale);
  const netProfit = estimatedRevenue - adSpend;
  const roiPercent = adSpend > 0 ? Math.round(((netProfit) / adSpend) * 100) : 0;
  const simulatedEpc = estimatedClicks > 0 ? Number((estimatedRevenue / estimatedClicks).toFixed(2)) : 0;
  const breakEvenSales = commissionPerSale > 0 ? Math.ceil(adSpend / commissionPerSale) : 0;

  // Preset scenarios
  const applyPreset = (preset: 'google' | 'meta' | 'youtube' | 'email') => {
    if (preset === 'google') {
      setCpc(2.80);
      setConversionRate(5.2);
    } else if (preset === 'meta') {
      setCpc(1.20);
      setConversionRate(2.8);
    } else if (preset === 'youtube') {
      setCpc(1.80);
      setConversionRate(3.6);
    } else if (preset === 'email') {
      setCpc(0.20); // solo ad or email cost
      setConversionRate(4.8);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-6 text-slate-100 my-8">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Simulador de Lucro & ROI de Afiliado
              </h2>
              <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                {launch.name} • Ticket: ${launch.ticketPrice} | Comissão: ${launch.commissionPayoutUSD} ({launch.commissionPercent}%)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Presets */}
        <div className="mb-5 bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
          <div className="text-xs font-medium text-slate-300 mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Cenários Prontos de Tráfego:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              onClick={() => applyPreset('meta')}
              className="text-xs py-1.5 px-2.5 rounded-lg bg-slate-700/60 hover:bg-indigo-600 hover:text-white text-slate-200 transition-all text-center border border-slate-600/40"
            >
              Meta Ads (Feed/Reels)
            </button>
            <button
              onClick={() => applyPreset('google')}
              className="text-xs py-1.5 px-2.5 rounded-lg bg-slate-700/60 hover:bg-indigo-600 hover:text-white text-slate-200 transition-all text-center border border-slate-600/40"
            >
              Google Search (Intenção)
            </button>
            <button
              onClick={() => applyPreset('youtube')}
              className="text-xs py-1.5 px-2.5 rounded-lg bg-slate-700/60 hover:bg-indigo-600 hover:text-white text-slate-200 transition-all text-center border border-slate-600/40"
            >
              YouTube In-Stream
            </button>
            <button
              onClick={() => applyPreset('email')}
              className="text-xs py-1.5 px-2.5 rounded-lg bg-slate-700/60 hover:bg-indigo-600 hover:text-white text-slate-200 transition-all text-center border border-slate-600/40"
            >
              Lista / Solo Ads
            </button>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Ad Budget */}
          <div className="bg-slate-800/40 p-3.5 rounded-xl border border-slate-700/60">
            <label className="block text-xs font-medium text-slate-300 mb-1.5 flex justify-between">
              <span>Orçamento em Anúncios (USD)</span>
              <span className="text-emerald-400 font-semibold">${adSpend}</span>
            </label>
            <input
              type="range"
              min="100"
              max="5000"
              step="50"
              value={adSpend}
              onChange={(e) => setAdSpend(Number(e.target.value))}
              className="w-full accent-emerald-500 mb-2 cursor-pointer"
            />
            <div className="flex gap-2">
              {[200, 500, 1000, 2500].map((val) => (
                <button
                  key={val}
                  onClick={() => setAdSpend(val)}
                  className={`text-[11px] px-2 py-0.5 rounded border ${
                    adSpend === val
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                      : 'border-slate-700 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  ${val}
                </button>
              ))}
            </div>
          </div>

          {/* CPC */}
          <div className="bg-slate-800/40 p-3.5 rounded-xl border border-slate-700/60">
            <label className="block text-xs font-medium text-slate-300 mb-1.5 flex justify-between">
              <span>Custo Médio por Clique (CPC USD)</span>
              <span className="text-amber-400 font-semibold">${cpc.toFixed(2)}</span>
            </label>
            <input
              type="range"
              min="0.30"
              max="6.00"
              step="0.10"
              value={cpc}
              onChange={(e) => setCpc(Number(e.target.value))}
              className="w-full accent-amber-500 mb-2 cursor-pointer"
            />
            <div className="text-[11px] text-slate-400">
              Estimativa de cliques gerados: <strong className="text-slate-200">{estimatedClicks} cliques</strong>
            </div>
          </div>

          {/* CVR % */}
          <div className="bg-slate-800/40 p-3.5 rounded-xl border border-slate-700/60">
            <label className="block text-xs font-medium text-slate-300 mb-1.5 flex justify-between">
              <span>Taxa de Conversão da Página (CVR %)</span>
              <span className="text-cyan-400 font-semibold">{conversionRate.toFixed(1)}%</span>
            </label>
            <input
              type="range"
              min="0.5"
              max="10.0"
              step="0.1"
              value={conversionRate}
              onChange={(e) => setConversionRate(Number(e.target.value))}
              className="w-full accent-cyan-500 mb-2 cursor-pointer"
            />
            <div className="text-[11px] text-slate-400">
              Média do nicho: <span className="text-slate-300 font-medium">{launch.conversionRateEst}%</span>
            </div>
          </div>

          {/* Commission Per Sale */}
          <div className="bg-slate-800/40 p-3.5 rounded-xl border border-slate-700/60">
            <label className="block text-xs font-medium text-slate-300 mb-1.5 flex justify-between">
              <span>Comissão Líquida / Venda (USD)</span>
              <span className="text-purple-400 font-semibold">${commissionPerSale}</span>
            </label>
            <input
              type="number"
              value={commissionPerSale}
              onChange={(e) => setCommissionPerSale(Math.max(1, Number(e.target.value)))}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1 text-sm text-slate-100 mb-2"
            />
            <div className="text-[11px] text-slate-400">
              Valor padrão do produtor: <span className="text-slate-300 font-medium">${launch.commissionPayoutUSD}</span>
            </div>
          </div>
        </div>

        {/* Results Box */}
        <div className={`p-4 rounded-xl border mb-5 ${
          netProfit >= 0 
            ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200' 
            : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">
              Resultado Projetado da Campanha
            </span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
              netProfit >= 0 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
            }`}>
              ROI: {roiPercent}%
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
              <div className="text-[11px] text-slate-400">Vendas Estimadas</div>
              <div className="text-xl font-bold text-white mt-0.5">{estimatedSales} un.</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Empate: {breakEvenSales} vendas</div>
            </div>

            <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
              <div className="text-[11px] text-slate-400">Comissões Brutas</div>
              <div className="text-xl font-bold text-emerald-400 mt-0.5">${estimatedRevenue}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Faturamento afiliado</div>
            </div>

            <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
              <div className="text-[11px] text-slate-400">Lucro Líquido Real</div>
              <div className={`text-xl font-bold mt-0.5 ${netProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {netProfit >= 0 ? `+$${netProfit}` : `-$${Math.abs(netProfit)}`}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Após deduzir anúncios</div>
            </div>

            <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
              <div className="text-[11px] text-slate-400">EPC da Campanha</div>
              <div className="text-xl font-bold text-amber-400 mt-0.5">${simulatedEpc}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">vs ${launch.estimatedEPC} oficial</div>
            </div>
          </div>
        </div>

        {/* Verdict & Tips */}
        <div className="text-xs text-slate-400 space-y-1.5 border-t border-slate-800 pt-3">
          <div className="flex items-start gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              <strong>Dica de Rentabilidade:</strong> Com comissão de ${commissionPerSale}, você só precisa de{' '}
              <strong className="text-white">{breakEvenSales} vendas</strong> para recuperar seus ${adSpend} investidos.
            </span>
          </div>
          {launch.recurring && (
            <div className="flex items-start gap-1.5 text-indigo-300">
              <TrendingUp className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
              <span>
                <strong>Bônus de Recorrência:</strong> Esta oferta possui modelo MRR. As vendas acumuladas continuarão pagando comissões mensais sem custo adicional de anúncio!
              </span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="mt-5 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold transition-all shadow-md"
          >
            Fechar Simulador
          </button>
        </div>
      </div>
    </div>
  );
}
