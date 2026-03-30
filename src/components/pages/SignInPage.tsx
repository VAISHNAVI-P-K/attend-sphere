import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Activity, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Image } from '@/components/ui/image';
import { useMember } from '@/integrations';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { actions } = useMember();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validate form
      if (!email || !password) {
        setError('Please fill in all fields');
        setIsLoading(false);
        return;
      }

      // Use Wix authentication - this will redirect to auth and come back
      actions.login();
    } catch (err) {
      setError('Failed to sign in. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-paragraph overflow-hidden">
      <style>
        {`
          .quantum-grid {
            background-size: 40px 40px;
            background-image: 
              linear-gradient(to right, rgba(0, 255, 255, 0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 255, 255, 0.03) 1px, transparent 1px);
            mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
          }
          .glow-border {
            box-shadow: 0 0 20px rgba(0, 255, 255, 0.1), inset 0 0 20px rgba(0, 255, 255, 0.05);
          }
          .text-gradient-cyan {
            background: linear-gradient(to right, #00FFFF, #8A2BE2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        `}
      </style>

      {/* Fixed Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 quantum-grid" />
        <motion.div 
          animate={{ y: [0, 50, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-accent-purple/5 blur-[150px]"
        />
        <motion.div 
          animate={{ y: [50, 0, 50] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-accent-cyan/5 blur-[150px]"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[1200px] grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Branding & Features */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden lg:flex flex-col justify-center"
          >
            <Link to="/" className="flex items-center gap-3 mb-12">
              <Image
                src="https://static.wixstatic.com/media/2e45bf_7187c80ccbcc43238233b37a623d5d75~mv2.png"
                alt="AttendSphere Logo"
                width={40}
                className="w-10 h-10"
              />
              <span className="font-heading text-3xl font-bold text-foreground">
                Attend<span className="text-accent-cyan">Sphere</span>
              </span>
            </Link>

            <div className="mb-12">
              <h2 className="font-heading text-6xl font-black text-foreground mb-6 leading-tight">
                Welcome Back to <span className="text-gradient-cyan">Quantum-Synced</span> Learning
              </h2>
              <p className="font-paragraph text-xl text-muted-text leading-relaxed">
                Access your academic sphere and manage attendance with precision. Real-time governance for modern education.
              </p>
            </div>

            {/* Feature List */}
            <div className="space-y-6">
              {[
                { icon: Activity, title: 'Real-Time Tracking', desc: 'Monitor attendance instantly' },
                { icon: Mail, title: 'Secure Access', desc: 'Enterprise-grade authentication' },
                { icon: ArrowRight, title: 'Seamless Integration', desc: 'Connect with your LMS' }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-lg bg-accent-cyan/10 flex items-center justify-center flex-shrink-0 border border-accent-cyan/30">
                    <feature.icon className="w-6 h-6 text-accent-cyan" />
                  </div>
                  <div>
                    <h4 className="font-heading text-lg font-bold text-foreground">{feature.title}</h4>
                    <p className="text-sm text-muted-text">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Sign In Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full"
          >
            <div className="bg-card-background border border-accent-cyan/20 rounded-[2rem] p-8 md:p-12 glow-border">
              <div className="mb-8">
                <h1 className="font-heading text-4xl font-bold text-foreground mb-2">Sign In</h1>
                <p className="text-muted-text">Access your academic dashboard and manage events</p>
              </div>

              <form onSubmit={handleSignIn} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label className="font-paragraph text-sm font-semibold text-foreground mb-3 block">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent-cyan/50" />
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-12 bg-background/50 border-accent-cyan/20 text-foreground placeholder:text-muted-text/50 focus:border-accent-cyan focus:ring-accent-cyan/20 rounded-xl py-6 font-paragraph"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="font-paragraph text-sm font-semibold text-foreground mb-3 block">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent-cyan/50" />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-12 pr-12 bg-background/50 border-accent-cyan/20 text-foreground placeholder:text-muted-text/50 focus:border-accent-cyan focus:ring-accent-cyan/20 rounded-xl py-6 font-paragraph"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-accent-cyan/50 hover:text-accent-cyan transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-xl">
                    <p className="text-sm text-destructive font-paragraph">{error}</p>
                  </div>
                )}

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-accent-cyan/30 bg-background/50" />
                    <span className="font-paragraph text-sm text-muted-text">Remember me</span>
                  </label>
                  <Link to="#" className="font-paragraph text-sm text-accent-cyan hover:text-accent-cyan/80 transition-colors">
                    Forgot password?
                  </Link>
                </div>

                {/* Sign In Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-accent-cyan to-accent-purple text-black font-heading font-bold py-6 rounded-xl hover:opacity-90 transition-opacity text-lg shadow-[0_0_20px_rgba(0,255,255,0.3)] disabled:opacity-50"
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>

                {/* Divider */}
                <div className="relative py-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-card-background text-muted-text">Or continue with</span>
                  </div>
                </div>

                {/* Social Sign In */}
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="border-white/10 hover:bg-white/5 rounded-xl py-6 font-paragraph"
                  >
                    Google
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="border-white/10 hover:bg-white/5 rounded-xl py-6 font-paragraph"
                  >
                    Microsoft
                  </Button>
                </div>
              </form>

              {/* Sign Up Link */}
              <div className="mt-8 pt-8 border-t border-white/10 text-center">
                <p className="font-paragraph text-muted-text mb-4">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-accent-cyan hover:text-accent-cyan/80 font-semibold transition-colors">
                    Create one now
                  </Link>
                </p>
              </div>
            </div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 p-6 bg-card-background/50 border border-accent-purple/20 rounded-2xl backdrop-blur-sm"
            >
              <p className="font-paragraph text-sm text-muted-text text-center">
                By signing in, you agree to our{' '}
                <Link to="#" className="text-accent-cyan hover:underline">
                  Terms of Service
                </Link>
                {' '}and{' '}
                <Link to="#" className="text-accent-cyan hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
