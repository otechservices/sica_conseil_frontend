"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Plus, Download, Eye, Search } from "lucide-react"
import Link from "next/link"
import DashboardLayout from "@/components/dashboard-layout"
import { useState } from "react"

export default function ProjectGeneratorPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Projets générés précédemment (simulation)
  const generatedProjects = [
    {
      id: 1,
      name: "Application Mobile E-commerce",
      type: "Développement",
      date: "2024-01-15",
      status: "Complété",
      budget: "50 000€",
      duration: "6 mois",
    },
    {
      id: 2,
      name: "Migration Cloud Infrastructure",
      type: "Infrastructure",
      date: "2024-01-12",
      status: "En cours",
      budget: "75 000€",
      duration: "4 mois",
    },
    {
      id: 3,
      name: "Formation Équipe Marketing",
      type: "Formation",
      date: "2024-01-10",
      status: "Planifié",
      budget: "15 000€",
      duration: "2 mois",
    },
  ]

  const projectTemplates = [
    {
      id: "web-app",
      name: "Application Web",
      description: "Développement d'une application web moderne",
      category: "Développement",
      icon: "💻",
      estimatedTime: "4-8 mois",
      complexity: "Moyenne",
    },
    {
      id: "mobile-app",
      name: "Application Mobile",
      description: "Création d'une app mobile native ou hybride",
      category: "Développement",
      icon: "📱",
      estimatedTime: "3-6 mois",
      complexity: "Élevée",
    },
    {
      id: "infrastructure",
      name: "Infrastructure IT",
      description: "Mise en place ou migration d'infrastructure",
      category: "Infrastructure",
      icon: "🏗️",
      estimatedTime: "2-4 mois",
      complexity: "Élevée",
    },
    {
      id: "marketing",
      name: "Campagne Marketing",
      description: "Lancement d'une campagne marketing digitale",
      category: "Marketing",
      icon: "📈",
      estimatedTime: "1-3 mois",
      complexity: "Faible",
    },
    {
      id: "formation",
      name: "Programme de Formation",
      description: "Développement et déploiement de formation",
      category: "Formation",
      icon: "🎓",
      estimatedTime: "2-4 mois",
      complexity: "Moyenne",
    },
    {
      id: "ecommerce",
      name: "Site E-commerce",
      description: "Création d'une plateforme de vente en ligne",
      category: "Développement",
      icon: "🛒",
      estimatedTime: "3-5 mois",
      complexity: "Moyenne",
    },
  ]

  const categories = ["all", "Développement", "Infrastructure", "Marketing", "Formation"]

  const filteredTemplates = projectTemplates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Complété":
        return "bg-green-600"
      case "En cours":
        return "bg-amber-600"
      case "Planifié":
        return "bg-blue-600"
      default:
        return "bg-gray-600"
    }
  }

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "Faible":
        return "text-green-600"
      case "Moyenne":
        return "text-amber-600"
      case "Élevée":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Générateur de Projets</h1>
            <p className="text-gray-600 mt-2">Créez des projets structurés et professionnels en quelques clics</p>
          </div>
          <Link href="/dashboard/project-generator/new">
            <Button className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white shadow-xl border-0">
              <Plus className="w-4 h-4 mr-2" />
              Nouveau Projet
            </Button>
          </Link>
        </div>

        {/* Stats rapides */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Projets générés</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <FileText className="w-8 h-8 text-amber-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">En cours</p>
                  <p className="text-2xl font-bold text-amber-600">3</p>
                </div>
                <div className="w-3 h-3 bg-amber-600 rounded-full"></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Complétés</p>
                  <p className="text-2xl font-bold text-green-600">8</p>
                </div>
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Taux de réussite</p>
                  <p className="text-2xl font-bold text-purple-600">89%</p>
                </div>
                <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtres et recherche */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher un template..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={
                      selectedCategory === category
                        ? "bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white shadow-lg border-0"
                        : "bg-transparent"
                    }
                  >
                    {category === "all" ? "Tous" : category}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Templates de projets */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Choisir un template</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <Card
                key={template.id}
                className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-amber-200"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl">{template.icon}</div>
                    <Badge variant="outline" className="border-amber-300 text-amber-700">
                      {template.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Durée estimée:</span>
                      <span className="font-medium">{template.estimatedTime}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Complexité:</span>
                      <span className={`font-medium ${getComplexityColor(template.complexity)}`}>
                        {template.complexity}
                      </span>
                    </div>
                    <Link href={`/dashboard/project-generator/new?template=${template.id}`} className="block">
                      <Button className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white shadow-xl border-0 mt-4">
                        <Plus className="w-4 h-4 mr-2" />
                        Utiliser ce template
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Projets récents */}
        <Card>
          <CardHeader>
            <CardTitle>Projets récents</CardTitle>
            <CardDescription>Vos derniers projets générés</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {generatedProjects.map((project) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-medium">{project.name}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{project.type}</span>
                        <span>•</span>
                        <span>{project.date}</span>
                        <span>•</span>
                        <span>{project.budget}</span>
                        <span>•</span>
                        <span>{project.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className={`${getStatusColor(project.status)} text-white`}>{project.status}</Badge>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Guide rapide */}
        <Card className="bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 border-amber-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-amber-900">🚀 Comment ça marche ?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-amber-600 font-bold">1</span>
                </div>
                <h4 className="font-medium text-amber-900 mb-2">Choisissez un template</h4>
                <p className="text-sm text-amber-800">Sélectionnez le type de projet qui correspond à vos besoins</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-amber-600 font-bold">2</span>
                </div>
                <h4 className="font-medium text-amber-900 mb-2">Remplissez le formulaire</h4>
                <p className="text-sm text-amber-800">Complétez les informations spécifiques à votre projet</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-amber-600 font-bold">3</span>
                </div>
                <h4 className="font-medium text-amber-900 mb-2">Générez et exportez</h4>
                <p className="text-sm text-amber-800">Obtenez votre charte de projet complète en PDF/DOCX</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
