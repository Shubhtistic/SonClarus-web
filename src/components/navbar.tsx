"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  // Do not show the navbar on auth pages to prevent overlapping and distractions
  if (pathname === "/login" || pathname === "/register" || pathname === "/signup") {
    return null
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    // Check initial scroll position on mount (in case of page refresh)
    handleScroll()
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
            <Link
              href="/login"
              className="font-body text-white/80 hover:text-white transition-colors duration-200"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="font-body text-white/80 hover:text-white transition-colors duration-200"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}