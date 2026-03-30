import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Calendar, Award, AlertTriangle, CheckCircle } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { EventRegistrations } from '@/entities';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

export default function AnalyticsPage() {
  const [registrations, setRegistrations] = useState<EventRegistrations[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const result = await BaseCrudService.getAll<EventRegistrations>('eventregistrations', {}, { limit: 200 });
      setRegistrations(result.items);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const attendedCount = registrations.filter(r => r.attendanceStatus === 'Attended').length;
  const totalCount = registrations.length;
  const attendanceRate = totalCount > 0 ? ((attendedCount / totalCount) * 100).toFixed(1) : '0.0';

  const subjectData = [
    { name: 'Algorithms', rate: 85 },
    { name: 'Data Structures', rate: 78 },
    { name: 'Mathematics', rate: 70 },
    { name: 'Chemical', rate: 94 }
  ];

  const weeklyData = [
    { week: 'W1', value: 88 },
    { week: 'W2', value: 92 },
    { week: 'W3', value: 85 },
    { week: 'W4', value: 90 },
    { week: 'W5', value: 87 },
    { week: 'W6', value: 94 }
  ];

  const pieData = [
    { name: 'Attended', value: attendedCount, color: '#00FFFF' },
    { name: 'Absent', value: totalCount - attendedCount, color: '#FF0066' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="w-full max-w-[100rem] mx-auto px-6 pt-32 pb-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="font-heading text-5xl font-bold text-foreground mb-4">
            System Performance <span className="text-accent-cyan">Live Screen</span>
          </h1>
          <p className="font-paragraph text-lg text-muted-text">
            Real-time analytics and performance metrics for academic tracking
          </p>
        </motion.div>

        {/* Main Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-card-background rounded-2xl p-6 border border-accent-cyan/10"
          >
            <div className="text-center">
              <div className="font-heading text-5xl font-bold text-accent-cyan mb-2">
                {attendanceRate}
              </div>
              <div className="font-paragraph text-sm text-muted-text">
                Overall Attendance
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card-background rounded-2xl p-6 border border-accent-purple/10"
          >
            <div className="text-center">
              <div className="font-heading text-5xl font-bold text-accent-purple mb-2">
                {totalCount}
              </div>
              <div className="font-paragraph text-sm text-muted-text">
                Total Sessions
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card-background rounded-2xl p-6 border border-accent-magenta/10"
          >
            <div className="text-center">
              <div className="font-heading text-5xl font-bold text-accent-magenta mb-2">
                845
              </div>
              <div className="font-paragraph text-sm text-muted-text">
                Active Students
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-card-background rounded-2xl p-6 border border-accent-cyan/10"
          >
            <div className="text-center">
              <div className="font-heading text-5xl font-bold text-accent-cyan mb-2">
                12
              </div>
              <div className="font-paragraph text-sm text-muted-text">
                At Risk Students
              </div>
            </div>
          </motion.div>
        </div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Subject Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card-background rounded-2xl p-8 border border-accent-cyan/10"
          >
            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">
              Subject Analysis
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={subjectData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#8888AA20" />
                <XAxis dataKey="name" stroke="#8888AA" style={{ fontSize: '12px' }} />
                <YAxis stroke="#8888AA" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1A1A3A',
                    border: '1px solid #00FFFF20',
                    borderRadius: '12px',
                    color: '#E0E0E0'
                  }}
                />
                <Bar dataKey="rate" fill="#00FFFF" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Weekly Trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-card-background rounded-2xl p-8 border border-accent-purple/10"
          >
            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">
              Weekly Engagement
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#8888AA20" />
                <XAxis dataKey="week" stroke="#8888AA" style={{ fontSize: '12px' }} />
                <YAxis stroke="#8888AA" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1A1A3A',
                    border: '1px solid #8A2BE220',
                    borderRadius: '12px',
                    color: '#E0E0E0'
                  }}
                />
                <Line type="monotone" dataKey="value" stroke="#8A2BE2" strokeWidth={3} dot={{ fill: '#8A2BE2', r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-card-background rounded-2xl p-8 border border-accent-cyan/10 mb-12"
        >
          <h3 className="font-heading text-2xl font-bold text-foreground mb-6">
            Achievements
          </h3>
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

        {/* Engagement Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-card-background rounded-2xl p-8 border border-accent-cyan/10"
        >
          <h3 className="font-heading text-2xl font-bold text-foreground mb-6">
            Engagement Analytics
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
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
              <div className="font-paragraph text-sm text-muted-text">Present Days</div>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
