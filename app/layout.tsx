import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'AffiliateLaunch Radar USA Q4 2026 | 500 Lançamentos & Oportunidades de Alta Comissao',
  description: 'Radar completo com os 500 maiores lançamentos de produtos, eventos, summits e treinamentos nos EUA em Outubro, Novembro e Dezembro de 2026. Analisador de lucratividade, dados de produtores, comissões e gerador de campanhas.',
  openGraph: {
    title: 'AffiliateLaunch Radar USA Q4 2026',
    description: 'Os 500 maiores lançamentos e eventos nos EUA para afiliados profissionais lucrarem em Outubro, Novembro e Dezembro de 2026.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AffiliateLaunch Radar USA Q4 2026',
    description: '500 lançamentos nos EUA para afiliados: dados de comissão, rentabilidade, contatos dos produtores e programa de afiliados.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
