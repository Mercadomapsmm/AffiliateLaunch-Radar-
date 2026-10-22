'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { ALL_500_LAUNCHES, LAUNCH_STATS } from '@/data/launches';
import { LaunchItem, CampaignPlanItem } from '@/types/launch';
import { Header } from '@/components/Header';
import { KpiBar } from '@/components/KpiBar';
import { FilterBar } from '@/components/FilterBar';
import { LaunchCard } from '@/components/LaunchCard';
import { TableView } from '@/components/TableView';
import { CalendarView } from '@/components/CalendarView';
import { MyCampaignsView } from '@/components/MyCampaignsView';
import { LaunchDetailModal } from '@/components/LaunchDetailModal';
import { RoiCalculatorModal } from '@/components/RoiCalculatorModal';
import { AiCampaignModal } from '@/components/AiCampaignModal';
import { 
  Sparkles, TrendingUp, DollarSign, Calendar, Compass, 
  Layers, ArrowRight, ShieldCheck, Download, ChevronDown 
} from 'lucide-react';

export default function HomePage() {
  // Navigation
  const [activeTab, setActiveTab] = useState<'grid' | 'table' | 'calendar' | 'my-campaigns' | 'roi'>('grid');

  // Filters State
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedMonth, setSelectedMonth] = useState<string>('all');
  const [selectedNiche, setSelectedNiche] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedTicketTier, setSelectedTicketTier] = useState<string>('all');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [onlyRecurring, setOnlyRecurring] = useState<boolean>(false);
  const [onlyTopScore, setOnlyTopScore] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('score-desc');

  // Pagination for grid
  const [itemsPerPage, setItemsPerPage] = useState<number>(36);

  // Modals state
  const [selectedLaunchDetail, setSelectedLaunchDetail] = useState<LaunchItem | null>(null);
  const [selectedLaunchRoi, setSelectedLaunchRoi] = useState<LaunchItem | null>(null);
  const [selectedLaunchAi, setSelectedLaunchAi] = useState<LaunchItem | null>(null);

  // Bookmarking / Campaign Pipeline with lazy localStorage initialization
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const savedIds = localStorage.getItem('affiliate_radar_saved_ids');
      return savedIds ? JSON.parse(savedIds) : [];
    } catch {
      return [];
    }
  });

  const [campaignPlans, setCampaignPlans] = useState<{ [launchId: number]: CampaignPlanItem }>(() => {
    if (typeof window === 'undefined') return {};
    try {
      const savedPlans = localStorage.getItem('affiliate_radar_campaign_plans');
      return savedPlans ? JSON.parse(savedPlans) : {};
    } catch {
      return {};
    }
  });

  // Save to localStorage
  const saveToStorage = (newIds: number[], newPlans: { [launchId: number]: CampaignPlanItem }) => {
    try {
      localStorage.setItem('affiliate_radar_saved_ids', JSON.stringify(newIds));
      localStorage.setItem('affiliate_radar_campaign_plans', JSON.stringify(newPlans));
    } catch (e) {
      console.error('Erro ao salvar no localStorage:', e);
    }
  };

  const handleToggleBookmark = (launch: LaunchItem) => {
    let newIds: number[];
    let newPlans = { ...campaignPlans };

    if (bookmarkedIds.includes(launch.id)) {
      newIds = bookmarkedIds.filter((id) => id !== launch.id);
      delete newPlans[launch.id];
    } else {
      newIds = [...bookmarkedIds, launch.id];
      if (!newPlans[launch.id]) {
        newPlans[launch.id] = {
          launchId: launch.id,
          status: 'Pesquisa',
          plannedBudgetUSD: 300,
          notes: '',
          addedAt: new Date().toISOString(),
        };
      }
    }

    setBookmarkedIds(newIds);
    setCampaignPlans(newPlans);
    saveToStorage(newIds, newPlans);
  };

  const handleRemoveBookmark = (launchId: number) => {
    const newIds = bookmarkedIds.filter((id) => id !== launchId);
    const newPlans = { ...campaignPlans };
    delete newPlans[launchId];
    setBookmarkedIds(newIds);
    setCampaignPlans(newPlans);
    saveToStorage(newIds, newPlans);
  };

  const handleUpdatePlan = (launchId: number, updates: Partial<CampaignPlanItem>) => {
    const currentPlan = campaignPlans[launchId] || {
      launchId,
      status: 'Pesquisa',
      plannedBudgetUSD: 300,
      notes: '',
      addedAt: new Date().toISOString(),
    };
    const newPlans = {
      ...campaignPlans,
      [launchId]: { ...currentPlan, ...updates },
    };
    setCampaignPlans(newPlans);
    saveToStorage(bookmarkedIds, newPlans);
  };

  // Reset filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedMonth('all');
    setSelectedNiche('all');
    setSelectedType('all');
    setSelectedTicketTier('all');
    setSelectedPlatform('all');
    setSelectedStatus('all');
    setOnlyRecurring(false);
    setOnlyTopScore(false);
    setSortBy('score-desc');
    setItemsPerPage(36);
  };

  // Filtered & Sorted Launches
  const filteredLaunches = useMemo(() => {
    return ALL_500_LAUNCHES.filter((item) => {
      // Search query
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesTagline = item.tagline.toLowerCase().includes(query);
        const matchesProducer = item.producer.name.toLowerCase().includes(query);
        const matchesHost = item.producer.host.toLowerCase().includes(query);
        const matchesLocation = item.location.toLowerCase().includes(query);
        const matchesVenue = item.venue.toLowerCase().includes(query);
        const matchesNiche = item.niche.toLowerCase().includes(query);
        const matchesPlatform = item.affiliatePlatform.toLowerCase().includes(query);

        if (!matchesName && !matchesTagline && !matchesProducer && !matchesHost && !matchesLocation && !matchesVenue && !matchesNiche && !matchesPlatform) {
          return false;
        }
      }

      // Month
      if (selectedMonth !== 'all' && item.month !== selectedMonth) return false;

      // Niche
      if (selectedNiche !== 'all' && item.niche !== selectedNiche) return false;

      // Type
      if (selectedType !== 'all' && item.type !== selectedType) return false;

      // Ticket Tier
      if (selectedTicketTier !== 'all' && item.ticketTier !== selectedTicketTier) return false;

      // Platform
      if (selectedPlatform !== 'all' && item.affiliatePlatform !== selectedPlatform) return false;

      // Status
      if (selectedStatus !== 'all' && item.affiliateStatus !== selectedStatus) return false;

      // Recurring MRR
      if (onlyRecurring && !item.recurring) return false;

      // Top Score 90+
      if (onlyTopScore && item.profitabilityScore < 90) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'score-desc') return b.profitabilityScore - a.profitabilityScore;
      if (sortBy === 'payout-desc') return b.commissionPayoutUSD - a.commissionPayoutUSD;
      if (sortBy === 'epc-desc') return b.estimatedEPC - a.estimatedEPC;
      if (sortBy === 'ticket-desc') return b.ticketPrice - a.ticketPrice;
      if (sortBy === 'ticket-asc') return a.ticketPrice - b.ticketPrice;
      if (sortBy === 'date-asc') return new Date(a.date).getTime() - new Date(b.date).getTime();
      return 0;
    });
  }, [
    searchTerm,
    selectedMonth,
    selectedNiche,
    selectedType,
    selectedTicketTier,
    selectedPlatform,
    selectedStatus,
    onlyRecurring,
    onlyTopScore,
    sortBy,
  ]);

  // Saved launches array
  const savedLaunches = useMemo(() => {
    return ALL_500_LAUNCHES.filter((l) => bookmarkedIds.includes(l.id));
  }, [bookmarkedIds]);

  // Export full 500 launches CSV
  const exportAllLaunchesToCsv = () => {
    const headers = [
      'ID', 'Nome_Lancamento', 'Nicho', 'Tipo_Evento', 'Mes_2026', 'Data_Exibicao', 
      'Local_EUA', 'Venue', 'Ticket_Medio_USD', 'Faixa_Ticket', 'Comissao_Percent', 
      'Comissao_Payout_USD', 'Recorrente_MRR', 'EPC_Estimado_USD', 'CVR_Estimada_Percent', 
      'Score_Lucratividade', 'Grade', 'Premiacao_Concurso_JV', 'Status_Programa_Afiliado', 
      'Plataforma_Afiliados', 'Link_Inscricao_Afiliado', 'Empresa_Produtora', 
      'Host_Principal', 'Email_Contato_JV', 'Telegram_JV', 'WhatsApp_EUA', 'Website_Oficial'
    ];

    const rows = ALL_500_LAUNCHES.map((item) => [
      item.id,
      `"${item.name.replace(/"/g, '""')}"`,
      `"${item.niche}"`,
      `"${item.type}"`,
      `"${item.month}"`,
      `"${item.dateDisplay}"`,
      `"${item.location.replace(/"/g, '""')}"`,
      `"${item.venue.replace(/"/g, '""')}"`,
      item.ticketPrice,
      `"${item.ticketTier}"`,
      item.commissionPercent,
      item.commissionPayoutUSD,
      item.recurring ? 'Sim' : 'Nao',
      item.estimatedEPC,
      item.conversionRateEst,
      item.profitabilityScore,
      item.profitabilityGrade,
      `"${item.jvContestPrizes.replace(/"/g, '""')}"`,
      `"${item.affiliateStatus}"`,
      `"${item.affiliatePlatform}"`,
      `"${item.affiliateSignupUrl}"`,
      `"${item.producer.name.replace(/"/g, '""')}"`,
      `"${item.producer.host.replace(/"/g, '""')}"`,
      item.producer.contactEmail,
      item.producer.telegram,
      item.producer.skypeOrWhatsApp,
      item.producer.website
    ].join(','));

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `500_lancamentos_eua_q4_2026_afiliados.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* App Header */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        savedCount={bookmarkedIds.length}
        onExportAllCsv={exportAllLaunchesToCsv}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-950 border border-indigo-500/20 p-6 sm:p-8 mb-6 shadow-2xl">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Inteligência de Mercado para Super Afiliados • EUA 2026</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Os 500 Maiores Lançamentos & Eventos dos EUA (Q4 2026)
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-2.5 leading-relaxed">
              Descubra quais ofertas pagarão as maiores comissões em dólar em <strong>Outubro, Novembro e Dezembro de 2026</strong>. 
              Avalie o <strong>Score de Lucratividade</strong>, EPC, CVR, contate os gerentes de JV e gere campanhas completas de anúncios com Inteligência Artificial.
            </p>

            {/* Quick Hero Actions */}
            <div className="flex flex-wrap items-center gap-3 mt-5">
              <button
                onClick={() => {
                  setSelectedTicketTier('High-Ticket ($1.000-$4.999)');
                  setActiveTab('grid');
                }}
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
              >
                <span>Explorar Ofertas High-Ticket (+$1.000)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  setOnlyTopScore(true);
                  setActiveTab('grid');
                }}
                className="px-4 py-2 bg-slate-800/80 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5"
              >
                <span>Score 90+ (Grade A)</span>
              </button>

              <button
                onClick={exportAllLaunchesToCsv}
                className="px-4 py-2 bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5 text-indigo-400" />
                <span>Exportar Planilha (500 Linhas)</span>
              </button>
            </div>
          </div>

          {/* Background Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Global KPI Summary Bar */}
        <KpiBar
          onFilterMonth={(m) => {
            setSelectedMonth(m);
            setActiveTab('grid');
          }}
          onFilterHighTicket={() => {
            setSelectedTicketTier('High-Ticket ($1.000-$4.999)');
            setActiveTab('grid');
          }}
          onFilterScore90={() => {
            setOnlyTopScore(true);
            setActiveTab('grid');
          }}
        />

        {/* Render Tab Contents */}
        {activeTab === 'grid' && (
          <div>
            {/* Filter Bar */}
            <FilterBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedMonth={selectedMonth}
              onMonthChange={setSelectedMonth}
              selectedNiche={selectedNiche}
              onNicheChange={setSelectedNiche}
              selectedType={selectedType}
              onTypeChange={setSelectedType}
              selectedTicketTier={selectedTicketTier}
              onTicketTierChange={setSelectedTicketTier}
              selectedPlatform={selectedPlatform}
              onPlatformChange={setSelectedPlatform}
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
              onlyRecurring={onlyRecurring}
              onOnlyRecurringChange={setOnlyRecurring}
              onlyTopScore={onlyTopScore}
              onOnlyTopScoreChange={setOnlyTopScore}
              sortBy={sortBy}
              onSortByChange={setSortBy}
              onReset={handleResetFilters}
              totalFiltered={filteredLaunches.length}
            />

            {/* Grid of Cards */}
            {filteredLaunches.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center max-w-md mx-auto my-8">
                <Compass className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <h3 className="text-base font-bold text-white mb-1">Nenhum Lançamento Encontrado</h3>
                <p className="text-xs text-slate-400 mb-4">
                  Tente alterar seus termos de busca ou limpar alguns filtros para visualizar mais ofertas.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all"
                >
                  Resetar Todos os Filtros
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {filteredLaunches.slice(0, itemsPerPage).map((launch) => (
                    <LaunchCard
                      key={launch.id}
                      launch={launch}
                      onOpenDetails={(item) => setSelectedLaunchDetail(item)}
                      onOpenRoi={(item) => setSelectedLaunchRoi(item)}
                      onOpenAi={(item) => setSelectedLaunchAi(item)}
                      isBookmarked={bookmarkedIds.includes(launch.id)}
                      onToggleBookmark={handleToggleBookmark}
                    />
                  ))}
                </div>

                {/* Load More Button */}
                {itemsPerPage < filteredLaunches.length && (
                  <div className="mt-8 text-center">
                    <button
                      onClick={() => setItemsPerPage((prev) => Math.min(prev + 36, filteredLaunches.length))}
                      className="px-6 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-indigo-500/50 text-slate-200 hover:text-white rounded-2xl text-xs font-bold transition-all shadow-lg inline-flex items-center gap-2"
                    >
                      <span>Carregar Mais Lançamentos ({filteredLaunches.length - itemsPerPage} restantes)</span>
                      <ChevronDown className="w-4 h-4 text-indigo-400" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Table View */}
        {activeTab === 'table' && (
          <div>
            <FilterBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedMonth={selectedMonth}
              onMonthChange={setSelectedMonth}
              selectedNiche={selectedNiche}
              onNicheChange={setSelectedNiche}
              selectedType={selectedType}
              onTypeChange={setSelectedType}
              selectedTicketTier={selectedTicketTier}
              onTicketTierChange={setSelectedTicketTier}
              selectedPlatform={selectedPlatform}
              onPlatformChange={setSelectedPlatform}
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
              onlyRecurring={onlyRecurring}
              onOnlyRecurringChange={setOnlyRecurring}
              onlyTopScore={onlyTopScore}
              onOnlyTopScoreChange={setOnlyTopScore}
              sortBy={sortBy}
              onSortByChange={setSortBy}
              onReset={handleResetFilters}
              totalFiltered={filteredLaunches.length}
            />

            <TableView
              launches={filteredLaunches}
              onOpenDetails={(item) => setSelectedLaunchDetail(item)}
              onOpenRoi={(item) => setSelectedLaunchRoi(item)}
              onOpenAi={(item) => setSelectedLaunchAi(item)}
              bookmarkedIds={bookmarkedIds}
              onToggleBookmark={handleToggleBookmark}
            />
          </div>
        )}

        {/* Calendar View */}
        {activeTab === 'calendar' && (
          <CalendarView
            launches={filteredLaunches}
            onOpenDetails={(item) => setSelectedLaunchDetail(item)}
            onOpenAi={(item) => setSelectedLaunchAi(item)}
          />
        )}

        {/* My Campaigns Pipeline */}
        {activeTab === 'my-campaigns' && (
          <MyCampaignsView
            savedLaunches={savedLaunches}
            campaignPlans={campaignPlans}
            onUpdatePlan={handleUpdatePlan}
            onRemoveBookmark={handleRemoveBookmark}
            onOpenDetails={(item) => setSelectedLaunchDetail(item)}
            onOpenRoi={(item) => setSelectedLaunchRoi(item)}
            onOpenAi={(item) => setSelectedLaunchAi(item)}
          />
        )}
      </main>

      {/* Detail Dossier Modal */}
      {selectedLaunchDetail && (
        <LaunchDetailModal
          launch={selectedLaunchDetail}
          onClose={() => setSelectedLaunchDetail(null)}
          onOpenRoi={(item) => {
            setSelectedLaunchDetail(null);
            setSelectedLaunchRoi(item);
          }}
          onOpenAi={(item) => {
            setSelectedLaunchDetail(null);
            setSelectedLaunchAi(item);
          }}
          isBookmarked={bookmarkedIds.includes(selectedLaunchDetail.id)}
          onToggleBookmark={handleToggleBookmark}
        />
      )}

      {/* ROI Simulator Modal */}
      {selectedLaunchRoi && (
        <RoiCalculatorModal
          launch={selectedLaunchRoi}
          onClose={() => setSelectedLaunchRoi(null)}
        />
      )}

      {/* AI Campaign Assistant Modal */}
      {selectedLaunchAi && (
        <AiCampaignModal
          launch={selectedLaunchAi}
          onClose={() => setSelectedLaunchAi(null)}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-semibold text-slate-400">
            AffiliateLaunch Radar USA Q4 2026 • Catálogo com 500 Lançamentos & Eventos de Alta Conversão
          </p>
          <p className="text-[11px] text-slate-500">
            Dados estruturados para afiliados profissionais analisarem lucratividade, tickets, comissões em dólar, contatos diretos de JV e criação de anúncios para o mercado norte-americano.
          </p>
        </div>
      </footer>
    </div>
  );
}
