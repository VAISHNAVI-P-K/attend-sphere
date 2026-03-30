import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Search, Filter } from 'lucide-react';
import { BaseCrudService, formatPrice, useCurrency, DEFAULT_CURRENCY } from '@/integrations';
import { Events } from '@/entities';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { format } from 'date-fns';

export default function EventsPage() {
  const [events, setEvents] = useState<Events[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Events[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hasNext, setHasNext] = useState(false);
  const [skip, setSkip] = useState(0);
  const { currency } = useCurrency();

  const categories = ['all', 'Academic', 'Workshop', 'Seminar', 'Conference', 'Social'];

  useEffect(() => {
    loadEvents();
  }, [skip]);

  useEffect(() => {
    filterEvents();
  }, [events, searchTerm, selectedCategory]);

  const loadEvents = async () => {
    try {
      setIsLoading(true);
      const result = await BaseCrudService.getAll<Events>('events', {}, { limit: 50, skip });
      
      if (skip === 0) {
        setEvents(result.items);
      } else {
        setEvents(prev => [...prev, ...result.items]);
      }
      
      setHasNext(result.hasNext);
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterEvents = () => {
    let filtered = events;

    // Filter by date - only show current and upcoming events
    const now = new Date();
    filtered = filtered.filter(event => {
      if (!event.eventDate) return false;
      const eventDate = new Date(event.eventDate);
      return eventDate >= now;
    });

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(event => event.eventCategory === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.itemName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.itemDescription?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.eventLocation?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort by date - earliest first
    filtered.sort((a, b) => {
      const dateA = new Date(a.eventDate || 0).getTime();
      const dateB = new Date(b.eventDate || 0).getTime();
      return dateA - dateB;
    });

    setFilteredEvents(filtered);
  };

  const loadMore = () => {
    setSkip(prev => prev + 50);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="w-full max-w-[120rem] mx-auto px-6 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="font-heading text-6xl font-bold text-foreground mb-6">
            Discover <span className="text-accent-cyan">Events</span>
          </h1>
          <p className="font-paragraph text-xl text-muted-text max-w-3xl mx-auto">
            Browse and register for upcoming academic events, workshops, and seminars
          </p>
        </motion.div>

        {/* Search and Filter */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-text" />
              <Input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 bg-card-background border-accent-cyan/20 text-foreground placeholder:text-muted-text font-paragraph h-14 rounded-xl"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  className={`whitespace-nowrap font-paragraph rounded-xl ${
                    selectedCategory === category
                      ? 'bg-accent-cyan text-primary-foreground hover:bg-accent-cyan/90'
                      : 'border-accent-cyan/30 text-muted-text hover:text-accent-cyan hover:border-accent-cyan'
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="w-full max-w-[100rem] mx-auto px-6 pb-24 min-h-[600px]">
        {isLoading && skip === 0 ? null : filteredEvents.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <Link to={`/events/${event._id}`}>
                    <div className="bg-card-background rounded-2xl overflow-hidden border border-accent-cyan/10 hover:border-accent-cyan/30 transition-all h-full group">
                      <div className="relative h-56 overflow-hidden">
                        <Image
                          src={event.itemImage || 'https://static.wixstatic.com/media/2e45bf_136c4df91fa54b419e7b9934ed3e8bc7~mv2.png?originWidth=384&originHeight=192'}
                          alt={event.itemName || 'Event'}
                          width={400}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {event.eventCategory && (
                          <div className="absolute top-4 right-4 bg-accent-cyan/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                            <span className="font-paragraph text-sm font-semibold text-primary-foreground">
                              {event.eventCategory}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <h3 className="font-heading text-2xl font-bold text-foreground mb-3 line-clamp-2">
                          {event.itemName}
                        </h3>
                        <p className="font-paragraph text-base text-muted-text mb-4 line-clamp-2">
                          {event.itemDescription}
                        </p>
                        <div className="flex flex-col gap-3 mb-4">
                          {event.eventDate && (
                            <div className="flex items-center gap-2 text-muted-text">
                              <Calendar className="w-4 h-4 text-accent-cyan" />
                              <span className="font-paragraph text-sm">
                                {format(new Date(event.eventDate), 'MMM dd, yyyy • hh:mm a')}
                              </span>
                            </div>
                          )}
                          {event.eventLocation && (
                            <div className="flex items-center gap-2 text-muted-text">
                              <MapPin className="w-4 h-4 text-accent-purple" />
                              <span className="font-paragraph text-sm">{event.eventLocation}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-accent-cyan/10">
                          <div className="font-heading text-2xl font-bold text-accent-cyan">
                            {formatPrice(event.itemPrice || 0, currency ?? DEFAULT_CURRENCY)}
                          </div>
                          <Button className="bg-accent-cyan text-primary-foreground hover:bg-accent-cyan/90 font-paragraph font-semibold rounded-xl">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {hasNext && (
              <div className="flex justify-center mt-12">
                <Button
                  onClick={loadMore}
                  disabled={isLoading}
                  className="bg-accent-purple text-secondary-foreground hover:bg-accent-purple/90 font-paragraph font-semibold px-8 py-6 text-lg rounded-xl"
                >
                  {isLoading ? 'Loading...' : 'Load More Events'}
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-card-background border-2 border-accent-cyan/20 flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-10 h-10 text-accent-cyan" />
            </div>
            <h3 className="font-heading text-3xl font-bold text-foreground mb-3">
              No Events Found
            </h3>
            <p className="font-paragraph text-lg text-muted-text mb-6">
              Try adjusting your search or filter criteria
            </p>
            <Button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              variant="outline"
              className="border-accent-cyan text-accent-cyan hover:bg-accent-cyan/10 font-paragraph rounded-xl"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
