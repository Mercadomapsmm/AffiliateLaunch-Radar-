'use client';

import React, { useState } from 'react';
import { LaunchItem } from '@/types/launch';
import { X, Sparkles, Copy, Check, Loader2, Target, Send, ShieldAlert, Award } from 'lucide-react';

interface AiCampaignModalProps {
  launch: LaunchItem | null;
  onClose: () => void;
}

export function AiCampaignModal({ launch, onClose }: AiCampaignModalProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [customFocus, setCustomFocus] = useState<string>('');
  const [copied, setCopied] = useState(false);

  if (!launch) return null;

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/app/api/gemini/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          launch,
          customFocus: customFocus.trim() || undefined,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Falha ao gerar inteligência de campanha.');
      }
      setResult(data.result);
    } catch (err: any) {
      setError(err?.message || 'Erro inesperado na geração de campanha.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-6 text-slate-100 my-8 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Gerador de Campanha com IA (EUA Q4 2026)
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {launch.name} • Nicho: {launch.niche} • Comissão: ${launch.commissionPayoutUSD}
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

        {/* Modal Body */}
        <div className="overflow-y-auto flex-1 pr-1 space-y-4">
          {/* Brief Info Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-slate-800/40 p-3 rounded-xl border border-slate-700/40">
            <div>
              <span className="text-slate-400 block">Ticket Produto</span>
              <strong className="text-white">${launch.ticketPrice} USD</strong>
            </div>
            <div>
              <span className="text-slate-400 block">Comissão Afiliado</span>
              <strong className="text-emerald-400">${launch.commissionPayoutUSD} ({launch.commissionPercent}%)</strong>
            </div>
            <div>
              <span className="text-slate-400 block">EPC Estimado</span>
              <strong className="text-amber-400">${launch.estimatedEPC}</strong>
            </div>
            <div>
              <span className="text-slate-400 block">Canais Ideais</span>
              <span className="text-slate-300 font-medium truncate block">{launch.recommendedTraffic[0]}</span>
            </div>
          </div>

          {/* Prompt modifier input */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Personalizar estratégia (opcional):
            </label>
            <input
              type="text"
              value={customFocus}
              onChange={(e) => setCustomFocus(e.target.value)}
              placeholder="Ex: Focar em tráfego para donos de agência, ou criar ângulo para mulheres 40+, ou anúncios no Google Search de alta intenção"
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Action Trigger */}
          {!result && !loading && (
            <div className="bg-gradient-to-br from-purple-950/40 to-slate-800/40 border border-purple-500/30 p-5 rounded-2xl text-center">
              <Sparkles className="w-8 h-8 text-purple-400 mx-auto mb-2 animate-pulse" />
              <h3 className="text-sm font-semibold text-white mb-1">
                Criar Dossiê Estratégico de Campanha com Gemini IA
              </h3>
              <p className="text-xs text-slate-300 max-w-lg mx-auto mb-4">
                A IA analisará a oferta, concorrência, sazonalidade de Q4 2026 nos EUA e gerará criativos de alta conversão para Google, Meta e YouTube, além de segmentação precisa e email swipe.
              </p>
              <button
                onClick={handleGenerate}
                className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg flex items-center gap-2 mx-auto"
              >
                <Sparkles className="w-4 h-4" /> Gerar Campanha de Alta Performance Agora
              </button>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="py-12 text-center bg-slate-800/20 rounded-2xl border border-slate-800">
              <Loader2 className="w-8 h-8 text-purple-400 animate-spin mx-auto mb-3" />
              <p className="text-sm font-semibold text-white">Analisando métricas de Q4 2026 nos EUA...</p>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                Modelando proposta de valor, copy de resposta direta, palavras-chave negativas e email swipes de alta conversão.
              </p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="p-4 bg-rose-950/40 border border-rose-500/40 rounded-xl text-rose-300 text-xs flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <strong>Erro na geração:</strong> {error}
                <div className="mt-2">
                  <button
                    onClick={handleGenerate}
                    className="underline hover:text-white"
                  >
                    Tentar novamente
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Result view */}
          {result && (
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-semibold text-purple-300 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-purple-400" /> Dossiê de Campanha Gerado com Sucesso
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-xs py-1 px-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copiado!' : 'Copiar Tudo'}
                  </button>
                  <button
                    onClick={handleGenerate}
                    className="text-xs py-1 px-2.5 bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 rounded-lg border border-purple-500/40 transition-colors"
                  >
                    Regerar
                  </button>
                </div>
              </div>

              <div className="text-xs text-slate-200 whitespace-pre-line leading-relaxed font-mono">
                {result}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-800 pt-3 mt-4 flex justify-between items-center text-xs text-slate-500">
          <span>Baseado em padrões de resposta direta do mercado americano (US Q4 2026).</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-medium transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
