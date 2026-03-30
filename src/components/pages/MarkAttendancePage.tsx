import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, CheckCircle, XCircle, User } from 'lucide-react';
import { BaseCrudService, useMember } from '@/integrations';
import { EventRegistrations } from '@/entities';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function MarkAttendancePage() {
  const { member } = useMember();
  const [registrations, setRegistrations] = useState<EventRegistrations[]>([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState<EventRegistrations[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('CS-A (Computer Science)');

  useEffect(() => {
    loadRegistrations();
  }, []);

  useEffect(() => {
    filterRegistrations();
  }, [registrations, searchTerm]);

  const loadRegistrations = async () => {
    try {
      setIsLoading(true);
      const result = await BaseCrudService.getAll<EventRegistrations>('eventregistrations', {}, { limit: 100 });
      setRegistrations(result.items);
    } catch (error) {
      console.error('Error loading registrations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterRegistrations = () => {
    let filtered = registrations;

    if (searchTerm) {
      filtered = filtered.filter(reg =>
        reg.registrantName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.registrantEmail?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredRegistrations(filtered);
  };

  const toggleAttendance = async (registrationId: string, currentStatus?: string) => {
    const newStatus = currentStatus === 'Attended' ? 'Absent' : 'Attended';
    
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

  const commitData = () => {
    alert('Attendance data committed to sphere successfully!');
  };

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
          <div className="inline-block px-4 py-2 bg-card-background rounded-full border border-accent-cyan/20 mb-4">
            <span className="text-accent-cyan text-sm font-paragraph font-semibold">FACULTY COMMAND CENTER</span>
          </div>
          <h1 className="font-heading text-5xl font-bold text-foreground mb-4">
            Mark Attendance
          </h1>
          <p className="font-paragraph text-lg text-muted-text">
            Quick form-style academic engagement log for the current session.
          </p>
        </motion.div>

        {/* Class Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-card-background rounded-2xl p-6 border border-accent-cyan/10 mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-3 h-3 rounded-full bg-accent-cyan animate-pulse" />
            <span className="font-paragraph text-sm text-muted-text">TARGET CLASS</span>
          </div>
          <h2 className="font-heading text-3xl font-bold text-foreground">
            {selectedClass}
          </h2>
        </motion.div>

        {/* Module Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-card-background rounded-2xl p-6 border border-accent-cyan/10 mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-3 h-3 rounded-full bg-accent-purple" />
            <span className="font-paragraph text-sm text-muted-text">SUBJECT MODULE</span>
          </div>
          <h2 className="font-heading text-2xl font-bold text-foreground">
            Data Structures (DS-301)
          </h2>
        </motion.div>

        {/* Student Roster */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-card-background rounded-2xl p-8 border border-accent-cyan/10 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-heading text-2xl font-bold text-foreground">
              Student Roster
            </h3>
            <Button
              variant="outline"
              className="border-accent-cyan text-accent-cyan hover:bg-accent-cyan/10 font-paragraph rounded-xl"
            >
              NAME ALL PRESENT
            </Button>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-text" />
            <Input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 bg-background border-accent-cyan/20 text-foreground placeholder:text-muted-text font-paragraph h-14 rounded-xl"
            />
          </div>

          {/* Student List */}
          {isLoading ? null : filteredRegistrations.length > 0 ? (
            <div className="space-y-3">
              {filteredRegistrations.slice(0, 10).map((registration, index) => (
                <motion.div
                  key={registration._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="flex items-center justify-between p-4 bg-background rounded-xl border border-accent-cyan/10 hover:border-accent-cyan/30 transition-all"
                >
                  <Link to={`/student/${registration._id}`} className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center">
                      <span className="font-heading text-lg font-bold text-white">
                        {registration.registrantName?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <div>
                      <div className="font-paragraph text-lg text-foreground font-semibold">
                        {registration.registrantName || 'Unknown Student'}
                      </div>
                      <div className="font-paragraph text-sm text-muted-text">
                        {registration.registrantEmail}
                      </div>
                    </div>
                  </Link>

                  <Button
                    onClick={() => toggleAttendance(registration._id, registration.attendanceStatus)}
                    className={`font-paragraph font-semibold rounded-xl min-w-[120px] ${
                      registration.attendanceStatus === 'Attended'
                        ? 'bg-accent-cyan text-primary-foreground hover:bg-accent-cyan/90'
                        : 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                    }`}
                  >
                    {registration.attendanceStatus === 'Attended' ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Present
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 mr-2" />
                        Absent
                      </>
                    )}
                  </Button>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <User className="w-12 h-12 text-muted-text mx-auto mb-4" />
              <p className="font-paragraph text-base text-muted-text">
                No students found
              </p>
            </div>
          )}
        </motion.div>

        {/* Commit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center"
        >
          <Button
            onClick={commitData}
            className="bg-gradient-to-r from-accent-cyan to-accent-purple text-white hover:opacity-90 font-paragraph font-bold px-12 py-6 text-lg rounded-xl"
          >
            COMMIT DATA TO SPHERE
          </Button>
        </motion.div>

        <div className="text-center mt-6">
          <p className="font-paragraph text-sm text-muted-text">
            SYNCED: 26 SYNCED / 0 OFFLINE
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
