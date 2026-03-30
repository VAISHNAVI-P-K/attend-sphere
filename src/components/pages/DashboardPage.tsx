import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, TrendingUp, Users, AlertTriangle, CheckCircle, Clock, BarChart3, Award, FileText } from 'lucide-react';
import { BaseCrudService, useMember } from '@/integrations';
import { EventRegistrations, Events } from '@/entities';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
  const { member } = useMember();
  const [registrations, setRegistrations] = useState<EventRegistrations[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadRegistrations();
  }, [member]);

  const loadRegistrations = async () => {
    if (!member?.loginEmail) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const result = await BaseCrudService.getAll<EventRegistrations>('eventregistrations', {}, { limit: 100 });
      const userRegistrations = result.items.filter(
        reg => reg.registrantEmail === member.loginEmail
      );
      setRegistrations(userRegistrations);
    } catch (error) {
      console.error('Error loading registrations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateAttendanceStatus = async (registrationId: string, newStatus: string) => {
    try {
      const updatedRegistrations = registrations.map(reg =>
        reg._id === registrationId ? { ...reg, attendanceStatus: newStatus } : reg
      );
      setRegistrations(updatedRegistrations);

      await BaseCrudService.update<EventRegistrations>('eventregistrations', {
        _id: registrationId,
        attendanceStatus: newStatus
      });
    } catch (error) {
      console.error('Error updating attendance:', error);
      loadRegistrations();
    }
  };

  const attendedCount = registrations.filter(r => r.attendanceStatus === 'Attended').length;
  const totalCount = registrations.length;
  const attendanceRate = totalCount > 0 ? ((attendedCount / totalCount) * 100).toFixed(1) : '0.0';

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="w-full max-w-[100rem] mx-auto px-6 pt-32 pb-24">
        {/* Header with Profile Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="bg-card-background rounded-3xl p-8 border border-accent-cyan/10">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Image
                src="https://static.wixstatic.com/media/2e45bf_9432d62ac52848f698ea5c581f299343~mv2.png"
                alt={member?.profile?.nickname || 'User'}
                width={120}
                className="w-32 h-32 rounded-2xl object-cover border-2 border-accent-cyan"
              />
              <div className="flex-1">
                <h1 className="font-heading text-4xl font-bold text-foreground mb-2">
                  {member?.profile?.nickname || member?.contact?.firstName || 'Student'}
                </h1>
                <p className="font-paragraph text-lg text-muted-text mb-4">
                  {member?.loginEmail}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link to="/profile">
                    <Button className="bg-accent-cyan text-primary-foreground hover:bg-accent-cyan/90 font-paragraph font-semibold rounded-xl">
                      Export Record
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="border-accent-purple text-accent-purple hover:bg-accent-purple/10 font-paragraph font-semibold rounded-xl"
                  >
                    Send Alert
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Attendance Analytics Circle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-card-background rounded-3xl p-8 border border-accent-cyan/10 mb-12"
        >
          <h2 className="font-heading text-2xl font-bold text-foreground mb-8">
            Attendance Analytics
          </h2>
          <div className="flex flex-col items-center">
            <div className="relative w-64 h-64 mb-8">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="128"
                  cy="128"
                  r="100"
                  stroke="#1A1A3A"
                  strokeWidth="20"
                  fill="none"
                />
                <circle
                  cx="128"
                  cy="128"
                  r="100"
                  stroke="#00FFFF"
                  strokeWidth="20"
                  fill="none"
                  strokeDasharray={`${(parseFloat(attendanceRate) / 100) * 628} 628`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="font-heading text-6xl font-bold text-accent-cyan mb-2">
                    {attendanceRate}%
                  </div>
                  <div className="font-paragraph text-base text-muted-text">Attendance Rate</div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 w-full">
              <div className="text-center p-6 bg-background rounded-xl">
                <div className="font-heading text-4xl font-bold text-accent-cyan mb-2">142</div>
                <div className="font-paragraph text-sm text-muted-text">Total Classes</div>
              </div>
              <div className="text-center p-6 bg-background rounded-xl">
                <div className="font-heading text-4xl font-bold text-destructive mb-2">08</div>
                <div className="font-paragraph text-sm text-muted-text">Absences</div>
              </div>
              <div className="text-center p-6 bg-background rounded-xl">
                <div className="font-heading text-4xl font-bold text-accent-purple mb-2">134</div>
                <div className="font-paragraph text-sm text-muted-text">Present</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Warning Alert */}
        {parseFloat(attendanceRate) < 75 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-destructive/10 border border-destructive/30 rounded-2xl p-6 mb-12"
          >
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-heading text-xl font-bold text-destructive mb-2">
                  Attendance Probation Warning
                </h3>
                <p className="font-paragraph text-base text-muted-text">
                  Your attendance rate is below 75%. Please ensure you attend upcoming events to avoid probation status.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Personal Metadata */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-card-background rounded-3xl p-8 border border-accent-cyan/10 mb-12"
        >
          <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
            Personal Metadata
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-background rounded-xl">
              <span className="font-paragraph text-base text-muted-text">
                {member?.loginEmail || 'e.sullivan@uni.edu'}
              </span>
              <CheckCircle className="w-5 h-5 text-accent-cyan" />
            </div>
            {member?.contact?.phones && member.contact.phones.length > 0 && (
              <div className="flex items-center justify-between p-4 bg-background rounded-xl">
                <span className="font-paragraph text-base text-muted-text">
                  {member.contact.phones[0]}
                </span>
                <CheckCircle className="w-5 h-5 text-accent-cyan" />
              </div>
            )}
            {member?._createdDate && (
              <div className="flex items-center justify-between p-4 bg-background rounded-xl">
                <span className="font-paragraph text-base text-muted-text">
                  Member since: {format(new Date(member._createdDate), 'MMMM yyyy')}
                </span>
                <CheckCircle className="w-5 h-5 text-accent-cyan" />
              </div>
            )}
          </div>
        </motion.div>

        {/* Recent Activity Log */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-card-background rounded-3xl p-8 border border-accent-cyan/10 mb-12"
        >
          <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
            Recent Activity Log
          </h2>
          {isLoading ? null : registrations.length > 0 ? (
            <div className="space-y-4">
              {registrations.slice(0, 5).map((registration, index) => (
                <motion.div
                  key={registration._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="flex items-start gap-4 p-4 bg-background rounded-xl"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    registration.attendanceStatus === 'Attended' 
                      ? 'bg-accent-cyan/10' 
                      : 'bg-destructive/10'
                  }`}>
                    {registration.attendanceStatus === 'Attended' ? (
                      <CheckCircle className="w-5 h-5 text-accent-cyan" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-destructive" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-paragraph text-base text-foreground font-semibold mb-1">
                      {registration.attendanceStatus === 'Attended' ? 'Marked Present: ' : 'Absence Recorded: '}
                      {registration.eventName}
                    </div>
                    {registration.registrationDate && (
                      <div className="flex items-center gap-2 text-muted-text">
                        <Clock className="w-4 h-4" />
                        <span className="font-paragraph text-sm">
                          {format(new Date(registration.registrationDate), 'MMM dd, yyyy')}
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-muted-text mx-auto mb-4" />
              <p className="font-paragraph text-base text-muted-text">
                No activity recorded yet
              </p>
            </div>
          )}
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-card-background rounded-3xl p-8 border border-accent-cyan/10"
        >
          <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
            Achievements
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4 p-6 bg-background rounded-xl">
              <div className="w-16 h-16 rounded-xl bg-accent-cyan/10 flex items-center justify-center">
                <Award className="w-8 h-8 text-accent-cyan" />
              </div>
              <div>
                <div className="font-heading text-xl font-bold text-foreground">Perfect Week</div>
                <div className="font-paragraph text-sm text-muted-text">100% attendance for 5 consecutive days</div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-6 bg-background rounded-xl">
              <div className="w-16 h-16 rounded-xl bg-accent-purple/10 flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-accent-purple" />
              </div>
              <div>
                <div className="font-heading text-xl font-bold text-foreground">Top Performer</div>
                <div className="font-paragraph text-sm text-muted-text">Ranked in top 10% of class</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
