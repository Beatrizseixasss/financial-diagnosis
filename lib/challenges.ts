export interface Activity {
  id: string;
  level: number;
  type: 'earn' | 'reward';
  title: string;
  description: string;
  xp: number; // Positivo para ganho, negativo para custo
}

export interface LevelChallenge {
  level: number;
  title: string;
  activities: Activity[];
}

export const challenges: LevelChallenge[] = [
  {
    level: 1,
    title: "Nível 1: Diagnóstico Financeiro",
    activities: [
      {
        id: "l1_earn_gastos",
        level: 1,
        type: 'earn',
        title: "Liste seus Ganhos e Gastos",
        description: "Liste na plataforma todas as suas fontes de renda e os seus gastos do último mês, categorizando (moradia, transporte, alimentação, lazer etc.).",
        xp: 20,
      },
      {
        id: "l1_earn_dividas",
        level: 1,
        type: 'earn',
        title: "Registre suas Dívidas",
        description: "Registre todas as suas dívidas atuais na plataforma (valor total, parcelas, taxa de juros e vencimento).",
        xp: 20,
      },
      {
        id: "l1_reward_desconto",
        level: 1,
        type: 'reward',
        title: "Trocar 30 XP por Desconto",
        description: "Troque 30 XP Coins por 5% de desconto cumulativo em algum curso da XP Educação.",
        xp: -30,
      },
    ],
  },
  {
    level: 2,
    title: "Missão Organização e Investimentos",
    activities: [
      {
        id: "l2_earn_orcamento",
        level: 2,
        type: 'earn',
        title: "Monte um Orçamento Mensal",
        description: "Monte um orçamento mensal na plataforma, definindo quanto pretende gastar por categoria e salve o plano.",
        xp: 20,
      },
      {
        id: "l2_earn_meta",
        level: 2,
        type: 'earn',
        title: "Defina uma Meta de Poupança",
        description: "Defina e salve uma meta de poupança mensal para começar a investir (por exemplo, R$150/mês).",
        xp: 20,
      },
      {
        id: "l2_reward_tesouro",
        level: 2,
        type: 'reward',
        title: "Investir no Tesouro Educa+",
        description: "Troque 300 XP Coins por um benefício para começar a investir no Tesouro Direto Educa+, com um aporte inicial custeado.",
        xp: -300,
      },
    ],
  },
  {
    level: 3,
    title: "Missão Reserva de Emergência",
    activities: [
      {
        id: "l3_earn_calculo_reserva",
        level: 3,
        type: 'earn',
        title: "Calcule sua Reserva Ideal",
        description: "Informe seus gastos médios mensais e escolha quantos meses de segurança você quer (3, 6 ou 12 meses).",
        xp: 20,
      },
      {
        id: "l3_earn_plano_reserva",
        level: 3,
        type: 'earn',
        title: "Simule um Plano de Aporte",
        description: "Simule e salve um plano de aporte mensal (quanto investir por mês e em quanto tempo atinge a reserva ideal).",
        xp: 20,
      },
      {
        id: "l3_reward_aporte_reserva",
        level: 3,
        type: 'reward',
        title: "Aporte Inicial na Reserva",
        description: "Troque 800 XP Coins para fazer a primeira reserva de emergência na conta de investimento XP, usando esse valor como aporte.",
        xp: -800,
      },
    ],
  },
    {
    level: 4,
    title: "Nível 4: Renda Passiva com FIIs",
    activities: [
      {
        id: "l4_earn_quiz_fii",
        level: 4,
        type: 'earn',
        title: "Faça o Quiz sobre FIIs",
        description: "Consuma um conteúdo sobre fundos imobiliários com foco em XP Malls (XPML11) e responda um quiz com nota mínima.",
        xp: 20,
      },
      {
        id: "l4_earn_simulacao_fii",
        level: 4,
        type: 'earn',
        title: "Simule sua Renda com FIIs",
        description: "Simule e salve um objetivo de renda mensal com FIIs (quanto deseja receber por mês e quanto precisaria investir para isso).",
        xp: 20,
      },
      {
        id: "l4_reward_investir_fii",
        level: 4,
        type: 'reward',
        title: "Investir R$500 em XPML11",
        description: "Troque 1000 XP Coins por R$500,00 em cotas de XP Malls (XPML11), começando a gerar renda com dividendos.",
        xp: -1000,
      },
    ],
  },
];