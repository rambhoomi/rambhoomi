import Link from 'next/link';
import { Building, Shield, Users, Star, MapPin, Search, ArrowRight, Play, Check, Award, Globe, Phone, Mail } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/98 backdrop-blur-md border-b border-gray-100/50 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <Building className="h-9 w-9 text-gray-900" />
              <span className="ml-3 text-3xl font-light tracking-tight text-gray-900">Rambhoomi</span>
            </div>
            <div className="hidden md:flex items-center space-x-10">
              <a href="#properties" className="text-gray-700 hover:text-gray-900 transition-colors font-medium tracking-wide">Properties</a>
              <a href="#about" className="text-gray-700 hover:text-gray-900 transition-colors font-medium tracking-wide">About</a>
              <a href="#contact" className="text-gray-700 hover:text-gray-900 transition-colors font-medium tracking-wide">Contact</a>
              <Link
                href="/auth/login"
                className="bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-all duration-300 font-medium tracking-wide"
              >
                Admin Portal
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-32 bg-gradient-to-br from-gray-50/30 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-gray-50/50"></div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-12">
              <div>
                <div className="inline-flex items-center bg-gray-900/5 text-gray-900 px-6 py-3 rounded-full text-sm font-medium mb-8 border border-gray-200/50">
                  <Award className="h-4 w-4 mr-2" />
                  India's Premier Luxury Platform
                </div>
                <h1 className="text-4xl lg:text-6xl font-light text-gray-900 leading-tight tracking-tight">
                  Exceptional
                  <span className="block font-extralight italic text-gray-700">Luxury</span>
                  <span className="block font-normal">Redefined</span>
                </h1>
                <p className="text-lg text-gray-600 mt-8 leading-relaxed max-w-xl font-light">
                  Discover India's most exclusive properties — from heritage palaces to modern sanctuaries. 
                  Each stay is curated for the discerning traveler who settles for nothing less than extraordinary.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <button className="bg-gray-900 text-white px-8 py-4 rounded-full text-base font-medium hover:bg-gray-800 transition-all duration-300 flex items-center justify-center group">
                  Explore Collection
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="border-2 border-gray-200 text-gray-900 px-8 py-4 rounded-full text-base font-medium hover:border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-500 flex items-center justify-center">
                  <Play className="mr-2 h-4 w-4" />
                  Experience Preview
                </button>
              </div>

              <div className="grid grid-cols-2 gap-8 pt-6 border-t border-gray-200/50">
                <div>
                  <div className="flex items-center mb-1">
                    <Star className="h-4 w-4 text-amber-400 mr-2" />
                    <span className="text-2xl font-light text-gray-900">4.9</span>
                  </div>
                  <span className="text-sm text-gray-600 font-medium tracking-wide">Guest Excellence</span>
                </div>
                <div>
                  <div className="flex items-center mb-1">
                    <Award className="h-4 w-4 text-gray-900 mr-2" />
                    <span className="text-2xl font-light text-gray-900">500+</span>
                  </div>
                  <span className="text-sm text-gray-600 font-medium tracking-wide">Curated Properties</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[3/4] relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80"
                  alt="Luxury Villa"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
              </div>
              
              {/* Floating Stats Cards */}
              <div className="absolute -left-8 top-24 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-100/50">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center">
                    <Check className="h-7 w-7 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-xl font-light text-gray-900">98%</div>
                    <div className="text-xs text-gray-600 font-medium tracking-wide">Guest Satisfaction</div>
                  </div>
                </div>
              </div>

              <div className="absolute -right-8 bottom-24 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-100/50">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center">
                    <MapPin className="h-7 w-7 text-gray-600" />
                  </div>
                  <div>
                    <div className="text-xl font-light text-gray-900">25+</div>
                    <div className="text-xs text-gray-600 font-medium tracking-wide">Premium Cities</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-white mb-4">Find Your Perfect Stay</h2>
            <p className="text-gray-300 font-light">Discover luxury properties across India's most beautiful destinations</p>
          </div>
          
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-100/50">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-900 tracking-wide">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 h-5 w-5 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Where to?"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-900 focus:border-transparent focus:bg-white transition-all font-light"
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-900 tracking-wide">Check-in</label>
                <input
                  type="date"
                  className="w-full px-4 py-4 bg-gray-50/50 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-gray-900 focus:border-transparent focus:bg-white transition-all font-light"
                />
              </div>
              
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-900 tracking-wide">Check-out</label>
                <input
                  type="date"
                  className="w-full px-4 py-4 bg-gray-50/50 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-gray-900 focus:border-transparent focus:bg-white transition-all font-light"
                />
              </div>
              
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-900 tracking-wide">Guests</label>
                <select className="w-full px-4 py-4 bg-gray-50/50 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-gray-900 focus:border-transparent focus:bg-white transition-all font-light">
                  <option value="">Select guests</option>
                  <option value="2">2 guests</option>
                  <option value="4">4 guests</option>
                  <option value="6">6 guests</option>
                  <option value="8+">8+ guests</option>
                </select>
              </div>
            </div>
            
            <button className="w-full mt-8 bg-gray-900 text-white py-4 rounded-xl text-base font-medium hover:bg-gray-800 transition-all duration-300 flex items-center justify-center group shadow-lg">
              <Search className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              Search Properties
            </button>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section id="properties" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-gray-900 mb-4">Featured Luxury Properties</h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto font-light">
              Handpicked exceptional properties that redefine luxury hospitality
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=600&q=80",
                title: "Royal Heritage Palace",
                location: "Udaipur, Rajasthan",
                price: "₹25,000",
                rating: "4.9",
                features: ["Palace", "Lake View", "Royal Suite"]
              },
              {
                image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80",
                title: "Modern Hill Villa",
                location: "Shimla, Himachal Pradesh",
                price: "₹18,000",
                rating: "4.8",
                features: ["Mountain View", "Private Pool", "Modern"]
              },
              {
                image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80",
                title: "Beachfront Paradise",
                location: "Goa",
                price: "₹22,000",
                rating: "4.9",
                features: ["Beach Access", "Infinity Pool", "Sunset View"]
              }
            ].map((property, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-sm font-semibold">{property.rating}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {property.location}
                  </div>
                  
                  <h3 className="text-lg font-medium text-gray-900 mb-3">{property.title}</h3>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {property.features.map((feature, idx) => (
                      <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl font-light text-gray-900">{property.price}</span>
                      <span className="text-gray-600 font-light">/night</span>
                    </div>
                    <button className="bg-gray-900 text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors font-medium">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { number: "500+", label: "Luxury Properties", icon: Building },
              { number: "25+", label: "Cities Covered", icon: MapPin },
              { number: "10K+", label: "Happy Guests", icon: Users },
              { number: "4.9★", label: "Guest Rating", icon: Star }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-6 w-6 text-white/80" />
                </div>
                <div className="text-2xl font-light text-white mb-2">{stat.number}</div>
                <div className="text-gray-400 text-sm font-medium tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Rambhoomi */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-3xl font-light text-gray-900 mb-6">
                Why Choose Rambhoomi?
              </h2>
              <p className="text-base text-gray-600 mb-10 font-light leading-relaxed">
                We're not just another booking platform. We're your gateway to extraordinary experiences 
                in India's most luxurious properties.
              </p>
              
              <div className="space-y-6">
                {[
                  {
                    icon: Shield,
                    title: "Verified Luxury",
                    description: "Every property is personally inspected and verified for quality and authenticity."
                  },
                  {
                    icon: Users,
                    title: "Personalized Service",
                    description: "Dedicated concierge service to ensure your stay exceeds expectations."
                  },
                  {
                    icon: Award,
                    title: "Exclusive Access",
                    description: "Access to unique properties not available on other platforms."
                  }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <feature.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600 text-sm font-light leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80"
                  alt="Luxury Experience"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-100/50">
                <div className="text-center">
                  <div className="text-2xl font-light text-gray-900">10,000+</div>
                  <div className="text-xs text-gray-600 font-medium tracking-wide">Happy Guests</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-light text-gray-900 mb-4">What Our Guests Say</h2>
            <p className="text-base text-gray-600 font-light">Real experiences from real travelers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Priya Sharma",
                location: "Mumbai",
                image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&q=80",
                rating: 5,
                review: "Absolutely incredible experience! The palace in Udaipur was beyond our expectations. Every detail was perfect."
              },
              {
                name: "Raj Patel",
                location: "Delhi",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
                rating: 5,
                review: "The service was impeccable. From booking to checkout, everything was seamless. Will definitely book again!"
              },
              {
                name: "Anita Singh",
                location: "Bangalore",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
                rating: 5,
                review: "The beachfront villa in Goa was a dream come true. Perfect for our family vacation. Highly recommended!"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-700 mb-8 leading-relaxed font-light text-sm">"{testimonial.review}"</p>
                
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover mr-3"
                  />
                  <div>
                    <div className="font-medium text-gray-900 text-sm">{testimonial.name}</div>
                    <div className="text-gray-600 text-xs font-light">{testimonial.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Destinations */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-light text-gray-900 mb-4">Discover India's Finest Destinations</h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
              From royal palaces to serene beaches, explore India's most exclusive locations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&q=80",
                title: "Rajasthan",
                subtitle: "Royal Heritage",
                properties: "150+ Properties"
              },
              {
                image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
                title: "Goa",
                subtitle: "Beach Paradise",
                properties: "80+ Properties"
              },
              {
                image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&q=80",
                title: "Kerala",
                subtitle: "Backwater Bliss",
                properties: "65+ Properties"
              },
              {
                image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=400&q=80",
                title: "Himachal",
                subtitle: "Mountain Retreats",
                properties: "45+ Properties"
              }
            ].map((destination, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="aspect-[3/4] relative overflow-hidden rounded-2xl mb-4">
                  <img
                    src={destination.image}
                    alt={destination.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-xl font-light mb-1">{destination.title}</h3>
                    <p className="text-white/90 mb-2 text-sm font-light">{destination.subtitle}</p>
                    <p className="text-xs text-white/80 font-medium tracking-wide">{destination.properties}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-gray-600 font-light text-sm tracking-wide">Trusted by luxury travelers worldwide</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            <div className="flex items-center justify-center">
              <div className="text-2xl font-bold text-gray-400">Forbes Travel</div>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-2xl font-bold text-gray-400">Conde Nast</div>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-2xl font-bold text-gray-400">Travel + Leisure</div>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-2xl font-bold text-gray-400">Luxury Travel</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-base font-medium text-gray-900 mb-2">Verified Properties</h3>
              <p className="text-gray-600 text-sm font-light leading-relaxed">Every property is personally inspected and verified for luxury standards</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-base font-medium text-gray-900 mb-2">24/7 Concierge</h3>
              <p className="text-gray-600 text-sm font-light leading-relaxed">Dedicated luxury concierge service available around the clock</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-base font-medium text-gray-900 mb-2">Exclusive Access</h3>
              <p className="text-gray-600 text-sm font-light leading-relaxed">Access to private estates and properties not available elsewhere</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-light text-white mb-6">
            Ready to Experience Luxury?
          </h2>
          <p className="text-base text-gray-300 mb-12 font-light leading-relaxed">
            Join thousands of travelers who trust Rambhoomi for their luxury stays
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-white text-gray-900 px-8 py-4 rounded-full text-base font-medium hover:bg-gray-100 transition-colors">
              Start Exploring
            </button>
            <button className="border-2 border-gray-300 text-white px-8 py-4 rounded-full text-base font-medium hover:bg-white hover:text-gray-900 transition-colors">
              List Your Property
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-6">
              <div className="flex items-center">
                <Building className="h-8 w-8 text-white" />
                <span className="ml-3 text-2xl font-light tracking-tight">Rambhoomi</span>
              </div>
              <p className="text-gray-400 leading-relaxed font-light text-sm">
                India's premier platform for luxury property rentals. 
                Experience extraordinary stays in extraordinary places.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <Globe className="h-5 w-5" />
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <Mail className="h-5 w-5" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-base font-medium mb-6 tracking-wide">Destinations</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Rajasthan</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Goa</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Kerala</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Himachal Pradesh</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-base font-medium mb-6 tracking-wide">Company</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-base font-medium mb-6 tracking-wide">Support</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Safety</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm font-light">
              © 2024 Rambhoomi. All rights reserved.
            </p>
            <Link
              href="/auth/login"
              className="mt-4 md:mt-0 bg-white text-gray-900 px-6 py-2 rounded-full hover:bg-gray-100 transition-colors font-medium text-sm"
            >
              Admin Dashboard
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}