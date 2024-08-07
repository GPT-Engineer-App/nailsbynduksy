import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Instagram, Facebook, Mail, TikTok, Star, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from 'axios';

const fetchContent = async () => {
  // This is a mock function. In a real scenario, you'd fetch data from your Strapi CMS.
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        hero: {
          title: "Elevate Your Style",
          subtitle: "Discover the art of beautiful nails",
        },
        about: {
          title: "About Nduksy",
          content: "Nduksy is a passionate nail artist with over a decade of experience in creating stunning, custom nail designs. Her journey began in a small salon and has led her to become one of the most sought-after nail artists in the city. Nduksy's philosophy is simple: every client deserves to feel confident and beautiful, starting from their fingertips. Her attention to detail, creative flair, and commitment to using only the highest quality products make every set of nails a unique work of art.",
        },
        services: [
          { name: "Manicure", price: "$30", description: "Classic manicure with your choice of polish" },
          { name: "Pedicure", price: "$40", description: "Relaxing pedicure with exfoliation and massage" },
          { name: "Gel Nails", price: "$50", description: "Long-lasting gel nails in any color or design" },
          { name: "Nail Art", price: "From $10", description: "Custom nail art designs to express your style" },
        ],
        gallery: [
          { category: "Manicure", images: [1, 2, 3] },
          { category: "Pedicure", images: [4, 5, 6] },
          { category: "Gel Nails", images: [7, 8, 9] },
          { category: "Nail Art", images: [10, 11, 12] },
        ],
        reviews: [
          { name: "Sarah L.", rating: 5, comment: "Nduksy is amazing! My nails have never looked better." },
          { name: "Emily R.", rating: 5, comment: "I love coming here. The attention to detail is unmatched." },
          { name: "Jessica T.", rating: 4, comment: "Great service and beautiful results every time." },
        ],
        faq: [
          { question: "How long does a manicure last?", answer: "A regular manicure typically lasts 5-7 days, while gel manicures can last up to 2-3 weeks." },
          { question: "Do you use cruelty-free products?", answer: "Yes, we only use cruelty-free and vegan nail products in our salon." },
          { question: "How often should I get a pedicure?", answer: "We recommend getting a pedicure every 4-6 weeks to maintain healthy feet and nails." },
        ],
      });
    }, 1000);
  });
};

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("Manicure");
  const [expandedFaq, setExpandedFaq] = useState(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ['content'],
    queryFn: fetchContent,
  });

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen">Error: {error.message}</div>;

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground py-4 sticky top-0 z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <motion.h1 
            className="text-3xl md:text-4xl font-bold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            NailsByNduksy
          </motion.h1>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#services" className="hover:text-accent transition-colors">Services</a></li>
              <li><a href="#gallery" className="hover:text-accent transition-colors">Gallery</a></li>
              <li><a href="#about" className="hover:text-accent transition-colors">About</a></li>
              <li><a href="#contact" className="hover:text-accent transition-colors">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <section className="py-20 bg-[url('https://images.unsplash.com/photo-1604654894610-df63bc536371')] bg-cover bg-center">
          <div className="container mx-auto px-4 text-center">
            <motion.h2 
              className="text-5xl md:text-7xl font-bold mb-6 text-primary"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {data.hero.title}
            </motion.h2>
            <p className="text-xl md:text-2xl mb-8 text-foreground">{data.hero.subtitle}</p>
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Book Now <Sparkles className="ml-2" />
            </Button>
          </div>
        </section>

        <section id="services" className="py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center text-primary">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {data.services.map((service, index) => (
                <motion.div 
                  key={index}
                  className="bg-card p-6 rounded-lg shadow-lg"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <h3 className="text-2xl font-bold mb-2">{service.name}</h3>
                  <p className="text-xl font-bold text-primary mb-2">{service.price}</p>
                  <p>{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="gallery" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center text-primary">Gallery</h2>
            <div className="flex justify-center mb-8">
              {data.gallery.map((category) => (
                <Button
                  key={category.category}
                  onClick={() => setActiveCategory(category.category)}
                  variant={activeCategory === category.category ? "default" : "outline"}
                  className="mx-2"
                >
                  {category.category}
                </Button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <AnimatePresence mode="wait">
                {data.gallery.find(cat => cat.category === activeCategory).images.map((i) => (
                  <motion.div 
                    key={i}
                    className="rounded-lg overflow-hidden shadow-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <img src={`https://source.unsplash.com/random/400x400?nails&${i}`} alt="Nail design" className="w-full h-64 object-cover" loading="lazy" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        <section id="about" className="py-20 bg-accent">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center text-primary">{data.about.title}</h2>
            <p className="text-xl text-center max-w-3xl mx-auto">
              {data.about.content}
            </p>
          </div>
        </section>

        <section id="reviews" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center text-primary">Client Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {data.reviews.map((review, index) => (
                <motion.div 
                  key={index}
                  className="bg-card p-6 rounded-lg shadow-lg"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex items-center mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="mb-4">{review.comment}</p>
                  <p className="font-bold">{review.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center text-primary">Frequently Asked Questions</h2>
            {data.faq.map((item, index) => (
              <div key={index} className="mb-4">
                <button
                  className="flex justify-between items-center w-full text-left p-4 bg-card rounded-lg shadow-lg"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <span className="font-bold">{item.question}</span>
                  {expandedFaq === index ? <ChevronUp /> : <ChevronDown />}
                </button>
                {expandedFaq === index && (
                  <div className="p-4 bg-background mt-2 rounded-lg">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-10 text-primary">Get in Touch</h2>
            <div className="flex justify-center space-x-6 mb-8">
              <a href="https://instagram.com/nailsbynduksy" target="_blank" rel="noopener noreferrer">
                <Instagram size={32} className="text-primary hover:text-accent transition-colors" />
              </a>
              <a href="https://facebook.com/nailsbynduksy" target="_blank" rel="noopener noreferrer">
                <Facebook size={32} className="text-primary hover:text-accent transition-colors" />
              </a>
              <a href="https://tiktok.com/@nailsbynduksy" target="_blank" rel="noopener noreferrer">
                <TikTok size={32} className="text-primary hover:text-accent transition-colors" />
              </a>
              <a href="mailto:info@nailsbynduksy.com">
                <Mail size={32} className="text-primary hover:text-accent transition-colors" />
              </a>
            </div>
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Book an Appointment
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4">&copy; 2024 NailsByNduksy. All rights reserved.</p>
          <nav>
            <ul className="flex justify-center space-x-4">
              <li><a href="#" className="hover:text-accent transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Terms of Service</a></li>
              <li><a href="#sitemap" className="hover:text-accent transition-colors">Sitemap</a></li>
            </ul>
          </nav>
        </div>
      </footer>

      {/* Sitemap */}
      <section id="sitemap" className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center text-primary">Sitemap</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Main Pages</h3>
              <ul>
                <li><a href="#" className="hover:text-primary transition-colors">Home</a></li>
                <li><a href="#services" className="hover:text-primary transition-colors">Services</a></li>
                <li><a href="#gallery" className="hover:text-primary transition-colors">Gallery</a></li>
                <li><a href="#about" className="hover:text-primary transition-colors">About</a></li>
                <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Services</h3>
              <ul>
                <li><a href="#" className="hover:text-primary transition-colors">Manicure</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Pedicure</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Gel Nails</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Nail Art</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Legal</h3>
              <ul>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Social Media</h3>
              <ul>
                <li><a href="https://instagram.com/nailsbynduksy" className="hover:text-primary transition-colors">Instagram</a></li>
                <li><a href="https://facebook.com/nailsbynduksy" className="hover:text-primary transition-colors">Facebook</a></li>
                <li><a href="https://tiktok.com/@nailsbynduksy" className="hover:text-primary transition-colors">TikTok</a></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
