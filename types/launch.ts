export type LaunchType = 
  | 'Software SaaS'
  | 'Summit Presencial'
  | 'Treinamento / Bootcamp'
  | 'Mastermind High-Ticket'
  | 'Produto Físico / DTC';

export type LaunchNiche = 
  | 'IA & Automação'
  | 'E-Commerce & Amazon'
  | 'Biohacking & Saúde'
  | 'Investimentos & Imóveis'
  | 'Tráfego & Marketing'
  | 'Finanças & Trading'
  | 'Infoprodutos & Mentoria'
  | 'Cripto & Web3'
  | 'B2B SaaS & Tech';

export type MonthQ4 = 'Outubro 2026' | 'Novembro 2026' | 'Dezembro 2026';

export type TicketTier = 'Low-Ticket (<$100)' | 'Mid-Ticket ($100-$999)' | 'High-Ticket ($1.000-$4.999)' | 'Ultra High-Ticket ($5.000+)';

export type AffiliateStatus = 'Aberto Imediato' | 'Aprovação Rápida (<24h)' | 'Convite / Whitelist' | 'Pré-Cadastro Aberto';

export type AffiliatePlatform = 
  | 'ClickBank'
  | 'PartnerStack'
  | 'Impact Radius'
  | 'JVZoo'
  | 'ShareASale'
  | 'Everflow'
  | 'Skool / Stripe'
  | 'CJ Affiliate'
  | 'Direct / Portal Próprio';

export interface ProducerInfo {
  name: string;
  host: string;
  title: string;
  contactEmail: string;
  jvManager: string;
  telegram: string;
  skypeOrWhatsApp: string;
  website: string;
  reputationScore: number; // 4.2 to 5.0
}

export interface LaunchItem {
  id: number;
  name: string;
  tagline: string;
  type: LaunchType;
  niche: LaunchNiche;
  date: string; // YYYY-MM-DD
  dateDisplay: string;
  month: MonthQ4;
  location: string;
  venue: string;
  ticketPrice: number;
  ticketTier: TicketTier;
  commissionPercent: number;
  commissionPayoutUSD: number;
  recurring: boolean;
  recurringDetails?: string;
  estimatedEPC: number; // USD per click
  conversionRateEst: number; // %
  cookieDuration: string;
  profitabilityScore: number; // 60 to 99
  profitabilityGrade: 'A+' | 'A' | 'B+' | 'B';
  jvContestPrizes: string;
  hasAffiliateProgram: boolean;
  affiliateStatus: AffiliateStatus;
  affiliatePlatform: AffiliatePlatform;
  affiliateSignupUrl: string;
  producer: ProducerInfo;
  marketingAssets: string[];
  recommendedTraffic: string[];
  targetAudience: string;
  affiliatePros: string[];
  affiliateCautions: string[];
}

export interface CampaignPlanItem {
  launchId: number;
  status: 'Pesquisa' | 'Candidatura Enviada' | 'Aprovado' | 'Campanha Ativa' | 'Pausado';
  plannedBudgetUSD: number;
  notes: string;
  addedAt: string;
}
