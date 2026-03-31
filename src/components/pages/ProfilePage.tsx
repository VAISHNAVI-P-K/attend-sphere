import { motion } from 'framer-motion';
import { User, Mail, Calendar, Shield, Edit, LogOut, BarChart3, Users, BookOpen, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { useMember } from '@/integrations';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { format } from 'date-fns';
import { Image } from '@/components/ui/image';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const { member, actions } = useMember();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<string>('student');
  const [userInstitution, setUserInstitution] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');

  useEffect(() => {
    // Load user data from localStorage
    const role = localStorage.getItem('userRole') || 'student';
    const institution = localStorage.getItem('userInstitution') || '';
    const fname = localStorage.getItem('userFirstName') || member?.contact?.firstName || '';
    const lname = localStorage.getItem('userLastName') || member?.contact?.lastName || '';
    
    setUserRole(role);
    setUserInstitution(institution);
    setFirstName(fname);
    setLastName(lname);
  }, [member]);

  const handleLogout = async () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userInstitution');
    localStorage.removeItem('userFirstName');
    localStorage.removeItem('userLastName');
    localStorage.removeItem('userEmail');
    actions.logout();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="w-full max-w-[100rem] mx-auto px-6 pt-32 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-12">
            <h1 className="font-heading text-5xl font-bold text-foreground">
              My <span className="text-accent-cyan">Profile</span>
            </h1>
            <Button
              onClick={handleLogout}
              className="bg-destructive hover:bg-destructive/90 text-white font-paragraph font-semibold py-6 rounded-xl gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-card-background rounded-3xl p-8 border border-accent-cyan/10">
                <div className="text-center mb-6">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center mx-auto mb-4 border-4 border-accent-cyan">
                    <span className="font-heading text-5xl font-bold text-white">
                      {firstName?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
                    {firstName} {lastName}
                  </h2>
                  <div className="inline-block px-4 py-2 bg-accent-cyan/10 rounded-full border border-accent-cyan/30 mb-4">
                    <p className="font-paragraph text-sm font-semibold text-accent-cyan capitalize">
                      {userRole}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-background rounded-xl">
                    <div className="w-10 h-10 rounded-lg bg-accent-cyan/10 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-accent-cyan" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-paragraph text-xs text-muted-text mb-1">Email</div>
                      <div className="font-paragraph text-sm text-foreground font-semibold truncate">
                        {member?.loginEmail || localStorage.getItem('userEmail') || 'Not provided'}
                      </div>
                    </div>
                  </div>

                  {userInstitution && (
                    <div className="flex items-center gap-3 p-4 bg-background rounded-xl">
                      <div className="w-10 h-10 rounded-lg bg-accent-purple/10 flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-accent-purple" />
                      </div>
                      <div className="flex-1">
                        <div className="font-paragraph text-xs text-muted-text mb-1">Institution</div>
                        <div className="font-paragraph text-sm text-foreground font-semibold">
                          {userInstitution}
                        </div>
                      </div>
                    </div>
                  )}

                  {member?._createdDate && (
                    <div className="flex items-center gap-3 p-4 bg-background rounded-xl">
                      <div className="w-10 h-10 rounded-lg bg-accent-magenta/10 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-accent-magenta" />
                      </div>
                      <div className="flex-1">
                        <div className="font-paragraph text-xs text-muted-text mb-1">Member Since</div>
                        <div className="font-paragraph text-sm text-foreground font-semibold">
                          {format(new Date(member._createdDate), 'MMM dd, yyyy')}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3 p-4 bg-background rounded-xl">
                    <div className="w-10 h-10 rounded-lg bg-accent-cyan/10 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-accent-cyan" />
                    </div>
                    <div className="flex-1">
                      <div className="font-paragraph text-xs text-muted-text mb-1">Status</div>
                      <div className="font-paragraph text-sm text-foreground font-semibold">
                        {member?.status || 'Active'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Role-Based Content */}
            <div className="lg:col-span-2">
              {/* Role-Specific Dashboard */}
              <div className="bg-card-background rounded-3xl p-8 border border-accent-cyan/10 mb-8">
                <h2 className="font-heading text-3xl font-bold text-foreground mb-8">
                  {userRole === 'student' && 'Student Dashboard'}
                  {userRole === 'faculty' && 'Faculty Dashboard'}
                  {userRole === 'admin' && 'Administrator Dashboard'}
                </h2>

                {userRole === 'student' && (
                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="p-6 bg-gradient-to-br from-accent-cyan/10 to-accent-purple/10 rounded-2xl border border-accent-cyan/20 cursor-pointer hover:border-accent-cyan/40 transition-all"
                      onClick={() => navigate('/events')}
                    >
                      <div className="w-12 h-12 rounded-lg bg-accent-cyan/20 flex items-center justify-center mb-4">
                        <BookOpen className="w-6 h-6 text-accent-cyan" />
                      </div>
                      <h3 className="font-heading text-lg font-bold text-foreground mb-2">Browse Events</h3>
                      <p className="font-paragraph text-sm text-muted-text">Discover and register for upcoming academic events</p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="p-6 bg-gradient-to-br from-accent-purple/10 to-accent-magenta/10 rounded-2xl border border-accent-purple/20 cursor-pointer hover:border-accent-purple/40 transition-all"
                      onClick={() => navigate('/mark-attendance')}
                    >
                      <div className="w-12 h-12 rounded-lg bg-accent-purple/20 flex items-center justify-center mb-4">
                        <CheckCircle2 className="w-6 h-6 text-accent-purple" />
                      </div>
                      <h3 className="font-heading text-lg font-bold text-foreground mb-2">Mark Attendance</h3>
                      <p className="font-paragraph text-sm text-muted-text">Check in to events and track your attendance</p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="p-6 bg-gradient-to-br from-accent-magenta/10 to-accent-cyan/10 rounded-2xl border border-accent-magenta/20 cursor-pointer hover:border-accent-magenta/40 transition-all"
                      onClick={() => navigate('/dashboard')}
                    >
                      <div className="w-12 h-12 rounded-lg bg-accent-magenta/20 flex items-center justify-center mb-4">
                        <BarChart3 className="w-6 h-6 text-accent-magenta" />
                      </div>
                      <h3 className="font-heading text-lg font-bold text-foreground mb-2">My Analytics</h3>
                      <p className="font-paragraph text-sm text-muted-text">View your attendance statistics and progress</p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="p-6 bg-gradient-to-br from-accent-cyan/10 to-accent-magenta/10 rounded-2xl border border-accent-cyan/20"
                    >
                      <div className="w-12 h-12 rounded-lg bg-accent-cyan/20 flex items-center justify-center mb-4">
                        <Clock className="w-6 h-6 text-accent-cyan" />
                      </div>
                      <h3 className="font-heading text-lg font-bold text-foreground mb-2">Attendance Rate</h3>
                      <p className="font-paragraph text-3xl font-bold text-accent-cyan mt-4">85%</p>
                    </motion.div>
                  </div>
                )}

                {userRole === 'faculty' && (
                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="p-6 bg-gradient-to-br from-accent-cyan/10 to-accent-purple/10 rounded-2xl border border-accent-cyan/20 cursor-pointer hover:border-accent-cyan/40 transition-all"
                      onClick={() => navigate('/dashboard')}
                    >
                      <div className="w-12 h-12 rounded-lg bg-accent-cyan/20 flex items-center justify-center mb-4">
                        <Users className="w-6 h-6 text-accent-cyan" />
                      </div>
                      <h3 className="font-heading text-lg font-bold text-foreground mb-2">Manage Classes</h3>
                      <p className="font-paragraph text-sm text-muted-text">View and manage your student classes</p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="p-6 bg-gradient-to-br from-accent-purple/10 to-accent-magenta/10 rounded-2xl border border-accent-purple/20 cursor-pointer hover:border-accent-purple/40 transition-all"
                      onClick={() => navigate('/analytics')}
                    >
                      <div className="w-12 h-12 rounded-lg bg-accent-purple/20 flex items-center justify-center mb-4">
                        <BarChart3 className="w-6 h-6 text-accent-purple" />
                      </div>
                      <h3 className="font-heading text-lg font-bold text-foreground mb-2">Analytics</h3>
                      <p className="font-paragraph text-sm text-muted-text">View class attendance analytics and reports</p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="p-6 bg-gradient-to-br from-accent-magenta/10 to-accent-cyan/10 rounded-2xl border border-accent-magenta/20 cursor-pointer hover:border-accent-magenta/40 transition-all"
                      onClick={() => navigate('/mark-attendance')}
                    >
                      <div className="w-12 h-12 rounded-lg bg-accent-magenta/20 flex items-center justify-center mb-4">
                        <CheckCircle2 className="w-6 h-6 text-accent-magenta" />
                      </div>
                      <h3 className="font-heading text-lg font-bold text-foreground mb-2">Mark Attendance</h3>
                      <p className="font-paragraph text-sm text-muted-text">Record student attendance for your classes</p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="p-6 bg-gradient-to-br from-accent-cyan/10 to-accent-magenta/10 rounded-2xl border border-accent-cyan/20"
                    >
                      <div className="w-12 h-12 rounded-lg bg-accent-cyan/20 flex items-center justify-center mb-4">
                        <Users className="w-6 h-6 text-accent-cyan" />
                      </div>
                      <h3 className="font-heading text-lg font-bold text-foreground mb-2">Total Students</h3>
                      <p className="font-paragraph text-3xl font-bold text-accent-cyan mt-4">156</p>
                    </motion.div>
                  </div>
                )}

                {userRole === 'admin' && (
                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="p-6 bg-gradient-to-br from-accent-cyan/10 to-accent-purple/10 rounded-2xl border border-accent-cyan/20 cursor-pointer hover:border-accent-cyan/40 transition-all"
                      onClick={() => navigate('/system-performance')}
                    >
                      <div className="w-12 h-12 rounded-lg bg-accent-cyan/20 flex items-center justify-center mb-4">
                        <BarChart3 className="w-6 h-6 text-accent-cyan" />
                      </div>
                      <h3 className="font-heading text-lg font-bold text-foreground mb-2">System Performance</h3>
                      <p className="font-paragraph text-sm text-muted-text">Monitor system health and performance metrics</p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="p-6 bg-gradient-to-br from-accent-purple/10 to-accent-magenta/10 rounded-2xl border border-accent-purple/20 cursor-pointer hover:border-accent-purple/40 transition-all"
                      onClick={() => navigate('/analytics')}
                    >
                      <div className="w-12 h-12 rounded-lg bg-accent-purple/20 flex items-center justify-center mb-4">
                        <BarChart3 className="w-6 h-6 text-accent-purple" />
                      </div>
                      <h3 className="font-heading text-lg font-bold text-foreground mb-2">Analytics</h3>
                      <p className="font-paragraph text-sm text-muted-text">View comprehensive system analytics and reports</p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="p-6 bg-gradient-to-br from-accent-magenta/10 to-accent-cyan/10 rounded-2xl border border-accent-magenta/20 cursor-pointer hover:border-accent-magenta/40 transition-all"
                      onClick={() => navigate('/dashboard')}
                    >
                      <div className="w-12 h-12 rounded-lg bg-accent-magenta/20 flex items-center justify-center mb-4">
                        <Users className="w-6 h-6 text-accent-magenta" />
                      </div>
                      <h3 className="font-heading text-lg font-bold text-foreground mb-2">User Management</h3>
                      <p className="font-paragraph text-sm text-muted-text">Manage system users and permissions</p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="p-6 bg-gradient-to-br from-accent-cyan/10 to-accent-magenta/10 rounded-2xl border border-accent-cyan/20"
                    >
                      <div className="w-12 h-12 rounded-lg bg-accent-cyan/20 flex items-center justify-center mb-4">
                        <AlertCircle className="w-6 h-6 text-accent-cyan" />
                      </div>
                      <h3 className="font-heading text-lg font-bold text-foreground mb-2">System Status</h3>
                      <p className="font-paragraph text-lg font-bold text-accent-cyan mt-4">All Systems Operational</p>
                    </motion.div>
                  </div>
                )}
              </div>

              {/* Account Settings */}
              <div className="bg-card-background rounded-3xl p-8 border border-accent-cyan/10">
                <h3 className="font-heading text-2xl font-bold text-foreground mb-6">
                  Account Settings
                </h3>
                <div className="space-y-4">
                  <div className="p-6 bg-background rounded-xl flex items-center justify-between">
                    <div>
                      <h4 className="font-heading text-lg font-bold text-foreground mb-1">Email Notifications</h4>
                      <p className="font-paragraph text-sm text-muted-text">Receive updates about events and attendance</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-6 h-6 rounded border-accent-cyan/30 bg-background/50" />
                  </div>
                  <div className="p-6 bg-background rounded-xl flex items-center justify-between">
                    <div>
                      <h4 className="font-heading text-lg font-bold text-foreground mb-1">Two-Factor Authentication</h4>
                      <p className="font-paragraph text-sm text-muted-text">Enhance your account security</p>
                    </div>
                    <input type="checkbox" className="w-6 h-6 rounded border-accent-cyan/30 bg-background/50" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
