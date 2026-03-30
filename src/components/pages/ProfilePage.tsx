import { motion } from 'framer-motion';
import { User, Mail, Calendar, Shield, Edit } from 'lucide-react';
import { useMember } from '@/integrations';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { format } from 'date-fns';
import { Image } from '@/components/ui/image';

export default function ProfilePage() {
  const { member } = useMember();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="w-full max-w-[100rem] mx-auto px-6 pt-32 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-heading text-5xl font-bold text-foreground mb-12">
            My <span className="text-accent-cyan">Profile</span>
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-card-background rounded-3xl p-8 border border-accent-cyan/10">
                <div className="text-center mb-6">
                  {member?.profile?.photo?.url ? (
                    <Image src={member.profile.photo.url} alt={member.profile.nickname || 'Profile'} className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-accent-cyan" />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center mx-auto mb-4">
                      <span className="font-heading text-5xl font-bold text-white">
                        {member?.profile?.nickname?.charAt(0) || member?.contact?.firstName?.charAt(0) || 'U'}
                      </span>
                    </div>
                  )}
                  <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
                    {member?.profile?.nickname || member?.contact?.firstName || 'User'}
                  </h2>
                  {member?.profile?.title && (
                    <p className="font-paragraph text-base text-muted-text">
                      {member.profile.title}
                    </p>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-background rounded-xl">
                    <div className="w-10 h-10 rounded-lg bg-accent-cyan/10 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-accent-cyan" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-paragraph text-xs text-muted-text mb-1">Email</div>
                      <div className="font-paragraph text-sm text-foreground font-semibold truncate">
                        {member?.loginEmail || 'Not provided'}
                      </div>
                    </div>
                  </div>

                  {member?._createdDate && (
                    <div className="flex items-center gap-3 p-4 bg-background rounded-xl">
                      <div className="w-10 h-10 rounded-lg bg-accent-purple/10 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-accent-purple" />
                      </div>
                      <div className="flex-1">
                        <div className="font-paragraph text-xs text-muted-text mb-1">Member Since</div>
                        <div className="font-paragraph text-sm text-foreground font-semibold">
                          {format(new Date(member._createdDate), 'MMMM dd, yyyy')}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3 p-4 bg-background rounded-xl">
                    <div className="w-10 h-10 rounded-lg bg-accent-magenta/10 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-accent-magenta" />
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

            {/* Profile Details */}
            <div className="lg:col-span-2">
              <div className="bg-card-background rounded-3xl p-8 border border-accent-cyan/10">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="font-heading text-3xl font-bold text-foreground">
                    Profile Details
                  </h2>
                  <Button
                    variant="outline"
                    className="border-accent-cyan text-accent-cyan hover:bg-accent-cyan/10 font-paragraph rounded-xl gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit Profile
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 bg-background rounded-xl">
                    <div className="font-paragraph text-sm text-muted-text mb-2">First Name</div>
                    <div className="font-paragraph text-lg text-foreground font-semibold">
                      {member?.contact?.firstName || 'Not provided'}
                    </div>
                  </div>

                  <div className="p-6 bg-background rounded-xl">
                    <div className="font-paragraph text-sm text-muted-text mb-2">Last Name</div>
                    <div className="font-paragraph text-lg text-foreground font-semibold">
                      {member?.contact?.lastName || 'Not provided'}
                    </div>
                  </div>

                  <div className="p-6 bg-background rounded-xl">
                    <div className="font-paragraph text-sm text-muted-text mb-2">Nickname</div>
                    <div className="font-paragraph text-lg text-foreground font-semibold">
                      {member?.profile?.nickname || 'Not set'}
                    </div>
                  </div>

                  <div className="p-6 bg-background rounded-xl">
                    <div className="font-paragraph text-sm text-muted-text mb-2">Email Verified</div>
                    <div className="font-paragraph text-lg text-foreground font-semibold">
                      {member?.loginEmailVerified ? (
                        <span className="text-accent-cyan">Verified</span>
                      ) : (
                        <span className="text-destructive">Not Verified</span>
                      )}
                    </div>
                  </div>

                  {member?.contact?.phones && member.contact.phones.length > 0 && (
                    <div className="p-6 bg-background rounded-xl md:col-span-2">
                      <div className="font-paragraph text-sm text-muted-text mb-2">Phone</div>
                      <div className="font-paragraph text-lg text-foreground font-semibold">
                        {member.contact.phones[0]}
                      </div>
                    </div>
                  )}

                  {member?.lastLoginDate && (
                    <div className="p-6 bg-background rounded-xl md:col-span-2">
                      <div className="font-paragraph text-sm text-muted-text mb-2">Last Login</div>
                      <div className="font-paragraph text-lg text-foreground font-semibold">
                        {format(new Date(member.lastLoginDate), 'MMMM dd, yyyy • hh:mm a')}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-8 bg-gradient-to-br from-accent-cyan/10 to-accent-purple/10 rounded-3xl p-8 border border-accent-cyan/20">
                <h3 className="font-heading text-2xl font-bold text-foreground mb-6">
                  Quick Actions
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Button
                    onClick={() => window.location.href = '/dashboard'}
                    className="bg-accent-cyan text-primary-foreground hover:bg-accent-cyan/90 font-paragraph font-semibold py-6 rounded-xl"
                  >
                    View Dashboard
                  </Button>
                  <Button
                    onClick={() => window.location.href = '/events'}
                    variant="outline"
                    className="border-2 border-accent-cyan text-accent-cyan hover:bg-accent-cyan/10 font-paragraph font-semibold py-6 rounded-xl"
                  >
                    Browse Events
                  </Button>
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
