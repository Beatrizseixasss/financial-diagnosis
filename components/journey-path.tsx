"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ArrowDown, BookCheck, Briefcase, CreditCard, Landmark, Lock, Rocket } from "lucide-react"

// Tipos importados ou definidos diretamente para manter o componente autocontido
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

export interface Path {
  id: string
  name: string
  icon: string // Manter para referência, mas vamos usar Lucide icons
  status: "unlocked" | "locked" | "completed"
  description: string
  niveis: Level[]
}

interface JourneyPathProps {
  paths: Path[]
  onSelectPath: (path: Path) => void
}

const iconMap: { [key: string]: React.ElementType } = {
  fundamentos: BookCheck,
  cartao: CreditCard,
  juros: Landmark,
  investimentos: Rocket,
  default: Briefcase,
}

export function JourneyPath({ paths, onSelectPath }: JourneyPathProps) {
  const unlockedPathIndex = paths.findIndex(p => p.status === "unlocked")

  return (
    <div className="relative w-full max-w-4xl mx-auto py-12">
      {/* A linha pontilhada central */}
      <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-border" />

      {/* Nós do caminho */}
      <div className="relative flex flex-col items-center gap-16">
        {paths.map((path, index) => {
          const Icon = iconMap[path.id] || iconMap.default
          const isLocked = path.status === "locked"
          const isCompleted = path.status === "completed"
          const isFirstUnlocked = index === unlockedPathIndex

          return (
            <div
              key={path.id}
              className={cn(
                "relative w-full flex items-center",
                index % 2 === 0 ? "justify-start" : "justify-end"
              )}
            >
              <div
                className={cn(
                  "w-1/2 px-4",
                  index % 2 === 0 ? "text-right" : "text-left"
                )}
              >
                <Card
                  className={cn(
                    "w-full max-w-sm transition-all duration-300",
                    isLocked ? "bg-muted/60 border-dashed" : "bg-card hover:shadow-lg hover:-translate-y-1",
                    index % 2 === 0 ? "ml-auto" : "mr-auto"
                  )}
                >
                  <CardContent className="p-4">
                    <h3 className={cn("font-bold text-lg mb-1", isLocked && "text-muted-foreground")}>
                      {path.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {path.description}
                    </p>
                    {isLocked ? (
                      <Button variant="outline" size="sm" disabled className="w-full">
                        <Lock className="w-4 h-4 mr-2" />
                        Bloqueado
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        className="w-full"
                        variant={isCompleted ? "outline" : "default"}
                        onClick={() => onSelectPath(path)}
                      >
                        {isCompleted ? "Revisar" : "Começar"}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Ícone no centro da linha */}
              <div
                className={cn(
                  "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-12 h-12 rounded-full border-4",
                  isLocked ? "bg-muted border-dashed" : "bg-background border-primary",
                  isCompleted && "bg-primary/20 border-primary"
                )}
              >
                <Icon
                  className={cn(
                    "w-6 h-6",
                    isLocked ? "text-muted-foreground" : "text-primary"
                  )}
                />
              </div>
              {isFirstUnlocked && (
                 <div className="absolute left-1/2 -translate-x-1/2 -bottom-10 z-20 flex flex-col items-center">
                    <span className="text-xs font-semibold text-primary animate-pulse">VOCÊ ESTÁ AQUI</span>
                    <ArrowDown className="w-5 h-5 text-primary animate-bounce mt-1" />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
