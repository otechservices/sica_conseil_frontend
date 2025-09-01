"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { FileText, BookOpen, Award, TrendingUp, Clock, CheckCircle, BarChart3, Download, Play } from "lucide-react"
import Link from "next/link"
import DashboardLayout from "@/components/dashboard-layout"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-600 rounded-lg p-6 text-white shadow-2xl">
          <h1 className="text-3xl font-bold mb-2">Bienvenue sur SICA CONSEIL !</h1>
          <p className="text-blue-100 mb-4">
            Votre plateforme complète pour la gestion de projet et la certification PMP
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/dashboard/project-generator">
              <Button className="bg-white text-amber-600 hover:bg-amber-50 shadow-lg">
                <FileText className="w-4 h-4 mr-2" />
                Générer un projet
              </Button>
            </Link>
            <Link href="/dashboard/pmp-simulator">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-amber-600 bg-transparent shadow-lg"
              >
                <Award className="w-4 h-4 mr-2" />
                Simulateur PMP
              </Button>
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
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
                  <p className="text-sm font-medium text-gray-600">Modules complétés</p>
                  <p className="text-2xl font-bold">8/15</p>
                </div>
                <BookOpen className="w-8 h-8 text-amber-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Score moyen PMP</p>
                  <p className="text-2xl font-bold">78%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Temps d'étude</p>
                  <p className="text-2xl font-bold">24h</p>
                </div>
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Progress Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Votre progression
              </CardTitle>
              <CardDescription>Suivez vos progrès dans la formation PMP</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Formation PMP</span>
                  <span className="text-sm text-gray-500">53%</span>
                </div>
                <Progress value={53} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Simulateur d'examen</span>
                  <span className="text-sm text-gray-500">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Projets générés</span>
                  <span className="text-sm text-gray-500">100%</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>

              <Link href="/dashboard/progress">
                <Button variant="outline" className="w-full bg-transparent">
                  Voir les détails
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Activité récente</CardTitle>
              <CardDescription>Vos dernières actions sur la plateforme</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Module "Gestion des risques" complété</p>
                    <p className="text-xs text-gray-500">Il y a 2 heures</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-full flex items-center justify-center">
                    <FileText className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Projet "Application mobile" généré</p>
                    <p className="text-xs text-gray-500">Hier</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-full flex items-center justify-center">
                    <Award className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Test PMP réalisé - Score: 82%</p>
                    <p className="text-xs text-gray-500">Il y a 2 jours</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-full flex items-center justify-center">
                    <Download className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Certificat de formation téléchargé</p>
                    <p className="text-xs text-gray-500">Il y a 3 jours</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Actions rapides</CardTitle>
            <CardDescription>Accédez rapidement aux fonctionnalités principales</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/dashboard/project-generator">
                <Button
                  variant="outline"
                  className="w-full h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
                >
                  <FileText className="w-6 h-6" />
                  <span>Nouveau projet</span>
                </Button>
              </Link>

              <Link href="/dashboard/pmp-training">
                <Button
                  variant="outline"
                  className="w-full h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
                >
                  <Play className="w-6 h-6" />
                  <span>Continuer la formation</span>
                </Button>
              </Link>

              <Link href="/dashboard/pmp-simulator">
                <Button
                  variant="outline"
                  className="w-full h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
                >
                  <Award className="w-6 h-6" />
                  <span>Test PMP</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
