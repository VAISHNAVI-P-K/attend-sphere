import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Image } from '@/components/ui/image';

export default function Footer() {
  return (
    <footer className="w-full bg-card-background border-t border-accent-cyan/10">
      <div className="max-w-[100rem] mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-6">
              <Image
                src="https://static.wixstatic.com/media/2e45bf_7187c80ccbcc43238233b37a623d5d75~mv2.png"
                alt="AttendSphere Logo"
                width={40}
                className="w-10 h-10"
              />
              <span className="font-heading text-2xl font-bold text-foreground">
                Attend<span className="text-accent-cyan">Sphere</span>
              </span>
            </Link>
            <p className="font-paragraph text-base text-muted-text leading-relaxed">
              Advanced attendance tracking and event management for modern educational institutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-bold text-foreground mb-4">Quick Links</h4>
            <nav className="flex flex-col gap-3">
              <Link to="/" className="font-paragraph text-base text-muted-text hover:text-accent-cyan transition-colors">
                Home
              </Link>
              <Link to="/events" className="font-paragraph text-base text-muted-text hover:text-accent-cyan transition-colors">
                Events
              </Link>
              <Link to="/dashboard" className="font-paragraph text-base text-muted-text hover:text-accent-cyan transition-colors">
                Dashboard
              </Link>
              <Link to="/mark-attendance" className="font-paragraph text-base text-muted-text hover:text-accent-cyan transition-colors">
                Mark Attendance
              </Link>
            </nav>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-heading text-lg font-bold text-foreground mb-4">Resources</h4>
            <nav className="flex flex-col gap-3">
              <Link to="/analytics" className="font-paragraph text-base text-muted-text hover:text-accent-cyan transition-colors">
                Analytics
              </Link>
              <Link to="/system-performance" className="font-paragraph text-base text-muted-text hover:text-accent-cyan transition-colors">
                System Performance
              </Link>
              <Link to="/contact" className="font-paragraph text-base text-muted-text hover:text-accent-cyan transition-colors">
                Support
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading text-lg font-bold text-foreground mb-4">Contact</h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-accent-cyan flex-shrink-0 mt-0.5" />
                <span className="font-paragraph text-base text-muted-text">
                  support@attendsphere.edu
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-accent-cyan flex-shrink-0 mt-0.5" />
                <span className="font-paragraph text-base text-muted-text">
                  +1 (555) 123-4567
                </span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent-cyan flex-shrink-0 mt-0.5" />
                <span className="font-paragraph text-base text-muted-text">
                  123 University Ave, Campus Center
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-accent-cyan/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-paragraph text-sm text-muted-text">
            © 2026 AttendSphere. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/contact" className="font-paragraph text-sm text-muted-text hover:text-accent-cyan transition-colors">
              Privacy Policy
            </Link>
            <Link to="/contact" className="font-paragraph text-sm text-muted-text hover:text-accent-cyan transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
