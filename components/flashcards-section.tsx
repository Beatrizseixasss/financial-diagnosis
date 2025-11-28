"use client";

import { useEffect, useRef, useState } from "react";

const MAX_LIVES = 6;
const XP_PER_CORRECT = 10;
const LIFE_COOLDOWN_MS = 8 * 60 * 60 * 1000;

interface Question {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
}

interface Level {
    id: string;
    label: string;
    questions: Question[];
}

interface RankingPlayer {
    name: string;
    xp: number;
}

interface FlashcardsSectionProps {
    pathName?: string;
    questions?: Question[];
    levels?: Level[];
}

export function FlashcardsSection({ pathName, questions: pathQuestions, levels }: FlashcardsSectionProps) {
    const defaultQuestions: Question[] = [
        {
            question: "Selecione um caminho na árvore para liberar os flashcards.",
            options: ["Voltar para cima", "Escolher um caminho", "Começar jornada"],
            correctIndex: 1,
            explanation: "Escolha um dos caminhos acima para começar!",
        },
    ];

    const hasLevels = levels && levels.length > 0;
    const isDefaultMode = !hasLevels && (!pathQuestions || pathQuestions.length === 0);

    const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [lives, setLives] = useState(MAX_LIVES);
    const [xp, setXp] = useState(0);
    const [xpPhase, setXpPhase] = useState(0);
    const [isLocked, setIsLocked] = useState(false);
    const [feedback, setFeedback] = useState("");
    const [pigEmoji, setPigEmoji] = useState("🐷");
    const [pigMessage, setPigMessage] = useState(
        isDefaultMode
            ? "Escolha um caminho na jornada acima para começar!"
            : "Vamos lá! Escolha uma resposta para avançar."
    );
    const [cardState, setCardState] = useState<"normal" | "correct" | "incorrect">("normal");
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [gameOver, setGameOver] = useState(false);
    const [ranking, setRanking] = useState<RankingPlayer[]>([]);
    const [showNextLevelBtn, setShowNextLevelBtn] = useState(false);
    const [showCoins, setShowCoins] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    const getCurrentLevel = () => {
        if (!hasLevels) return null;
        return levels[currentLevelIndex];
    };

    const getActiveQuestions = (): Question[] => {
        if (hasLevels) {
            const currentLevel = getCurrentLevel();
            return currentLevel?.questions || defaultQuestions;
        }
        return pathQuestions && pathQuestions.length > 0 ? pathQuestions : defaultQuestions;
    };

    const activeQuestions = getActiveQuestions();

    useEffect(() => {
        if ((hasLevels || pathQuestions) && !isDefaultMode) {
            setCurrentLevelIndex(0);
            setCurrentQuestionIndex(0);
            setXpPhase(0);
            setIsLocked(false);
            setFeedback("");
            setPigEmoji("🐷");
            setPigMessage("Vamos lá! Escolha uma resposta para avançar.");
            setCardState("normal");
            setSelectedOption(null);
            setShowNextLevelBtn(false);

            // Show the flashcards section
            setIsVisible(true);

            // Scroll to the section smoothly
            setTimeout(() => {
                if (sectionRef.current) {
                    sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }, 100);
        }
    }, [pathQuestions, levels, hasLevels, isDefaultMode]);

    useEffect(() => {
        const stored = localStorage.getItem("finfit_flash_lives_state");
        if (!stored) {
            setLives(MAX_LIVES);
            return;
        }
        try {
            const { livesLeft, depletedAt } = JSON.parse(stored);
            if (livesLeft > 0) {
                setLives(livesLeft);
            } else {
                const now = Date.now();
                if (now - depletedAt >= LIFE_COOLDOWN_MS) {
                    setLives(MAX_LIVES);
                    localStorage.removeItem("finfit_flash_lives_state");
                } else {
                    setLives(0);
                    setGameOver(true);
                }
            }
        } catch (e) {
            setLives(MAX_LIVES);
        }
    }, []);

    useEffect(() => {
        const basePlayers = [
            { name: "Ana", xp: 130 },
            { name: "Lucas", xp: 110 },
            { name: "Você", xp: xp },
            { name: "João", xp: 70 },
            { name: "Carla", xp: 40 },
        ];
        setRanking(basePlayers.sort((a, b) => b.xp - a.xp));
    }, [xp]);

    // Persist XP to localStorage and notify other parts of the app
    const saveXpState = (newXp: number) => {
        try {
            localStorage.setItem("finfit_user_xp", String(newXp));
        } catch (e) {
            // ignore storage errors
        }

        try {
            // Dispatch a cross-component event so other parts of the SPA can react
            window.dispatchEvent(new CustomEvent("finfit-xp-changed", { detail: newXp }));
        } catch (e) {
            // ignore dispatch errors
        }
    };

    // Load stored XP once on mount
    useEffect(() => {
        try {
            const raw = localStorage.getItem("finfit_user_xp");
            if (raw) {
                const parsed = parseInt(raw, 10);
                if (!Number.isNaN(parsed)) setXp(parsed);
            }
        } catch (e) {
            // ignore
        }
    }, []);

    // Whenever XP changes, persist it and notify
    useEffect(() => {
        saveXpState(xp);
    }, [xp]);

    const saveLivesState = (newLives: number) => {
        const data = {
            livesLeft: newLives,
            depletedAt: newLives <= 0 ? Date.now() : null,
        };
        localStorage.setItem("finfit_flash_lives_state", JSON.stringify(data));
    };

    const spawnCoinsAnimation = () => {
        setShowCoins(true);
        setTimeout(() => setShowCoins(false), 900);
    };

    const handleAnswer = (selectedIndex: number) => {
        if (isLocked || lives <= 0 || isDefaultMode) return;
        setIsLocked(true);
        setSelectedOption(selectedIndex);

        const q = activeQuestions[currentQuestionIndex];
        const isCorrect = selectedIndex === q.correctIndex;

        if (isCorrect) {
            setCardState("correct");
            setPigEmoji("🐷🎉");
            setPigMessage("Boa! Você acertou.");
            setFeedback(q.explanation);
            setXp(prev => prev + XP_PER_CORRECT);
            setXpPhase(prev => prev + XP_PER_CORRECT);
            spawnCoinsAnimation();

            if (navigator.vibrate) {
                navigator.vibrate([80, 40, 80]);
            }
        } else {
            setCardState("incorrect");
            setPigEmoji("🐷😢");
            setPigMessage("Quase!");
            setFeedback(q.explanation);
            const newLives = Math.max(0, lives - 1);
            setLives(newLives);
            saveLivesState(newLives);

            if (navigator.vibrate) {
                navigator.vibrate(120);
            }

            if (newLives <= 0) {
                setGameOver(true);
            }
        }

        setTimeout(() => {
            setCardState("normal");
            setSelectedOption(null);

            if (lives <= 0 || (lives === 1 && !isCorrect)) {
                setIsLocked(false);
                return;
            }

            const isLastQuestion = currentQuestionIndex >= activeQuestions.length - 1;

            if (isLastQuestion) {
                showLevelCompleted();
            } else {
                setCurrentQuestionIndex(prev => prev + 1);
                setPigEmoji("🐷");
                setPigMessage("Vamos lá! Escolha uma resposta para avançar.");
                setFeedback("");
            }

            setIsLocked(false);
        }, 1400);
    };

    const showLevelCompleted = () => {
        const currentLevel = getCurrentLevel();
        const isLastLevel = hasLevels && currentLevelIndex === levels.length - 1;

        if (isLastLevel) {
            setPigEmoji("🐷🚀");
            setPigMessage("Parabéns! Você concluiu todos os níveis desta fase.");
            setFeedback("Em breve novos desafios serão liberados.");
            setShowNextLevelBtn(false);
        } else {
            setPigEmoji("🐷🚀");
            setPigMessage(`Você concluiu o ${currentLevel?.label || "nível"}!`);
            setFeedback("Muito bom! Quando estiver pronto(a), avance para o próximo nível.");
            setShowNextLevelBtn(true);
        }
    };

    const handleNextLevel = () => {
        if (!hasLevels || currentLevelIndex >= levels.length - 1) return;

        // Reset state for next level
        setCurrentLevelIndex(prev => prev + 1);
        setCurrentQuestionIndex(0);
        setLives(MAX_LIVES);
        setXpPhase(0);
        saveLivesState(MAX_LIVES);
        setIsLocked(false);
        setFeedback("");
        setPigEmoji("🐷");
        setPigMessage("Vamos lá! Escolha uma resposta para avançar.");
        setCardState("normal");
        setSelectedOption(null);
        setShowNextLevelBtn(false);
        setGameOver(false);
    };

    const currentQuestion = activeQuestions[currentQuestionIndex] || activeQuestions[0] || defaultQuestions[0];
    const letters = ["A", "B", "C", "D"];
    const maxXPPhase = activeQuestions.length * XP_PER_CORRECT;
    const xpPercent = Math.min(100, (xpPhase / maxXPPhase) * 100);

    const currentLevel = getCurrentLevel();
    const levelLabel = currentLevel?.label || "";

    return (
        <section id="flashcards" ref={sectionRef} className={`flashcards ${!isVisible ? "flashcards--hidden" : ""}`}>
            <div className="container mx-auto px-6">
                <h2 className="mb-2 text-3xl font-bold md:text-4xl">{pathName || "Modo Desafio: Flashcards"}</h2>
                <p className="section-lead mb-8 text-lg text-muted-foreground">
                    Responda perguntas rápidas sobre dinheiro, crédito, juros e investimentos. Acerte para ganhar XP,
                    erre e você perde vidas.
                </p>

                <div className="status-bar">
                    <div className="xp-wrapper">
                        <span className="status-label">XP total</span>
                        <div className="xp-bar">
                            <div className="xp-fill" style={{ width: `${xpPercent}%` }} />
                        </div>
                        <span className="xp-value">{xp.toLocaleString("pt-BR")} XP</span>
                    </div>

                    <div className="lives-wrapper">
                        <span className="status-label">Vidas da fase</span>
                        <div className="lives">
                            {Array.from({ length: MAX_LIVES }, (_, i) => (
                                <span key={i} className="life-icon">
                                    {i < lives ? "❤️" : "🖤"}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={`flash-card ${cardState}`}>
                    <div className="flash-card-header">
                        <span className="tag">{levelLabel || pathName || "Escolha um caminho para começar"}</span>
                        <span className="question-number">
                            {isDefaultMode ? "–" : `Pergunta ${currentQuestionIndex + 1} de ${activeQuestions.length}`}
                        </span>
                    </div>

                    <div className="flash-card-body">
                        <div className="mascot">{pigEmoji}</div>
                        <div>
                            <h3>{currentQuestion.question}</h3>
                            <div className="options">
                                {(currentQuestion?.options || []).map((opt, idx) => {
                                    const isCorrectOption = idx === currentQuestion.correctIndex;
                                    const isSelectedOption = idx === selectedOption;
                                    const showCorrect = selectedOption !== null && isCorrectOption;
                                    const showIncorrect =
                                        selectedOption !== null && isSelectedOption && !isCorrectOption;

                                    return (
                                        <button
                                            key={idx}
                                            type="button"
                                            className={`option-btn ${showCorrect ? "correct-answer" : ""} ${
                                                showIncorrect ? "wrong-answer" : ""
                                            }`}
                                            onClick={() => handleAnswer(idx)}
                                            disabled={isLocked || gameOver || isDefaultMode || showNextLevelBtn}
                                        >
                                            <span className="option-letter">{letters[idx]}</span>
                                            <span>{opt}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="flash-card-footer">
                        <p className="feedback-text">
                            {feedback ||
                                (isDefaultMode
                                    ? "Assim que você escolher um caminho, as perguntas aparecem aqui."
                                    : pigMessage)}
                        </p>
                        {showNextLevelBtn && (
                            <button type="button" onClick={handleNextLevel} className="btn btn-outline btn-sm mt-4">
                                Avançar para o próximo nível ➜
                            </button>
                        )}
                    </div>
                </div>

                {showCoins && (
                    <div className="coin-layer">
                        {Array.from({ length: 5 }, (_, i) => (
                            <span
                                key={i}
                                className="coin-burst"
                                style={{
                                    left: `${30 + Math.random() * 40}%`,
                                    animationDelay: `${i * 80}ms`,
                                }}
                            >
                                🪙
                            </span>
                        ))}
                    </div>
                )}

                {gameOver && (
                    <div className="game-over">
                        <h3>Suas vidas acabaram 💔</h3>
                        <p>Volte novamente em 8h para recuperá-las e avançar em seu desafio.</p>
                    </div>
                )}

                <div className="ranking">
                    <h3 className="text-xl font-bold">Ranking da fase</h3>
                    <p className="ranking-sub">Veja sua posição em relação a outros jogadores.</p>
                    <ol className="ranking-list">
                        {ranking.map((player, idx) => (
                            <li key={idx} className={player.name === "Você" ? "you" : ""}>
                                <div className="player">
                                    <span className="pos">#{idx + 1}</span>
                                    <span>{player.name}</span>
                                </div>
                                <span>{player.xp} XP</span>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    );
}
