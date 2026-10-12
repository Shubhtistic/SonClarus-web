"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { useAuth } from "@/lib/auth-context"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated, logout } = useAuth()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    handleScroll()
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (pathname === "/login" || pathname === "/register" || pathname === "/signup") {
    return null
  }

  const pillClass = `mx-auto transition-all duration-300 max-w-[1480px] px-8 ${
    isScrolled ? "bg-white/5 backdrop-blur-[24px] rounded-full mt-6" : "bg-transparent mt-2"
  }`

  return (
    <nav className="nav-fade fixed top-0 left-0 right-0 z-50">
      <div className={pillClass}>
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-white text-xl font-bold font-display tracking-tight">
            Sonclarus
          </Link>
          <div className="flex items-center space-x-4">
            {!mounted ? null : isAuthenticated ? (
              <>
                <Link href="/dashboard" className="font-body text-white/80 hover:text-white transition-colors duration-200">
                  Dashboard
                </Link>
                <button
                  onClick={() => logout()}
                  className="font-body text-white/80 hover:text-white transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="font-body text-white/80 hover:text-white transition-colors duration-200">
                  Login
                </Link>
                <Link href="/register" className="font-body text-white/80 hover:text-white transition-colors duration-200">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}