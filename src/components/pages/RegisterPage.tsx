import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Building2, ArrowRight, Activity, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Image } from '@/components/ui/image';
import { useMember } from '@/integrations';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    institution: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const navigate = useNavigate();
  const { actions, member } = useMember();

  // Handle redirect after successful registration
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        // Redirect to profile page
        navigate('/profile');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (!agreeTerms) {
      setError('Please agree to the terms and conditions');
      return;
    }

    setIsLoading(true);

    try {
      // Store user data for profile page
      localStorage.setItem('userRole', formData.role);
      localStorage.setItem('userInstitution', formData.institution);
      localStorage.setItem('userFirstName', formData.firstName);
      localStorage.setItem('userLastName', formData.lastName);
      localStorage.setItem('userEmail', formData.email);
      
      // Simulate successful registration
      setSuccess(true);
    } catch (err) {
      setError('Failed to register. Please try again.');
      setIsLoading(false);
    }
  };

  const roles = [
    { value: 'student', label: 'Student', icon: '👨‍🎓' },
    { value: 'faculty', label: 'Faculty', icon: '👨‍🏫' },
    { value: 'admin', label: 'Administrator', icon: '⚙️' },
  ];

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
        <div className="w-full max-w-[1200px] grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Left: Benefits & Features */}
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
                Join the <span className="text-gradient-cyan">Academic Revolution</span>
              </h2>
              <p className="font-paragraph text-xl text-muted-text leading-relaxed">
                Create your account and unlock advanced attendance tracking, real-time analytics, and seamless event management.
              </p>
            </div>

            {/* Benefits List */}
            <div className="space-y-4">
              {[
                'Real-time attendance tracking',
                'Advanced analytics dashboard',
                'Secure role-based access',
                'Instant notifications',
                'Seamless LMS integration',
                'Enterprise-grade security'
              ].map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-accent-cyan flex-shrink-0" />
                  <span className="font-paragraph text-muted-text">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Registration Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full"
          >
            <div className="bg-card-background border border-accent-cyan/20 rounded-[2rem] p-8 md:p-12 glow-border">
              <div className="mb-8">
                <h1 className="font-heading text-4xl font-bold text-foreground mb-2">Create Account</h1>
                <p className="text-muted-text">Join AttendSphere and transform your academic experience</p>
              </div>

              <form onSubmit={handleRegister} className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-paragraph text-sm font-semibold text-foreground mb-3 block">
                      First Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent-cyan/50" />
                      <Input
                        type="text"
                        name="firstName"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="pl-12 bg-background/50 border-accent-cyan/20 text-foreground placeholder:text-muted-text/50 focus:border-accent-cyan focus:ring-accent-cyan/20 rounded-xl py-6 font-paragraph"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-paragraph text-sm font-semibold text-foreground mb-3 block">
                      Last Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent-cyan/50" />
                      <Input
                        type="text"
                        name="lastName"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="pl-12 bg-background/50 border-accent-cyan/20 text-foreground placeholder:text-muted-text/50 focus:border-accent-cyan focus:ring-accent-cyan/20 rounded-xl py-6 font-paragraph"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label className="font-paragraph text-sm font-semibold text-foreground mb-3 block">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent-cyan/50" />
                    <Input
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-12 bg-background/50 border-accent-cyan/20 text-foreground placeholder:text-muted-text/50 focus:border-accent-cyan focus:ring-accent-cyan/20 rounded-xl py-6 font-paragraph"
                      required
                    />
                  </div>
                </div>

                {/* Role Selection */}
                <div>
                  <label className="font-paragraph text-sm font-semibold text-foreground mb-3 block">
                    Select Your Role
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {roles.map((role) => (
                      <button
                        key={role.value}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, role: role.value }))}
                        className={`p-4 rounded-xl border-2 transition-all text-center font-paragraph text-sm font-semibold ${
                          formData.role === role.value
                            ? 'border-accent-cyan bg-accent-cyan/10 text-accent-cyan'
                            : 'border-white/10 bg-background/50 text-muted-text hover:border-accent-cyan/50'
                        }`}
                      >
                        <div className="text-2xl mb-2">{role.icon}</div>
                        {role.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Institution Field */}
                <div>
                  <label className="font-paragraph text-sm font-semibold text-foreground mb-3 block">
                    Institution
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent-cyan/50" />
                    <Input
                      type="text"
                      name="institution"
                      placeholder="Your University/College"
                      value={formData.institution}
                      onChange={handleChange}
                      className="pl-12 bg-background/50 border-accent-cyan/20 text-foreground placeholder:text-muted-text/50 focus:border-accent-cyan focus:ring-accent-cyan/20 rounded-xl py-6 font-paragraph"
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
                      name="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
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
                  <p className="text-xs text-muted-text mt-2">At least 8 characters with uppercase, lowercase, and numbers</p>
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label className="font-paragraph text-sm font-semibold text-foreground mb-3 block">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent-cyan/50" />
                    <Input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="pl-12 pr-12 bg-background/50 border-accent-cyan/20 text-foreground placeholder:text-muted-text/50 focus:border-accent-cyan focus:ring-accent-cyan/20 rounded-xl py-6 font-paragraph"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-accent-cyan/50 hover:text-accent-cyan transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-xl">
                    <p className="text-sm text-destructive font-paragraph">{error}</p>
                  </div>
                )}

                {/* Success Message */}
                {success && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-accent-cyan/10 border border-accent-cyan/30 rounded-xl flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-accent-cyan flex-shrink-0" />
                    <div>
                      <p className="font-paragraph text-sm font-semibold text-accent-cyan">Account Created Successfully!</p>
                      <p className="font-paragraph text-xs text-muted-text">Redirecting to your personalized dashboard...</p>
                    </div>
                  </motion.div>
                )}

                {/* Terms Checkbox */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="w-5 h-5 rounded border-accent-cyan/30 bg-background/50 mt-0.5"
                  />
                  <span className="font-paragraph text-sm text-muted-text">
                    I agree to the{' '}
                    <Link to="#" className="text-accent-cyan hover:underline">
                      Terms of Service
                    </Link>
                    {' '}and{' '}
                    <Link to="#" className="text-accent-cyan hover:underline">
                      Privacy Policy
                    </Link>
                  </span>
                </label>

                {/* Register Button */}
                <Button
                  type="submit"
                  disabled={isLoading || success}
                  className="w-full bg-gradient-to-r from-accent-cyan to-accent-purple text-black font-heading font-bold py-6 rounded-xl hover:opacity-90 transition-opacity text-lg shadow-[0_0_20px_rgba(0,255,255,0.3)] disabled:opacity-50"
                >
                  {success ? 'Account Created!' : isLoading ? 'Creating Account...' : 'Create Account'}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </form>

              {/* Sign In Link */}
              <div className="mt-8 pt-8 border-t border-white/10 text-center">
                <p className="font-paragraph text-muted-text">
                  Already have an account?{' '}
                  <Link to="/signin" className="text-accent-cyan hover:text-accent-cyan/80 font-semibold transition-colors">
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
