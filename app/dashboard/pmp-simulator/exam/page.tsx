"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Clock, Flag, ArrowLeft, ArrowRight, AlertTriangle, BookOpen } from "lucide-react"
import { useState, useEffect, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import { pmpQuestions, getBalancedQuestions, getQuestionsByDomain, type PMPQuestion } from "@/lib/pmp-questions"

export default function ExamPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const mode = searchParams.get("mode") || "practice"
  const domain = searchParams.get("domain")

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({})
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [examQuestions, setExamQuestions] = useState<PMPQuestion[]>([])
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set())

  // Configuration selon le mode
  const examConfig = {
    full: { questions: 180, duration: 230 }, // Garder le timing officiel PMP
    practice: { questions: 50, duration: 90 }, // Augmenté de 65 à 90 minutes (1.8 min/question)
    quick: { questions: 20, duration: 35 }, // Augmenté de 25 à 35 minutes (1.75 min/question)
    domain: { questions: 30, duration: 55 }, // Augmenté de 40 à 55 minutes (1.83 min/question)
  }

  const config = examConfig[mode as keyof typeof examConfig] || examConfig.practice

  // Initialisation de l'examen avec les vraies questions PMP
  useEffect(() => {
    let selectedQuestions: PMPQuestion[] = []

    if (mode === "domain" && domain) {
      // Questions spécifiques à un domaine
      const domainMap: { [key: string]: string } = {
        people: "Personnes",
        process: "Processus",
        environment: "Environnement",
      }
      selectedQuestions = getQuestionsByDomain(domainMap[domain] || "Processus", config.questions)
    } else if (mode === "full") {
      // Examen complet avec répartition authentique PMP
      selectedQuestions = getBalancedQuestions(config.questions)
    } else {
      // Mélange aléatoire pour practice et quick
      selectedQuestions = [...pmpQuestions].sort(() => Math.random() - 0.5).slice(0, config.questions)
    }

    setExamQuestions(selectedQuestions)
    setTimeRemaining(config.duration * 60) // Convertir en secondes
  }, [config.questions, config.duration, mode, domain])

  // Timer authentique PMP
  useEffect(() => {
    if (timeRemaining > 0 && !isSubmitted) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeRemaining === 0 && !isSubmitted) {
      handleSubmitExam()
    }
  }, [timeRemaining, isSubmitted])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion]: answerIndex,
    }))
  }

  const handleFlagQuestion = () => {
    setFlaggedQuestions((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(currentQuestion)) {
        newSet.delete(currentQuestion)
      } else {
        newSet.add(currentQuestion)
      }
      return newSet
    })
  }

  const handleSubmitExam = useCallback(() => {
    setIsSubmitted(true)

    // Calculer le score avec les vraies réponses
    let correctAnswers = 0
    const domainScores: { [key: string]: { correct: number; total: number } } = {}

    examQuestions.forEach((question, index) => {
      const userAnswer = selectedAnswers[index]
      const isCorrect = userAnswer === question.correct

      if (isCorrect) correctAnswers++

      // Calculer les scores par domaine
      if (!domainScores[question.domain]) {
        domainScores[question.domain] = { correct: 0, total: 0 }
      }
      domainScores[question.domain].total++
      if (isCorrect) domainScores[question.domain].correct++
    })

    const totalScore = Math.round((correctAnswers / examQuestions.length) * 100)

    // Données détaillées pour l'analyse
    const resultData = {
      score: totalScore,
      correct: correctAnswers,
      total: examQuestions.length,
      domainScores,
      timeUsed: config.duration * 60 - timeRemaining,
      mode,
      questions: examQuestions.map((q, index) => ({
        id: q.id,
        question: q.question,
        userAnswer: selectedAnswers[index],
        correctAnswer: q.correct,
        isCorrect: selectedAnswers[index] === q.correct,
        explanation: q.explanation,
        domain: q.domain,
        difficulty: q.difficulty,
        pmbok_reference: q.pmbok_reference,
      })),
    }

    localStorage.setItem("examResult", JSON.stringify(resultData))
    router.push("/dashboard/pmp-simulator/result")
  }, [examQuestions, selectedAnswers, config.duration, timeRemaining, mode, router])

  if (examQuestions.length === 0) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
            <p>Préparation de votre examen PMP authentique...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  const currentQ = examQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / examQuestions.length) * 100
  const answeredQuestions = Object.keys(selectedAnswers).length

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Facile":
        return "bg-green-600"
      case "Moyen":
        return "bg-amber-600"
      case "Difficile":
        return "bg-red-600"
      default:
        return "bg-gray-600"
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header avec informations authentiques */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-lg shadow-sm border">
          <div>
            <h1 className="text-2xl font-bold">
              Simulateur PMP Authentique -{" "}
              {mode === "full"
                ? "Examen Complet (180Q)"
                : mode === "practice"
                  ? "Entraînement (50Q)"
                  : mode === "quick"
                    ? "Quiz Rapide (20Q)"
                    : "Par Domaine (30Q)"}
            </h1>
            <p className="text-gray-600">
              Question {currentQuestion + 1} sur {examQuestions.length} • Basé sur le PMBOK Guide 7ème édition
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-600" />
              <span
                className={`font-mono text-lg ${
                  timeRemaining < 300
                    ? "text-red-600 animate-pulse"
                    : timeRemaining < 900
                      ? "text-amber-600"
                      : "text-gray-900"
                }`}
              >
                {formatTime(timeRemaining)}
              </span>
            </div>
            <Button
              onClick={handleSubmitExam}
              className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white shadow-lg border-0"
            >
              Terminer l'examen
            </Button>
          </div>
        </div>

        {/* Progress avec statistiques */}
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Progression</span>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>
                {answeredQuestions}/{examQuestions.length} répondues
              </span>
              <span>•</span>
              <span>{flaggedQuestions.size} marquées</span>
              <span>•</span>
              <span>
                Temps recommandé: {Math.round((config.duration / examQuestions.length) * 10) / 10} min/question
              </span>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question authentique PMP */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className="border-amber-300 text-amber-700">
                    {currentQ.domain}
                  </Badge>
                  <Badge className={`${getDifficultyColor(currentQ.difficulty)} text-white`}>
                    {currentQ.difficulty}
                  </Badge>
                  <Badge variant="outline" className="border-blue-300 text-blue-700">
                    {currentQ.situation_type}
                  </Badge>
                  {flaggedQuestions.has(currentQuestion) && (
                    <Badge variant="destructive" className="bg-orange-500">
                      <Flag className="w-3 h-3 mr-1" />
                      Marquée
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-lg leading-relaxed mb-3">{currentQ.question}</CardTitle>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <BookOpen className="w-3 h-3" />
                  <span>Référence: {currentQ.pmbok_reference}</span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleFlagQuestion}
                className={flaggedQuestions.has(currentQuestion) ? "bg-orange-50 border-orange-200" : ""}
              >
                <Flag className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {currentQ.options.map((option, index) => (
              <div
                key={index}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedAnswers[currentQuestion] === index
                    ? "border-amber-500 bg-gradient-to-r from-amber-50 to-yellow-50 shadow-md"
                    : "border-gray-200 hover:border-amber-300 hover:bg-amber-50"
                }`}
                onClick={() => handleAnswerSelect(index)}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                      selectedAnswers[currentQuestion] === index
                        ? "border-amber-500 bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-md"
                        : "border-gray-300"
                    }`}
                  >
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="flex-1 leading-relaxed">{option}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Navigation avec aperçu des questions */}
        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border">
          <Button
            variant="outline"
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Précédente
          </Button>

          <div className="flex gap-1 max-w-2xl overflow-x-auto">
            {examQuestions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`min-w-8 h-8 rounded text-xs font-medium transition-colors ${
                  index === currentQuestion
                    ? "bg-gradient-to-r from-amber-600 to-yellow-600 text-white shadow-md"
                    : selectedAnswers[index] !== undefined
                      ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-300"
                      : flaggedQuestions.has(index)
                        ? "bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 border border-orange-300"
                        : "bg-gray-100 text-gray-600 border border-gray-300 hover:bg-gray-200"
                }`}
                title={`Question ${index + 1} - ${examQuestions[index].domain} - ${examQuestions[index].difficulty}`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <Button
            variant="outline"
            onClick={() => setCurrentQuestion(Math.min(examQuestions.length - 1, currentQuestion + 1))}
            disabled={currentQuestion === examQuestions.length - 1}
          >
            Suivante
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Alertes et conseils */}
        {answeredQuestions < examQuestions.length && (
          <Card className="border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-amber-800">
                <AlertTriangle className="w-5 h-5" />
                <span className="font-medium">
                  {examQuestions.length - answeredQuestions} question(s) non répondue(s)
                </span>
              </div>
              <p className="text-sm text-amber-700 mt-2">
                💡 <strong>Conseil PMP:</strong> Lisez attentivement chaque question. Les questions situationnelles
                nécessitent d'identifier le contexte et la meilleure pratique selon le PMBOK.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Statistiques temps réel */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {Math.round((answeredQuestions / examQuestions.length) * 100)}%
                </div>
                <div className="text-xs text-blue-700">Complété</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {Math.round(((config.duration * 60 - timeRemaining) / (config.duration * 60)) * 100)}%
                </div>
                <div className="text-xs text-blue-700">Temps utilisé</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">{flaggedQuestions.size}</div>
                <div className="text-xs text-blue-700">Questions marquées</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {examQuestions.length > 0
                    ? Math.round(((config.duration * 60 - timeRemaining) / (currentQuestion + 1) / 60) * 10) / 10
                    : 0}
                </div>
                <div className="text-xs text-blue-700">Min/question</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
