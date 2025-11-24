"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Menu, X, Target, TrendingUp, Users } from "lucide-react"
import Link from "next/link"

import { JourneySection } from "@/components/journey-section"
import { FlashcardsSection } from "@/components/flashcards-section"
import { Path } from "@/components/journey-path"
import { LevelChallenges } from "@/components/level-challenges"
import { challenges, type Activity } from "@/lib/challenges"
import { DiagnosticFlow } from "@/components/diagnostic-flow"

interface SelectedPath {
  id: string;
  name: string;
  levels: any[];
}

// --- Componente para a Página de Marketing ---
function MarketingPage({ onStartDiagnostic }: { onStartDiagnostic: () => void }) {
  return (
    <main>
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
                <Button size="lg" onClick={onStartDiagnostic}>
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
                  <span className="coin-tag">Nível 1 • Explorador Financeiro</span>
                  <span className="coin-xp">10.800 XP</span>
                </div>
                <div className="coin-card-body">
                  <div className="coin-piggy">🐷</div>
                  <div className="coin-info">
                    <p className="coin-title">Seu progresso no jogo</p>
                    <div className="progress"><div className="progress-bar" style={{ width: "65%" }}></div></div>
                    <p className="coin-sub">Próxima badge em 1.200 XP</p>
                    <div className="badges">
                      <span className="badge">💎 Constância</span>
                      <span className="badge">📈 Primeira Meta</span>
                      <span className="badge">🛡️ Fundo de Emergência</span>
                    </div>
                  </div>
                  <span className="coin-emoji coin-1">🪙</span><span className="coin-emoji coin-2">🪙</span><span className="coin-emoji coin-3">🪙</span>
                </div>
              </div>
              <p className="art-note">Progresso em tempo real</p>
            </div>
          </div>
        </div>
      </section>
      <section id="recursos" className="py-16 md:py-24">
        <div className="container mx-auto px-6"><div className="mb-12 text-center"><h2 className="mb-3 text-3xl font-bold md:text-4xl">Por que FinFit é diferente</h2><p className="text-lg text-muted-foreground">Gamificação real que torna educação financeira divertida e motivadora.</p></div><div className="grid gap-6 md:grid-cols-3"><Card className="border-border"><CardContent className="p-6"><div className="mb-3 inline-flex rounded-lg bg-primary/10 p-3"><TrendingUp className="h-6 w-6 text-primary" /></div><h3 className="mb-2 text-xl font-semibold">Ganhe XP & Suba de Nível</h3><p className="text-muted-foreground">Cada ação financeira saudável te aproxima do próximo nível. Veja seu progresso em tempo real.</p></CardContent></Card><Card className="border-border"><CardContent className="p-6"><div className="mb-3 inline-flex rounded-lg bg-primary/10 p-3"><Target className="h-6 w-6 text-primary" /></div><h3 className="mb-2 text-xl font-semibold">Desafios Personalizados</h3><p className="text-muted-foreground">Comece com desafios fáceis e avance para objetivos mais ambiciosos conforme você evolui.</p></CardContent></Card><Card className="border-border"><CardContent className="p-6"><div className="mb-3 inline-flex rounded-lg bg-primary/10 p-3"><Users className="h-6 w-6 text-primary" /></div><h3 className="mb-2 text-xl font-semibold">Compita no Ranking</h3><p className="text-muted-foreground">Suba posições na nossa ranking justa, baseada em consistência, crescimento e engajamento.</p></CardContent></Card></div></div>
      </section>
      <section id="como-funciona" className="border-t border-border py-16 md:py-24">
        <div className="container mx-auto px-6"><div className="mb-12 text-center"><h2 className="text-3xl font-bold md:text-4xl">Como Funciona</h2></div><div className="grid gap-6 md:grid-cols-3"><Card className="border-border"><CardContent className="p-6"><div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-xl font-bold text-primary">1</div><h4 className="mb-2 text-lg font-semibold">Responda um Diagnóstico</h4><p className="text-muted-foreground">Entenda sua relação com dinheiro em 6 perguntas rápidas.</p></CardContent></Card><Card className="border-border"><CardContent className="p-6"><div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-xl font-bold text-primary">2</div><h4 className="mb-2 text-lg font-semibold">Aceite Desafios</h4><p className="text-muted-foreground">Comece com metas pequenas e construa momentum.</p></CardContent></Card><Card className="border-border"><CardContent className="p-6"><div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-xl font-bold text-primary">3</div><h4 className="mb-2 text-lg font-semibold">Suba no Ranking</h4><p className="text-muted-foreground">Ganhe XP e compita com a comunidade de forma justa.</p></CardContent></Card></div></div>
      </section>
      <section id="ranking" className="py-16 md:py-24">
        <div className="container mx-auto px-6"><Card className="border-border bg-gradient-to-b from-card to-secondary"><CardContent className="p-12 text-center"><h2 className="mb-3 text-3xl font-bold md:text-4xl">Pronto para começar?</h2><p className="mb-8 text-lg text-muted-foreground">Junte-se aos brasileiros que estão transformando sua relação com dinheiro.</p><div className="flex flex-col justify-center gap-3 sm:flex-row"><Button size="lg" onClick={onStartDiagnostic}>Começar Agora</Button><Button size="lg" variant="outline">Ver Dashboard</Button></div></CardContent></Card></div>
      </section>
    </main>
  );
}

// --- Componente para o Dashboard Principal do Jogo ---
function GameDashboard({
    userName, totalXP, currentLevel, completedActivities, onCompleteActivity, selectedPath, onPathSelected
}:{
    userName: string; totalXP: number; currentLevel: number; completedActivities: string[]; onCompleteActivity: (activity: Activity) => void; selectedPath: SelectedPath | null; onPathSelected: (path: Path) => void;
}) {
    const currentChallengeData = challenges.find((c) => c.level === currentLevel);

    return (
        <div className="min-h-screen">
            <header className="sticky top-0 z-50 border-b border-border bg-background/60 backdrop-blur-lg">
                <div className="container mx-auto flex items-center justify-between px-6 py-4">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="brand-xp text-xl">XP</span>
                        <span className="brand-name text-xl">FinFit</span>
                    </Link>
                    <nav className="hidden items-center gap-6 md:flex">
                        <a href="#journey" className="text-muted-foreground transition-colors hover:text-foreground">Jornada</a>
                        <a href="#desafios" className="text-muted-foreground transition-colors hover:text-foreground">Desafios</a>
                    </nav>
                    <div className="hidden items-center gap-4 md:flex">
                        <div className="text-sm">Bem-vindo(a), <span className="font-bold">{userName}</span>!</div>
                        <div className="text-sm font-bold text-amber-500">{totalXP.toLocaleString('pt-BR')} XP</div>
                    </div>
                </div>
            </header>
            <main className="py-12">
                <JourneySection onPathSelected={onPathSelected} />
                {selectedPath && <div id="flashcards"><FlashcardsSection key={selectedPath.id} pathName={selectedPath.name} levels={selectedPath.levels} /></div>}
                <section id="desafios" className="border-t border-border py-16 md:py-24 bg-secondary">
                    <div className="container mx-auto px-6">
                        {currentChallengeData && (
                            <LevelChallenges 
                                levelData={currentChallengeData}
                                totalXP={totalXP}
                                completedActivities={completedActivities}
                                onCompleteActivity={onCompleteActivity}
                            />
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}

// --- Componente Principal da Página ---
export default function FinFitLanding() {
  const [showDiagnostic, setShowDiagnostic] = useState(false);
  const [diagnosticComplete, setDiagnosticComplete] = useState(false);
  const [userName, setUserName] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedPath, setSelectedPath] = useState<SelectedPath | null>(null);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [totalXP, setTotalXP] = useState(10800);
  const [completedActivities, setCompletedActivities] = useState<string[]>([]);

  const handlePathSelected = (path: Path) => {
    const levelsForFlashcards = path.niveis.map((nivel) => ({
      id: nivel.id,
      label: nivel.label,
      questions: nivel.perguntas.map((p) => ({
        question: p.enunciado,
        options: p.alternativas,
        correctIndex: p.correta,
        explanation: p.explicacao,
      })),
    }));
    setSelectedPath({ id: path.id, name: path.name, levels: levelsForFlashcards });
  };
  
  const handleCompleteActivity = (activity: Activity) => {
    if (completedActivities.includes(activity.id)) return;
    setTotalXP((prevXP) => prevXP + activity.xp);
    const newCompleted = [...completedActivities, activity.id];
    setCompletedActivities(newCompleted);
    
    const currentChallenge = challenges.find((c) => c.level === currentLevel);
    if (currentChallenge) {
      const allActivitiesOfLevelCompleted = currentChallenge.activities.every((act) =>
        newCompleted.includes(act.id)
      );
      if (allActivitiesOfLevelCompleted) {
        const nextLevel = currentLevel + 1;
        if (challenges.some((c) => c.level === nextLevel)) {
          setCurrentLevel(nextLevel);
        }
      }
    }
  };

  const handleDiagnosticComplete = ({name, level}: {name: string, level: number}) => {
      setUserName(name);
      setCurrentLevel(level);
      setDiagnosticComplete(true);
      setShowDiagnostic(false);
  };

  if (showDiagnostic) {
    return (
      <DiagnosticFlow
        onBack={() => setShowDiagnostic(false)}
        onDiagnosticComplete={handleDiagnosticComplete}
      />
    );
  }

  if (diagnosticComplete) {
      return <GameDashboard 
        userName={userName}
        totalXP={totalXP}
        currentLevel={currentLevel}
        completedActivities={completedActivities}
        onCompleteActivity={handleCompleteActivity}
        selectedPath={selectedPath}
        onPathSelected={handlePathSelected}
      />
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-border bg-background/60 backdrop-blur-lg">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="brand-xp text-xl">XP</span>
            <span className="brand-name text-xl">FinFit</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <a href="#recursos" className="text-muted-foreground transition-colors hover:text-foreground">Recursos</a>
            <a href="#desafios" className="text-muted-foreground transition-colors hover:text-foreground">Desafios</a>
            <a href="#como-funciona" className="text-muted-foreground transition-colors hover:text-foreground">Como Funciona</a>
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <Button size="sm" onClick={() => setShowDiagnostic(true)}>Começar Diagnóstico</Button>
          </div>
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="border-t border-border bg-card px-6 py-4 md:hidden">
            <nav className="flex flex-col gap-3">
              <a href="#recursos" className="text-muted-foreground" onClick={() => setMobileMenuOpen(false)}>Recursos</a>
              <a href="#desafios" className="text-muted-foreground" onClick={() => setMobileMenuOpen(false)}>Desafios</a>
              <a href="#como-funciona" className="text-muted-foreground" onClick={() => setMobileMenuOpen(false)}>Como Funciona</a>
              <Button size="sm" className="mt-2" onClick={() => setShowDiagnostic(true)}>Começar</Button>
            </nav>
          </div>
        )}
      </header>
      <MarketingPage onStartDiagnostic={() => setShowDiagnostic(true)} />
       <footer className="border-t border-border">
        <div className="container mx-auto px-6 py-12">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="brand-xp text-xl">XP</span>
                <span className="brand-name text-xl">FinFit</span>
              </div>
              <p className="text-sm text-muted-foreground">Seu jogo de saúde financeira. Educação sem economês, com motivação verdadeira.</p>
            </div>
            <nav className="flex flex-col gap-2">
              <a href="#recursos" className="text-sm text-muted-foreground">Recursos</a>
              <a href="#como-funciona" className="text-sm text-muted-foreground">Como Funciona</a>
              <a href="#ranking" className="text-sm text-muted-foreground">Ranking</a>
            </nav>
            <div><Button variant="outline" onClick={() => setShowDiagnostic(true)}>Começar</Button></div>
          </div>
          <div className="mt-8 border-t border-border pt-8 text-center"><p className="text-sm text-muted-foreground">© 2025 FinFit. Todos os direitos reservados.</p></div>
        </div>
      </footer>
    </div>
  );
}