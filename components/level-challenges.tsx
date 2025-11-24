"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Activity as ActivityIcon, CheckCircle2, Gift, Lock, Star } from "lucide-react"
import { type Activity, type LevelChallenge } from "@/lib/challenges"

interface LevelChallengesProps {
  levelData: LevelChallenge;
  totalXP: number;
  completedActivities: string[];
  onCompleteActivity: (activity: Activity) => void;
}

export function LevelChallenges({ levelData, totalXP, completedActivities, onCompleteActivity }: LevelChallengesProps) {
  
  const handleActivityClick = (activity: Activity) => {
    if (completedActivities.includes(activity.id)) return;

    if (activity.type === 'reward' && totalXP < Math.abs(activity.xp)) {
      alert("XP Coins insuficientes!");
      return;
    }
    
    onCompleteActivity(activity);
  };

  const completedCount = levelData.activities.filter(a => completedActivities.includes(a.id)).length;
  const earnActivities = levelData.activities.filter(a => a.type === 'earn');
  const earnActivitiesCompleted = earnActivities.every(a => completedActivities.includes(a.id));

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="text-center mb-10">
          <h3 className="text-2xl font-bold tracking-tight md:text-3xl">{levelData.title}</h3>
          <p className="mt-2 text-muted-foreground">Estas são suas missões atuais para subir de nível.</p>
          <p className="mt-2 font-semibold text-primary">Progresso: {completedCount}/{levelData.activities.length}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {levelData.activities.map((activity) => {
          const isCompleted = completedActivities.includes(activity.id);
          const isReward = activity.type === 'reward';
          const canAfford = totalXP >= Math.abs(activity.xp);
          
          let isDisabled = isCompleted;
          if (isReward && !earnActivitiesCompleted) {
            isDisabled = true;
          } else if (isReward && !canAfford) {
            isDisabled = true;
          }

          return (
            <Card key={activity.id} className={cn("flex flex-col transition-all", isDisabled && !isCompleted ? "opacity-60" : "", isCompleted && "bg-muted/50")}>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                   <CardTitle className="text-lg">{activity.title}</CardTitle>
                   {isReward ? (
                       <Gift className={cn("w-6 h-6", isCompleted ? "text-green-500" : "text-amber-500")} />
                   ) : (
                       <ActivityIcon className={cn("w-6 h-6", isCompleted ? "text-green-500" : "text-primary")} />
                   )}
                </div>
                <CardDescription>{activity.description}</CardDescription>
              </CardHeader>
              <CardFooter className="flex-grow flex flex-col items-start justify-end mt-auto">
                <div className="w-full flex justify-between items-center mb-4">
                  {isReward ? (
                    <Badge variant="destructive" className="text-base">
                      Custa: {Math.abs(activity.xp)} XP
                    </Badge>
                  ) : (
                    <Badge variant="default" className="text-base">
                      Ganha: +{activity.xp} XP
                    </Badge>
                  )}
                   {isCompleted && (
                      <div className="flex items-center gap-1 text-sm text-green-600 font-semibold">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Concluído</span>
                      </div>
                  )}
                </div>

                <Button
                  className="w-full"
                  variant={isCompleted ? "secondary" : (isReward ? "default" : "outline")}
                  disabled={isDisabled}
                  onClick={() => handleActivityClick(activity)}
                >
                  {isCompleted ? "Feito!" : (isReward ? (earnActivitiesCompleted ? "Trocar XP" : "Complete as missões") : "Completar Missão")}
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
