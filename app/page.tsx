import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, FileText, Award, Clock, DollarSign, User } from "lucide-react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Badge className="mb-4 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white border-0 shadow-lg">
            Plateforme Professionnelle de Gestion de Projet
          </Badge>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">SICA CONSEIL</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Maîtrisez la gestion de projet avec notre plateforme complète : génération automatique de projets
            personnalisés et formation certifiante PMP - Accès gratuit !
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/auth/register">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white px-8 py-3 shadow-xl border-0"
              >
                <User className="w-5 h-5 mr-2" />
                Commencer gratuitement
              </Button>
            </Link>
            <Link href="#services">
              <Button variant="outline" size="lg" className="px-8 py-3 bg-transparent">
                Découvrir nos services
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600 mb-2">500+</div>
              <div className="text-gray-600">Projets générés</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600 mb-2">95%</div>
              <div className="text-gray-600">Taux de réussite PMP</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600 mb-2">1000+</div>
              <div className="text-gray-600">Utilisateurs actifs</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nos Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une plateforme complète pour développer vos compétences en gestion de projet
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Auto-génération de projets */}
            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-8 h-8 text-amber-600" />
                  <CardTitle className="text-2xl">Auto-génération de Projets</CardTitle>
                </div>
                <CardDescription className="text-lg">
                  Créez des projets structurés et personnalisés en quelques clics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Formulaire interactif personnalisé</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Génération automatique de charte projet</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Export PDF/DOCX instantané</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Personnalisation avancée</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Formation PMP */}
            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <Award className="w-8 h-8 text-amber-600" />
                  <CardTitle className="text-2xl">Formation Certifiante PMP</CardTitle>
                </div>
                <CardDescription className="text-lg">Préparez-vous efficacement à la certification PMP</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Modules de formation structurés</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Simulateur d'examen PMP</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Feedback détaillé et corrections</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Certificat PDF automatique</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Pourquoi choisir SICA CONSEIL ?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-amber-100 to-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Accès gratuit</h3>
              <p className="text-gray-600">
                Accès complet à tous nos services gratuitement - formation de qualité accessible à tous
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-amber-100 to-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Résultats immédiats</h3>
              <p className="text-gray-600">
                Scores instantanés, feedback détaillé et suivi de progression en temps réel
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-amber-100 to-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Prix démocratique</h3>
              <p className="text-gray-600">
                Accès complet à tous nos services pour seulement 1$ - formation de qualité accessible
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Prêt à transformer votre approche de la gestion de projet ?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Rejoignez des milliers de professionnels qui font confiance à SICA CONSEIL
          </p>
          <Link href="/auth/register">
            <Button size="lg" className="bg-white text-amber-600 hover:bg-amber-50 px-8 py-3">
              <User className="w-5 h-5 mr-2" />
              Commencer maintenant - Gratuit
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
