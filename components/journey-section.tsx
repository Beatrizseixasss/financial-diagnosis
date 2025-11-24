"use client"

import { useState } from "react"

interface Question {
  enunciado: string
  alternativas: string[]
  correta: number
  explicacao: string
}

interface Level {
  id: string
  label: string
  perguntas: Question[]
}

interface Path {
  id: string
  name: string
  icon: string
  status: "unlocked" | "locked" | "completed"
  description: string
  niveis: Level[]
}

const initialPaths: Path[] = [
  {
    id: "fundamentos",
    name: "Fundamentos do dinheiro",
    icon: "📚",
    status: "unlocked",
    description: "Comece organizando o mês e entendendo o básico.",
    niveis: [
      {
        id: "easy",
        label: "Fácil",
        perguntas: [
          {
            enunciado: "O que é um bom primeiro passo pra começar a organizar suas finanças?",
            alternativas: [
              "Parar de olhar o extrato pra não se estressar",
              "Anotar quanto entra e quanto sai todo mês",
              "Ter vários cartões diferentes",
              "Nunca mais sair de casa",
            ],
            correta: 1,
            explicacao: "Clareza é tudo: saber quanto entra e quanto sai é a base de qualquer mudança financeira.",
          },
          {
            enunciado: "Por que é importante acompanhar seus gastos?",
            alternativas: [
              "Só pra se sentir culpado depois",
              "Para enxergar padrões e tomar decisões melhores",
              "Para seguir o que o banco manda",
              "Não faz diferença nenhuma",
            ],
            correta: 1,
            explicacao:
              "Quando você acompanha, vê onde está exagerando e consegue ajustar o rumo com menos sofrimento.",
          },
          {
            enunciado: "O que é uma reserva de emergência?",
            alternativas: [
              "Dinheiro guardado pra imprevistos, como demissão ou gasto médico",
              "Dinheiro só pra viagem",
              "Um limite extra do cartão de crédito",
              "Um empréstimo pré-aprovado",
            ],
            correta: 0,
            explicacao:
              "Reserva de emergência é um colchão financeiro que te protege de sustos sem precisar de dívidas.",
          },
          {
            enunciado: "Qual é o ideal de meses de despesa na reserva de emergência?",
            alternativas: ["1 mês", "3 a 6 meses", "12 meses", "Não precisa de reserva"],
            correta: 1,
            explicacao: "Ter de 3 a 6 meses de despesas guardadas é o ideal para se proteger de imprevistos.",
          },
          {
            enunciado: "Quando você recebe um dinheiro extra e tem dívidas caras, qual costuma ser a melhor ideia?",
            alternativas: [
              "Ignorar as dívidas e comprar algo grande",
              "Usar parte ou tudo pra reduzir a dívida cara",
              "Deixar o dinheiro parado em casa",
              "Gastar tudo com lazer",
            ],
            correta: 1,
            explicacao: "Quitar ou reduzir dívidas caras primeiro costuma ser o melhor uso do dinheiro extra.",
          },
          {
            enunciado: "Por que não é bom deixar todo o dinheiro em casa?",
            alternativas: [
              "Porque o dinheiro pode ser roubado facilmente",
              "Porque perde valor com a inflação e não rende nada",
              "Porque o banco confisca automaticamente",
              "Não tem problema nenhum",
            ],
            correta: 1,
            explicacao: "Dinheiro parado perde valor todo mês por causa da inflação. Melhor guardar rendendo algo.",
          },
        ],
      },
      {
        id: "medium",
        label: "Médio",
        perguntas: [
          {
            enunciado: "O que significa 'viver acima das suas possibilidades'?",
            alternativas: [
              "Gastar mais do que você ganha",
              "Investir em ações de risco",
              "Trabalhar muito",
              "Ter um bom salário",
            ],
            correta: 0,
            explicacao:
              "Viver acima das possibilidades significa gastar mais do que entra, o que gera dívidas e problemas financeiros.",
          },
          {
            enunciado: "O que é um orçamento pessoal?",
            alternativas: [
              "Uma lista de desejos de compras",
              "Um plano que compara receitas e despesas",
              "Um relatório do banco",
              "Um tipo de investimento",
            ],
            correta: 1,
            explicacao:
              "Orçamento pessoal é um plano detalhado que mostra quanto entra, quanto sai, e ajuda a controlar melhor o dinheiro.",
          },
          {
            enunciado: "Qual é a vantagem de ter múltiplas fontes de renda?",
            alternativas: [
              "Você pode gastar mais sem planejamento",
              "Fica menos dependente de uma única fonte e tem mais segurança",
              "Não precisa pagar impostos",
              "É obrigatório por lei",
            ],
            correta: 1,
            explicacao:
              "Ter múltiplas fontes de renda reduz o risco caso uma fonte falhe, aumentando sua segurança financeira.",
          },
          {
            enunciado: "Como você pode reduzir gastos fixos mensais?",
            alternativas: [
              "Revisando contratos e cancelando serviços não essenciais",
              "Ignorando as contas",
              "Usando mais o cartão de crédito",
              "Não tem como reduzir gastos fixos",
            ],
            correta: 0,
            explicacao:
              "Revisar assinaturas, planos e serviços regularmente ajuda a cortar o que não é mais necessário e economizar.",
          },
          {
            enunciado: "O que é inflação?",
            alternativas: [
              "O aumento geral dos preços ao longo do tempo",
              "A taxa de juros do banco",
              "Um tipo de investimento",
              "O lucro das empresas",
            ],
            correta: 0,
            explicacao:
              "Inflação é quando os preços sobem com o tempo, fazendo o dinheiro perder poder de compra se não render.",
          },
          {
            enunciado: "Qual é o primeiro passo antes de começar a investir?",
            alternativas: [
              "Comprar ações de qualquer empresa",
              "Ter uma reserva de emergência montada",
              "Pedir empréstimos",
              "Gastar todo o salário",
            ],
            correta: 1,
            explicacao:
              "Antes de investir em produtos com risco, é essencial ter uma reserva de emergência para imprevistos.",
          },
        ],
      },
      {
        id: "intermediate",
        label: "Intermediário",
        perguntas: [
          {
            enunciado: "Qual é a diferença entre renda ativa e renda passiva?",
            alternativas: [
              "Renda ativa exige trabalho contínuo, renda passiva gera retorno automático",
              "Renda ativa é ilegal, renda passiva é legal",
              "Não há diferença",
              "Renda passiva exige mais esforço",
            ],
            correta: 0,
            explicacao:
              "Renda ativa vem do seu trabalho direto (salário), enquanto renda passiva vem de investimentos e ativos que rendem sozinhos.",
          },
          {
            enunciado: "O que significa 'pagar a si mesmo primeiro'?",
            alternativas: [
              "Guardar uma parte do salário assim que receber, antes de gastar",
              "Pagar todas as contas e guardar o que sobrar",
              "Gastar com lazer antes de qualquer coisa",
              "Não fazer nenhum planejamento",
            ],
            correta: 0,
            explicacao:
              "'Pagar a si mesmo primeiro' significa separar uma quantia para investir ou guardar logo ao receber, antes de gastar.",
          },
          {
            enunciado: "Por que diversificar investimentos é importante?",
            alternativas: [
              "Para complicar as coisas sem motivo",
              "Para reduzir riscos e não depender de um único ativo",
              "Para pagar mais taxas",
              "Não faz diferença",
            ],
            correta: 1,
            explicacao:
              "Diversificar significa não colocar todos os ovos na mesma cesta, reduzindo o risco de perdas grandes.",
          },
          {
            enunciado: "O que é liquidez de um investimento?",
            alternativas: [
              "A facilidade e rapidez de transformar o investimento em dinheiro",
              "O lucro que o investimento gera",
              "O risco do investimento",
              "A cor do investimento",
            ],
            correta: 0,
            explicacao:
              "Liquidez é a facilidade de resgatar o dinheiro investido rapidamente sem perdas significativas.",
          },
          {
            enunciado: "O que são gastos variáveis?",
            alternativas: [
              "Gastos que mudam de valor todo mês, como alimentação e lazer",
              "Gastos que nunca mudam",
              "Gastos apenas com investimentos",
              "Gastos com impostos",
            ],
            correta: 0,
            explicacao:
              "Gastos variáveis são aqueles que oscilam de mês a mês, como compras no mercado, roupas e entretenimento.",
          },
          {
            enunciado: "Qual é a vantagem de automatizar investimentos mensais?",
            alternativas: [
              "Você investe com disciplina sem precisar lembrar todo mês",
              "Você paga menos impostos automaticamente",
              "Não tem vantagem nenhuma",
              "Você gasta mais dinheiro",
            ],
            correta: 0,
            explicacao:
              "Automatizar investimentos cria o hábito e garante que você invista regularmente, sem depender de disciplina manual.",
          },
        ],
      },
      {
        id: "hard",
        label: "Difícil",
        perguntas: [
          {
            enunciado: "O que é alavancagem financeira?",
            alternativas: [
              "Usar dívida ou capital de terceiros para ampliar resultados de investimentos",
              "Guardar dinheiro na poupança",
              "Pagar todas as dívidas de uma vez",
              "Não investir em nada",
            ],
            correta: 0,
            explicacao:
              "Alavancagem é usar recursos emprestados para investir, ampliando ganhos (ou perdas) potenciais.",
          },
          {
            enunciado: "O que é o custo de oportunidade?",
            alternativas: [
              "O benefício que você deixa de ter ao escolher uma opção em vez de outra",
              "O preço de um produto no mercado",
              "A taxa de juros do banco",
              "O lucro de uma empresa",
            ],
            correta: 0,
            explicacao:
              "Custo de oportunidade é o que você perde ao escolher uma alternativa, abrindo mão de outra opção.",
          },
          {
            enunciado: "O que é a regra dos 50/30/20 no orçamento pessoal?",
            alternativas: [
              "50% necessidades, 30% desejos, 20% poupança/investimentos",
              "50% lazer, 30% comida, 20% transporte",
              "50% dívidas, 30% investimentos, 20% diversão",
              "Não existe essa regra",
            ],
            correta: 0,
            explicacao:
              "A regra 50/30/20 sugere dividir a renda em necessidades (50%), desejos (30%) e poupança/investimentos (20%).",
          },
          {
            enunciado: "O que significa 'viver de renda'?",
            alternativas: [
              "Ter investimentos que geram rendimento suficiente para cobrir todas as despesas",
              "Trabalhar muito para ganhar mais",
              "Pegar empréstimos constantemente",
              "Não ter nenhuma renda",
            ],
            correta: 0,
            explicacao:
              "Viver de renda significa ter ativos que rendem o suficiente para cobrir seus custos sem precisar trabalhar ativamente.",
          },
          {
            enunciado: "Qual é a importância de revisar periodicamente seu planejamento financeiro?",
            alternativas: [
              "Para ajustar metas e estratégias conforme a vida muda",
              "Não tem importância, basta fazer uma vez",
              "Para complicar as coisas",
              "Para gastar mais dinheiro",
            ],
            correta: 0,
            explicacao:
              "Revisar o planejamento garante que suas estratégias estejam alinhadas com mudanças de vida, renda e objetivos.",
          },
          {
            enunciado: "O que é independência financeira?",
            alternativas: [
              "Ter patrimônio e renda passiva que cubram seu estilo de vida sem trabalho obrigatório",
              "Ter um emprego fixo",
              "Gastar todo o dinheiro que ganha",
              "Não ter nenhuma renda",
            ],
            correta: 0,
            explicacao:
              "Independência financeira é quando seus investimentos e renda passiva cobrem suas despesas, dando liberdade de escolha.",
          },
        ],
      },
    ],
  },
  {
    id: "cartao",
    name: "Cartão & dívidas",
    icon: "💳",
    status: "locked",
    description: "Aprenda a domar o cartão e sair do sufoco.",
    niveis: [
      {
        id: "easy",
        label: "Fácil",
        perguntas: [
          {
            enunciado: "Se você paga apenas o valor mínimo da fatura do cartão, o que acontece?",
            alternativas: [
              "O resto é perdoado pelo banco",
              "O resto vira uma dívida com juros altos que continua crescendo",
              "Nada muda, fica tudo igual",
              "A fatura é automaticamente parcelada sem juros",
            ],
            correta: 1,
            explicacao: "Ao pagar só o mínimo, o restante entra no rotativo do cartão, com juros muito altos.",
          },
          {
            enunciado: "Qual é um sinal de que suas dívidas podem estar saindo do controle?",
            alternativas: [
              "Pagar contas antes do vencimento",
              "Usar mais de 30-40% da renda só com dívidas todo mês",
              "Registrar seus gastos em um app",
              "Pagar o cartão em dia",
            ],
            correta: 1,
            explicacao: "Quando grande parte da renda vai só para dívidas, sobra pouco pra viver e investir.",
          },
          {
            enunciado: "O que normalmente é melhor em relação ao limite do cartão?",
            alternativas: [
              "Sempre usar o limite inteiro",
              "Ter um limite muito além da sua renda e usar tudo",
              "Usar o cartão como ferramenta, não como extensão da renda",
              "Evitar olhar a fatura",
            ],
            correta: 2,
            explicacao: "Cartão é ferramenta, não renda extra. Usar com consciência evita bola de neve.",
          },
          {
            enunciado: "Por que é importante pagar a fatura do cartão integralmente?",
            alternativas: [
              "Para evitar juros do rotativo",
              "Para impressionar o banco",
              "Não faz diferença",
              "Para ter mais limite",
            ],
            correta: 0,
            explicacao: "Pagar integralmente evita os juros altíssimos do rotativo e mantém suas finanças saudáveis.",
          },
          {
            enunciado: "O que fazer se você não consegue pagar a fatura inteira do cartão?",
            alternativas: [
              "Ignorar a fatura e esperar passar",
              "Negociar com o banco ou buscar alternativas com juros menores",
              "Pedir outro cartão",
              "Não fazer nada",
            ],
            correta: 1,
            explicacao: "Negociar com o banco ou buscar empréstimos com juros menores é melhor que deixar no rotativo.",
          },
          {
            enunciado: "Qual é o risco de ter muitos cartões de crédito?",
            alternativas: [
              "Perder o controle dos gastos e se endividar facilmente",
              "Nenhum risco, quanto mais melhor",
              "Você ganha mais pontos automaticamente",
              "Os cartões se cancelam sozinhos",
            ],
            correta: 0,
            explicacao: "Ter muitos cartões dificulta o controle e aumenta o risco de gastar além do que pode.",
          },
        ],
      },
      {
        id: "medium",
        label: "Médio",
        perguntas: [
          {
            enunciado: "O que é o rotativo do cartão de crédito?",
            alternativas: [
              "Um empréstimo automático com juros altíssimos quando você não paga o total",
              "Um programa de pontos",
              "Uma taxa fixa mensal",
              "Um desconto especial",
            ],
            correta: 0,
            explicacao:
              "O rotativo é um dos créditos mais caros do mercado, ativado automaticamente quando não se paga a fatura completa.",
          },
          {
            enunciado: "Qual é a melhor estratégia ao usar cartão de crédito?",
            alternativas: [
              "Gastar o máximo possível para acumular pontos",
              "Usar apenas o que você pode pagar integralmente na fatura",
              "Sempre pagar o mínimo",
              "Não se preocupar com limites",
            ],
            correta: 1,
            explicacao: "Use o cartão apenas se puder pagar tudo na fatura, evitando juros e mantendo controle.",
          },
          {
            enunciado: "O que é parcelamento sem juros no cartão?",
            alternativas: [
              "Dividir uma compra em vezes sem custo adicional",
              "Um tipo de empréstimo com juros altos",
              "Uma taxa extra do banco",
              "Não existe parcelamento sem juros",
            ],
            correta: 0,
            explicacao:
              "Parcelamento sem juros divide o valor em vezes iguais sem custo adicional, desde que você pague as faturas.",
          },
          {
            enunciado: "Como evitar fraudes no cartão de crédito?",
            alternativas: [
              "Nunca verificar extratos",
              "Verificar extratos regularmente e reportar atividades suspeitas",
              "Compartilhar senha e CVV com todos",
              "Não ligar para o banco",
            ],
            correta: 1,
            explicacao: "Verificar extratos frequentemente ajuda a identificar transações não autorizadas rapidamente.",
          },
          {
            enunciado: "O que fazer se você já está endividado no cartão?",
            alternativas: [
              "Parar de usar o cartão e fazer um plano de pagamento",
              "Pegar mais cartões",
              "Ignorar as faturas",
              "Continuar gastando normalmente",
            ],
            correta: 0,
            explicacao: "Parar de usar o cartão e criar um plano de pagamento é o primeiro passo para sair da dívida.",
          },
          {
            enunciado: "Qual é a vantagem de cartões com programa de pontos?",
            alternativas: [
              "Acumular benefícios ao fazer compras que você já faria",
              "Permite gastar sem limite",
              "Não tem vantagem",
              "Perdoa dívidas automaticamente",
            ],
            correta: 0,
            explicacao: "Programas de pontos são úteis se você usa o cartão com responsabilidade e paga integralmente.",
          },
        ],
      },
      {
        id: "intermediate",
        label: "Intermediário",
        perguntas: [
          {
            enunciado: "O que é refinanciamento de dívidas?",
            alternativas: [
              "Trocar uma dívida cara por outra com juros menores",
              "Ignorar a dívida original",
              "Aumentar a dívida propositalmente",
              "Não pagar nenhuma dívida",
            ],
            correta: 0,
            explicacao:
              "Refinanciar significa trocar uma dívida cara (como rotativo) por outra mais barata, economizando juros.",
          },
          {
            enunciado: "O que é o score de crédito?",
            alternativas: [
              "Uma pontuação que mostra seu histórico de pagamentos e confiabilidade",
              "O limite do seu cartão",
              "Uma taxa de juros fixa",
              "Um tipo de investimento",
            ],
            correta: 0,
            explicacao:
              "Score de crédito é uma nota que reflete seu comportamento financeiro e facilita ou dificulta conseguir crédito.",
          },
          {
            enunciado: "Como melhorar seu score de crédito?",
            alternativas: [
              "Pagar contas em dia e manter dívidas baixas",
              "Nunca usar crédito",
              "Pedir muitos empréstimos ao mesmo tempo",
              "Atrasar pagamentos propositalmente",
            ],
            correta: 0,
            explicacao:
              "Pagar em dia, usar crédito com responsabilidade e manter dívidas controladas aumenta seu score.",
          },
          {
            enunciado: "O que é a taxa de juros anual (taxa efetiva) de um cartão?",
            alternativas: [
              "A taxa total de juros que você paga ao longo de um ano no rotativo",
              "Uma taxa fixa mensal",
              "Um desconto anual",
              "Não existe essa taxa",
            ],
            correta: 0,
            explicacao:
              "A taxa efetiva anual mostra o custo real do crédito ao longo de um ano, incluindo juros compostos.",
          },
          {
            enunciado: "Por que é importante ler o contrato do cartão de crédito?",
            alternativas: [
              "Para entender taxas, juros e condições antes de aceitar",
              "Não é importante, o banco decide tudo",
              "Para perder tempo",
              "Contratos não precisam ser lidos",
            ],
            correta: 0,
            explicacao: "Ler o contrato evita surpresas com taxas escondidas e ajuda a entender seus direitos.",
          },
          {
            enunciado: "O que fazer se você perdeu seu cartão de crédito?",
            alternativas: [
              "Bloquear imediatamente e avisar o banco",
              "Esperar aparecer",
              "Continuar usando normalmente",
              "Não fazer nada",
            ],
            correta: 0,
            explicacao: "Bloquear rapidamente evita fraudes e protege seu dinheiro de transações não autorizadas.",
          },
        ],
      },
      {
        id: "hard",
        label: "Difícil",
        perguntas: [
          {
            enunciado: "O que é a portabilidade de dívida?",
            alternativas: [
              "Transferir uma dívida de uma instituição para outra com condições melhores",
              "Cancelar a dívida automaticamente",
              "Aumentar o valor da dívida",
              "Não pagar nenhuma instituição",
            ],
            correta: 0,
            explicacao:
              "Portabilidade permite levar sua dívida para outro banco com juros menores, economizando no total.",
          },
          {
            enunciado: "Como calcular o custo total de um parcelamento com juros?",
            alternativas: [
              "Multiplicar o número de parcelas pelo valor de cada parcela",
              "Apenas olhar o valor da primeira parcela",
              "Não é possível calcular",
              "Ignorar os juros",
            ],
            correta: 0,
            explicacao:
              "Multiplicar parcelas pelo valor mensal mostra o total pago, incluindo juros, ajudando a comparar opções.",
          },
          {
            enunciado: "O que é uma dívida boa versus uma dívida ruim?",
            alternativas: [
              "Dívida boa gera valor (educação, imóvel), dívida ruim financia consumo sem retorno",
              "Toda dívida é boa",
              "Toda dívida é ruim",
              "Não há diferença",
            ],
            correta: 0,
            explicacao:
              "Dívidas boas geram retorno futuro (como investir em educação), enquanto dívidas ruins só geram despesas.",
          },
          {
            enunciado: "Qual é o impacto de atrasar uma parcela do cartão no seu score?",
            alternativas: [
              "Reduz o score e dificulta conseguir crédito no futuro",
              "Aumenta o score automaticamente",
              "Não tem impacto nenhum",
              "O banco te recompensa",
            ],
            correta: 0,
            explicacao:
              "Atrasos ficam registrados e reduzem seu score, dificultando acesso a crédito e aumentando juros.",
          },
          {
            enunciado: "O que é a bola de neve da dívida como estratégia de pagamento?",
            alternativas: [
              "Pagar primeiro as dívidas menores para ganhar motivação e depois as maiores",
              "Ignorar todas as dívidas",
              "Pagar sempre o mínimo de todas",
              "Não ter estratégia nenhuma",
            ],
            correta: 0,
            explicacao:
              "A bola de neve foca em quitar dívidas pequenas primeiro, gerando motivação para continuar pagando as maiores.",
          },
          {
            enunciado: "O que é a avalanche da dívida como estratégia de pagamento?",
            alternativas: [
              "Pagar primeiro as dívidas com maiores juros para economizar mais no longo prazo",
              "Pagar dívidas aleatoriamente",
              "Não pagar nenhuma dívida",
              "Sempre pagar o mínimo",
            ],
            correta: 0,
            explicacao:
              "A avalanche prioriza dívidas com juros mais altos, economizando mais dinheiro no total ao longo do tempo.",
          },
        ],
      },
    ],
  },
  {
    id: "juros",
    name: "Juros & crédito",
    icon: "📊",
    status: "locked",
    description: "Entenda juros para o dinheiro não te engolir.",
    niveis: [
      {
        id: "easy",
        label: "Fácil",
        perguntas: [
          {
            enunciado: "O que são juros?",
            alternativas: [
              "Uma taxa cobrada ou paga pelo uso de dinheiro ao longo do tempo",
              "Uma taxa inventada sem motivo",
              "Algo que só existe em cartão de crédito",
              "Uma taxa cobrada só uma vez por ano",
            ],
            correta: 0,
            explicacao:
              "Juros são o preço do dinheiro no tempo: você paga quando pega emprestado e recebe quando investe.",
          },
          {
            enunciado: "O que são juros compostos em investimentos?",
            alternativas: [
              "Quando o governo desconta impostos do seu dinheiro",
              "Quando você ganha sobre o valor inicial mais rendimentos anteriores",
              "Quando a taxa muda toda hora",
              "Quando você investe em várias coisas diferentes",
            ],
            correta: 1,
            explicacao: "Nos juros compostos, o rendimento ganha rendimento. É o 'juros sobre juros'.",
          },
          {
            enunciado: "Qual tipo de juros é pior para quem deve dinheiro?",
            alternativas: ["Juros simples", "Juros compostos", "Não tem diferença", "Juros negativos"],
            correta: 1,
            explicacao: "Juros compostos fazem a dívida crescer exponencialmente, pois você paga juros sobre juros.",
          },
          {
            enunciado: "Por que investimentos com juros compostos são poderosos?",
            alternativas: [
              "Porque o rendimento gera mais rendimento ao longo do tempo",
              "Porque o banco te dá dinheiro de graça",
              "Porque não tem risco nenhum",
              "Porque são sempre livres de impostos",
            ],
            correta: 0,
            explicacao: "Juros compostos fazem seu dinheiro crescer exponencialmente ao reinvestir os rendimentos.",
          },
          {
            enunciado: "Qual é a diferença entre taxa de juros nominal e real?",
            alternativas: [
              "Taxa real desconta a inflação, taxa nominal não",
              "Não há diferença",
              "Taxa nominal é sempre maior",
              "Taxa real não existe",
            ],
            correta: 0,
            explicacao: "Taxa real considera a inflação, mostrando o ganho ou perda real de poder de compra.",
          },
          {
            enunciado: "O que acontece quando a inflação é maior que os juros do seu investimento?",
            alternativas: [
              "Você perde poder de compra real",
              "Você ganha mais dinheiro automaticamente",
              "Não faz diferença",
              "Seu investimento dobra de valor",
            ],
            correta: 0,
            explicacao:
              "Se a inflação supera os juros, seu dinheiro rende menos que a alta dos preços, perdendo valor real.",
          },
        ],
      },
      {
        id: "medium",
        label: "Médio",
        perguntas: [
          {
            enunciado: "O que significa taxa Selic?",
            alternativas: [
              "A taxa básica de juros da economia brasileira",
              "Uma taxa cobrada só em investimentos arriscados",
              "Uma taxa de importação",
              "Não existe",
            ],
            correta: 0,
            explicacao:
              "A Selic é a taxa básica de juros que influencia todas as outras taxas da economia, incluindo investimentos e empréstimos.",
          },
          {
            enunciado: "Como a taxa Selic afeta seus investimentos?",
            alternativas: [
              "Quando a Selic sobe, investimentos de renda fixa rendem mais",
              "A Selic não afeta investimentos",
              "Quando a Selic sobe, ações sempre caem",
              "A Selic só afeta empréstimos",
            ],
            correta: 0,
            explicacao: "Selic alta aumenta o rendimento de renda fixa, mas pode afetar negativamente outros ativos.",
          },
          {
            enunciado: "O que é o CDI?",
            alternativas: [
              "Um indicador de rentabilidade usado como referência para investimentos",
              "Uma taxa de impostos",
              "Um tipo de ação",
              "Uma moeda estrangeira",
            ],
            correta: 0,
            explicacao:
              "CDI é uma taxa usada como referência para medir o rendimento de muitos investimentos de renda fixa.",
          },
          {
            enunciado: "Qual é o efeito de juros altos na economia?",
            alternativas: [
              "Desestimula consumo e investimentos arriscados, controlando inflação",
              "Aumenta automaticamente o salário de todos",
              "Não tem efeito nenhum",
              "Faz a inflação subir sempre",
            ],
            correta: 0,
            explicacao: "Juros altos encarecem o crédito, reduzem consumo e ajudam a controlar a inflação na economia.",
          },
          {
            enunciado: "O que é spread bancário?",
            alternativas: [
              "A diferença entre a taxa que o banco paga e a que cobra nos empréstimos",
              "Uma taxa de administração de investimentos",
              "Um tipo de investimento",
              "Uma multa por atraso",
            ],
            correta: 0,
            explicacao:
              "Spread é o lucro do banco: a diferença entre o que ele paga a quem investe e cobra de quem pede emprestado.",
          },
          {
            enunciado: "Por que é importante comparar taxas de juros antes de pegar empréstimo?",
            alternativas: [
              "Para encontrar a melhor condição e pagar menos juros no total",
              "Não faz diferença, todas as taxas são iguais",
              "Apenas o valor da parcela importa",
              "Bancos não cobram juros diferentes",
            ],
            correta: 0,
            explicacao: "Comparar taxas pode resultar em economia significativa ao escolher a opção com juros menores.",
          },
        ],
      },
      {
        id: "intermediate",
        label: "Intermediário",
        perguntas: [
          {
            enunciado: "O que é amortização de dívida?",
            alternativas: [
              "A redução gradual da dívida através de pagamentos regulares",
              "O aumento automático da dívida",
              "Uma taxa extra cobrada pelo banco",
              "Não tem relação com dívidas",
            ],
            correta: 0,
            explicacao: "Amortizar é pagar a dívida aos poucos, reduzindo o saldo devedor e os juros futuros.",
          },
          {
            enunciado: "Qual sistema de amortização paga menos juros no total?",
            alternativas: [
              "Sistema SAC (parcelas decrescentes)",
              "Sistema Price (parcelas fixas)",
              "Ambos pagam exatamente o mesmo",
              "Não existe diferença",
            ],
            correta: 0,
            explicacao: "No SAC, você amortiza mais rápido o principal, pagando menos juros ao longo do tempo.",
          },
          {
            enunciado: "O que é taxa de juros prefixada?",
            alternativas: [
              "Uma taxa definida no momento da contratação que não muda",
              "Uma taxa que varia todo dia",
              "Uma taxa que o banco escolhe depois",
              "Não existe esse tipo",
            ],
            correta: 0,
            explicacao:
              "Taxa prefixada é definida no início e não muda, permitindo prever exatamente quanto vai render ou custar.",
          },
          {
            enunciado: "O que é taxa de juros pós-fixada?",
            alternativas: [
              "Uma taxa que varia conforme um indicador como CDI ou Selic",
              "Uma taxa fixa que nunca muda",
              "Uma taxa inventada pelo banco",
              "Não existe",
            ],
            correta: 0,
            explicacao:
              "Taxa pós-fixada acompanha um indicador, variando conforme a economia, sem valor fixo no início.",
          },
          {
            enunciado: "O que é CET (Custo Efetivo Total)?",
            alternativas: [
              "O custo total de um empréstimo incluindo juros, taxas e encargos",
              "Apenas a taxa de juros",
              "Uma taxa de administração",
              "Um tipo de investimento",
            ],
            correta: 0,
            explicacao: "CET mostra o custo real total do crédito, incluindo todas as taxas além dos juros.",
          },
          {
            enunciado: "Como antecipar parcelas de um empréstimo pode te beneficiar?",
            alternativas: [
              "Reduz o total de juros pagos e encurta o prazo da dívida",
              "Não traz benefício nenhum",
              "Aumenta a dívida",
              "O banco sempre cobra multa alta",
            ],
            correta: 0,
            explicacao: "Antecipar parcelas reduz o saldo devedor e os juros futuros, economizando dinheiro.",
          },
        ],
      },
      {
        id: "hard",
        label: "Difícil",
        perguntas: [
          {
            enunciado: "O que é a curva de juros?",
            alternativas: [
              "A relação entre taxas de juros e prazos de vencimento de títulos",
              "Uma taxa fixa para todos os investimentos",
              "Um gráfico de inflação",
              "Não existe esse conceito",
            ],
            correta: 0,
            explicacao:
              "A curva de juros mostra as taxas em diferentes prazos, ajudando a prever tendências econômicas.",
          },
          {
            enunciado: "O que significa uma curva de juros invertida?",
            alternativas: [
              "Juros de curto prazo maiores que de longo prazo, sinalizando possível recessão",
              "Juros sempre iguais",
              "Juros de longo prazo sempre maiores",
              "Não significa nada",
            ],
            correta: 0,
            explicacao:
              "Curva invertida indica expectativa de queda de juros futuros, frequentemente antes de recessões.",
          },
          {
            enunciado: "O que é juro real negativo?",
            alternativas: [
              "Quando a taxa de juros é menor que a inflação, resultando em perda de poder de compra",
              "Quando você ganha mais dinheiro automaticamente",
              "Quando não há inflação",
              "Não existe juro negativo",
            ],
            correta: 0,
            explicacao: "Juro real negativo significa que mesmo rendendo, seu dinheiro perde valor para a inflação.",
          },
          {
            enunciado: "Como a política monetária do Banco Central afeta os juros?",
            alternativas: [
              "Aumentando ou reduzindo a Selic para controlar inflação e atividade econômica",
              "Não afeta em nada",
              "Apenas afeta investimentos estrangeiros",
              "Banco Central não controla juros",
            ],
            correta: 0,
            explicacao:
              "Banco Central usa a Selic como ferramenta principal para controlar inflação e crescimento econômico.",
          },
          {
            enunciado: "O que é duration em investimentos de renda fixa?",
            alternativas: [
              "Uma medida de sensibilidade do preço do título às variações de juros",
              "O prazo até o vencimento",
              "A taxa de rentabilidade",
              "Um tipo de ação",
            ],
            correta: 0,
            explicacao:
              "Duration mede quanto o preço de um título varia quando os juros mudam, importante para gestão de risco.",
          },
          {
            enunciado: "Como a marcação a mercado afeta títulos de renda fixa?",
            alternativas: [
              "O preço do título varia diariamente conforme as taxas de juros do mercado",
              "O preço nunca muda",
              "Apenas no vencimento",
              "Não afeta títulos",
            ],
            correta: 0,
            explicacao:
              "Marcação a mercado ajusta o valor do título diariamente, podendo gerar ganhos ou perdas antes do vencimento.",
          },
        ],
      },
    ],
  },
  {
    id: "investimentos",
    name: "Primeiros investimentos",
    icon: "🚀",
    status: "locked",
    description: "Dê seus primeiros passos como investidor(a).",
    niveis: [
      {
        id: "easy",
        label: "Fácil",
        perguntas: [
          {
            enunciado: "Antes de investir em coisas mais arriscadas, o que é recomendado?",
            alternativas: [
              "Ter uma reserva de emergência montada",
              "Usar todo o limite do cartão",
              "Pegar vários empréstimos pra alavancar",
              "Ignorar dívidas existentes",
            ],
            correta: 0,
            explicacao: "A reserva de emergência te protege. Ela vem antes de correr mais riscos nos investimentos.",
          },
          {
            enunciado: "Qual dessas é uma boa forma de começar a investir com segurança?",
            alternativas: [
              "Colocar tudo em apostas esportivas",
              "Investir em algo que você não entende",
              "Começar por produtos simples de renda fixa",
              "Deixar o dinheiro parado em casa",
            ],
            correta: 2,
            explicacao: "Começar por produtos simples de renda fixa ajuda a aprender sem assumir risco excessivo.",
          },
          {
            enunciado: "O que é diversificação de investimentos?",
            alternativas: [
              "Investir em vários tipos diferentes de ativos para reduzir risco",
              "Colocar todo dinheiro em uma única ação",
              "Nunca investir em nada",
              "Gastar tudo em consumo",
            ],
            correta: 0,
            explicacao: "Diversificar é espalhar o risco entre diferentes investimentos, protegendo seu patrimônio.",
          },
          {
            enunciado: "O que é renda fixa?",
            alternativas: [
              "Investimentos com retorno previsível e menor risco",
              "Investimentos que sempre perdem dinheiro",
              "Apenas poupança",
              "Um tipo de salário",
            ],
            correta: 0,
            explicacao: "Renda fixa oferece rentabilidade mais previsível e é indicada para quem busca segurança.",
          },
          {
            enunciado: "O que é renda variável?",
            alternativas: [
              "Investimentos cujo retorno varia e pode ter mais risco, como ações",
              "Investimentos sem risco nenhum",
              "Apenas títulos do governo",
              "Um tipo de poupança",
            ],
            correta: 0,
            explicacao:
              "Renda variável inclui ativos como ações, com retorno imprevisível e maior potencial de ganho e perda.",
          },
          {
            enunciado: "Por que não deixar todo o dinheiro na poupança?",
            alternativas: [
              "Porque rende pouco e pode perder para a inflação",
              "Porque a poupança é ilegal",
              "Porque você é obrigado a investir em ações",
              "Não tem problema deixar tudo na poupança",
            ],
            correta: 0,
            explicacao:
              "A poupança rende pouco e muitas vezes perde para a inflação, existem opções melhores e seguras.",
          },
        ],
      },
      {
        id: "medium",
        label: "Médio",
        perguntas: [
          {
            enunciado: "O que é o Tesouro Direto?",
            alternativas: [
              "Um programa que permite investir em títulos públicos do governo",
              "Um tipo de conta bancária",
              "Uma ação da Petrobras",
              "Um empréstimo do governo",
            ],
            correta: 0,
            explicacao:
              "Tesouro Direto é uma forma segura de investir comprando títulos públicos diretamente do governo.",
          },
          {
            enunciado: "O que são ações?",
            alternativas: [
              "Pequenas partes de uma empresa que você pode comprar",
              "Empréstimos que você faz para empresas",
              "Um tipo de título do governo",
              "Uma conta poupança especial",
            ],
            correta: 0,
            explicacao: "Ações representam fatias de propriedade de uma empresa, com potencial de ganhos e perdas.",
          },
          {
            enunciado: "O que significa 'rentabilidade' de um investimento?",
            alternativas: [
              "O quanto o investimento rendeu em um período",
              "O risco do investimento",
              "A taxa de administração",
              "O prazo do investimento",
            ],
            correta: 0,
            explicacao: "Rentabilidade é o retorno que você obtém, medindo o ganho percentual do investimento.",
          },
          {
            enunciado: "O que são fundos de investimento?",
            alternativas: [
              "Aplicações coletivas gerenciadas por profissionais",
              "Empréstimos pessoais",
              "Apenas ações de empresas",
              "Um tipo de poupança",
            ],
            correta: 0,
            explicacao: "Fundos reúnem dinheiro de vários investidores e são gerenciados por especialistas.",
          },
          {
            enunciado: "O que é CDB?",
            alternativas: [
              "Certificado de Depósito Bancário, um investimento de renda fixa",
              "Uma ação de banco",
              "Um tipo de cartão de crédito",
              "Uma taxa de administração",
            ],
            correta: 0,
            explicacao: "CDB é um título emitido por bancos, onde você empresta dinheiro e recebe juros em troca.",
          },
          {
            enunciado: "O que é FGC (Fundo Garantidor de Créditos)?",
            alternativas: [
              "Uma proteção que garante até R$250 mil por CPF e instituição em caso de falência",
              "Um tipo de investimento",
              "Uma taxa bancária",
              "Um fundo de ações",
            ],
            correta: 0,
            explicacao: "FGC protege investidores de renda fixa caso a instituição quebre, garantindo até R$250 mil.",
          },
        ],
      },
      {
        id: "intermediate",
        label: "Intermediário",
        perguntas: [
          {
            enunciado: "O que é perfil de investidor?",
            alternativas: [
              "A classificação do quanto de risco você aceita correr nos investimentos",
              "O saldo da sua conta",
              "Seu salário mensal",
              "O banco onde você investe",
            ],
            correta: 0,
            explicacao:
              "Perfil de investidor (conservador, moderado, arrojado) define quais investimentos são adequados para você.",
          },
          {
            enunciado: "O que são dividendos?",
            alternativas: [
              "Parte do lucro das empresas distribuída aos acionistas",
              "Uma taxa cobrada por corretoras",
              "Um tipo de título público",
              "Juros de empréstimo",
            ],
            correta: 0,
            explicacao:
              "Dividendos são pagamentos que empresas fazem aos donos de ações, distribuindo parte dos lucros.",
          },
          {
            enunciado: "O que é alocação de ativos?",
            alternativas: [
              "A distribuição do seu dinheiro entre diferentes tipos de investimentos",
              "Comprar apenas um tipo de ativo",
              "Deixar tudo na poupança",
              "Não investir em nada",
            ],
            correta: 0,
            explicacao:
              "Alocação de ativos é definir quanto investir em cada classe (renda fixa, ações, etc.) conforme seu perfil.",
          },
          {
            enunciado: "O que é rebalanceamento de carteira?",
            alternativas: [
              "Ajustar periodicamente a proporção dos investimentos conforme a estratégia original",
              "Vender tudo e começar do zero",
              "Nunca mexer nos investimentos",
              "Comprar mais do mesmo ativo sempre",
            ],
            correta: 0,
            explicacao:
              "Rebalancear é ajustar a carteira para manter a alocação desejada, vendendo o que subiu e comprando o que caiu.",
          },
          {
            enunciado: "O que são ETFs?",
            alternativas: [
              "Fundos negociados em bolsa que replicam índices de mercado",
              "Ações de empresas específicas",
              "Títulos do governo",
              "Um tipo de empréstimo",
            ],
            correta: 0,
            explicacao: "ETFs são fundos que replicam índices (como Ibovespa) e são negociados na bolsa como ações.",
          },
          {
            enunciado: "O que significa 'prazo de resgate' de um investimento?",
            alternativas: [
              "O tempo necessário para ter acesso ao dinheiro investido",
              "A taxa de rentabilidade",
              "O valor mínimo para investir",
              "O risco do investimento",
            ],
            correta: 0,
            explicacao:
              "Prazo de resgate indica quanto tempo você precisa esperar para resgatar o dinheiro sem perdas.",
          },
        ],
      },
      {
        id: "hard",
        label: "Difícil",
        perguntas: [
          {
            enunciado: "O que é índice Sharpe?",
            alternativas: [
              "Uma medida de retorno ajustado ao risco de um investimento",
              "Um tipo de ação",
              "Uma taxa de administração",
              "Um indicador de inflação",
            ],
            correta: 0,
            explicacao:
              "Sharpe mede se o retorno de um investimento compensa o risco assumido, ajudando a comparar opções.",
          },
          {
            enunciado: "O que é beta de uma ação?",
            alternativas: [
              "A volatilidade da ação em relação ao mercado como um todo",
              "O preço da ação",
              "O lucro da empresa",
              "A taxa de dividendos",
            ],
            correta: 0,
            explicacao:
              "Beta mede quanto a ação varia em relação ao mercado: beta > 1 = mais volátil, < 1 = menos volátil.",
          },
          {
            enunciado: "O que é análise fundamentalista?",
            alternativas: [
              "Avaliar empresas pelos fundamentos financeiros para decidir se vale investir",
              "Analisar apenas gráficos de preços",
              "Seguir dicas de amigos",
              "Investir aleatoriamente",
            ],
            correta: 0,
            explicacao:
              "Análise fundamentalista estuda balanços, lucros e gestão para avaliar o valor real de uma empresa.",
          },
          {
            enunciado: "O que é análise técnica?",
            alternativas: [
              "Estudar gráficos e padrões de preços para prever movimentos futuros",
              "Analisar os fundamentos da empresa",
              "Não analisar nada",
              "Seguir apenas notícias",
            ],
            correta: 0,
            explicacao:
              "Análise técnica usa gráficos e indicadores para identificar tendências e pontos de entrada e saída.",
          },
          {
            enunciado: "O que são FIIs (Fundos Imobiliários)?",
            alternativas: [
              "Fundos que investem em imóveis e distribuem renda regularmente",
              "Ações de construtoras",
              "Empréstimos imobiliários",
              "Títulos do governo",
            ],
            correta: 0,
            explicacao: "FIIs permitem investir em imóveis sem comprar diretamente, recebendo aluguéis periodicamente.",
          },
          {
            enunciado: "O que é efeito bola de neve nos investimentos?",
            alternativas: [
              "O crescimento exponencial do patrimônio através de juros compostos ao longo do tempo",
              "Perder dinheiro gradualmente",
              "Investir aleatoriamente",
              "Não reinvestir os rendimentos",
            ],
            correta: 0,
            explicacao:
              "Com juros compostos e tempo, pequenos aportes regulares se transformam em patrimônio significativo.",
          },
        ],
      },
    ],
  },
]
import { JourneyPath, Path } from "./journey-path"

interface JourneySectionProps {
  onPathSelected: (path: Path) => void
}

export function JourneySection({ onPathSelected }: JourneySectionProps) {
  // A lógica de estado e o handler permanecem, mas agora serão passados para JourneyPath
  // O estado 'paths' e 'activePath' pode ser simplificado se não for mais usado aqui diretamente.

  const handlePathClick = (path: Path) => {
    if (path.status === "locked") return

    // O restante da lógica para selecionar o caminho e rolar a página permanece o mesmo
    onPathSelected(path)

    setTimeout(() => {
      const flashcardsSection = document.getElementById("flashcards")
      if (flashcardsSection) {
        flashcardsSection.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }, 100)
  }

  return (
    <section id="journey" className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Explore o Mundo FinFit</h2>
            <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
            Sua jornada financeira começa aqui. Complete uma etapa para desbloquear a próxima e conquistar novos conhecimentos.
            </p>
        </div>

        <JourneyPath paths={initialPaths} onSelectPath={handlePathClick} />

      </div>
    </section>
  )
}
