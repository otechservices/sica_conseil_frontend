"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, FileText, Award, Users, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function WelcomePage() {
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    // Masquer les confettis après 3 secondes
    const timer = setTimeout(() => setShowConfetti(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 flex items-center justify-center p-4">
      {/* Effet confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-10">
          <div className="absolute top-10 left-10 w-3 h-3 bg-amber-400 rounded-full animate-bounce"></div>
          <div className="absolute top-20 right-20 w-2 h-2 bg-yellow-400 rounded-full animate-bounce delay-100"></div>
          <div className="absolute top-32 left-1/3 w-4 h-4 bg-orange-400 rounded-full animate-bounce delay-200"></div>
          <div className="absolute top-16 right-1/3 w-3 h-3 bg-amber-500 rounded-full animate-bounce delay-300"></div>
          <div className="absolute top-40 left-1/4 w-2 h-2 bg-yellow-500 rounded-full animate-bounce delay-500"></div>
        </div>
      )}

      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-600 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-3xl mb-4">🎉 Bienvenue sur SICA CONSEIL !</CardTitle>
          <CardDescription className="text-lg">
            Félicitations ! Votre compte a été créé avec succès. Vous avez maintenant accès à tous nos services premium.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Services disponibles */}
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-6 rounded-lg border border-amber-200">
            <h3 className="font-semibold text-amber-900 mb-4 text-center">🚀 Vos services maintenant disponibles :</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full flex items-center justify-center">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium">Générateur de projets automatique</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full flex items-center justify-center">
                  <Award className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium">Formation PMP complète</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium">Simulateur d'examen PMP</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full flex items-center justify-center">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium">Certificats PDF automatiques</span>
              </div>
            </div>
          </div>

          {/* Prochaines étapes */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 text-center">✨ Commencez votre parcours :</h3>
            <div className="space-y-3">
              <Link href="/dashboard/pmp-simulator">
                <Button className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white shadow-xl border-0 h-12">
                  <Award className="w-5 h-5 mr-2" />
                  Tester le simulateur PMP
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>

              <Link href="/dashboard/project-generator">
                <Button variant="outline" className="w-full bg-transparent h-12">
                  <FileText className="w-5 h-5 mr-2" />
                  Générer votre premier projet
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>

              <Link href="/dashboard">
                <Button variant="outline" className="w-full bg-transparent h-12">
                  <Users className="w-5 h-5 mr-2" />
                  Accéder au tableau de bord
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Message de motivation */}
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              💡 <strong>Conseil :</strong> Commencez par le simulateur PMP pour évaluer votre niveau actuel, puis
              utilisez nos formations ciblées pour progresser rapidement !
            </p>
          </div>

          {/* Bouton principal */}
          <div className="text-center pt-4">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white shadow-xl border-0 px-8 py-3"
              >
                Accéder à ma plateforme
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
