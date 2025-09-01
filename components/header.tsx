"use client"

import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-600 to-yellow-600 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">SC</span>
            </div>
            <span className="text-xl font-bold text-gray-900">SICA CONSEIL</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-amber-600 transition-colors">
              Accueil
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-amber-600 transition-colors">
              À propos
            </Link>
            <Link href="/services" className="text-gray-600 hover:text-amber-600 transition-colors">
              Services
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-amber-600 transition-colors">
              Tarification
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-amber-600 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/auth/login">
              <Button variant="ghost">Connexion</Button>
            </Link>
            <Link href="/auth/register">
              <Button className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white shadow-lg border-0">
                Accès gratuit
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-600 hover:text-amber-600 transition-colors">
                Accueil
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-amber-600 transition-colors">
                À propos
              </Link>
              <Link href="/services" className="text-gray-600 hover:text-amber-600 transition-colors">
                Services
              </Link>
              <Link href="/pricing" className="text-gray-600 hover:text-amber-600 transition-colors">
                Tarification
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-amber-600 transition-colors">
                Contact
              </Link>
              <div className="flex flex-col space-y-2 pt-4 border-t">
                <Link href="/auth/login">
                  <Button variant="ghost" className="w-full justify-start">
                    Connexion
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white shadow-lg border-0 w-full">
                    Accès gratuit
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
