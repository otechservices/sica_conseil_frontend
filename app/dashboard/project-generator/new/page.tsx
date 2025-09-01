"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, FileText, Calendar, Users, Target } from "lucide-react"
import Link from "next/link"
import DashboardLayout from "@/components/dashboard-layout"
import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"

interface ProjectData {
  // Informations générales
  projectName: string
  projectDescription: string
  projectObjectives: string
  projectScope: string

  // Parties prenantes
  projectManager: string
  sponsor: string
  teamMembers: string
  stakeholders: string

  // Planning et budget
  startDate: string
  endDate: string
  budget: string
  currency: string

  // Risques et contraintes
  mainRisks: string
  constraints: string
  assumptions: string

  // Livrables
  deliverables: string
  successCriteria: string

  // Méthodologie
  methodology: string
  communicationPlan: string

  // Options avancées
  includeGantt: boolean
  includeRiskMatrix: boolean
  includeBudgetBreakdown: boolean
  includeStakeholderMatrix: boolean
}

export default function NewProjectPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const templateId = searchParams.get("template")

  const [currentStep, setCurrentStep] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [projectData, setProjectData] = useState<ProjectData>({
    projectName: "",
    projectDescription: "",
    projectObjectives: "",
    projectScope: "",
    projectManager: "",
    sponsor: "",
    teamMembers: "",
    stakeholders: "",
    startDate: "",
    endDate: "",
    budget: "",
    currency: "EUR",
    mainRisks: "",
    constraints: "",
    assumptions: "",
    deliverables: "",
    successCriteria: "",
    methodology: "Agile",
    communicationPlan: "",
    includeGantt: true,
    includeRiskMatrix: true,
    includeBudgetBreakdown: true,
    includeStakeholderMatrix: true,
  })

  // Templates prédéfinis
  const templates = {
    "web-app": {
      name: "Application Web",
      description: "Développement d'une application web moderne avec interface utilisateur responsive",
      objectives: "Créer une application web performante, sécurisée et user-friendly",
      scope: "Conception, développement, tests et déploiement d'une application web complète",
      deliverables: "Maquettes UI/UX, Code source, Documentation technique, Application déployée",
      methodology: "Agile",
    },
    "mobile-app": {
      name: "Application Mobile",
      description: "Développement d'une application mobile native ou hybride",
      objectives: "Créer une application mobile intuitive disponible sur iOS et Android",
      scope: "Conception UX/UI, développement mobile, tests et publication sur les stores",
      deliverables: "Prototypes, Application mobile, Documentation, Publication stores",
      methodology: "Agile",
    },
    infrastructure: {
      name: "Infrastructure IT",
      description: "Mise en place ou migration d'infrastructure informatique",
      objectives: "Moderniser l'infrastructure IT pour améliorer performance et sécurité",
      scope: "Audit existant, conception nouvelle architecture, migration et formation",
      deliverables: "Audit infrastructure, Plan de migration, Infrastructure déployée, Documentation",
      methodology: "Waterfall",
    },
    marketing: {
      name: "Campagne Marketing",
      description: "Lancement d'une campagne marketing digitale multi-canal",
      objectives: "Augmenter la notoriété de marque et générer des leads qualifiés",
      scope: "Stratégie marketing, création contenu, déploiement campagnes, analyse ROI",
      deliverables: "Stratégie marketing, Contenus créatifs, Campagnes déployées, Rapport ROI",
      methodology: "Agile",
    },
    formation: {
      name: "Programme de Formation",
      description: "Développement et déploiement d'un programme de formation",
      objectives: "Former les équipes aux nouvelles compétences et processus",
      scope: "Analyse besoins, création contenu, déploiement formation, évaluation",
      deliverables: "Analyse besoins, Modules formation, Sessions déployées, Évaluation",
      methodology: "ADDIE",
    },
    ecommerce: {
      name: "Site E-commerce",
      description: "Création d'une plateforme de vente en ligne complète",
      objectives: "Lancer une boutique en ligne performante et sécurisée",
      scope: "Conception UX, développement e-commerce, intégration paiement, formation",
      deliverables: "Site e-commerce, Système paiement, Formation utilisateurs, Documentation",
      methodology: "Agile",
    },
  }

  // Charger le template sélectionné
  useEffect(() => {
    if (templateId && templates[templateId as keyof typeof templates]) {
      const template = templates[templateId as keyof typeof templates]
      setProjectData((prev) => ({
        ...prev,
        projectName: template.name,
        projectDescription: template.description,
        projectObjectives: template.objectives,
        projectScope: template.scope,
        deliverables: template.deliverables,
        methodology: template.methodology,
      }))
    }
  }, [templateId])

  const handleInputChange = (field: keyof ProjectData, value: string | boolean) => {
    setProjectData((prev) => ({ ...prev, [field]: value }))
  }

  const generateProject = async () => {
    setIsGenerating(true)

    // Simulation de génération
    setTimeout(() => {
      setIsGenerating(false)
      // Rediriger vers la page de prévisualisation avec les données
      localStorage.setItem("generatedProject", JSON.stringify(projectData))
      router.push("/dashboard/project-generator/preview")
    }, 3000)
  }

  const steps = [
    { id: 1, name: "Informations générales", icon: FileText },
    { id: 2, name: "Équipe et parties prenantes", icon: Users },
    { id: 3, name: "Planning et budget", icon: Calendar },
    { id: 4, name: "Risques et livrables", icon: Target },
  ]

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="projectName">Nom du projet *</Label>
              <Input
                id="projectName"
                value={projectData.projectName}
                onChange={(e) => handleInputChange("projectName", e.target.value)}
                placeholder="Ex: Développement application mobile"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="projectDescription">Description du projet *</Label>
              <Textarea
                id="projectDescription"
                value={projectData.projectDescription}
                onChange={(e) => handleInputChange("projectDescription", e.target.value)}
                placeholder="Décrivez brièvement votre projet..."
                rows={4}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="projectObjectives">Objectifs du projet *</Label>
              <Textarea
                id="projectObjectives"
                value={projectData.projectObjectives}
                onChange={(e) => handleInputChange("projectObjectives", e.target.value)}
                placeholder="Quels sont les objectifs principaux à atteindre ?"
                rows={3}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="projectScope">Périmètre du projet *</Label>
              <Textarea
                id="projectScope"
                value={projectData.projectScope}
                onChange={(e) => handleInputChange("projectScope", e.target.value)}
                placeholder="Définissez ce qui est inclus et exclu du projet..."
                rows={3}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="methodology">Méthodologie</Label>
              <Select
                value={projectData.methodology}
                onValueChange={(value) => handleInputChange("methodology", value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Agile">Agile/Scrum</SelectItem>
                  <SelectItem value="Waterfall">Waterfall</SelectItem>
                  <SelectItem value="Hybrid">Hybride</SelectItem>
                  <SelectItem value="Kanban">Kanban</SelectItem>
                  <SelectItem value="ADDIE">ADDIE</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="projectManager">Chef de projet *</Label>
              <Input
                id="projectManager"
                value={projectData.projectManager}
                onChange={(e) => handleInputChange("projectManager", e.target.value)}
                placeholder="Nom du chef de projet"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="sponsor">Sponsor du projet *</Label>
              <Input
                id="sponsor"
                value={projectData.sponsor}
                onChange={(e) => handleInputChange("sponsor", e.target.value)}
                placeholder="Nom du sponsor/commanditaire"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="teamMembers">Membres de l'équipe</Label>
              <Textarea
                id="teamMembers"
                value={projectData.teamMembers}
                onChange={(e) => handleInputChange("teamMembers", e.target.value)}
                placeholder="Listez les membres de l'équipe projet et leurs rôles..."
                rows={4}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="stakeholders">Parties prenantes</Label>
              <Textarea
                id="stakeholders"
                value={projectData.stakeholders}
                onChange={(e) => handleInputChange("stakeholders", e.target.value)}
                placeholder="Identifiez les parties prenantes clés et leur niveau d'influence..."
                rows={4}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="communicationPlan">Plan de communication</Label>
              <Textarea
                id="communicationPlan"
                value={projectData.communicationPlan}
                onChange={(e) => handleInputChange("communicationPlan", e.target.value)}
                placeholder="Décrivez la stratégie de communication du projet..."
                rows={3}
                className="mt-1"
              />
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Date de début *</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={projectData.startDate}
                  onChange={(e) => handleInputChange("startDate", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="endDate">Date de fin prévue *</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={projectData.endDate}
                  onChange={(e) => handleInputChange("endDate", e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <Label htmlFor="budget">Budget total *</Label>
                <Input
                  id="budget"
                  type="number"
                  value={projectData.budget}
                  onChange={(e) => handleInputChange("budget", e.target.value)}
                  placeholder="100000"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="currency">Devise</Label>
                <Select value={projectData.currency} onValueChange={(value) => handleInputChange("currency", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="GBP">GBP (£)</SelectItem>
                    <SelectItem value="CHF">CHF</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="constraints">Contraintes du projet</Label>
              <Textarea
                id="constraints"
                value={projectData.constraints}
                onChange={(e) => handleInputChange("constraints", e.target.value)}
                placeholder="Identifiez les contraintes techniques, budgétaires, temporelles..."
                rows={4}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="assumptions">Hypothèses</Label>
              <Textarea
                id="assumptions"
                value={projectData.assumptions}
                onChange={(e) => handleInputChange("assumptions", e.target.value)}
                placeholder="Listez les hypothèses sur lesquelles le projet se base..."
                rows={3}
                className="mt-1"
              />
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="deliverables">Livrables principaux *</Label>
              <Textarea
                id="deliverables"
                value={projectData.deliverables}
                onChange={(e) => handleInputChange("deliverables", e.target.value)}
                placeholder="Listez les livrables attendus du projet..."
                rows={4}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="successCriteria">Critères de succès</Label>
              <Textarea
                id="successCriteria"
                value={projectData.successCriteria}
                onChange={(e) => handleInputChange("successCriteria", e.target.value)}
                placeholder="Comment mesurer le succès du projet ?"
                rows={3}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="mainRisks">Risques principaux</Label>
              <Textarea
                id="mainRisks"
                value={projectData.mainRisks}
                onChange={(e) => handleInputChange("mainRisks", e.target.value)}
                placeholder="Identifiez les risques majeurs et leurs impacts..."
                rows={4}
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-base font-medium">Options avancées</Label>
              <div className="mt-3 space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="includeGantt"
                    checked={projectData.includeGantt}
                    onCheckedChange={(checked) => handleInputChange("includeGantt", checked as boolean)}
                  />
                  <Label htmlFor="includeGantt">Inclure un diagramme de Gantt</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="includeRiskMatrix"
                    checked={projectData.includeRiskMatrix}
                    onCheckedChange={(checked) => handleInputChange("includeRiskMatrix", checked as boolean)}
                  />
                  <Label htmlFor="includeRiskMatrix">Inclure une matrice des risques</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="includeBudgetBreakdown"
                    checked={projectData.includeBudgetBreakdown}
                    onCheckedChange={(checked) => handleInputChange("includeBudgetBreakdown", checked as boolean)}
                  />
                  <Label htmlFor="includeBudgetBreakdown">Inclure la répartition budgétaire</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="includeStakeholderMatrix"
                    checked={projectData.includeStakeholderMatrix}
                    onCheckedChange={(checked) => handleInputChange("includeStakeholderMatrix", checked as boolean)}
                  />
                  <Label htmlFor="includeStakeholderMatrix">Inclure la matrice des parties prenantes</Label>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard/project-generator">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Nouveau Projet</h1>
              <p className="text-gray-600">Créez votre charte de projet personnalisée</p>
            </div>
          </div>
          {templateId && (
            <Badge className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white">
              Template: {templates[templateId as keyof typeof templates]?.name}
            </Badge>
          )}
        </div>

        {/* Progress Steps */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const Icon = step.icon
                const isActive = currentStep === step.id
                const isCompleted = currentStep > step.id

                return (
                  <div key={step.id} className="flex items-center">
                    <div className={`flex items-center space-x-3 ${index < steps.length - 1 ? "flex-1" : ""}`}>
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isCompleted
                            ? "bg-green-600 text-white"
                            : isActive
                              ? "bg-gradient-to-r from-amber-600 to-yellow-600 text-white"
                              : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="hidden sm:block">
                        <p className={`text-sm font-medium ${isActive ? "text-amber-600" : "text-gray-600"}`}>
                          Étape {step.id}
                        </p>
                        <p className={`text-xs ${isActive ? "text-amber-600" : "text-gray-500"}`}>{step.name}</p>
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`hidden sm:block w-full h-0.5 mx-4 ${isCompleted ? "bg-green-600" : "bg-gray-200"}`}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Form Content */}
        <Card>
          <CardHeader>
            <CardTitle>
              Étape {currentStep}: {steps.find((s) => s.id === currentStep)?.name}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && "Définissez les informations de base de votre projet"}
              {currentStep === 2 && "Identifiez l'équipe et les parties prenantes"}
              {currentStep === 3 && "Planifiez les délais et le budget"}
              {currentStep === 4 && "Définissez les livrables et gérez les risques"}
            </CardDescription>
          </CardHeader>
          <CardContent>{renderStep()}</CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="bg-transparent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Précédent
          </Button>

          {currentStep < 4 ? (
            <Button
              onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
              className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white shadow-xl border-0"
            >
              Suivant
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Button>
          ) : (
            <Button
              onClick={generateProject}
              disabled={isGenerating || !projectData.projectName || !projectData.projectDescription}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-xl border-0"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Génération en cours...
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4 mr-2" />
                  Générer le projet
                </>
              )}
            </Button>
          )}
        </div>

        {/* Loading State */}
        {isGenerating && (
          <Card className="bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200">
            <CardContent className="p-6 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-amber-900 mb-2">Génération de votre projet...</h3>
              <p className="text-amber-800">
                Nous créons votre charte de projet personnalisée avec tous les éléments demandés.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
