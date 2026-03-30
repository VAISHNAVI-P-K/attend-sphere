import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { SupportInquiries } from '@/entities';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      await BaseCrudService.create<SupportInquiries>('supportinquiries', {
        _id: crypto.randomUUID(),
        userName: formData.userName,
        userEmail: formData.userEmail,
        subject: formData.subject,
        message: formData.message,
        submissionTime: new Date().toISOString()
      });

      setSubmitSuccess(true);
      setFormData({ userName: '', userEmail: '', subject: '', message: '' });
      
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting inquiry:', error);
    } finally {
      setIsSubmitting(false);
    }
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
          className="text-center mb-16"
        >
          <h1 className="font-heading text-6xl font-bold text-foreground mb-6">
            Get in <span className="text-accent-cyan">Touch</span>
          </h1>
          <p className="font-paragraph text-xl text-muted-text max-w-3xl mx-auto">
            Have questions or need support? We're here to help you with any inquiries about AttendSphere
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-card-background rounded-3xl p-8 border border-accent-cyan/10">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
                Send us a Message
              </h2>

              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-accent-cyan/10 border border-accent-cyan/30 rounded-xl p-4 mb-6"
                >
                  <p className="font-paragraph text-base text-accent-cyan">
                    Your message has been sent successfully! We'll get back to you soon.
                  </p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="font-paragraph text-sm font-semibold text-foreground mb-2 block">
                    Your Name
                  </label>
                  <Input
                    type="text"
                    required
                    value={formData.userName}
                    onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                    placeholder="Enter your full name"
                    className="bg-background border-accent-cyan/20 text-foreground placeholder:text-muted-text font-paragraph h-14 rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-paragraph text-sm font-semibold text-foreground mb-2 block">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    required
                    value={formData.userEmail}
                    onChange={(e) => setFormData({ ...formData, userEmail: e.target.value })}
                    placeholder="your.email@example.com"
                    className="bg-background border-accent-cyan/20 text-foreground placeholder:text-muted-text font-paragraph h-14 rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-paragraph text-sm font-semibold text-foreground mb-2 block">
                    Subject
                  </label>
                  <Input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="What is this regarding?"
                    className="bg-background border-accent-cyan/20 text-foreground placeholder:text-muted-text font-paragraph h-14 rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-paragraph text-sm font-semibold text-foreground mb-2 block">
                    Message
                  </label>
                  <Textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us more about your inquiry..."
                    rows={6}
                    className="bg-background border-accent-cyan/20 text-foreground placeholder:text-muted-text font-paragraph rounded-xl resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent-cyan text-primary-foreground hover:bg-accent-cyan/90 font-paragraph font-semibold py-6 text-lg rounded-xl"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-card-background rounded-3xl p-8 border border-accent-cyan/10">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-8">
                Contact Information
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-accent-cyan/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-accent-cyan" />
                  </div>
                  <div>
                    <div className="font-paragraph text-sm text-muted-text mb-1">Email</div>
                    <div className="font-paragraph text-lg text-foreground font-semibold">
                      support@attendsphere.edu
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-accent-purple/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-accent-purple" />
                  </div>
                  <div>
                    <div className="font-paragraph text-sm text-muted-text mb-1">Phone</div>
                    <div className="font-paragraph text-lg text-foreground font-semibold">
                      +1 (555) 123-4567
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-accent-magenta/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-accent-magenta" />
                  </div>
                  <div>
                    <div className="font-paragraph text-sm text-muted-text mb-1">Address</div>
                    <div className="font-paragraph text-lg text-foreground font-semibold">
                      123 University Ave<br />
                      Campus Center, Building A<br />
                      Suite 200
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-accent-cyan/10 to-accent-purple/10 rounded-3xl p-8 border border-accent-cyan/20">
              <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
                Office Hours
              </h3>
              <div className="space-y-3 font-paragraph text-base text-muted-text">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="text-foreground font-semibold">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="text-foreground font-semibold">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-foreground font-semibold">Closed</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
