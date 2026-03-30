import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, AlertTriangle, CheckCircle, Activity, Globe, Zap } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { EventRegistrations } from '@/entities';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function SystemPerformancePage() {
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
  const attendanceRate = totalCount > 0 ? ((attendedCount / totalCount) * 100).toFixed(1) : '94.2';

  const performanceData = [
    { time: '00:00', value: 88 },
    { time: '04:00', value: 92 },
    { time: '08:00', value: 85 },
    { time: '12:00', value: 94 },
    { time: '16:00', value: 90 },
    { time: '20:00', value: 87 }
  ];

  const distributionData = [
    { name: 'Excellent', value: 45, color: '#00FFFF' },
    { name: 'Good', value: 30, color: '#8A2BE2' },
    { name: 'Average', value: 15, color: '#FF00FF' },
    { name: 'Poor', value: 10, color: '#FF0066' }
  ];

  const heatmapData = Array.from({ length: 7 }, (_, week) =>
    Array.from({ length: 5 }, (_, day) => ({
      week,
      day,
      value: Math.floor(Math.random() * 100)
    }))
  ).flat();

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
            Real-time monitoring of attendance metrics and system health across all academic modules
          </p>
        </motion.div>

        {/* Main Performance Metric */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-gradient-to-br from-accent-cyan/20 to-accent-purple/20 rounded-3xl p-12 border border-accent-cyan/30 mb-12 text-center"
        >
          <div className="inline-block px-6 py-2 bg-card-background rounded-full border border-accent-cyan/20 mb-6">
            <span className="text-accent-cyan text-sm font-paragraph font-semibold">REAL-TIME PERFORMANCE</span>
          </div>
          <div className="font-heading text-8xl font-bold text-accent-cyan mb-4">
            {attendanceRate}
          </div>
          <div className="font-paragraph text-2xl text-foreground mb-2">
            System is currently running at peak efficiency
          </div>
          <div className="font-paragraph text-lg text-muted-text">
            Tracking current trajectory across 12,432 active data points
          </div>
        </motion.div>

        {/* Key Metrics Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card-background rounded-2xl p-8 border border-accent-cyan/10"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-xl bg-accent-cyan/10 flex items-center justify-center">
                <Activity className="w-7 h-7 text-accent-cyan" />
              </div>
              <TrendingUp className="w-6 h-6 text-accent-cyan" />
            </div>
            <div className="font-heading text-5xl font-bold text-accent-cyan mb-2">
              12,432
            </div>
            <div className="font-paragraph text-base text-muted-text">
              Active Data Points
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-card-background rounded-2xl p-8 border border-accent-purple/10"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-xl bg-accent-purple/10 flex items-center justify-center">
                <Globe className="w-7 h-7 text-accent-purple" />
              </div>
              <CheckCircle className="w-6 h-6 text-accent-purple" />
            </div>
            <div className="font-heading text-5xl font-bold text-accent-purple mb-2">
              845
            </div>
            <div className="font-paragraph text-base text-muted-text">
              Connected Nodes
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-card-background rounded-2xl p-8 border border-accent-magenta/10"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-xl bg-accent-magenta/10 flex items-center justify-center">
                <Zap className="w-7 h-7 text-accent-magenta" />
              </div>
              <AlertTriangle className="w-6 h-6 text-destructive" />
            </div>
            <div className="font-heading text-5xl font-bold text-destructive mb-2">
              12
            </div>
            <div className="font-paragraph text-base text-muted-text">
              At-Risk Alerts
            </div>
          </motion.div>
        </div>

        {/* System Updates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-card-background rounded-2xl p-8 border border-accent-cyan/10 mb-12"
        >
          <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
            Spring Semester Update
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-6 bg-background rounded-xl">
              <div className="w-12 h-12 rounded-xl bg-accent-cyan/10 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-accent-cyan" />
              </div>
              <div>
                <div className="font-paragraph text-lg text-foreground font-semibold mb-2">
                  Spring Semester Update
                </div>
                <div className="font-paragraph text-base text-muted-text">
                  Rollout contains policy changes, new attendance thresholds, and updated academic calendar integration.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-background rounded-xl">
              <div className="w-12 h-12 rounded-xl bg-accent-purple/10 flex items-center justify-center flex-shrink-0">
                <Activity className="w-6 h-6 text-accent-purple" />
              </div>
              <div>
                <div className="font-paragraph text-lg text-foreground font-semibold mb-2">
                  Checkup-style Optimization
                </div>
                <div className="font-paragraph text-base text-muted-text">
                  Enhanced real-time monitoring capabilities with improved data synchronization protocols.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-background rounded-xl">
              <div className="w-12 h-12 rounded-xl bg-accent-magenta/10 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-accent-magenta" />
              </div>
              <div>
                <div className="font-paragraph text-lg text-foreground font-semibold mb-2">
                  Automated Callback: Absent-threshold Alerts
                </div>
                <div className="font-paragraph text-base text-muted-text">
                  System now automatically flags students approaching attendance probation thresholds.
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Performance Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-card-background rounded-2xl p-8 border border-accent-cyan/10 mb-12"
        >
          <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
            System Engagement
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#8888AA20" />
              <XAxis dataKey="time" stroke="#8888AA" style={{ fontSize: '12px' }} />
              <YAxis stroke="#8888AA" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1A1A3A',
                  border: '1px solid #00FFFF20',
                  borderRadius: '12px',
                  color: '#E0E0E0'
                }}
              />
              <Line type="monotone" dataKey="value" stroke="#00FFFF" strokeWidth={3} dot={{ fill: '#00FFFF', r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Distribution & Heatmap */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-card-background rounded-2xl p-8 border border-accent-purple/10"
          >
            <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
              Performance Distribution
            </h2>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={distributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1A1A3A',
                      border: '1px solid #8A2BE220',
                      borderRadius: '12px',
                      color: '#E0E0E0'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              {distributionData.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }} />
                  <div>
                    <div className="font-paragraph text-sm text-foreground font-semibold">{item.name}</div>
                    <div className="font-paragraph text-xs text-muted-text">{item.value}%</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Weekly Heatmap */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-card-background rounded-2xl p-8 border border-accent-cyan/10"
          >
            <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
              Session Heatmap
            </h2>
            <div className="grid grid-cols-7 gap-2">
              {heatmapData.map((cell, index) => (
                <div
                  key={index}
                  className="aspect-square rounded-lg"
                  style={{
                    backgroundColor: `rgba(0, 255, 255, ${cell.value / 100})`
                  }}
                  title={`Week ${cell.week + 1}, Day ${cell.day + 1}: ${cell.value}%`}
                />
              ))}
            </div>
            <div className="flex justify-between mt-4 font-paragraph text-xs text-muted-text">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </motion.div>
        </div>

        {/* System Health Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="bg-card-background rounded-2xl p-8 border border-accent-cyan/10"
        >
          <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
            System Health Indicators
          </h2>
          <div className="space-y-4">
            {[
              { label: 'API Response Time', value: '45ms', status: 'good', color: 'accent-cyan' },
              { label: 'Database Sync', value: '99.8%', status: 'good', color: 'accent-cyan' },
              { label: 'Active Sessions', value: '1,247', status: 'good', color: 'accent-purple' },
              { label: 'Error Rate', value: '0.02%', status: 'good', color: 'accent-cyan' },
              { label: 'Data Integrity', value: '100%', status: 'good', color: 'accent-cyan' }
            ].map((metric, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-background rounded-xl">
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full bg-${metric.color} animate-pulse`} />
                  <span className="font-paragraph text-base text-foreground font-semibold">
                    {metric.label}
                  </span>
                </div>
                <div className={`font-heading text-xl font-bold text-${metric.color}`}>
                  {metric.value}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
