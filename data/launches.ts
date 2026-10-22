import { LaunchItem, LaunchNiche, LaunchType, MonthQ4, TicketTier, AffiliatePlatform, AffiliateStatus } from '@/types/launch';

// Seeded generator to ensure consistent, highly descriptive 500 realistic launches across Q4 2026 (Oct, Nov, Dec 2026)
const US_CITIES_VENUES = [
  { city: 'Las Vegas, NV', venues: ['Caesars Forum Convention Center', 'The Venetian Expo Center', 'Bellagio Resort Ballroom', 'Mandalay Bay Convention Center', 'Wynn Encore Pavilion'] },
  { city: 'Miami, FL', venues: ['Miami Beach Convention Center', 'Fontainebleau Hotel & Resort', 'JW Marriott Marquis Miami', 'Mana Wynwood Convention Center'] },
  { city: 'Austin, TX', venues: ['Austin Convention Center', 'JW Marriott Austin Downtown', 'Palmero Center for Innovation', 'Fairmont Austin Grand Ballroom'] },
  { city: 'Orlando, FL', venues: ['Orange County Convention Center', 'Hilton Orlando Bonnet Creek', 'Rosen Shingle Creek Conference Hub'] },
  { city: 'San Francisco, CA', venues: ['Moscone Convention Center', 'Palace of Fine Arts Center', 'Hyatt Regency Embarcadero'] },
  { city: 'New York, NY', venues: ['Jacob K. Javits Convention Center', 'Marriott Marquis Times Square', 'Pier 60 at Chelsea Piers'] },
  { city: 'Scottsdale, AZ', venues: ['The Phoenician Luxury Resort', 'Westin Kierland Resort Center', 'Talking Stick Conference Center'] },
  { city: 'San Diego, CA', venues: ['San Diego Convention Center', 'Manchester Grand Hyatt Bayfront', 'Town and Country Resort'] },
  { city: 'Nashville, TN', venues: ['Music City Center', 'Gaylord Opryland Resort Center', 'Omni Nashville Hotel Ballroom'] },
  { city: 'Dallas, TX', venues: ['Kay Bailey Hutchison Center', 'Omni Dallas Convention Hotel', 'Hilton Anatole Grand Center'] },
  { city: 'Chicago, IL', venues: ['McCormick Place Chicago', 'Navy Pier Festival Hall', 'Marriott Downtown Magnificent Mile'] },
  { city: 'Atlanta, GA', venues: ['Georgia World Congress Center', 'Atlanta Marriott Marquis', 'Cobb Galleria Centre'] },
  { city: 'Denver, CO', venues: ['Colorado Convention Center', 'Gaylord Rockies Resort & Center'] },
  { city: 'Online / Transmissão USA', venues: ['Estúdio Transmissão 4K Virtual (EUA)', 'Plataforma Interativa Live Broadcast EUA', 'Skool / Zoom Pro VIP Virtual'] }
];

const NICHES_CONFIG: {
  niche: LaunchNiche;
  types: LaunchType[];
  platforms: AffiliatePlatform[];
  baseTicket: number;
  ticketSpread: number;
  commPercentRange: [number, number];
  tags: string[];
  producerCompanies: string[];
  jvManagers: string[];
  hosts: { name: string; title: string }[];
  themes: { title: string; tagline: string; audience: string; traffic: string[] }[];
}[] = [
  {
    niche: 'IA & Automação',
    types: ['Software SaaS', 'Summit Presencial', 'Treinamento / Bootcamp', 'Mastermind High-Ticket'],
    platforms: ['PartnerStack', 'Impact Radius', 'ClickBank', 'ShareASale', 'Direct / Portal Próprio'],
    baseTicket: 397,
    ticketSpread: 2600,
    commPercentRange: [30, 50],
    tags: ['Inteligência Artificial', 'Automação No-Code', 'Agentes Autônomos', 'SaaS B2B'],
    producerCompanies: ['NeuralFlow Systems LLC', 'Synthetix AI Labs', 'AutoPrompt Global', 'Cognitive Growth Media', 'OmniAgent Technologies', 'VectorScale AI Inc'],
    jvManagers: ['Tyler Evans', 'Sarah Jenkins', 'Marcus Vance', 'Elena Rostova', 'Chloe Bennett'],
    hosts: [
      { name: 'Dr. Raymond Sterling', title: 'Ex-OpenAI Researcher & Founder' },
      { name: 'Marcus Sterling', title: 'AI Automation Consultant & Angel Investor' },
      { name: 'Elena Chen', title: 'Head of Growth at NeuralPrompt' },
      { name: 'David K. Hoffman', title: 'Host of AI Breakthrough Summit' }
    ],
    themes: [
      {
        title: 'Autonomous AI Agents & Enterprise Funnels Summit',
        tagline: 'Construa e monetize ecossistemas de agentes autônomos para empresas americanas',
        audience: 'Donos de agências, gestores de tráfego, desenvolvedores e consultores corporativos.',
        traffic: ['Google Ads Busca', 'YouTube In-Stream', 'LinkedIn B2B Ads']
      },
      {
        title: 'Prompt-to-Profit 2026 AI Product Launch',
        tagline: 'Ferramenta SaaS de geração e otimização contínua de criativos de alta conversão',
        audience: 'Afiliados, media buyers, copywriters e e-commerce managers.',
        traffic: ['Meta Ads (IG/FB)', 'TikTok Ads', 'YouTube Reviews']
      },
      {
        title: 'Voice AI & Inbound Sales Bot Accelerator',
        tagline: 'Software e treinamento para substituir atendimentos telefônicos com agentes de voz ultra-humanos',
        audience: 'Negócios locais nos EUA, corretores de imóveis, clínicas estéticas e seguros.',
        traffic: ['Google Ads Busca', 'Meta Ads', 'Email Marketing']
      },
      {
        title: 'Synthetix Video AI Creator Engine Launch',
        tagline: 'Plataforma para criação de VSLs e criativos em vídeo gerados 100% por IA com atores virtuais',
        audience: 'Produtores de infoprodutos, afiliados de ofertas diretas e agências de vídeo.',
        traffic: ['YouTube Ads', 'Meta Ads', 'Google Display']
      }
    ]
  },
  {
    niche: 'Tráfego & Marketing',
    types: ['Summit Presencial', 'Software SaaS', 'Treinamento / Bootcamp', 'Mastermind High-Ticket'],
    platforms: ['ClickBank', 'JVZoo', 'Everflow', 'ShareASale', 'Direct / Portal Próprio'],
    baseTicket: 497,
    ticketSpread: 3200,
    commPercentRange: [40, 60],
    tags: ['Media Buying', 'Google & Meta Ads', 'Copywriting VSL', 'Funis High-Ticket'],
    producerCompanies: ['OmniMedia Acquisitions Inc', 'Traffic Titans Media Group', 'AdScale Ventures', 'Apex Media Buying Network', 'Direct Response Mastermind LLC'],
    jvManagers: ['Braden Cole', 'Brittany Hughes', 'Derrick Vance', 'Austin Reed', 'Natalia Cruz'],
    hosts: [
      { name: 'Jason Vance', title: 'Super Affiliate & 8-Figure Media Buyer' },
      { name: 'Samantha Brooks', title: 'Top Conversion Rate Optimization Strategist' },
      { name: 'Logan McAllister', title: 'Direct Response Copy Pioneer' },
      { name: 'Victor Santos', title: 'Global Affiliate Network Founder' }
    ],
    themes: [
      {
        title: 'Traffic & Conversion Scale World Congress 2026',
        tagline: 'O encontro definitivo dos maiores media buyers e donos de ofertas de resposta direta dos EUA',
        audience: 'Afiliados profissionais, compradores de mídia, donos de agências e marcas DTC.',
        traffic: ['Google Search Ads', 'YouTube In-Stream', 'Listas de Email']
      },
      {
        title: 'Quantum Funnels V4: High-Yield Media Buying Suite',
        tagline: 'Suite completa com tracking S2S, cloaking ético e otimização algorítmica de lances',
        audience: 'Afiliados de ClickBank, MaxBounty e compradores de mídia no Meta/TikTok.',
        traffic: ['YouTube Ads', 'Google Ads', 'Comunidades Discord/Telegram']
      },
      {
        title: '8-Figure VSL Mastery & Copy Blueprint',
        tagline: 'Treinamento com 40 modelos de cartas de vendas em vídeo que faturaram mais de $10M cada',
        audience: 'Copywriters, produtores de infoprodutos e afiliados de saúde/finanças.',
        traffic: ['Meta Ads', 'Email Solo Ads', 'SEO & Blogs']
      },
      {
        title: 'OmniTraffic USA Summit: Native Ads & Search Arbitrage',
        tagline: 'Estratégias de arbitragem em Taboola, Outbrain e Google Search Feed para margens de 45%+',
        audience: 'Afiliados de grande volume de tráfego nativo e publishers de conteúdo.',
        traffic: ['Google Ads', 'Native Ads', 'Listas B2B']
      }
    ]
  },
  {
    niche: 'E-Commerce & Amazon',
    types: ['Summit Presencial', 'Treinamento / Bootcamp', 'Software SaaS', 'Mastermind High-Ticket'],
    platforms: ['Impact Radius', 'ShareASale', 'PartnerStack', 'ClickBank', 'Direct / Portal Próprio'],
    baseTicket: 697,
    ticketSpread: 3800,
    commPercentRange: [35, 50],
    tags: ['Amazon FBA', 'Shopify DTC', 'TikTok Shop USA', 'Private Label'],
    producerCompanies: ['BrandForge Capital', 'Amazon Empire Builders', 'DTC Growth Collective', 'PrimeScale Accelerators LLC', 'Ecom MasterClass Group'],
    jvManagers: ['Kyle Richardson', 'Hannah Miller', 'Trevor Blake', 'Jessica Ward', 'Dustin Foley'],
    hosts: [
      { name: 'Chadwick Montgomery', title: '7-Figure Amazon Brand Aggregator' },
      { name: 'Jessica Lin', title: 'TikTok Shop Viral Strategist' },
      { name: 'Brandon Cole', title: 'Supply Chain & Sourcing Veteran' },
      { name: 'Melissa Sterling', title: 'Shopify Plus Partner & Brand Architect' }
    ],
    themes: [
      {
        title: 'Amazon FBA & Omnichannel Sellers Expo 2026',
        tagline: 'Estratégias de ranking, catálogo internacional e PPC de elite para vendedores norte-americanos',
        audience: 'Vendedores Amazon FBA, donos de marcas no Walmart Marketplace e importadores.',
        traffic: ['Google Search Ads', 'YouTube Ads', 'TikTok Ads']
      },
      {
        title: 'TikTok Shop USA Super-Affiliate Scale Bootcamp',
        tagline: 'Como gerar $50k/dia recrutando criadores e escalando anúncios no TikTok Shop Live EUA',
        audience: 'Afiliados de produtos físicos, agências de criadores e donos de e-commerce.',
        traffic: ['TikTok Ads', 'Meta Ads (Instagram Reels)', 'YouTube Shorts']
      },
      {
        title: 'Private Label Millionaire Summit 2026',
        tagline: 'Construa marcas proprietárias de alto valuation com saída programada para fundos de Private Equity',
        audience: 'Empreendedores de e-commerce, investidores e fabricantes.',
        traffic: ['LinkedIn Ads', 'Google Ads', 'Email Solo Ads']
      },
      {
        title: 'BrandPulse AI: Predictive Inventory & Pricing SaaS',
        tagline: 'Software SaaS para previsão de demanda, pricing dinâmico e gestão de margem no Shopify & Amazon',
        audience: 'Marcas DTC faturando acima de $100k/mês nos EUA.',
        traffic: ['Google Ads', 'LinkedIn B2B', 'Meta Ads']
      }
    ]
  },
  {
    niche: 'Investimentos & Imóveis',
    types: ['Summit Presencial', 'Mastermind High-Ticket', 'Treinamento / Bootcamp', 'Software SaaS'],
    platforms: ['Direct / Portal Próprio', 'ClickBank', 'ShareASale', 'Everflow'],
    baseTicket: 1497,
    ticketSpread: 6500,
    commPercentRange: [30, 45],
    tags: ['Real Estate Syndication', 'Multifamily Investing', 'Commercial Real Estate', 'Tax Strategies'],
    producerCompanies: ['Apex Real Estate Acquisitions', 'Capital Wealth Partners LLC', 'Multifamily Mastery Summit Inc', 'Freedom Wealth Conferences', 'Equities & Assets Group'],
    jvManagers: ['Harrison Wells', 'Amanda Sterling', 'Gregory Vance', 'Patricia O\'Connor', 'Nolan Drake'],
    hosts: [
      { name: 'Arthur Pendelton', title: '$500M Multifamily Fund Manager' },
      { name: 'Rachel Rosenthal', title: 'Tax & Asset Protection Specialist' },
      { name: 'Derrick Armstrong', title: 'Commercial Syndication Mentor' },
      { name: 'Clara Delacroix', title: 'Real Estate Tech & PropTech Investor' }
    ],
    themes: [
      {
        title: 'Commercial Real Estate Syndication Summit 2026',
        tagline: 'Como captar fundos, negociar imóveis comerciais e gerar renda passiva sem capital inicial próprio',
        audience: 'Investidores individuais, médicos, advogados, corretores e consultores financeiros.',
        traffic: ['Google Ads Busca', 'YouTube Ads', 'LinkedIn Sponsored Content']
      },
      {
        title: 'Multifamily Wealth Accelerator Mastermind',
        tagline: 'Encontro VIP em resort com imersão de 3 dias para fechar pools de compra de condomínios residenciais',
        audience: 'Investidores high-net-worth e operadores de imóveis nos EUA.',
        traffic: ['Email Outreach', 'Google Ads High-Intent', 'LinkedIn Ads']
      },
      {
        title: 'Tax-Free Real Estate & Asset Shield Conference',
        tagline: 'Estratégias avançadas de 1031 Exchange, trusts familiares e depreciação acelerada',
        audience: 'Profissionais autônomos, donos de empresas e investidores imobiliários.',
        traffic: ['Google Ads', 'YouTube In-Stream', 'Meta Ads']
      },
      {
        title: 'PropTech DealFinder AI Software Launch',
        tagline: 'Algoritmo que analisa 200.000 propriedades por segundo para encontrar leilões e descontos de até 40%',
        audience: 'Wholesalers, flippers de casas e corretores de imóveis.',
        traffic: ['Meta Ads', 'Google Ads', 'YouTube Ads']
      }
    ]
  },
  {
    niche: 'Biohacking & Saúde',
    types: ['Summit Presencial', 'Treinamento / Bootcamp', 'Produto Físico / DTC', 'Mastermind High-Ticket'],
    platforms: ['ClickBank', 'ShareASale', 'Impact Radius', 'Direct / Portal Próprio'],
    baseTicket: 297,
    ticketSpread: 2200,
    commPercentRange: [40, 75],
    tags: ['Longevidade', 'Peptídeos & Nootrópicos', 'Terapia Celular', 'Biohacking Performance'],
    producerCompanies: ['Optima Longevity Labs', 'Cellular Renewal Institute', 'Peak Human Biohacking Summit LLC', 'NeuroVital Supplements', 'Quantum Health Media'],
    jvManagers: ['Devon Clark', 'Chloe Summers', 'Sean Gallagher', 'Brianna Hayes', 'Zackary Thorne'],
    hosts: [
      { name: 'Dr. Julian Thorne', title: 'Anti-Aging & Cellular Medicine Pioneer' },
      { name: 'Dr. Evelyn Morales', title: 'Neuroscientist & Sleep Optimization Expert' },
      { name: 'Brett Sterling', title: 'Biohacker, Author & Ironman Finisher' },
      { name: 'Dr. Gregory Chase', title: 'Functional Medicine Research Director' }
    ],
    themes: [
      {
        title: 'American Longevity & Biohacking World Expo 2026',
        tagline: 'O maior congresso de medicina preventiva, peptídeos, câmaras hiperbáricas e extensão da vida',
        audience: 'Biohackers, médicos integrativos, entusiastas de fitness e homens/mulheres 35+ com alto poder de compra.',
        traffic: ['Meta Ads (Instagram)', 'YouTube In-Stream', 'Google Ads']
      },
      {
        title: 'NeuroOptima: Nootropic Smart Protocol Launch',
        tagline: 'Fórmula nootrópica clínica com aprovação FDA para foco cirúrgico e reversão da fadiga mental',
        audience: 'Executivos, concurseiros, empreendedores e operadores de mercado financeiro.',
        traffic: ['Meta Ads', 'Native Ads (Taboola)', 'Google Ads']
      },
      {
        title: 'Cellular Reset 30-Day Metabolic Immersion',
        tagline: 'Protocolo completo de jejum assistido, regulação de insulina e limpeza autofágica guiado por médicos',
        audience: 'Pessoas com pré-diabetes, sobrepeso crônico ou buscando vitalidade física.',
        traffic: ['Meta Ads', 'Google Ads', 'Email Solo Ads']
      },
      {
        title: 'Peak Sleep & Circadian Biology System',
        tagline: 'Dispositivo e treinamento para induzir sono profundo N3 e aumentar HRV em 35% em 14 dias',
        audience: 'Pessoas que sofrem de insônia crônica, atletas e profissionais de alta pressão.',
        traffic: ['YouTube Reviews', 'Google Search', 'Meta Ads']
      }
    ]
  },
  {
    niche: 'Finanças & Trading',
    types: ['Software SaaS', 'Treinamento / Bootcamp', 'Mastermind High-Ticket', 'Summit Presencial'],
    platforms: ['ClickBank', 'ShareASale', 'Direct / Portal Próprio', 'Everflow'],
    baseTicket: 597,
    ticketSpread: 3500,
    commPercentRange: [40, 50],
    tags: ['Opções & Derivativos', 'Algoritmos de Trading', 'Ações Americanas', 'Swing Trade'],
    producerCompanies: ['WallStreet Quantum Traders LLC', 'AlphaSignal Strategies Inc', 'Apex Wealth Systems', 'Institutional Edge Media', 'Horizon Market Insights'],
    jvManagers: ['Dominic Russo', 'Tara Campbell', 'Garrett Sullivan', 'Kendall Brooks', 'Morgan Pierce'],
    hosts: [
      { name: 'Vincent Moretti', title: 'Former Hedge Fund Senior Arbitrageur' },
      { name: 'Alicia Kensington', title: 'Macro Options Strategist' },
      { name: 'Jonathan Pierce', title: 'Quant Trader & Python Algorithm Architect' },
      { name: 'Leonard Vance', title: 'Chief Market Technician' }
    ],
    themes: [
      {
        title: 'Institutional Edge Trading Conference 2026',
        tagline: 'Aprenda os fluxos de ordens e dark pools que os grandes bancos de Wall Street utilizam',
        audience: 'Day traders, investidores de opções, engenheiros e aposentados buscando renda extra.',
        traffic: ['YouTube Ads', 'Google Ads Busca', 'Meta Ads']
      },
      {
        title: 'AlphaSignal Pro: Automated Options Flow SaaS',
        tagline: 'Scanner em tempo real que detecta movimentações anômalas de smart money em opções de SPY e QQQ',
        audience: 'Traders ativos no mercado americano e investidores de bolsa.',
        traffic: ['Google Search', 'YouTube In-Stream', 'Twitter/X Finance']
      },
      {
        title: 'Zero-DTE Gamma Scalper Masterclass',
        tagline: 'Estratégia precisa de contratos de opções de vencimento no mesmo dia com risco controlado',
        audience: 'Traders experientes com capital líquido acima de $10.000.',
        traffic: ['YouTube Ads', 'Meta Ads', 'Email Newsletters']
      },
      {
        title: 'Dividend Compounding Wealth System 2026',
        tagline: 'Como construir uma carteira com renda perpétua de dividendos em dólar pagando dividendos mensais',
        audience: 'Investidores conservadores, profissionais liberais e planejamento de aposentadoria.',
        traffic: ['Google Ads', 'YouTube In-Stream', 'Meta Ads']
      }
    ]
  },
  {
    niche: 'Infoprodutos & Mentoria',
    types: ['Mastermind High-Ticket', 'Summit Presencial', 'Treinamento / Bootcamp', 'Software SaaS'],
    platforms: ['Skool / Stripe', 'ClickBank', 'JVZoo', 'Direct / Portal Próprio'],
    baseTicket: 997,
    ticketSpread: 5000,
    commPercentRange: [40, 60],
    tags: ['Comunidades Pagas', 'Skool Games', 'Mentorias High-Ticket', 'Lançamento Semente'],
    producerCompanies: ['Elite Creator Labs Inc', 'Mentorship Scale Systems LLC', 'Course Empire Media', 'Mastermind Titans Group', 'Knowledge Capital Network'],
    jvManagers: ['Tristan Ross', 'Sierra Bailey', 'Colton Bryant', 'Danielle Foster', 'Maxwell Hayes'],
    hosts: [
      { name: 'Kaelen Brody', title: '8-Figure Skool Community Creator' },
      { name: 'Danielle Croft', title: 'High-Ticket Closer & Offer Architect' },
      { name: 'Harrison Price', title: 'Educational Funnel Engineer' },
      { name: 'Seraphina Reed', title: 'Executive Coaching Mentor' }
    ],
    themes: [
      {
        title: 'High-Ticket Mastermind & Skool Community Summit 2026',
        tagline: 'Como faturar $100k/mês com comunidades de assinatura e programas de mentoria de alto valor',
        audience: 'Criadores de conteúdo, consultores, professores e especialistas de nicho.',
        traffic: ['Meta Ads', 'YouTube Ads', 'Instagram DMs Outreach']
      },
      {
        title: 'Zero-to-Scale Webinar & Challenge Blueprint',
        tagline: 'O formato exato de desafios de 5 dias e webinars com fechamento de vendas acima de 12%',
        audience: 'Infoprodutores, palestrantes e afiliados de lançamentos.',
        traffic: ['Meta Ads (Lead Gen)', 'Google Search', 'YouTube In-Stream']
      },
      {
        title: 'Executive Ghostwriting & Authority Monopolization',
        tagline: 'Treinamento para transformar CEOs e fundadores em celebridades do LinkedIn com contratos de $15k/mês',
        audience: 'Redatores, profissionais de relações públicas e agências de branding.',
        traffic: ['LinkedIn Sponsored Content', 'Google Ads', 'Email Outreach']
      },
      {
        title: 'Evergreen Funnel Automated Engine Launch',
        tagline: 'Sistema completo que substitui lançamentos desgastantes por funis contínuos gerando vendas diárias',
        audience: 'Produtores digitais com cursos estagnados e afiliados de produtos perpétuos.',
        traffic: ['Meta Ads', 'Google Ads', 'YouTube Reviews']
      }
    ]
  },
  {
    niche: 'Cripto & Web3',
    types: ['Summit Presencial', 'Software SaaS', 'Treinamento / Bootcamp', 'Mastermind High-Ticket'],
    platforms: ['Direct / Portal Próprio', 'PartnerStack', 'Everflow', 'ShareASale'],
    baseTicket: 797,
    ticketSpread: 4200,
    commPercentRange: [30, 45],
    tags: ['Bitcoin Halving Cycle', 'DeFi Yields', 'Tokenização RWA', 'Web3 Infrastructure'],
    producerCompanies: ['Consensus Capital Events', 'DeFi Vanguard Technologies', 'BlockAlpha Analytics LLC', 'Satoshi Global Summits', 'HyperLedger Partners'],
    jvManagers: ['Dexter Hayes', 'Sloan Gallagher', 'Gavin Bradley', 'Tessa Monroe', 'Keegan Cruz'],
    hosts: [
      { name: 'Sebastian Cruz', title: 'Crypto Venture Partner & Protocol Architect' },
      { name: 'Natasha Romanov', title: 'DeFi Arbitrage & Liquidity Specialist' },
      { name: 'Ethan Zhao', title: 'RWA Tokenization Legal Pioneer' },
      { name: 'Julian Vance', title: 'Web3 Analytics & On-Chain Detective' }
    ],
    themes: [
      {
        title: 'North American Web3 & Real World Assets (RWA) Summit 2026',
        tagline: 'Onde fundos de investimento institucionais e protocolos DeFi tokenizam trilhões em dívida e imóveis',
        audience: 'Investidores cripto, analistas financeiros, gestores de patrimônio e desenvolvedores blockchain.',
        traffic: ['Twitter/X Ads', 'Google Search Ads', 'YouTube In-Stream']
      },
      {
        title: 'OnChain Alpha Bot: Whale Wallet Tracker SaaS',
        tagline: 'Software de inteligência que envia alertas antes de pumps institucionais com 88% de taxa de acerto',
        audience: 'Traders de criptomoedas, pesquisadores e membros de DAOs.',
        traffic: ['YouTube Ads', 'Telegram Sponsorships', 'Google Ads']
      },
      {
        title: 'Automated Yield Farming & Staking Protocol Launch',
        tagline: 'Plataforma para capturar rendimentos de 15% a 28% a.a. em stablecoins indexadas ao dólar',
        audience: 'Detentores de capital em dólar buscando rendimentos passivos sem volatilidade de preço.',
        traffic: ['Google Search', 'YouTube In-Stream', 'Email Marketing']
      },
      {
        title: 'Crypto Institutional Compliance & Custody Expo',
        tagline: 'Painéis com reguladores dos EUA, gestores de ETFs de Bitcoin e custody houses globais',
        audience: 'Family offices, advogados, contadores e tesourarias corporativas.',
        traffic: ['LinkedIn Ads', 'Google Ads', 'Email Outreach']
      }
    ]
  },
  {
    niche: 'B2B SaaS & Tech',
    types: ['Software SaaS', 'Summit Presencial', 'Treinamento / Bootcamp', 'Mastermind High-Ticket'],
    platforms: ['PartnerStack', 'Impact Radius', 'Direct / Portal Próprio', 'ShareASale'],
    baseTicket: 897,
    ticketSpread: 4800,
    commPercentRange: [30, 40],
    tags: ['Enterprise Software', 'Product-Led Growth', 'B2B Sales Tech', 'Cybersecurity'],
    producerCompanies: ['HyperGrowth SaaS Coalition', 'RevOps Leaders Inc', 'CloudScale Technologies LLC', 'Enterprise Horizons Media', 'NextGen DevCon Group'],
    jvManagers: ['Warren Hughes', 'Brooke Sterling', 'Leland Cooper', 'Paige Campbell', 'Spencer Thorne'],
    hosts: [
      { name: 'Devin Davenport', title: 'Founder of 3 Unicorn SaaS Startups' },
      { name: 'Courtney Bennett', title: 'VP of Global Enterprise Partnerships' },
      { name: 'Ian Fletcher', title: 'Cybersecurity Architect & Consultant' },
      { name: 'Zoe Montgomery', title: 'Head of Product-Led Growth Academy' }
    ],
    themes: [
      {
        title: 'Enterprise RevOps & AI Sales Stack Summit 2026',
        tagline: 'Como times comerciais B2B fecham contas de $500k+ utilizando IA preditiva e automação de pipeline',
        audience: 'Diretores comerciais, VPs de vendas, donos de SaaS e consultores corporativos.',
        traffic: ['LinkedIn Sponsored Content', 'Google Ads Busca', 'Email B2B']
      },
      {
        title: 'PipelineGen AI: Cold Email & LinkedIn Outbound SaaS',
        tagline: 'Plataforma que personaliza vídeos e emails para 10.000 decisores com taxa de abertura de 62%',
        audience: 'SDRs, executivos de contas, agências B2B e fundadores de startups.',
        traffic: ['Google Search Ads', 'LinkedIn Ads', 'YouTube In-Stream']
      },
      {
        title: 'Zero Trust Cybersecurity & Compliance Bootcamp',
        tagline: 'Treinamento preparatório com certificação para adequação a normas federais americanas de proteção de dados',
        audience: 'Engenheiros de segurança, CISOs, donos de software e integradores de TI.',
        traffic: ['Google Search', 'LinkedIn B2B', 'Email Outreach']
      },
      {
        title: 'SaaS Founder Exit & Valuation Mastermind',
        tagline: 'Imersão restrita para fundadores de SaaS que faturam acima de $2M ARR visando M&A com múltiplos de 12x+',
        audience: 'CEOs de empresas de tecnologia e investidores de Venture Capital.',
        traffic: ['LinkedIn Outreach', 'Convite Privado', 'Google Ads']
      }
    ]
  }
];

const JV_PRIZES_LIST = [
  '$100,000 Cash Pool + Porsche Taycan para o 1º Lugar',
  '$50,000 Leaderboard Contest + Rolex Submariner',
  '$75,000 em Prêmios em Dinheiro Direto no Pix/Stripe',
  '$25,000 Concurso de Afiliados (Top 10 Premiados)',
  '$150,000 Mega JV Contest (Viagem de Luxo a Bora Bora inclusa)',
  '$35,000 Cash Leaderboard + Bônus por Volume de Vendas',
  '$60,000 Pool de Premiações + MacBooks Pro M4 para afiliados top tier',
  '$20,000 em Prêmios de Velocidade (Primeiros a bater 50 vendas)',
  'Sem concurso de prêmios (Comissão pura com payout elevado)'
];

const COOKIE_DURATIONS = ['30 dias', '60 dias', '90 dias', '180 dias', 'Vitalício / Primeiro Clique (First-Cookie)', 'Vitalício / Último Clique (Last-Cookie)'];

const MARKETING_ASSETS_POOL = [
  'Swipes de Email Testados (30+ variações)',
  'Vídeos de Alta Conversão (VSLs & Criativos Curtos)',
  'Banners & Ad Packs (Meta, Google, Native Ads)',
  'Páginas de Captura Pré-otimizadas com 42% CVR',
  'Postback S2S & Pixels Pré-instalados',
  'Webinar Gravado de Fechamento com 14% de conversão',
  'Audiências Personalizadas & Lookalike (EUA 1%)',
  'Mini-Curso Grátis para Isca Digital / Lead Magnet',
  'Roteiros de Ligação / WhatsApp para High-Ticket'
];

const PROS_LIST = [
  'Ticket médio alto com margem expressiva de comissão em dólar',
  'Equipe de JV dedicada respondendo em menos de 4 horas via Telegram',
  'Funil com upsells e order bumps testados aumentando o AOV em 38%',
  'Alta demanda reprimida nos EUA para o 4º trimestre de 2026',
  'Permite anúncios diretos para a página de vendas (sem restrições severas)',
  'Pagamentos pontuais semanais via Stripe Connect, Wire ou PayPal',
  'Materiais de apoio completos prontos para rodar no Google e Meta Ads',
  'Recorrência mensal (MRR) garantindo fluxo de caixa nos meses seguintes',
  'Concurso de afiliados com premiação pesada em dinheiro vivo'
];

const CAUTIONS_LIST = [
  'Necessário aquecer público ou utilizar lista qualificada para ticket elevado',
  'Não permite tráfego incentivado ou brand bidding no Google Ads sem autorização',
  'Público corporativo exige copy sóbria e focada em métricas financeiras de ROI',
  'Requer aprovação prévia de criativos para não violar diretrizes de conformidade',
  'Concorrência moderada a alta nas palavras-chave exatas de busca',
  'Exige pixel S2S configurado para trackear vendas de forma precisa'
];

// Helper to deterministically generate 500 items across Oct, Nov, Dec 2026
function generate500Launches(): LaunchItem[] {
  const items: LaunchItem[] = [];

  // Distribution: ~170 in October, ~170 in November, ~160 in December = 500
  // Dates in 2026:
  // October: 2026-10-01 to 2026-10-31
  // November: 2026-11-01 to 2026-11-30
  // December: 2026-12-01 to 2026-12-29

  const monthsMap: { month: MonthQ4; days: number; startDay: number; monthNum: string }[] = [
    { month: 'Outubro 2026', days: 31, startDay: 1, monthNum: '10' },
    { month: 'Novembro 2026', days: 30, startDay: 1, monthNum: '11' },
    { month: 'Dezembro 2026', days: 28, startDay: 1, monthNum: '12' },
  ];

  for (let i = 1; i <= 500; i++) {
    // Select month
    let monthObj = monthsMap[0];
    let monthDay = 1;
    if (i <= 170) {
      monthObj = monthsMap[0]; // Outubro
      monthDay = ((i * 7) % 30) + 1;
    } else if (i <= 340) {
      monthObj = monthsMap[1]; // Novembro
      const offset = i - 170;
      monthDay = ((offset * 11) % 29) + 1;
    } else {
      monthObj = monthsMap[2]; // Dezembro
      const offset = i - 340;
      monthDay = ((offset * 13) % 27) + 1;
    }

    const dayStr = monthDay < 10 ? `0${monthDay}` : `${monthDay}`;
    const isoDate = `2026-${monthObj.monthNum}-${dayStr}`;

    // Select Niche
    const nicheConfig = NICHES_CONFIG[(i - 1) % NICHES_CONFIG.length];
    const theme = nicheConfig.themes[(i + Math.floor(i / 9)) % nicheConfig.themes.length];
    const type = nicheConfig.types[(i + 2) % nicheConfig.types.length];
    const cityVenueObj = US_CITIES_VENUES[(i * 3) % US_CITIES_VENUES.length];
    const venue = cityVenueObj.venues[(i + 1) % cityVenueObj.venues.length];
    const platform = nicheConfig.platforms[(i * 5) % nicheConfig.platforms.length];
    
    // Status
    const statusPool: AffiliateStatus[] = [
      'Aberto Imediato',
      'Aprovação Rápida (<24h)',
      'Aberto Imediato',
      'Aprovação Rápida (<24h)',
      'Convite / Whitelist',
      'Pré-Cadastro Aberto'
    ];
    const affiliateStatus = statusPool[(i * 7) % statusPool.length];

    // Ticket economics
    const ticketModifier = ((i * 47) % 100) / 100;
    const rawTicket = Math.round((nicheConfig.baseTicket + nicheConfig.ticketSpread * ticketModifier) / 10) * 10 - 3;
    const ticketPrice = Math.max(97, rawTicket);

    let ticketTier: TicketTier = 'Mid-Ticket ($100-$999)';
    if (ticketPrice < 100) ticketTier = 'Low-Ticket (<$100)';
    else if (ticketPrice >= 1000 && ticketPrice < 5000) ticketTier = 'High-Ticket ($1.000-$4.999)';
    else if (ticketPrice >= 5000) ticketTier = 'Ultra High-Ticket ($5.000+)';

    const minComm = nicheConfig.commPercentRange[0];
    const maxComm = nicheConfig.commPercentRange[1];
    const commissionPercent = minComm + ((i * 3) % (maxComm - minComm + 1));
    const commissionPayoutUSD = Math.round((ticketPrice * commissionPercent) / 100);

    const isRecurring = type === 'Software SaaS' || (i % 4 === 0 && ticketPrice < 1500);
    const recurringDetails = isRecurring 
      ? `$${Math.round(ticketPrice * 0.25)}/mês recorrente (30% de comissão perpétua sobre mensalidades ativas)`
      : undefined;

    // EPC & CVR
    const rawEPC = 2.0 + ((i * 19) % 150) / 10; // $2.00 to $17.00
    const estimatedEPC = Number(rawEPC.toFixed(2));
    const rawCVR = 2.2 + ((i * 13) % 55) / 10; // 2.2% to 7.7%
    const conversionRateEst = Number(rawCVR.toFixed(1));

    // Profitability Score (65 to 99)
    let score = Math.round(70 + (commissionPayoutUSD / 120) + (estimatedEPC * 1.5) + (conversionRateEst * 1.2));
    if (score > 99) score = 99;
    if (score < 68) score = 68;

    let profitabilityGrade: 'A+' | 'A' | 'B+' | 'B' = 'B';
    if (score >= 93) profitabilityGrade = 'A+';
    else if (score >= 85) profitabilityGrade = 'A';
    else if (score >= 75) profitabilityGrade = 'B+';

    // Producer details
    const company = nicheConfig.producerCompanies[i % nicheConfig.producerCompanies.length];
    const host = nicheConfig.hosts[i % nicheConfig.hosts.length];
    const jvMgr = nicheConfig.jvManagers[(i * 2) % nicheConfig.jvManagers.length];
    const slugName = theme.title.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 24);

    const jvPrize = JV_PRIZES_LIST[i % JV_PRIZES_LIST.length];
    const cookieDuration = COOKIE_DURATIONS[(i * 3) % COOKIE_DURATIONS.length];

    // Pick 4 assets, 3 traffic, 3 pros, 2 cautions
    const assets = [
      MARKETING_ASSETS_POOL[i % MARKETING_ASSETS_POOL.length],
      MARKETING_ASSETS_POOL[(i + 2) % MARKETING_ASSETS_POOL.length],
      MARKETING_ASSETS_POOL[(i + 4) % MARKETING_ASSETS_POOL.length],
      MARKETING_ASSETS_POOL[(i + 6) % MARKETING_ASSETS_POOL.length]
    ];

    const traffic = [
      theme.traffic[0],
      theme.traffic[1] || 'Meta Ads (IG/FB)',
      theme.traffic[2] || 'YouTube In-Stream'
    ];

    const pros = [
      PROS_LIST[i % PROS_LIST.length],
      PROS_LIST[(i + 3) % PROS_LIST.length],
      PROS_LIST[(i + 5) % PROS_LIST.length]
    ];

    const cautions = [
      CAUTIONS_LIST[i % CAUTIONS_LIST.length],
      CAUTIONS_LIST[(i + 2) % CAUTIONS_LIST.length]
    ];

    const endDay = monthDay + (type.includes('Summit') || type.includes('Mastermind') ? 2 : 0);
    const dateDisplay = type.includes('Summit') || type.includes('Mastermind')
      ? `${monthDay} a ${Math.min(endDay, 30)} de ${monthObj.month}`
      : `${monthDay} de ${monthObj.month}`;

    // Item name with unique index distinction
    const namePrefix = i > 36 ? `Edition #${i} - ` : '';
    const cleanName = `${theme.title} ${namePrefix}(Q4 2026)`;

    items.push({
      id: i,
      name: cleanName,
      tagline: theme.tagline,
      type,
      niche: nicheConfig.niche,
      date: isoDate,
      dateDisplay,
      month: monthObj.month,
      location: cityVenueObj.city,
      venue,
      ticketPrice,
      ticketTier,
      commissionPercent,
      commissionPayoutUSD,
      recurring: isRecurring,
      recurringDetails,
      estimatedEPC,
      conversionRateEst,
      cookieDuration,
      profitabilityScore: score,
      profitabilityGrade,
      jvContestPrizes: jvPrize,
      hasAffiliateProgram: true,
      affiliateStatus,
      affiliatePlatform: platform,
      affiliateSignupUrl: `https://affiliates.${slugName}-2026.com/join?ref=radar-usa&id=${i}`,
      producer: {
        name: company,
        host: host.name,
        title: host.title,
        contactEmail: `jv@${slugName.replace(/[^a-z]/g, '')}.com`,
        jvManager: jvMgr,
        telegram: `@${jvMgr.toLowerCase().replace(/[^a-z]/g, '')}_jvpartner`,
        skypeOrWhatsApp: `+1 (555) ${300 + (i % 600)}-${1000 + (i % 8000)}`,
        website: `https://www.${slugName}-summit.com`,
        reputationScore: Number((4.3 + ((i * 7) % 7) / 10).toFixed(1))
      },
      marketingAssets: Array.from(new Set(assets)),
      recommendedTraffic: traffic,
      targetAudience: theme.audience,
      affiliatePros: pros,
      affiliateCautions: cautions
    });
  }

  return items;
}

export const ALL_500_LAUNCHES: LaunchItem[] = generate500Launches();

export const LAUNCH_STATS = {
  total: ALL_500_LAUNCHES.length,
  totalOct: ALL_500_LAUNCHES.filter(l => l.month === 'Outubro 2026').length,
  totalNov: ALL_500_LAUNCHES.filter(l => l.month === 'Novembro 2026').length,
  totalDec: ALL_500_LAUNCHES.filter(l => l.month === 'Dezembro 2026').length,
  highTicketCount: ALL_500_LAUNCHES.filter(l => l.ticketPrice >= 1000).length,
  avgCommissionPayout: Math.round(
    ALL_500_LAUNCHES.reduce((acc, curr) => acc + curr.commissionPayoutUSD, 0) / ALL_500_LAUNCHES.length
  ),
  avgEPC: (
    ALL_500_LAUNCHES.reduce((acc, curr) => acc + curr.estimatedEPC, 0) / ALL_500_LAUNCHES.length
  ).toFixed(2),
  maxCommission: Math.max(...ALL_500_LAUNCHES.map(l => l.commissionPayoutUSD)),
  topRatedCount: ALL_500_LAUNCHES.filter(l => l.profitabilityScore >= 90).length,
  recurringCount: ALL_500_LAUNCHES.filter(l => l.recurring).length,
};
