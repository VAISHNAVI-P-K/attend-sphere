import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, TrendingUp, AlertTriangle, FileText, Clock, CheckCircle } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { EventRegistrations } from '@/entities';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { format } from 'date-fns';

export default function StudentProfilePage() {
  const { id } = useParams<{ id: string }>();
  const [registrations, setRegistrations] = useState<EventRegistrations[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [studentName, setStudentName] = useState('Ethan Sullivan');

  useEffect(() => {
    loadStudentData();
  }, [id]);

  const loadStudentData = async () => {
    try {
      setIsLoading(true);
      const result = await BaseCrudService.getAll<EventRegistrations>('eventregistrations', {}, { limit: 100 });
      setRegistrations(result.items);
      if (result.items.length > 0 && result.items[0].registrantName) {
        setStudentName(result.items[0].registrantName);
      }
    } catch (error) {
      console.error('Error loading student data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const attendedCount = registrations.filter(r => r.attendanceStatus === 'Attended').length;
  const totalCount = registrations.length;
  const attendanceRate = totalCount > 0 ? ((attendedCount / totalCount) * 100).toFixed(1) : '0.0';

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="w-full max-w-[100rem] mx-auto px-6 pt-32 pb-24 min-h-[800px]">
        {isLoading ? (
          <div className="flex items-center justify-center py-32">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-8"
            >
              <Link to="/mark-attendance">
                <Button variant="ghost" className="text-muted-text hover:text-accent-cyan font-paragraph gap-2">
                  <ArrowLeft className="w-5 h-5" />
                  Back to Roster
                </Button>
              </Link>
            </motion.div>

            {/* Student Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-card-background rounded-3xl p-8 border border-accent-cyan/10 mb-8"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <Image
                  src="https://static.wixstatic.com/media/2e45bf_9432d62ac52848f698ea5c581f299343~mv2.png"
                  alt={studentName}
                  width={120}
                  className="w-32 h-32 rounded-2xl object-cover border-2 border-accent-cyan"
                />
                <div className="flex-1">
                  <h1 className="font-heading text-4xl font-bold text-foreground mb-2">
                    {studentName}
                  </h1>
                  <div className="flex flex-wrap gap-4 text-muted-text font-paragraph text-base">
                    <span>CS-A (Computer Science)</span>
                    <span>•</span>
                    <span>Student ID: 2024-CS-001</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button className="bg-accent-cyan text-primary-foreground hover:bg-accent-cyan/90 font-paragraph font-semibold rounded-xl">
                    Export Record
                  </Button>
                  <Button
                    variant="outline"
                    className="border-accent-purple text-accent-purple hover:bg-accent-purple/10 font-paragraph font-semibold rounded-xl"
                  >
                    Send Alert
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Attendance Analytics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-card-background rounded-3xl p-8 border border-accent-cyan/10 mb-8"
            >
              <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
                Attendance Analytics
              </h2>
              <div className="flex items-center justify-center mb-8">
                <div className="relative w-48 h-48">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="96"
                      cy="96"
                      r="80"
                      stroke="#1A1A3A"
                      strokeWidth="16"
                      fill="none"
                    />
                    <circle
                      cx="96"
                      cy="96"
                      r="80"
                      stroke="#00FFFF"
                      strokeWidth="16"
                      fill="none"
                      strokeDasharray={`${(parseFloat(attendanceRate) / 100) * 502.4} 502.4`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="font-heading text-5xl font-bold text-accent-cyan">
                        {attendanceRate}%
                      </div>
                      <div className="font-paragraph text-sm text-muted-text">Attendance</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-background rounded-xl">
                  <div className="font-heading text-4xl font-bold text-accent-cyan mb-2">142</div>
                  <div className="font-paragraph text-sm text-muted-text">Total Sessions</div>
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
            </motion.div>

            {/* Personal Metadata */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-card-background rounded-3xl p-8 border border-accent-cyan/10 mb-8"
            >
              <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
                Personal Metadata
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-background rounded-xl">
                  <span className="font-paragraph text-base text-muted-text">e.sullivan@uni.edu</span>
                  <CheckCircle className="w-5 h-5 text-accent-cyan" />
                </div>
                <div className="flex items-center justify-between p-4 bg-background rounded-xl">
                  <span className="font-paragraph text-base text-muted-text">+1-800-555-2471</span>
                  <CheckCircle className="w-5 h-5 text-accent-cyan" />
                </div>
                <div className="flex items-center justify-between p-4 bg-background rounded-xl">
                  <span className="font-paragraph text-base text-muted-text">Born in: Chapel Hill, 2001</span>
                  <CheckCircle className="w-5 h-5 text-accent-cyan" />
                </div>
              </div>
            </motion.div>

            {/* Recent Activity Log */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-card-background rounded-3xl p-8 border border-accent-cyan/10"
            >
              <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
                Recent Activity Log
              </h2>
              <div className="space-y-4">
                {[
                  {
                    action: 'Marked Present: Data Structures Lecture',
                    time: '2 hours ago',
                    status: 'success'
                  },
                  {
                    action: 'Absence Recorded: Algorithms Lab',
                    time: '1 day ago',
                    status: 'warning'
                  },
                  {
                    action: 'Adjusted Recordable Status',
                    time: '3 days ago',
                    status: 'info'
                  },
                  {
                    action: 'Attendance Threshold Updated',
                    time: '5 days ago',
                    status: 'info'
                  }
                ].map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="flex items-start gap-4 p-4 bg-background rounded-xl"
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      activity.status === 'success' ? 'bg-accent-cyan/10' :
                      activity.status === 'warning' ? 'bg-destructive/10' :
                      'bg-accent-purple/10'
                    }`}>
                      {activity.status === 'success' ? (
                        <CheckCircle className="w-5 h-5 text-accent-cyan" />
                      ) : activity.status === 'warning' ? (
                        <AlertTriangle className="w-5 h-5 text-destructive" />
                      ) : (
                        <FileText className="w-5 h-5 text-accent-purple" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-paragraph text-base text-foreground font-semibold mb-1">
                        {activity.action}
                      </div>
                      <div className="flex items-center gap-2 text-muted-text">
                        <Clock className="w-4 h-4" />
                        <span className="font-paragraph text-sm">{activity.time}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
