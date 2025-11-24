"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"

interface UserProfile {
  name: string;
  employmentStatus: string;
  incomeRange: string;
  ageRange: string;
  hasDependents: string;
}

export function DiagnosticFlow({
  onBack,
  onDiagnosticComplete,
}: { onBack: () => void; onDiagnosticComplete: (profileData: { name: string, level: number }) => void; }) {
  const [currentStep, setCurrentStep] = useState<"profile" | "questions" | "results">("profile")
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "",
    employmentStatus: "",
    incomeRange: "",
    ageRange: "",
    hasDependents: "",
  })
  const [answers, setAnswers] = useState<{ [key: string]: number }>({})
  const [levelData, setLevelData] = useState<{
    number: number
    name: string
    emoji: string
    description: string
    focus: string[]
    xp: number
  } | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  const questions = [
    {
      id: "mes_dinheiro",
      question: "Como você sente o seu mês com dinheiro hoje?",
      helper: "Pense na maior parte dos meses, não só no último.",
      options: [
        { value: 1, text: "Eu nem sei direito pra onde meu dinheiro vai." },
        { value: 2, text: "Às vezes eu acompanho, às vezes deixo rolar." },
        { value: 3, text: "Eu tenho uma noção boa, olho extrato ou app de vez em quando." },
        { value: 4, text: "Eu acompanho bem de perto: sei quanto entra, quanto sai e onde gasto." },
      ],
    },
    {
      id: "controle_gastos",
      question: "Você acompanha quanto entra e quanto sai todo mês?",
      helper: "",
      options: [
        { value: 1, text: "Não acompanho nada, vou só vivendo." },
        { value: 2, text: "Anoto algumas coisas, mas não com frequência." },
        { value: 3, text: "Tenho um controle simples (planilha, bloco de notas, app)." },
        { value: 4, text: "Tenho um controle bem organizado e atualizado." },
      ],
    },
    {
      id: "dividas",
      question: "Sobre dívidas, qual dessas situações parece mais com você hoje?",
      helper: "",
      options: [
        { value: 1, text: "Estou bem enrolado(a), não sei nem por onde começar." },
        { value: 2, text: "Tenho dívidas, mas estou tentando organizar." },
        { value: 3, text: "Tenho algumas parcelas, mas estão sob controle." },
        { value: 4, text: "Não tenho dívidas no momento." },
      ],
    },
    {
      id: "reserva",
      question: "Você já tem alguma reserva de emergência?",
      helper: "",
      options: [
        { value: 1, text: "Não tenho nada guardado ainda." },
        { value: 2, text: "Tenho um pouco, mas não seria suficiente pra um grande aperto." },
        { value: 3, text: "Tenho algo perto de 3 meses de gastos." },
        { value: 4, text: "Tenho de 3 a 6 meses (ou mais) de gastos guardados." },
      ],
    },
    {
      id: "prioridade_curto_prazo",
      question: "Em qual dessas metas você quer focar primeiro?",
      helper: "",
      options: [
        { value: 1, text: "Sair das dívidas." },
        { value: 2, text: "Organizar meu mês e parar de viver no aperto." },
        { value: 3, text: "Começar a montar uma reserva de emergência." },
        { value: 4, text: "Começar ou melhorar meus investimentos." },
      ],
    },
    {
      id: "objetivo_longo_prazo",
      question: "Pensando mais pra frente, qual é seu objetivo financeiro principal?",
      helper: "",
      options: [
        { value: 1, text: "Ter segurança e não depender de ninguém." },
        { value: 2, text: "Conseguir realizar alguns sonhos (viagem, carro, casa, estudos)." },
        { value: 3, text: "Construir patrimônio e ter mais liberdade de escolha." },
        { value: 4, text: "Chegar perto da independência financeira." },
      ],
    },
  ]

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!userProfile.name.trim()) {
      alert("Por favor, informe seu nome")
      return
    }

    setCurrentStep("questions")
  }

  const calculateAndShowResults = () => {
    const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0)
    let levelNumber, levelName, emoji, description, focus

    if (totalScore <= 11) {
      levelNumber = 1
      levelName = "Explorador Financeiro"
      emoji = "🧭"
      description = "Você está dando seus primeiros passos. O mais importante você já fez: começou."
      focus = ["Ganhar clareza de gastos", "Criar o hábito de olhar seu dinheiro", "Evitar que dívidas cresçam"]
    } else if (totalScore <= 17) {
      levelNumber = 2
      levelName = "Equilibrista Financeiro"
      emoji = "⚖️"
      description = "Você já tem alguma noção, mas sente falta de consistência."
      focus = ["Organizar o orçamento", "Fortalecer a reserva", "Diminuir o peso das dívidas"]
    } else if (totalScore <= 21) {
      levelNumber = 3
      levelName = "Estrategista Financeiro"
      emoji = "📊"
      description = "Você já tem boa base. Agora o jogo é refinar metas e fortalecer investimentos."
      focus = ["Fortalecer a reserva", "Alinhar metas", "Estruturar investimentos"]
    } else {
      levelNumber = 4
      levelName = "Mestre Financeiro"
      emoji = "🏆"
      description = "Você tem alto domínio. A FinFit vai te ajudar a otimizar e avançar."
      focus = ["Otimizar investimentos", "Aprofundar metas de longo prazo", "Manter a constância"]
    }

    setLevelData({ number: levelNumber, name: levelName, emoji, description, focus, xp: 50, })
    setCurrentStep("results")
  }

  const handleFinishDiagnostic = () => {
    if (levelData) {
      onDiagnosticComplete({ name: userProfile.name, level: levelData.number });
    }
  }

  const handleNextQuestion = () => {
    if (!answers[questions[currentQuestionIndex]?.id || ""]) {
      alert("Por favor, selecione uma resposta")
      return
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      calculateAndShowResults()
    }
  }

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <button onClick={onBack} className="flex items-center gap-2">
            <span className="brand-xp text-xl">XP</span>
            <span className="brand-name text-xl">FinFit</span>
          </button>
          <Button variant="ghost" size="sm" onClick={onBack}>Voltar ao início</Button>
        </div>
      </header>

      <div className="container mx-auto p-4 md:p-6">
        {currentStep === "profile" && (
          <div className="max-w-2xl mx-auto py-12">
            <form onSubmit={handleProfileSubmit} className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Vamos começar?</h2>
                <p className="text-muted-foreground text-lg">Primeiro, conte um pouco sobre você</p>
              </div>
              <div className="space-y-4">
                <label className="block">
                  <span className="text-lg font-medium mb-3 block">Qual é seu nome?</span>
                  <input
                    type="text"
                    value={userProfile.name}
                    onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                    placeholder="Digite seu nome"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </label>
              </div>
              <div className="flex gap-4 pt-6">
                <Button type="button" variant="outline" onClick={onBack} className="flex-1 bg-transparent">Voltar</Button>
                <Button type="submit" className="flex-1">Começar Diagnóstico</Button>
              </div>
            </form>
          </div>
        )}

        {currentStep === "questions" && currentQuestion && (
          <div className="max-w-2xl mx-auto py-12">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">Pergunta {currentQuestionIndex + 1} de {questions.length}</span>
                <span className="text-sm font-medium text-primary">{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}% completo</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary transition-all duration-300" style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}/>
              </div>
            </div>
            <Card className="border-border">
              <CardContent className="p-8 md:p-12">
                <form onSubmit={(e) => { e.preventDefault(); handleNextQuestion(); }} className="space-y-6">
                  <div>
                    <h3 className="mb-2 text-2xl font-bold">{currentQuestion.question}</h3>
                    {currentQuestion.helper && <p className="text-sm text-muted-foreground">{currentQuestion.helper}</p>}
                  </div>
                  <div className="space-y-3">
                    {currentQuestion.options.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setAnswers((prev) => ({ ...prev, [currentQuestion.id]: option.value }))}
                        className={`w-full rounded-lg border-2 p-4 text-left transition-all ${answers[currentQuestion.id] === option.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
                      >
                        <span className="block font-medium">{option.text}</span>
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <Button type="button" variant="outline" onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))} disabled={currentQuestionIndex === 0} className="w-32">Anterior</Button>
                    <Button type="submit" className="w-32" disabled={!answers[currentQuestion.id]}>
                      {currentQuestionIndex === questions.length - 1 ? "Ver Resultado" : "Próxima"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {currentStep === "results" && levelData && (
          <div className="py-12">
            <section className="mb-12">
                <div className="mb-8 rounded-2xl border border-accent bg-gradient-to-br from-accent/10 to-background p-8 md:p-12">
                <div className="mb-6 text-center">
                    <div className="mb-4 text-6xl">{levelData.emoji}</div>
                    <h2 className="mb-2 text-3xl font-bold md:text-4xl">Nível {levelData.number}: {levelData.name}</h2>
                    <p className="text-xl text-muted-foreground">Bem vindo(a), <span className="font-semibold text-foreground">{userProfile.name}</span>! Se prepare para aprender e ter resultados reais.</p>
                </div>
                <p className="mb-6 text-center text-lg leading-relaxed">{levelData.description}</p>
                <div className="space-y-4">
                    <h3 className="text-center text-xl font-semibold">Próximos desafios para você:</h3>
                    <div className="grid gap-3 md:grid-cols-2 max-w-4xl mx-auto">
                    {levelData.focus.map((item: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-3 rounded-lg bg-card p-4">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                        <span className="text-sm">{item}</span>
                        </div>
                    ))}
                    </div>
                </div>
                </div>
            </section>
            
            <Button onClick={handleFinishDiagnostic} className="mx-auto flex">Ver Jornada e Desafios</Button>

          </div>
        )}
      </div>
    </div>
  )
}
