"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Users, Cog, Globe, Play, BookOpen, Target } from "lucide-react"
import Link from "next/link"
import DashboardLayout from "@/components/dashboard-layout"

export default function DomainPracticePage() {
  const domains = [
    {
      id: "people",
      name: "Personnes",
      icon: Users,
      description: "Leadership, gestion d'équipe, communication et développement des compétences",
      questions: 42,
      percentage: 42,
      currentScore: 78,
      topics: [
        "Leadership et influence",
        "Gestion d'équipe",
        "Communication",
        "Négociation",
        "Développement des compétences",
      ],
      color: "bg-gradient-to-r from-amber-500 to-yellow-500",
      lightColor: "bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200",
    },
    {
      id: "process",
      name: "Processus",
      icon: Cog,
      description: "Gestion du cycle de vie du projet, planification et contrôle",
      questions: 50,
      percentage: 50,
      currentScore: 82,
      topics: ["Initiation du projet", "Planification", "Exécution", "Surveillance et contrôle", "Clôture du projet"],
      color: "bg-gradient-to-r from-amber-400 to-yellow-400",
      lightColor: "bg-gradient-to-br from-amber-50 to-yellow-50 border-yellow-200",
    },
    {
      id: "environment",
      name: "Environnement",
      icon: Globe,
      description: "Contexte organisationnel, stratégie et conformité",
      questions: 88,
      percentage: 88,
      currentScore: 75,
      topics: [
        "Structure organisationnelle",
        "Gouvernance",
        "Conformité et réglementation",
        "Stratégie d'entreprise",
        "Gestion du changement",
      ],
      color: "bg-gradient-to-r from-orange-500 to-amber-500",
      lightColor: "bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200",
    },
  ]

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-amber-600"
    if (score >= 61) return "text-yellow-600"
    return "text-red-600"
  }

  const getRecommendation = (score: number) => {
    if (score >= 80) return { text: "Excellent niveau", color: "text-amber-600" }
    if (score >= 61) return { text: "Bon niveau", color: "text-yellow-600" }
    return { text: "À améliorer", color: "text-red-600" }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Entraînement par domaine</h1>
            <p className="text-gray-600 mt-2">Concentrez-vous sur vos points faibles avec des questions ciblées</p>
          </div>
          <div className="flex gap-3">
            <Link href="/dashboard/pmp-simulator">
              <Button variant="outline">Retour au simulateur</Button>
            </Link>
            <Link href="/dashboard/pmp-training">
              <Button variant="outline">
                <BookOpen className="w-4 h-4 mr-2" />
                Formation
              </Button>
            </Link>
          </div>
        </div>

        {/* Vue d'ensemble */}
        <Card>
          <CardHeader>
            <CardTitle>Vue d'ensemble des domaines</CardTitle>
            <CardDescription>L'examen PMP est structuré autour de 3 domaines principaux selon le PMI</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {domains.map((domain) => {
                const Icon = domain.icon
                const recommendation = getRecommendation(domain.currentScore)

                return (
                  <div key={domain.id} className={`p-6 rounded-lg border-2 ${domain.lightColor}`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${domain.color} rounded-lg flex items-center justify-center`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{domain.name}</h3>
                          <p className="text-sm text-gray-600">{domain.percentage}% de l'examen</p>
                        </div>
                      </div>
                      <Badge className={`${domain.color} text-white`}>{domain.questions} questions</Badge>
                    </div>

                    <p className="text-sm text-gray-600 mb-4">{domain.description}</p>

                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Score actuel</span>
                        <span className={`font-bold ${getScoreColor(domain.currentScore)}`}>
                          {domain.currentScore}%
                        </span>
                      </div>
                      <Progress value={domain.currentScore} className="h-2" />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Seuil: 61%</span>
                        <span className={recommendation.color}>{recommendation.text}</span>
                      </div>
                    </div>

                    <Link href={`/dashboard/pmp-simulator/exam?mode=domain&domain=${domain.id}`}>
                      <Button className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white shadow-xl border-0">
                        <Play className="w-4 h-4 mr-2" />
                        S'entraîner
                      </Button>
                    </Link>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Détails par domaine */}
        <div className="space-y-6">
          {domains.map((domain) => {
            const Icon = domain.icon

            return (
              <Card key={domain.id}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 ${domain.color} rounded-lg flex items-center justify-center`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <CardTitle>{domain.name}</CardTitle>
                      <CardDescription>
                        {domain.questions} questions ({domain.percentage}% de l'examen)
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Sujets couverts :</h4>
                      <ul className="space-y-2">
                        {domain.topics.map((topic, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Performance actuelle</span>
                          <span className={`font-bold text-lg ${getScoreColor(domain.currentScore)}`}>
                            {domain.currentScore}%
                          </span>
                        </div>
                        <Progress value={domain.currentScore} className="h-3" />
                      </div>

                      <div className="flex gap-3">
                        <Link href={`/dashboard/pmp-simulator/exam?mode=domain&domain=${domain.id}`} className="flex-1">
                          <Button className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white shadow-xl border-0">
                            <Play className="w-4 h-4 mr-2" />
                            Test approfondi (30 questions - 55 min)
                          </Button>
                        </Link>
                        <Link href={`/dashboard/pmp-training?domain=${domain.id}`}>
                          <Button variant="outline" className="bg-transparent">
                            <BookOpen className="w-4 h-4 mr-2" />
                            Étudier
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Stratégie d'entraînement */}
        <Card className="bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 border-amber-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-amber-900">🎯 Stratégie d'entraînement recommandée</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 text-amber-600" />
                </div>
                <h4 className="font-medium text-amber-900 mb-2">1. Identifiez vos faiblesses</h4>
                <p className="text-sm text-amber-800">
                  Concentrez-vous sur les domaines où votre score est inférieur à 75%
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="w-6 h-6 text-indigo-600" />
                </div>
                <h4 className="font-medium text-indigo-900 mb-2">2. Étudiez puis pratiquez</h4>
                <p className="text-sm text-indigo-800">Alternez entre formation théorique et tests pratiques</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Play className="w-6 h-6 text-indigo-600" />
                </div>
                <h4 className="font-medium text-indigo-900 mb-2">3. Testez régulièrement</h4>
                <p className="text-sm text-indigo-800">
                  Faites des tests courts mais fréquents pour maintenir votre niveau
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
