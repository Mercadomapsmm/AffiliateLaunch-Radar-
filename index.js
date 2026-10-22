/**
 * AffiliateLaunch Radar USA Q4 2026
 * Standalone Client & Node.js Server Runtime
 * 
 * Este arquivo funciona tanto como script interativo para o index.html no navegador,
 * quanto como servidor HTTP Node.js autônomo ao ser executado via `node index.js`.
 */

// ==========================================
// 1. GERADOR DO BANCO DE DADOS DOS 500 LANÇAMENTOS
// ==========================================
const US_CITIES = [
  { city: 'Las Vegas, NV', venues: ['Caesars Forum Convention Center', 'The Venetian Expo Center', 'Bellagio Resort Ballroom', 'Mandalay Bay Convention Center'] },
  { city: 'Miami, FL', venues: ['Miami Beach Convention Center', 'Fontainebleau Hotel & Resort', 'JW Marriott Marquis Miami', 'Mana Wynwood Center'] },
  { city: 'Austin, TX', venues: ['Austin Convention Center', 'JW Marriott Austin Downtown', 'Palmero Center for Innovation'] },
  { city: 'Orlando, FL', venues: ['Orange County Convention Center', 'Hilton Orlando Bonnet Creek', 'Rosen Shingle Creek Hub'] },
  { city: 'San Francisco, CA', venues: ['Moscone Convention Center', 'Palace of Fine Arts Center', 'Hyatt Regency Embarcadero'] },
  { city: 'New York, NY', venues: ['Jacob K. Javits Convention Center', 'Marriott Marquis Times Square', 'Pier 60 Chelsea Piers'] },
  { city: 'Scottsdale, AZ', venues: ['The Phoenician Luxury Resort', 'Westin Kierland Resort Center'] },
  { city: 'San Diego, CA', venues: ['San Diego Convention Center', 'Manchester Grand Hyatt Bayfront'] },
  { city: 'Chicago, IL', venues: ['McCormick Place Chicago', 'Navy Pier Festival Hall'] },
  { city: 'Dallas, TX', venues: ['Kay Bailey Hutchison Center', 'Omni Dallas Convention Hotel'] },
  { city: 'Nashville, TN', venues: ['Music City Center', 'Gaylord Opryland Resort Center'] },
  { city: 'Online / Transmissão USA', venues: ['Estúdio Transmissão 4K Virtual (EUA)', 'Plataforma Interativa Live Broadcast EUA'] }
];

const NICHES = [
  {
    niche: 'IA & Automação',
    types: ['Software SaaS', 'Summit Presencial', 'Treinamento / Bootcamp', 'Mastermind High-Ticket'],
    platforms: ['PartnerStack', 'Impact Radius', 'ClickBank', 'ShareASale', 'Direct / Portal Próprio'],
    baseTicket: 397,
    ticketSpread: 2600,
    commPercentRange: [30, 50],
    companies: ['NeuralFlow Systems LLC', 'Synthetix AI Labs', 'AutoPrompt Global', 'Cognitive Growth Media', 'VectorScale AI Inc'],
    jvManagers: ['Tyler Evans', 'Sarah Jenkins', 'Marcus Vance', 'Elena Rostova', 'Chloe Bennett'],
    hosts: ['Dr. Raymond Sterling', 'Marcus Sterling', 'Elena Chen', 'David K. Hoffman'],
    titles: [
      { t: 'Autonomous AI Agents & Enterprise Funnels Summit', sub: 'Construa e monetize ecossistemas de agentes autônomos para empresas americanas' },
      { t: 'Prompt-to-Profit 2026 AI Product Launch', sub: 'Ferramenta SaaS de geração e otimização contínua de criativos de alta conversão' },
      { t: 'Voice AI & Inbound Sales Bot Accelerator', sub: 'Software e treinamento para substituir atendimentos telefônicos com agentes de voz ultra-humanos' },
      { t: 'Synthetix Video AI Creator Engine Launch', sub: 'Plataforma para criação de VSLs e criativos em vídeo gerados 100% por IA com atores virtuais' }
    ]
  },
  {
    niche: 'Tráfego & Marketing',
    types: ['Summit Presencial', 'Software SaaS', 'Treinamento / Bootcamp', 'Mastermind High-Ticket'],
    platforms: ['ClickBank', 'JVZoo', 'Everflow', 'ShareASale', 'Direct / Portal Próprio'],
    baseTicket: 497,
    ticketSpread: 3200,
    commPercentRange: [40, 60],
    companies: ['OmniMedia Acquisitions Inc', 'Traffic Titans Media Group', 'AdScale Ventures', 'Apex Media Buying Network'],
    jvManagers: ['Braden Cole', 'Brittany Hughes', 'Derrick Vance', 'Austin Reed'],
    hosts: ['Jason Vance', 'Samantha Brooks', 'Logan McAllister', 'Victor Santos'],
    titles: [
      { t: 'Traffic & Conversion Scale World Congress 2026', sub: 'O encontro definitivo dos maiores media buyers e donos de ofertas de resposta direta dos EUA' },
      { t: 'Quantum Funnels V4: High-Yield Media Buying Suite', sub: 'Suite completa com tracking S2S, cloaking ético e otimização algorítmica de lances' },
      { t: '8-Figure VSL Mastery & Copy Blueprint', sub: 'Treinamento com 40 modelos de cartas de vendas em vídeo que faturaram mais de $10M cada' },
      { t: 'OmniTraffic USA Summit: Native Ads & Search Arbitrage', sub: 'Estratégias de arbitragem em Taboola, Outbrain e Google Search Feed para margens de 45%+' }
    ]
  },
  {
    niche: 'E-Commerce & Amazon',
    types: ['Summit Presencial', 'Treinamento / Bootcamp', 'Software SaaS', 'Mastermind High-Ticket'],
    platforms: ['Impact Radius', 'ShareASale', 'PartnerStack', 'ClickBank', 'Direct / Portal Próprio'],
    baseTicket: 697,
    ticketSpread: 3800,
    commPercentRange: [35, 50],
    companies: ['BrandForge Capital', 'Amazon Empire Builders', 'DTC Growth Collective', 'PrimeScale Accelerators LLC'],
    jvManagers: ['Kyle Richardson', 'Hannah Miller', 'Trevor Blake', 'Jessica Ward'],
    hosts: ['Chadwick Montgomery', 'Jessica Lin', 'Brandon Cole', 'Melissa Sterling'],
    titles: [
      { t: 'Amazon FBA & Omnichannel Sellers Expo 2026', sub: 'Estratégias de ranking, catálogo internacional e PPC de elite para vendedores norte-americanos' },
      { t: 'TikTok Shop USA Super-Affiliate Scale Bootcamp', sub: 'Como gerar $50k/dia recrutando criadores e escalando anúncios no TikTok Shop Live EUA' },
      { t: 'Private Label Millionaire Summit 2026', sub: 'Construa marcas proprietárias de alto valuation com saída programada para fundos de Private Equity' },
      { t: 'BrandPulse AI: Predictive Inventory & Pricing SaaS', sub: 'Software SaaS para previsão de demanda, pricing dinâmico e gestão de margem no Shopify & Amazon' }
    ]
  },
  {
    niche: 'Investimentos & Imóveis',
    types: ['Summit Presencial', 'Mastermind High-Ticket', 'Treinamento / Bootcamp', 'Software SaaS'],
    platforms: ['Direct / Portal Próprio', 'ClickBank', 'ShareASale', 'Everflow'],
    baseTicket: 1497,
    ticketSpread: 6500,
    commPercentRange: [30, 45],
    companies: ['Apex Real Estate Acquisitions', 'Capital Wealth Partners LLC', 'Multifamily Mastery Summit Inc', 'Freedom Wealth Conferences'],
    jvManagers: ['Harrison Wells', 'Amanda Sterling', 'Gregory Vance', 'Patricia O\'Connor'],
    hosts: ['Arthur Pendelton', 'Rachel Rosenthal', 'Derrick Armstrong', 'Clara Delacroix'],
    titles: [
      { t: 'Commercial Real Estate Syndication Summit 2026', sub: 'Como captar fundos, negociar imóveis comerciais e gerar renda passiva sem capital inicial próprio' },
      { t: 'Multifamily Wealth Accelerator Mastermind', sub: 'Encontro VIP em resort com imersão de 3 dias para fechar pools de compra de condomínios residenciais' },
      { t: 'Tax-Free Real Estate & Asset Shield Conference', sub: 'Estratégias avançadas de 1031 Exchange, trusts familiares e depreciação acelerada' },
      { t: 'PropTech DealFinder AI Software Launch', sub: 'Algoritmo que analisa 200.000 propriedades por segundo para encontrar leilões com descontos de até 40%' }
    ]
  },
  {
    niche: 'Biohacking & Saúde',
    types: ['Summit Presencial', 'Treinamento / Bootcamp', 'Produto Físico / DTC', 'Mastermind High-Ticket'],
    platforms: ['ClickBank', 'ShareASale', 'Impact Radius', 'Direct / Portal Próprio'],
    baseTicket: 297,
    ticketSpread: 2200,
    commPercentRange: [40, 75],
    companies: ['Optima Longevity Labs', 'Cellular Renewal Institute', 'Peak Human Biohacking Summit LLC', 'NeuroVital Supplements'],
    jvManagers: ['Devon Clark', 'Chloe Summers', 'Sean Gallagher', 'Brianna Hayes'],
    hosts: ['Dr. Julian Thorne', 'Dr. Evelyn Morales', 'Brett Sterling', 'Dr. Gregory Chase'],
    titles: [
      { t: 'American Longevity & Biohacking World Expo 2026', sub: 'O maior congresso de medicina preventiva, peptídeos, câmaras hiperbáricas e extensão da vida' },
      { t: 'NeuroOptima: Nootropic Smart Protocol Launch', sub: 'Fórmula nootrópica clínica com aprovação FDA para foco cirúrgico e reversão da fadiga mental' },
      { t: 'Cellular Reset 30-Day Metabolic Immersion', sub: 'Protocolo completo de jejum assistido, regulação de insulina e limpeza autofágica guiado por médicos' },
      { t: 'Peak Sleep & Circadian Biology System', sub: 'Dispositivo e treinamento para induzir sono profundo N3 e aumentar HRV em 35% em 14 dias' }
    ]
  },
  {
    niche: 'Finanças & Trading',
    types: ['Software SaaS', 'Treinamento / Bootcamp', 'Mastermind High-Ticket', 'Summit Presencial'],
    platforms: ['ClickBank', 'ShareASale', 'Direct / Portal Próprio', 'Everflow'],
    baseTicket: 597,
    ticketSpread: 3500,
    commPercentRange: [40, 50],
    companies: ['WallStreet Quantum Traders LLC', 'AlphaSignal Strategies Inc', 'Apex Wealth Systems', 'Institutional Edge Media'],
    jvManagers: ['Dominic Russo', 'Tara Campbell', 'Garrett Sullivan', 'Kendall Brooks'],
    hosts: ['Vincent Moretti', 'Alicia Kensington', 'Jonathan Pierce', 'Leonard Vance'],
    titles: [
      { t: 'Institutional Edge Trading Conference 2026', sub: 'Aprenda os fluxos de ordens e dark pools que os grandes bancos de Wall Street utilizam' },
      { t: 'AlphaSignal Pro: Automated Options Flow SaaS', sub: 'Scanner em tempo real que detecta movimentações anômalas de smart money em opções de SPY e QQQ' },
      { t: 'Zero-DTE Gamma Scalper Masterclass', sub: 'Estratégia precisa de contratos de opções de vencimento no mesmo dia com risco controlado' },
      { t: 'Dividend Compounding Wealth System 2026', sub: 'Como construir uma carteira com renda perpétua de dividendos em dólar pagando mensalmente' }
    ]
  },
  {
    niche: 'Infoprodutos & Mentoria',
    types: ['Mastermind High-Ticket', 'Summit Presencial', 'Treinamento / Bootcamp', 'Software SaaS'],
    platforms: ['Skool / Stripe', 'ClickBank', 'JVZoo', 'Direct / Portal Próprio'],
    baseTicket: 997,
    ticketSpread: 5000,
    commPercentRange: [40, 60],
    companies: ['Elite Creator Labs Inc', 'Mentorship Scale Systems LLC', 'Course Empire Media', 'Mastermind Titans Group'],
    jvManagers: ['Tristan Ross', 'Sierra Bailey', 'Colton Bryant', 'Danielle Foster'],
    hosts: ['Kaelen Brody', 'Danielle Croft', 'Harrison Price', 'Seraphina Reed'],
    titles: [
      { t: 'High-Ticket Mastermind & Skool Community Summit 2026', sub: 'Como faturar $100k/mês com comunidades de assinatura e programas de mentoria de alto valor' },
      { t: 'Zero-to-Scale Webinar & Challenge Blueprint', sub: 'O formato exato de desafios de 5 dias e webinars com fechamento de vendas acima de 12%' },
      { t: 'Executive Ghostwriting & Authority Monopolization', sub: 'Treinamento para transformar CEOs em celebridades do LinkedIn com contratos de $15k/mês' },
      { t: 'Evergreen Funnel Automated Engine Launch', sub: 'Sistema completo que substitui lançamentos desgastantes por funis perpétuos de vendas diárias' }
    ]
  },
  {
    niche: 'Cripto & Web3',
    types: ['Summit Presencial', 'Software SaaS', 'Treinamento / Bootcamp', 'Mastermind High-Ticket'],
    platforms: ['Direct / Portal Próprio', 'PartnerStack', 'Everflow', 'ShareASale'],
    baseTicket: 797,
    ticketSpread: 4200,
    commPercentRange: [30, 45],
    companies: ['Consensus Capital Events', 'DeFi Vanguard Technologies', 'BlockAlpha Analytics LLC', 'Satoshi Global Summits'],
    jvManagers: ['Dexter Hayes', 'Sloan Gallagher', 'Gavin Bradley', 'Tessa Monroe'],
    hosts: ['Sebastian Cruz', 'Natasha Romanov', 'Ethan Zhao', 'Julian Vance'],
    titles: [
      { t: 'North American Web3 & Real World Assets (RWA) Summit 2026', sub: 'Onde fundos institucionais e protocolos DeFi tokenizam trilhões em dívida e imóveis' },
      { t: 'OnChain Alpha Bot: Whale Wallet Tracker SaaS', sub: 'Software de inteligência que envia alertas antes de pumps institucionais com 88% de acerto' },
      { t: 'Automated Yield Farming & Staking Protocol Launch', sub: 'Plataforma para capturar rendimentos de 15% a 28% a.a. em stablecoins indexadas ao dólar' },
      { t: 'Crypto Institutional Compliance & Custody Expo', sub: 'Painéis com reguladores dos EUA, gestores de ETFs de Bitcoin e custody houses globais' }
    ]
  },
  {
    niche: 'B2B SaaS & Tech',
    types: ['Software SaaS', 'Summit Presencial', 'Treinamento / Bootcamp', 'Mastermind High-Ticket'],
    platforms: ['PartnerStack', 'Impact Radius', 'Direct / Portal Próprio', 'ShareASale'],
    baseTicket: 897,
    ticketSpread: 4800,
    commPercentRange: [30, 40],
    companies: ['HyperGrowth SaaS Coalition', 'RevOps Leaders Inc', 'CloudScale Technologies LLC', 'Enterprise Horizons Media'],
    jvManagers: ['Warren Hughes', 'Brooke Sterling', 'Leland Cooper', 'Paige Campbell'],
    hosts: ['Devin Davenport', 'Courtney Bennett', 'Ian Fletcher', 'Zoe Montgomery'],
    titles: [
      { t: 'Enterprise RevOps & AI Sales Stack Summit 2026', sub: 'Como times comerciais B2B fecham contas de $500k+ utilizando IA preditiva e automação de pipeline' },
      { t: 'PipelineGen AI: Cold Email & LinkedIn Outbound SaaS', sub: 'Plataforma que personaliza vídeos e emails para 10.000 decisores com taxa de abertura de 62%' },
      { t: 'Zero Trust Cybersecurity & Compliance Bootcamp', sub: 'Treinamento preparatório para adequação a normas federais americanas de proteção de dados' },
      { t: 'SaaS Founder Exit & Valuation Mastermind', sub: 'Imersão restrita para fundadores de SaaS que faturam acima de $2M ARR visando M&A com múltiplos de 12x+' }
    ]
  }
];

const JV_PRIZES = [
  '$100,000 Cash Pool + Porsche Taycan para o 1º Lugar',
  '$50,000 Leaderboard Contest + Rolex Submariner',
  '$75,000 em Prêmios em Dinheiro Direto no Pix/Stripe',
  '$25,000 Concurso de Afiliados (Top 10 Premiados)',
  '$150,000 Mega JV Contest (Viagem de Luxo a Bora Bora inclusa)',
  '$35,000 Cash Leaderboard + Bônus por Volume de Vendas',
  '$60,000 Pool de Premiações + MacBooks Pro M4 para top afiliados'
];

function generate500LaunchesDataset() {
  const launches = [];
  const months = [
    { m: 'Outubro 2026', num: '10', days: 31 },
    { m: 'Novembro 2026', num: '11', days: 30 },
    { m: 'Dezembro 2026', num: '12', days: 28 }
  ];

  for (let i = 1; i <= 500; i++) {
    let monthObj = months[0];
    let day = 1;
    if (i <= 170) {
      monthObj = months[0];
      day = ((i * 7) % 30) + 1;
    } else if (i <= 340) {
      monthObj = months[1];
      day = (((i - 170) * 11) % 29) + 1;
    } else {
      monthObj = months[2];
      day = (((i - 340) * 13) % 27) + 1;
    }

    const dayStr = day < 10 ? '0' + day : '' + day;
    const dateStr = '2026-' + monthObj.num + '-' + dayStr;

    const nicheConf = NICHES[(i - 1) % NICHES.length];
    const titleObj = nicheConf.titles[(i + Math.floor(i / 9)) % nicheConf.titles.length];
    const type = nicheConf.types[(i + 2) % nicheConf.types.length];
    const cityObj = US_CITIES[(i * 3) % US_CITIES.length];
    const venue = cityObj.venues[(i + 1) % cityObj.venues.length];
    const platform = nicheConf.platforms[(i * 5) % nicheConf.platforms.length];

    const ticketMod = ((i * 47) % 100) / 100;
    const rawTicket = Math.round((nicheConf.baseTicket + nicheConf.ticketSpread * ticketMod) / 10) * 10 - 3;
    const ticketPrice = Math.max(97, rawTicket);

    const minComm = nicheConf.commPercentRange[0];
    const maxComm = nicheConf.commPercentRange[1];
    const commPct = minComm + ((i * 3) % (maxComm - minComm + 1));
    const commPayoutUSD = Math.round((ticketPrice * commPct) / 100);

    const isRecurring = type === 'Software SaaS' || (i % 4 === 0 && ticketPrice < 1500);
    const rawEPC = 2.0 + ((i * 19) % 150) / 10;
    const estimatedEPC = Number(rawEPC.toFixed(2));
    const rawCVR = 2.2 + ((i * 13) % 55) / 10;
    const conversionRateEst = Number(rawCVR.toFixed(1));

    let score = Math.round(70 + (commPayoutUSD / 120) + (estimatedEPC * 1.5) + (conversionRateEst * 1.2));
    if (score > 99) score = 99;
    if (score < 68) score = 68;

    let grade = 'B';
    if (score >= 93) grade = 'A+';
    else if (score >= 85) grade = 'A';
    else if (score >= 75) grade = 'B+';

    const company = nicheConf.companies[i % nicheConf.companies.length];
    const host = nicheConf.hosts[i % nicheConf.hosts.length];
    const jvMgr = nicheConf.jvManagers[(i * 2) % nicheConf.jvManagers.length];
    const slug = titleObj.t.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 22);

    const namePrefix = i > 36 ? 'Edição #' + i + ' - ' : '';
    const cleanName = titleObj.t + ' ' + namePrefix + '(Q4 2026)';

    launches.push({
      id: i,
      name: cleanName,
      tagline: titleObj.sub,
      niche: nicheConf.niche,
      type: type,
      month: monthObj.m,
      date: dateStr,
      dateDisplay: day + ' de ' + monthObj.m,
      location: cityObj.city,
      venue: venue,
      ticketPrice: ticketPrice,
      commissionPercent: commPct,
      commissionPayoutUSD: commPayoutUSD,
      recurring: isRecurring,
      estimatedEPC: estimatedEPC,
      conversionRateEst: conversionRateEst,
      profitabilityScore: score,
      profitabilityGrade: grade,
      jvContestPrizes: JV_PRIZES[i % JV_PRIZES.length],
      affiliateStatus: i % 3 === 0 ? 'Aberto Imediato' : (i % 2 === 0 ? 'Aprovação Rápida (<24h)' : 'Convite / Whitelist'),
      affiliatePlatform: platform,
      affiliateSignupUrl: 'https://affiliates.' + slug + '-2026.com/join?ref=radar-usa&id=' + i,
      producer: {
        name: company,
        host: host,
        contactEmail: 'jv@' + slug.replace(/[^a-z]/g, '') + '.com',
        jvManager: jvMgr,
        telegram: '@' + jvMgr.toLowerCase().replace(/[^a-z]/g, '') + '_jvpartner',
        skypeOrWhatsApp: '+1 (555) ' + (300 + (i % 600)) + '-' + (1000 + (i % 8000)),
        website: 'https://www.' + slug + '-summit.com'
      }
    });
  }

  return launches;
}

const GLOBAL_LAUNCHES = generate500LaunchesDataset();

// ==========================================
// 2. COMPATIBILIDADE BROWSER (INDEX.HTML CLIENT)
// ==========================================
if (typeof window !== 'undefined') {
  window.AFFILIATE_LAUNCHES_DATA = GLOBAL_LAUNCHES;

  window.exportAllLaunchesToCsv = function() {
    const headers = [
      'ID', 'Nome_Lancamento', 'Nicho', 'Tipo_Evento', 'Mes_2026', 'Data', 
      'Local_EUA', 'Venue', 'Ticket_Medio_USD', 'Comissao_Percent', 
      'Comissao_Payout_USD', 'Recorrente_MRR', 'EPC_Estimado_USD', 'CVR_Estimada_Percent', 
      'Score_Lucratividade', 'Grade', 'Premiacao_Concurso_JV', 'Status_Programa_Afiliado', 
      'Plataforma_Afiliados', 'Empresa_Produtora', 'Host_Principal', 'Email_Contato_JV', 'Telegram_JV', 'WhatsApp_EUA'
    ];

    const rows = GLOBAL_LAUNCHES.map(function(item) {
      return [
        item.id,
        '"' + item.name.replace(/"/g, '""') + '"',
        '"' + item.niche + '"',
        '"' + item.type + '"',
        '"' + item.month + '"',
        item.date,
        '"' + item.location.replace(/"/g, '""') + '"',
        '"' + item.venue.replace(/"/g, '""') + '"',
        item.ticketPrice,
        item.commissionPercent,
        item.commissionPayoutUSD,
        item.recurring ? 'Sim' : 'Nao',
        item.estimatedEPC,
        item.conversionRateEst,
        item.profitabilityScore,
        item.profitabilityGrade,
        '"' + item.jvContestPrizes.replace(/"/g, '""') + '"',
        '"' + item.affiliateStatus + '"',
        '"' + item.affiliatePlatform + '"',
        '"' + item.producer.name.replace(/"/g, '""') + '"',
        '"' + item.producer.host.replace(/"/g, '""') + '"',
        item.producer.contactEmail,
        item.producer.telegram,
        item.producer.skypeOrWhatsApp
      ].join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', '500_lancamentos_eua_q4_2026_afiliados.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
}

// ==========================================
// 3. SERVIDOR STANDALONE NODE.JS (OPCIONAL)
// ==========================================
if (typeof process !== 'undefined' && process.versions && process.versions.node && typeof window === 'undefined') {
  const http = require('http');
  const fs = require('fs');
  const path = require('path');

  const PORT = process.env.PORT || 3000;

  const server = http.createServer(function(req, res) {
    const url = req.url || '/';

    // API de Lançamentos
    if (url === '/api/launches') {
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify(GLOBAL_LAUNCHES));
      return;
    }

    // Servir index.js caso requisitado pelo navegador
    if (url === '/index.js') {
      res.writeHead(200, { 'Content-Type': 'application/javascript; charset=utf-8' });
      fs.createReadStream(path.join(__dirname, 'index.js')).pipe(res);
      return;
    }

    // Servir index.html padrão
    const htmlPath = path.join(__dirname, 'index.html');
    if (fs.existsSync(htmlPath)) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      fs.createReadStream(htmlPath).pipe(res);
      return;
    }

    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('AffiliateLaunch Radar USA Q4 2026 - 500 Lançamentos Carregados.');
  });

  // Apenas inicia escuta caso executado diretamente via "node index.js"
  if (require.main === module) {
    server.listen(PORT, function() {
      console.log('AffiliateLaunch Radar USA Q4 2026 rodando na porta ' + PORT);
    });
  }
}
