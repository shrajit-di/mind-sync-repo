"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Menu,
  X,
  Heart,
  User,
  Shield,
  LogOut,
  Coins,
  MessageCircle,
  BarChart3,
  Gamepad2,
  ClipboardList,
  HelpCircle,
  MapPin,
  Phone,
  AlertTriangle,
  Users,
  Stethoscope,
  Leaf,
} from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-slate-200/60 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-200">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
              Mind-Sync
            </span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-1">
            <Link
              href="/assessment"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
            >
              <ClipboardList className="w-4 h-4" />
              Assessment
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
            >
              <BarChart3 className="w-4 h-4" />
              Dashboard
            </Link>
            <Link
              href="/games"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
            >
              <Gamepad2 className="w-4 h-4" />
              Games
            </Link>
            <Link
              href="/chat"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
            >
              <MessageCircle className="w-4 h-4" />
              AI Chat
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                >
                  <HelpCircle className="w-4 h-4" />
                  Help
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuItem asChild>
                  <Link href="/emergency" className="flex items-center text-red-600">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Emergency Support & SOS
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/help/nearby-hospitals" className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    Nearby Hospitals & Maps
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/professional-help" className="flex items-center">
                    <Stethoscope className="w-4 h-4 mr-2" />
                    Professional Help
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/community" className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    Peer Support Community
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/stress-relief" className="flex items-center">
                    <Leaf className="w-4 h-4 mr-2" />
                    Stress Relief Tools
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/help" className="flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    Crisis Hotlines
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          <div className="hidden lg:flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                {!user.isAnonymous && (
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full">
                    <Coins className="w-4 h-4 text-amber-600" />
                    <span className="text-sm font-medium text-amber-700">{user.coins}</span>
                  </div>
                )}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center space-x-2 px-3 py-2 hover:bg-slate-100 rounded-lg"
                    >
                      {user.isAnonymous ? (
                        <Shield className="w-4 h-4 text-slate-600" />
                      ) : (
                        <User className="w-4 h-4 text-slate-600" />
                      )}
                      <span className="text-sm font-medium text-slate-700 max-w-32 truncate">
                        {user.isAnonymous ? "Anonymous" : user.email}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    {!user.isAnonymous && (
                      <>
                        <DropdownMenuItem asChild>
                          <Link href="/profile" className="flex items-center">
                            <User className="w-4 h-4 mr-2" />
                            Profile Settings
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/rewards" className="flex items-center">
                            <Coins className="w-4 h-4 mr-2" />
                            My Rewards
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}
                    <DropdownMenuItem onClick={logout} className="text-red-600 focus:text-red-600">
                      <LogOut className="w-4 h-4 mr-2" />
                      {user.isAnonymous ? "End Session" : "Sign Out"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="text-slate-600 hover:text-blue-600" asChild>
                  <Link href="/auth">
                    <Shield className="w-4 h-4 mr-2" />
                    Try Anonymous
                  </Link>
                </Button>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-sm"
                  asChild
                >
                  <Link href="/auth">Sign In</Link>
                </Button>
              </div>
            )}
          </div>

          <button
            className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-200">
            <nav className="flex flex-col space-y-1">
              <Link
                href="/assessment"
                className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                <ClipboardList className="w-5 h-5" />
                Assessment
              </Link>
              <Link
                href="/dashboard"
                className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                <BarChart3 className="w-5 h-5" />
                Dashboard
              </Link>
              <Link
                href="/games"
                className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                <Gamepad2 className="w-5 h-5" />
                Games
              </Link>
              <Link
                href="/chat"
                className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                <MessageCircle className="w-5 h-5" />
                AI Chat
              </Link>
              <div className="pt-2 mt-2 border-t border-slate-200">
                <div className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Help & Support
                </div>
                <Link
                  href="/emergency"
                  className="flex items-center gap-3 px-4 py-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <AlertTriangle className="w-5 h-5" />
                  Emergency Support
                </Link>
                <Link
                  href="/help/nearby-hospitals"
                  className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <MapPin className="w-5 h-5" />
                  Nearby Hospitals
                </Link>
                <Link
                  href="/professional-help"
                  className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Stethoscope className="w-5 h-5" />
                  Professional Help
                </Link>
                <Link
                  href="/community"
                  className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Users className="w-5 h-5" />
                  Peer Support
                </Link>
                <Link
                  href="/stress-relief"
                  className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Leaf className="w-5 h-5" />
                  Stress Relief
                </Link>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200">
                {user ? (
                  <div className="space-y-3">
                    <div className="px-4 py-2 bg-slate-50 rounded-lg">
                      <div className="text-sm font-medium text-slate-900">
                        {user.isAnonymous ? "Anonymous Session" : user.email}
                      </div>
                      {!user.isAnonymous && (
                        <div className="flex items-center gap-2 mt-1">
                          <Coins className="w-4 h-4 text-amber-600" />
                          <span className="text-sm text-slate-600">{user.coins} coins</span>
                        </div>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={logout}
                      className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      {user.isAnonymous ? "End Session" : "Sign Out"}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                      <Link href="/auth">
                        <Shield className="w-4 h-4 mr-2" />
                        Try Anonymous Mode
                      </Link>
                    </Button>
                    <Button size="sm" className="w-full bg-gradient-to-r from-blue-600 to-blue-700" asChild>
                      <Link href="/auth">
                        <User className="w-4 h-4 mr-2" />
                        Sign In
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
