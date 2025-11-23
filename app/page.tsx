"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Menu, X, Target, TrendingUp, Users, CheckCircle2, Award } from "lucide-react"
import Link from "next/link"
import { FlashcardsSection } from "@/components/flashcards-section"
import { JourneySection } from "@/components/journey-section"

interface UserProfile {
  name: string
  employmentStatus: string
  incomeRange: string
  ageRange: string
  hasDependents: string
}

interface SelectedPath {
  id: string
  name: string
  levels: any[]
}

export default function FinFitLanding() {
  const [showDiagnostic, setShowDiagnostic] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedPath, setSelectedPath] = useState<SelectedPath | null>(null)

  const handlePathSelected = (pathId: string, pathName: string, levels: any[]) => {
    setSelectedPath({ id: pathId, name: pathName, levels })
  }

  if (showDiagnostic) {
    return (
      <DiagnosticFlow
        onBack={() => setShowDiagnostic(false)}
        handlePathSelected={handlePathSelected}
        selectedPath={selectedPath}
      />
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/60 backdrop-blur-lg">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="brand-xp text-xl">XP</span>
            <span className="brand-name text-xl">FinFit</span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden items-center gap-6 md:flex">
            <a href="#recursos" className="text-muted-foreground transition-colors hover:text-foreground">
              Recursos
            </a>
            <a href="#como-funciona" className="text-muted-foreground transition-colors hover:text-foreground">
              Como Funciona
            </a>
            <a href="#ranking" className="text-muted-foreground transition-colors hover:text-foreground">
              Ranking
            </a>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Button variant="outline" size="sm" asChild>
              <a href="#como-funciona">Ver Como Funciona</a>
            </Button>
            <Button size="sm" onClick={() => setShowDiagnostic(true)}>
              Começar
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-border bg-card px-6 py-4 md:hidden">
            <nav className="flex flex-col gap-3">
              <a
                href="#recursos"
                className="text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                Recursos
              </a>
              <a
                href="#como-funciona"
                className="text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                Como Funciona
              </a>
              <a
                href="#ranking"
                className="text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                Ranking
              </a>
              <Button size="sm" className="mt-2" onClick={() => setShowDiagnostic(true)}>
                Começar
              </Button>
            </nav>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section className="border-b border-border py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div className="space-y-6">
                <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
                  Cuide do bolso como quem zera um jogo
                </h1>
                <p className="text-xl font-semibold text-accent-2">Seu jogo de saúde financeira</p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Ganhe XP, suba de nível, e desbloqueie badges enquanto constrói hábitos financeiros melhores.{" "}
                  <strong className="text-foreground">Sem economês. Sem julgamento.</strong>
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button size="lg" onClick={() => setShowDiagnostic(true)}>
                    Começar Agora
                  </Button>
                  <Button size="lg" variant="ghost" asChild className="text-accent-2">
                    <a href="#como-funciona">Ver Como Funciona</a>
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="coin-card rounded-xl border border-border bg-card p-6">
                  <div className="coin-card-header">
                    <span className="coin-tag">Nível 3 • Explorador Financeiro</span>
                    <span className="coin-xp">10.800 XP</span>
                  </div>

                  <div className="coin-card-body">
                    <div className="coin-piggy">🐷</div>

                    <div className="coin-info">
                      <p className="coin-title">Seu progresso no jogo</p>

                      <div className="progress">
                        <div className="progress-bar" style={{ width: "65%" }}></div>
                      </div>
                      <p className="coin-sub">Próxima badge em 1.200 XP</p>

                      <div className="badges">
                        <span className="badge">💎 Constância</span>
                        <span className="badge">📈 Primeira Meta</span>
                        <span className="badge">🛡️ Fundo de Emergência</span>
                      </div>
                    </div>

                    <span className="coin-emoji coin-1">🪙</span>
                    <span className="coin-emoji coin-2">🪙</span>
                    <span className="coin-emoji coin-3">🪙</span>
                  </div>
                </div>

                <p className="art-note">Progresso em tempo real</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="recursos" className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="mb-12 text-center">
              <h2 className="mb-3 text-3xl font-bold md:text-4xl">Por que FinFit é diferente</h2>
              <p className="text-lg text-muted-foreground">
                Gamificação real que torna educação financeira divertida e motivadora.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Card className="border-border">
                <CardContent className="p-6">
                  <div className="mb-3 inline-flex rounded-lg bg-primary/10 p-3">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">Ganhe XP & Suba de Nível</h3>
                  <p className="text-muted-foreground">
                    Cada ação financeira saudável te aproxima do próximo nível. Veja seu progresso em tempo real.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-6">
                  <div className="mb-3 inline-flex rounded-lg bg-primary/10 p-3">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">Desafios Personalizados</h3>
                  <p className="text-muted-foreground">
                    Comece com desafios fáceis e avance para objetivos mais ambiciosos conforme você evolui.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-6">
                  <div className="mb-3 inline-flex rounded-lg bg-primary/10 p-3">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">Compita no Ranking</h3>
                  <p className="text-muted-foreground">
                    Suba posições na nossa ranking justa, baseada em consistência, crescimento e engajamento.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="como-funciona" className="border-t border-border py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold md:text-4xl">Como Funciona</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Card className="border-border">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-xl font-bold text-primary">
                    1
                  </div>
                  <h4 className="mb-2 text-lg font-semibold">Responda um Diagnóstico</h4>
                  <p className="text-muted-foreground">Entenda sua relação com dinheiro em 6 perguntas rápidas.</p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-xl font-bold text-primary">
                    2
                  </div>
                  <h4 className="mb-2 text-lg font-semibold">Aceite Desafios</h4>
                  <p className="text-muted-foreground">Comece com metas pequenas e construa momentum.</p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-xl font-bold text-primary">
                    3
                  </div>
                  <h4 className="mb-2 text-lg font-semibold">Suba no Ranking</h4>
                  <p className="text-muted-foreground">Ganhe XP e compita com a comunidade de forma justa.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="ranking" className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <Card className="border-border bg-gradient-to-b from-card to-secondary">
              <CardContent className="p-12 text-center">
                <h2 className="mb-3 text-3xl font-bold md:text-4xl">Pronto para começar?</h2>
                <p className="mb-8 text-lg text-muted-foreground">
                  Junte-se aos brasileiros que estão transformando sua relação com dinheiro.
                </p>
                <div className="flex flex-col justify-center gap-3 sm:flex-row">
                  <Button size="lg" onClick={() => setShowDiagnostic(true)}>
                    Começar Agora
                  </Button>
                  <Button size="lg" variant="outline">
                    Ver Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="container mx-auto px-6 py-12">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="brand-xp text-xl">XP</span>
                <span className="brand-name text-xl">FinFit</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Seu jogo de saúde financeira. Educação sem economês, com motivação verdadeira.
              </p>
            </div>

            <nav className="flex flex-col gap-2">
              <a href="#recursos" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Recursos
              </a>
              <a
                href="#como-funciona"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Como Funciona
              </a>
              <a href="#ranking" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Ranking
              </a>
            </nav>

            <div>
              <Button variant="outline" onClick={() => setShowDiagnostic(true)}>
                Começar
              </Button>
            </div>
          </div>

          <div className="mt-8 border-t border-border pt-8 text-center">
            <p className="text-sm text-muted-foreground">© 2025 FinFit. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function DiagnosticFlow({
  onBack,
  handlePathSelected,
  selectedPath,
}: { onBack: () => void; handlePathSelected: any; selectedPath: any }) {
  const [currentStep, setCurrentStep] = useState<"profile" | "questions" | "results">("profile")
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "",
    employmentStatus: "",
    incomeRange: "",
    ageRange: "",
    hasDependents: "",
  })
  const [answers, setAnswers] = useState<{ [key: string]: number }>({})
  const [showResult, setShowResult] = useState(false)
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

    // Validar campo obrigatório
    if (!userProfile.name.trim()) {
      alert("Por favor, informe seu nome")
      return
    }

    setCurrentStep("questions")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const totalQuestions = questions.length
    const answered = Object.keys(answers).length

    if (answered < totalQuestions) {
      alert("Responda todas as perguntas para gerar seu nível inicial")
      return
    }

    // Movendo a lógica de cálculo para uma função separada
    calculateAndShowResults()
  }

  // Nova função para calcular e mostrar resultados
  const calculateAndShowResults = () => {
    const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0)

    let levelNumber, levelName, emoji, description, focus

    if (totalScore <= 11) {
      levelNumber = 1
      levelName = "Explorador Financeiro"
      emoji = "🧭"
      description =
        "Você está dando seus primeiros passos para entender melhor seu dinheiro. Ainda falta clareza, mas o mais importante você já fez: começou."
      focus = [
        "ganhar clareza de quanto entra e quanto sai",
        "criar o hábito de olhar seu dinheiro com menos medo",
        "evitar que as dívidas cresçam mais",
      ]
    } else if (totalScore <= 17) {
      levelNumber = 2
      levelName = "Equilibrista Financeiro"
      emoji = "⚖️"
      description =
        "Você já tem alguma noção do seu dinheiro, mas sente falta de consistência. Às vezes organiza, às vezes deixa rolar."
      focus = [
        "organizar melhor o orçamento mensal",
        "começar ou fortalecer sua reserva de emergência",
        "diminuir o peso do cartão e das dívidas",
      ]
    } else if (totalScore <= 21) {
      levelNumber = 3
      levelName = "Estrategista Financeiro"
      emoji = "📊"
      description =
        "Você já tem uma boa base de organização e controle. Agora o jogo é refinar metas e fortalecer investimentos."
      focus = [
        "deixar sua reserva de emergência redondinha",
        "alinhar metas financeiras de curto e médio prazo",
        "estruturar melhor seus primeiros investimentos",
      ]
    } else {
      levelNumber = 4
      levelName = "Mestre Financeiro"
      emoji = "🏆"
      description =
        "Você já tem um nível alto de domínio financeiro. A FinFit vai te ajudar a otimizar, manter a disciplina e avançar em novos objetivos."
      focus = [
        "otimizar seus investimentos e alocação",
        "aprofundar metas de longo prazo",
        "manter constância e evitar retrocessos",
      ]
    }

    setLevelData({
      number: levelNumber,
      name: levelName,
      emoji,
      description,
      focus,
      xp: 50,
    })
    setCurrentStep("results")
    setShowResult(true)
  }

  // Nova função para lidar com navegação entre perguntas
  const handleNextQuestion = () => {
    if (!answers[currentQuestion?.id || ""]) {
      alert("Por favor, selecione uma resposta")
      return
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      // Se for a última pergunta, calcula e mostra os resultados
      calculateAndShowResults()
    }
  }

  const currentQuestion = questions[currentQuestionIndex]
  const progress = (currentQuestionIndex / questions.length) * 100

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <button onClick={onBack} className="flex items-center gap-2">
            <span className="brand-xp text-xl">XP</span>
            <span className="brand-name text-xl">FinFit</span>
          </button>
          <Button variant="ghost" size="sm" onClick={onBack}>
            Voltar ao início
          </Button>
        </div>
      </header>

      {currentStep === "results" && levelData && (
        <section className="border-t border-border py-16">
          <div className="container mx-auto max-w-5xl px-6">
            <div className="mb-8 rounded-2xl border border-accent bg-gradient-to-br from-accent/10 to-background p-8 md:p-12">
              <div className="mb-6 text-center">
                <div className="mb-4 text-6xl">{levelData.emoji}</div>
                <h2 className="mb-2 text-3xl font-bold md:text-4xl">
                  Nível {levelData.number}: {levelData.name}
                </h2>
                <div className="mx-auto mb-4 h-4 max-w-md overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full bg-gradient-to-r from-accent to-primary transition-all duration-500"
                    style={{ width: `${(levelData.xp / 24) * 100}%` }}
                  />
                </div>
                <p className="text-lg text-muted-foreground">{levelData.xp} XP de 24</p>
              </div>

              <p className="mb-6 text-center text-lg leading-relaxed">{levelData.description}</p>

              <div className="space-y-4">
                <h3 className="text-center text-xl font-semibold">Próximos desafios para você:</h3>
                <div className="grid gap-3 md:grid-cols-2">
                  {levelData.focus.map((item: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-3 rounded-lg bg-card p-4">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="card profile-card">
                <p className="profile-title">
                  Bem-vindo de volta,{" "}
                  <span className="profile-name" id="profileName">
                    {userProfile.name}
                  </span>
                  !
                </p>
                <p className="profile-sub">
                  Cada desafio aqui é como uma fase da vida real. Quanto mais você joga, mais preparo ganha para tomar
                  decisões que fazem diferença no seu bolso.
                </p>
              </div>

              <Card className="border-border">
                <CardContent className="p-6">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                    <Award className="h-5 w-5 text-primary" />
                    Badges Desbloqueados
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-sm">🎯 Diagnóstico Completo</span>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-sm">
                      {levelData.emoji} {levelData.name}
                    </span>
                    <span className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground">
                      🔒 Mais em breve
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {showResult && (
        <>
          <JourneySection onPathSelected={handlePathSelected} />
          <FlashcardsSection pathName={selectedPath?.name} levels={selectedPath?.levels} />
        </>
      )}

      {currentStep === "profile" && (
        <div className="max-w-2xl mx-auto">
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
              <Button type="button" variant="outline" onClick={onBack} className="flex-1 bg-transparent">
                Voltar
              </Button>
              <Button type="submit" className="flex-1">
                Começar Diagnóstico
              </Button>
            </div>
          </form>
        </div>
      )}

      {currentStep === "questions" && (
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">
                Pergunta {currentQuestionIndex + 1} de {questions.length}
              </span>
              <span className="text-sm font-medium text-primary">
                {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}% completo
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          <Card className="border-border">
            <CardContent className="p-8 md:p-12">
              {currentQuestionIndex === 0 && (
                <Button variant="ghost" onClick={() => setCurrentStep("profile")} className="mb-6">
                  ← Voltar
                </Button>
              )}

              {currentQuestion && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleNextQuestion()
                  }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="mb-2 text-2xl font-bold">{currentQuestion.question}</h3>
                    {currentQuestion.helper && (
                      <p className="text-sm text-muted-foreground">{currentQuestion.helper}</p>
                    )}
                  </div>

                  <div className="space-y-3">
                    {currentQuestion.options.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setAnswers((prev) => ({ ...prev, [currentQuestion.id]: option.value }))}
                        className={`w-full rounded-lg border-2 p-4 text-left transition-all ${
                          answers[currentQuestion.id] === option.value
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <span className="block font-medium">{option.text}</span>
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                      disabled={currentQuestionIndex === 0}
                      className="w-32"
                    >
                      Anterior
                    </Button>

                    <Button type="submit" className="w-32" disabled={!answers[currentQuestion.id]}>
                      {currentQuestionIndex === questions.length - 1 ? "Ver Resultado" : "Próxima"}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
