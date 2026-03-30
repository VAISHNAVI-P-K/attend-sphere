import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMember } from '@/integrations';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { member, isAuthenticated, isLoading, actions } = useMember();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/events', label: 'Events' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/mark-attendance', label: 'Mark Attendance' },
    { path: '/analytics', label: 'Analytics' },
    { path: '/system-performance', label: 'Performance' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-accent-cyan/10">
      <div className="max-w-[120rem] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <Image
              src="https://static.wixstatic.com/media/2e45bf_7187c80ccbcc43238233b37a623d5d75~mv2.png"
              alt="AttendSphere Logo"
              width={40}
              className="w-10 h-10"
            />
            <span className="font-heading text-2xl font-bold text-foreground">
              Attend<span className="text-accent-cyan">Sphere</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-paragraph font-medium text-base transition-colors relative ${
                  isActive(link.path)
                    ? 'text-accent-cyan'
                    : 'text-muted-text hover:text-foreground'
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-accent-cyan"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Auth Section */}
          <div className="hidden lg:flex items-center gap-4">
            {isLoading ? (
              <div className="w-8 h-8 border-2 border-accent-cyan/30 border-t-accent-cyan rounded-full animate-spin" />
            ) : isAuthenticated ? (
              <>
                <Link to="/profile">
                  <Button variant="ghost" className="text-foreground hover:text-accent-cyan font-paragraph gap-2">
                    <User className="w-5 h-5" />
                    {member?.profile?.nickname || 'Profile'}
                  </Button>
                </Link>
                <Button
                  onClick={actions.logout}
                  variant="outline"
                  className="border-accent-cyan text-accent-cyan hover:bg-accent-cyan/10 font-paragraph rounded-xl"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <Button
                onClick={actions.login}
                className="bg-accent-cyan text-primary-foreground hover:bg-accent-cyan/90 font-paragraph font-semibold rounded-xl"
              >
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-foreground hover:text-accent-cyan transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <nav className="flex flex-col gap-4 pt-6 pb-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`font-paragraph font-medium text-base py-2 transition-colors ${
                      isActive(link.path)
                        ? 'text-accent-cyan'
                        : 'text-muted-text hover:text-foreground'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4 border-t border-accent-cyan/10 flex flex-col gap-3">
                  {isLoading ? (
                    <div className="w-8 h-8 border-2 border-accent-cyan/30 border-t-accent-cyan rounded-full animate-spin" />
                  ) : isAuthenticated ? (
                    <>
                      <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="ghost" className="w-full text-foreground hover:text-accent-cyan font-paragraph gap-2">
                          <User className="w-5 h-5" />
                          {member?.profile?.nickname || 'Profile'}
                        </Button>
                      </Link>
                      <Button
                        onClick={() => {
                          actions.logout();
                          setIsMenuOpen(false);
                        }}
                        variant="outline"
                        className="w-full border-accent-cyan text-accent-cyan hover:bg-accent-cyan/10 font-paragraph rounded-xl"
                      >
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={() => {
                        actions.login();
                        setIsMenuOpen(false);
                      }}
                      className="w-full bg-accent-cyan text-primary-foreground hover:bg-accent-cyan/90 font-paragraph font-semibold rounded-xl"
                    >
                      Sign In
                    </Button>
                  )}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
