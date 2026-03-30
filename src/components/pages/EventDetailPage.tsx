import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowLeft, Clock, Tag } from 'lucide-react';
import { BaseCrudService, formatPrice, useCurrency, DEFAULT_CURRENCY, buyNow } from '@/integrations';
import { Events } from '@/entities';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { format } from 'date-fns';

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Events | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);
  const { currency } = useCurrency();

  useEffect(() => {
    loadEvent();
  }, [id]);

  const loadEvent = async () => {
    if (!id) return;
    
    try {
      setIsLoading(true);
      const data = await BaseCrudService.getById<Events>('events', id, {});
      setEvent(data);
    } catch (error) {
      console.error('Error loading event:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!event) return;
    
    try {
      setIsRegistering(true);
      await buyNow([{ collectionId: 'events', itemId: event._id, quantity: 1 }]);
    } catch (error) {
      console.error('Error registering for event:', error);
      setIsRegistering(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="w-full max-w-[100rem] mx-auto px-6 pt-32 pb-24 min-h-[800px]">
        {isLoading ? (
          <div className="flex items-center justify-center py-32">
            <LoadingSpinner />
          </div>
        ) : !event ? (
          <div className="text-center py-32">
            <div className="w-20 h-20 rounded-full bg-card-background border-2 border-accent-cyan/20 flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-10 h-10 text-accent-cyan" />
            </div>
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">
              Event Not Found
            </h2>
            <p className="font-paragraph text-lg text-muted-text mb-8">
              The event you're looking for doesn't exist or has been removed
            </p>
            <Link to="/events">
              <Button className="bg-accent-cyan text-primary-foreground hover:bg-accent-cyan/90 font-paragraph font-semibold rounded-xl">
                Browse Events
              </Button>
            </Link>
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
              <Link to="/events">
                <Button variant="ghost" className="text-muted-text hover:text-accent-cyan font-paragraph gap-2">
                  <ArrowLeft className="w-5 h-5" />
                  Back to Events
                </Button>
              </Link>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Event Image */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative rounded-3xl overflow-hidden border border-accent-cyan/20">
                  <Image
                    src={event.itemImage || 'https://static.wixstatic.com/media/2e45bf_555bc162a4bc4492a62ff0fe9dc0fe28~mv2.png?originWidth=768&originHeight=576'}
                    alt={event.itemName || 'Event'}
                    width={800}
                    className="w-full h-auto"
                  />
                  {event.eventCategory && (
                    <div className="absolute top-6 right-6 bg-accent-cyan/90 backdrop-blur-sm px-6 py-3 rounded-xl">
                      <span className="font-paragraph text-base font-semibold text-primary-foreground">
                        {event.eventCategory}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Event Details */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="bg-card-background rounded-3xl p-8 border border-accent-cyan/10">
                  <h1 className="font-heading text-4xl font-bold text-foreground mb-6">
                    {event.itemName}
                  </h1>

                  <div className="flex flex-col gap-4 mb-8">
                    {event.eventDate && (
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-accent-cyan/10 flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-6 h-6 text-accent-cyan" />
                        </div>
                        <div>
                          <div className="font-paragraph text-sm text-muted-text mb-1">Date & Time</div>
                          <div className="font-paragraph text-lg text-foreground font-semibold">
                            {format(new Date(event.eventDate), 'EEEE, MMMM dd, yyyy')}
                          </div>
                          <div className="font-paragraph text-base text-muted-text">
                            {format(new Date(event.eventDate), 'hh:mm a')}
                          </div>
                        </div>
                      </div>
                    )}

                    {event.eventLocation && (
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-accent-purple/10 flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-6 h-6 text-accent-purple" />
                        </div>
                        <div>
                          <div className="font-paragraph text-sm text-muted-text mb-1">Location</div>
                          <div className="font-paragraph text-lg text-foreground font-semibold">
                            {event.eventLocation}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-accent-magenta/10 flex items-center justify-center flex-shrink-0">
                        <Tag className="w-6 h-6 text-accent-magenta" />
                      </div>
                      <div>
                        <div className="font-paragraph text-sm text-muted-text mb-1">Registration Fee</div>
                        <div className="font-heading text-3xl text-accent-cyan font-bold">
                          {formatPrice(event.itemPrice || 0, currency ?? DEFAULT_CURRENCY)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
                      About This Event
                    </h3>
                    <p className="font-paragraph text-base text-muted-text leading-relaxed">
                      {event.itemDescription}
                    </p>
                  </div>

                  <Button
                    onClick={handleRegister}
                    disabled={isRegistering}
                    className="w-full bg-accent-cyan text-primary-foreground hover:bg-accent-cyan/90 font-paragraph font-semibold py-6 text-lg rounded-xl"
                  >
                    {isRegistering ? 'Processing...' : 'Register Now'}
                  </Button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
