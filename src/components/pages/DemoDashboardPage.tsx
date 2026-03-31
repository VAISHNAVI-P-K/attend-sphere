import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, TrendingUp, Users, AlertTriangle, CheckCircle, Clock, Award, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

// Demo data for showcase
const demoDemoData = {
  student: {
    name: 'Ethan Sullivan',
    email: 'e.sullivan@uni.edu',
    roll: '2024-CS-042',
    image: 'https://static.wixstatic.com/media/2e45bf_9432d62ac52848f698ea5c581f299343~mv2.png',
    joinDate: 'January 2024'
  },
  registrations: [
    {
      _id: '1',
      eventName: 'Quantum Algorithms Workshop',
      registrationDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      attendanceStatus: 'Attended'
    },
    {
      _id: '2',
      eventName: 'Data Structures Seminar',
      registrationDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      attendanceStatus: 'Attended'
    },
    {
      _id: '3',
      eventName: 'Advanced AI Lecture',
      registrationDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      attendanceStatus: 'Attended'
    },
    {
      _id: '4',
      eventName: 'Cloud Computing Bootcamp',
      registrationDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      attendanceStatus: 'Attended'
    },
    {
      _id: '5',
      eventName: 'Machine Learning Basics',
      registrationDate: new Date(),
      attendanceStatus: 'Attended'
    }
  ]
};

export default function DemoDashboardPage() {
  const attendedCount = demoDemoData.registrations.filter(r => r.attendanceStatus === 'Attended').length;
  const totalCount = demoDemoData.registrations.length;
  const attendanceRate = totalCount > 0 ? ((attendedCount / totalCount) * 100).toFixed(1) : '0.0';

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="w-full max-w-[100rem] mx-auto px-6 pt-32 pb-24">
        {/* Demo Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-accent-purple/10 border border-accent-purple/30 rounded-2xl p-6 mb-12 flex items-center justify-between"
        >
          <div>
            <h2 className="font-heading text-xl font-bold text-accent-purple mb-1">Demo Dashboard</h2>
            <p className="font-paragraph text-sm text-muted-text">
              This is a sample view. Sign in or register to access your personal dashboard.
            </p>
          </div>
          <div className="flex gap-3">
            <Link to="/signin">
              <Button className="bg-accent-purple text-white hover:bg-accent-purple/90 font-heading font-bold rounded-xl">
                Sign In
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-accent-cyan text-primary-foreground hover:bg-accent-cyan/90 font-heading font-bold rounded-xl">
                Register
              </Button>
            </Link>
          </div>
        </motion.div>

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
                src={demoDemoData.student.image}
                alt={demoDemoData.student.name}
                width={120}
                className="w-32 h-32 rounded-2xl object-cover border-2 border-accent-cyan"
              />
              <div className="flex-1">
                <h1 className="font-heading text-4xl font-bold text-foreground mb-2">
                  {demoDemoData.student.name}
                </h1>
                <p className="font-paragraph text-lg text-muted-text mb-4">
                  {demoDemoData.student.email}
                </p>
                <div className="flex flex-wrap gap-3">
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
                {demoDemoData.student.email}
              </span>
              <CheckCircle className="w-5 h-5 text-accent-cyan" />
            </div>
            <div className="flex items-center justify-between p-4 bg-background rounded-xl">
              <span className="font-paragraph text-base text-muted-text">
                Roll: {demoDemoData.student.roll}
              </span>
              <CheckCircle className="w-5 h-5 text-accent-cyan" />
            </div>
            <div className="flex items-center justify-between p-4 bg-background rounded-xl">
              <span className="font-paragraph text-base text-muted-text">
                Member since: {demoDemoData.student.joinDate}
              </span>
              <CheckCircle className="w-5 h-5 text-accent-cyan" />
            </div>
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
          <div className="space-y-4">
            {demoDemoData.registrations.slice(0, 5).map((registration, index) => (
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
                  <div className="flex items-center gap-2 text-muted-text">
                    <Clock className="w-4 h-4" />
                    <span className="font-paragraph text-sm">
                      {registration.registrationDate.toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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
