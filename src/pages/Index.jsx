import { motion } from "framer-motion";
import { Sparkles, Instagram, Facebook, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-secondary">
      <header className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-shadow"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            NailsByNduksy
          </motion.h1>
          <nav>
            <ul className="flex space-x-4">
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
              className="text-5xl md:text-7xl font-bold mb-6 text-primary text-shadow"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              Elevate Your Style
            </motion.h2>
            <p className="text-xl md:text-2xl mb-8 text-foreground">Discover the art of beautiful nails</p>
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Book Now <Sparkles className="ml-2" />
            </Button>
          </div>
        </section>

        <section id="gallery" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center text-primary">Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <motion.div 
                  key={i}
                  className="rounded-lg overflow-hidden shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img src={`https://source.unsplash.com/random/400x400?nails&${i}`} alt="Nail design" className="w-full h-64 object-cover" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="py-20 bg-accent">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center text-primary">About Nduksy</h2>
            <p className="text-xl text-center max-w-2xl mx-auto">
              Nduksy is a passionate nail artist with years of experience in creating stunning, custom nail designs. 
              Her attention to detail and creative flair make every set of nails a unique work of art.
            </p>
          </div>
        </section>

        <section id="contact" className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-10 text-primary">Get in Touch</h2>
            <div className="flex justify-center space-x-6">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Instagram size={32} className="text-primary hover:text-accent transition-colors" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <Facebook size={32} className="text-primary hover:text-accent transition-colors" />
              </a>
              <a href="mailto:info@nailsbynduksy.com">
                <Mail size={32} className="text-primary hover:text-accent transition-colors" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 NailsByNduksy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
