import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { launch, customFocus } = await req.json();

    if (!launch || !launch.name) {
      return NextResponse.json({ error: 'Dados do lançamento são obrigatórios.' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Chave GEMINI_API_KEY não configurada no servidor.' }, { status: 500 });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const prompt = `Você é um Estrategista Sênior de Tráfego Pago e Copywriting de Resposta Direta focado no mercado norte-americano (EUA) para Super Afiliados.
Crie um dossiê tático completo de campanha para o seguinte lançamento agendado para o 4º trimestre de 2026 nos Estados Unidos:

DADOS DO LANÇAMENTO:
- Nome: ${launch.name}
- Nicho: ${launch.niche}
- Tipo: ${launch.type}
- Data/Período: ${launch.dateDisplay} (${launch.month})
- Local/Venue: ${launch.location} (${launch.venue})
- Ticket Médio do Produto/Evento: $${launch.ticketPrice} USD
- Comissão por Venda: ${launch.commissionPercent}% ($${launch.commissionPayoutUSD} USD)
- Recorrência: ${launch.recurring ? 'Sim (' + (launch.recurringDetails || '') + ')' : 'Não (Pagamento Único)'}
- EPC Estimado: $${launch.estimatedEPC} USD | Taxa de Conversão Estimada: ${launch.conversionRateEst}%
- Duração do Cookie: ${launch.cookieDuration}
- Concurso/Premiação JV: ${launch.jvContestPrizes}
- Produtor / Organizador: ${launch.producer?.name} (Host: ${launch.producer?.host}, ${launch.producer?.title})
- Canais de Tráfego Recomendados: ${launch.recommendedTraffic?.join(', ')}
- Público-Alvo: ${launch.targetAudience}
${customFocus ? `- Foco adicional solicitado pelo usuário: ${customFocus}` : ''}

Forneça uma resposta detalhada, profissional e diretamente aplicável em português (mantendo termos técnicos de media buying e os textos de anúncios em inglês com tradução explicativa para os EUA):

1. **Ângulo Central de Venda & Proposta Única de Valor (EUA Q4 2026)**
- Por que o público americano vai comprar esta oferta neste trimestre específico.
- Dor primária vs. Solução inevitável.

2. **3 Criativos de Anúncios Prontos para Uso:**
   - **Google Ads Search:** 3 Títulos (Headlines até 30 chars em inglês) e 2 Descrições (até 90 chars em inglês).
   - **Meta Ads (Facebook/Instagram):** 1 Gancho de Parada de Scroll (Hook) + Corpo (Primary Text em inglês) + Chamada para Ação (CTA).
   - **YouTube In-Stream (Vídeo):** Roteiro estruturado de 45 segundos (Hook de 5s, Agitação da dor, Demonstração de autoridade, Chamada para clicar no link de afiliado).

3. **Segmentação Detalhada de Tráfego (US Market):**
   - Interesses / Keywords para Meta & Google Ads no mercado americano.
   - Demografia recomendada (Idade, Renda Familiar Top 25%, Cargos/Profissões).

4. **Swipe de Email de Alta Conversão (Affiliate Presell):**
   - 3 Linhas de Assunto com alta taxa de abertura (>45% open rate).
   - Corpo do email persuasivo em tom pessoal convidando para a página de vendas / webinar com gatilho de escassez da data de 2026.

5. **Lista de Palavras-Chave Negativas & Cuidado Crítico de ROI:**
   - Termos negativos essenciais para não queimar orçamento no Google Ads.
   - Ponto de atenção para garantir que o afiliado tenha lucro positivo e evite banimentos ou tráfego frio desqualificado.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    return NextResponse.json({ result: response.text });
  } catch (error: any) {
    console.error('Erro na rota de geração Gemini:', error);
    return NextResponse.json(
      { error: error?.message || 'Erro ao gerar campanha de afiliado com IA.' },
      { status: 500 }
    );
  }
}
