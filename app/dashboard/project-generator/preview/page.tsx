"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Download,
  Edit,
  Share2,
  FileText,
  Calendar,
  DollarSign,
  Users,
  Target,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"
import DashboardLayout from "@/components/dashboard-layout"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface ProjectData {
  projectName: string
  projectDescription: string
  projectObjectives: string
  projectScope: string
  projectManager: string
  sponsor: string
  teamMembers: string
  stakeholders: string
  startDate: string
  endDate: string
  budget: string
  currency: string
  mainRisks: string
  constraints: string
  assumptions: string
  deliverables: string
  successCriteria: string
  methodology: string
  communicationPlan: string
  includeGantt: boolean
  includeRiskMatrix: boolean
  includeBudgetBreakdown: boolean
  includeStakeholderMatrix: boolean
}

export default function PreviewPage() {
  const [projectData, setProjectData] = useState<ProjectData | null>(null)
  const [isExporting, setIsExporting] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const savedProject = localStorage.getItem("generatedProject")
    if (savedProject) {
      setProjectData(JSON.parse(savedProject))
    } else {
      router.push("/dashboard/project-generator")
    }
  }, [router])

  const exportToPDF = async () => {
    setIsExporting(true)

    // Simulation d'export PDF
    setTimeout(() => {
      setIsExporting(false)
      // Créer un blob avec le contenu du projet
      const content = generateProjectDocument()
      const blob = new Blob([content], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${projectData?.projectName || "projet"}_charte.txt`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }, 2000)
  }

  const generateProjectDocument = () => {
    if (!projectData) return ""

    const formatDate = (dateString: string) => {
      if (!dateString) return "Non défini"
      return new Date(dateString).toLocaleDateString("fr-FR")
    }

    const calculateDuration = () => {
      if (!projectData.startDate || !projectData.endDate) return "Non défini"
      const start = new Date(projectData.startDate)
      const end = new Date(projectData.endDate)
      const diffTime = Math.abs(end.getTime() - start.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      const months = Math.floor(diffDays / 30)
      const days = diffDays % 30
      return `${months} mois${days > 0 ? ` et ${days} jours` : ""}`
    }

    return `
CHARTE DE PROJET
================

INFORMATIONS GÉNÉRALES
----------------------
Nom du projet: ${projectData.projectName}
Chef de projet: ${projectData.projectManager}
Sponsor: ${projectData.sponsor}
Méthodologie: ${projectData.methodology}

Date de début: ${formatDate(projectData.startDate)}
Date de fin prévue: ${formatDate(projectData.endDate)}
Durée estimée: ${calculateDuration()}
Budget total: ${projectData.budget} ${projectData.currency}

DESCRIPTION DU PROJET
--------------------
${projectData.projectDescription}

OBJECTIFS
---------
${projectData.projectObjectives}

PÉRIMÈTRE DU PROJET
------------------
${projectData.projectScope}

ÉQUIPE PROJET
-------------
Chef de projet: ${projectData.projectManager}
Sponsor: ${projectData.sponsor}

Membres de l'équipe:
${projectData.teamMembers || "À définir"}

PARTIES PRENANTES
-----------------
${projectData.stakeholders || "À identifier"}

LIVRABLES PRINCIPAUX
-------------------
${projectData.deliverables}

CRITÈRES DE SUCCÈS
------------------
${projectData.successCriteria || "À définir"}

RISQUES PRINCIPAUX
------------------
${projectData.mainRisks || "Aucun risque identifié"}

CONTRAINTES
-----------
${projectData.constraints || "Aucune contrainte particulière"}

HYPOTHÈSES
----------
${projectData.assumptions || "Aucune hypothèse particulière"}

PLAN DE COMMUNICATION
--------------------
${projectData.communicationPlan || "À définir"}

---
Document généré par SICA CONSEIL
Date de génération: ${new Date().toLocaleDateString("fr-FR")}
    `.trim()
  }

  if (!projectData) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
            <p>Chargement du projet...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "Non défini"
    return new Date(dateString).toLocaleDateString("fr-FR")
  }

  const calculateDuration = () => {
    if (!projectData.startDate || !projectData.endDate) return "Non défini"
    const start = new Date(projectData.startDate)
    const end = new Date(projectData.endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    const months = Math.floor(diffDays / 30)
    const days = diffDays % 30
    return `${months} mois${days > 0 ? ` et ${days} jours` : ""}`
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard/project-generator/new">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Prévisualisation du Projet</h1>
              <p className="text-gray-600">Vérifiez et exportez votre charte de projet</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" className="bg-transparent">
              <Edit className="w-4 h-4 mr-2" />
              Modifier
            </Button>
            <Button variant="outline" className="bg-transparent">
              <Share2 className="w-4 h-4 mr-2" />
              Partager
            </Button>
            <Button
              onClick={exportToPDF}
              disabled={isExporting}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-xl border-0"
            >
              {isExporting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Export...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Exporter PDF
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Project Overview */}
        <Card className="bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 border-amber-200 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl text-amber-900">{projectData.projectName}</CardTitle>
                <CardDescription className="text-amber-700 mt-2">{projectData.projectDescription}</CardDescription>
              </div>
              <Badge className="bg-gradient-to-r from-amber-600 to-yellow-600 text-white">
                {projectData.methodology}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-amber-700">Durée</p>
                  <p className="font-semibold text-amber-900">{calculateDuration()}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-amber-700">Budget</p>
                  <p className="font-semibold text-amber-900">
                    {projectData.budget} {projectData.currency}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-amber-700">Chef de projet</p>
                  <p className="font-semibold text-amber-900">{projectData.projectManager}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-amber-700">Sponsor</p>
                  <p className="font-semibold text-amber-900">{projectData.sponsor}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Project Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Objectifs et Périmètre */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-amber-600" />
                Objectifs et Périmètre
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Objectifs</h4>
                <p className="text-gray-700 text-sm leading-relaxed">{projectData.projectObjectives}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Périmètre</h4>
                <p className="text-gray-700 text-sm leading-relaxed">{projectData.projectScope}</p>
              </div>
            </CardContent>
          </Card>

          {/* Planning */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-600" />
                Planning
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Date de début</h4>
                  <p className="text-gray-700 text-sm">{formatDate(projectData.startDate)}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Date de fin</h4>
                  <p className="text-gray-700 text-sm">{formatDate(projectData.endDate)}</p>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Durée totale</h4>
                <p className="text-gray-700 text-sm">{calculateDuration()}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Méthodologie</h4>
                <Badge variant="outline" className="border-amber-300 text-amber-700">
                  {projectData.methodology}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Équipe */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-600" />
                Équipe et Parties Prenantes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Membres de l'équipe</h4>
                <p className="text-gray-700 text-sm leading-relaxed">{projectData.teamMembers || "À définir"}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Parties prenantes</h4>
                <p className="text-gray-700 text-sm leading-relaxed">{projectData.stakeholders || "À identifier"}</p>
              </div>
            </CardContent>
          </Card>

          {/* Livrables */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-600" />
                Livrables et Succès
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Livrables principaux</h4>
                <p className="text-gray-700 text-sm leading-relaxed">{projectData.deliverables}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Critères de succès</h4>
                <p className="text-gray-700 text-sm leading-relaxed">{projectData.successCriteria || "À définir"}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Risques et Contraintes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              Risques et Contraintes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Risques principaux</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {projectData.mainRisks || "Aucun risque identifié"}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Contraintes</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {projectData.constraints || "Aucune contrainte particulière"}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Hypothèses</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {projectData.assumptions || "Aucune hypothèse particulière"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Options incluses */}
        <Card>
          <CardHeader>
            <CardTitle>Éléments inclus dans le document</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div
                className={`p-3 rounded-lg border-2 ${projectData.includeGantt ? "border-green-200 bg-green-50" : "border-gray-200 bg-gray-50"}`}
              >
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-4 h-4 rounded-full ${projectData.includeGantt ? "bg-green-500" : "bg-gray-400"}`}
                  ></div>
                  <span className="text-sm font-medium">Diagramme de Gantt</span>
                </div>
              </div>
              <div
                className={`p-3 rounded-lg border-2 ${projectData.includeRiskMatrix ? "border-green-200 bg-green-50" : "border-gray-200 bg-gray-50"}`}
              >
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-4 h-4 rounded-full ${projectData.includeRiskMatrix ? "bg-green-500" : "bg-gray-400"}`}
                  ></div>
                  <span className="text-sm font-medium">Matrice des risques</span>
                </div>
              </div>
              <div
                className={`p-3 rounded-lg border-2 ${projectData.includeBudgetBreakdown ? "border-green-200 bg-green-50" : "border-gray-200 bg-gray-50"}`}
              >
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-4 h-4 rounded-full ${projectData.includeBudgetBreakdown ? "bg-green-500" : "bg-gray-400"}`}
                  ></div>
                  <span className="text-sm font-medium">Répartition budgétaire</span>
                </div>
              </div>
              <div
                className={`p-3 rounded-lg border-2 ${projectData.includeStakeholderMatrix ? "border-green-200 bg-green-50" : "border-gray-200 bg-gray-50"}`}
              >
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-4 h-4 rounded-full ${projectData.includeStakeholderMatrix ? "bg-green-500" : "bg-gray-400"}`}
                  ></div>
                  <span className="text-sm font-medium">Matrice parties prenantes</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions finales */}
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold text-green-900 mb-2">🎉 Votre projet est prêt !</h3>
            <p className="text-green-800 mb-4">
              Votre charte de projet a été générée avec succès. Vous pouvez maintenant l'exporter ou la partager.
            </p>
            <div className="flex justify-center space-x-4">
              <Button
                onClick={exportToPDF}
                disabled={isExporting}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-xl border-0"
              >
                {isExporting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Export en cours...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Télécharger le document
                  </>
                )}
              </Button>
              <Link href="/dashboard/project-generator">
                <Button variant="outline" className="bg-transparent">
                  Créer un nouveau projet
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
