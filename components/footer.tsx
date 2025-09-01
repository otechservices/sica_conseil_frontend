import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-amber-900 to-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-600 to-yellow-600 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">SC</span>
              </div>
              <span className="text-xl font-bold">SICA CONSEIL</span>
            </div>
            <p className="text-gray-400">
              Votre partenaire pour la maîtrise de la gestion de projet et la certification PMP.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/services/project-generator" className="hover:text-amber-300 transition-colors">
                  Génération de projets
                </Link>
              </li>
              <li>
                <Link href="/services/pmp-training" className="hover:text-amber-300 transition-colors">
                  Formation PMP
                </Link>
              </li>
              <li>
                <Link href="/services/simulator" className="hover:text-amber-300 transition-colors">
                  Simulateur d'examen
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/faq" className="hover:text-amber-300 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-300 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-amber-300 transition-colors">
                  Assistance
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Légal</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/privacy" className="hover:text-amber-300 transition-colors">
                  Confidentialité
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-amber-300 transition-colors">
                  Conditions d'utilisation
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 SICA CONSEIL. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
