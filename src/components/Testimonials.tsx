import { Star } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: 'Marie Nguesso',
      route: 'Pointe-Noire → Brazzaville',
      content: 'Un voyage exceptionnel ! Le bus était d\'une propreté impeccable, la clim marchait parfaitement, et nous sommes arrivés à l\'heure. Le personnel est aux petits soins.',
      avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1bf98c?q=80&w=200&auto=format&fit=crop',
    },
    {
      id: 2,
      name: 'Jean-Paul Itoua',
      route: 'Brazzaville → Pointe-Noire',
      content: 'Je voyage avec Nzoko chaque semaine pour le travail. La constance dans la qualité du service est impressionnante. Toujours ponctuels et le wifi aide beaucoup.',
      avatar: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=200&auto=format&fit=crop',
    },
    {
      id: 3,
      name: 'Sophie Makosso',
      route: 'Colis Brazza-PN',
      content: 'Leur service courrier est fantastique. Mes dossiers importants arrivent toujours le jour même en toute sécurité. Prix justes et service client au top.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="bg-gray-50 py-24 overflow-hidden relative">
      <div className="absolute inset-0 opacity-5 bg-[url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2000&auto=format&fit=crop')] bg-cover mix-blend-multiply pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-navy">
            Ce que disent nos voyageurs
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto rounded mt-4"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-700 ease-in-out" 
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100 flex flex-col items-center text-center">
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-6 w-6 text-gold fill-gold" />
                      ))}
                    </div>
                    <p className="text-lg md:text-xl text-gray-700 italic mb-8 relative">
                      <span className="text-gold text-4xl leading-none absolute -top-4 -left-6 opacity-30">"</span>
                      {testimonial.content}
                      <span className="text-gold text-4xl leading-none absolute -bottom-4 -right-4 opacity-30">"</span>
                    </p>
                    <div className="flex items-center gap-4">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-navy"
                      />
                      <div className="text-left">
                        <div className="font-bold text-navy text-lg">{testimonial.name}</div>
                        <div className="text-gold font-medium text-sm">{testimonial.route}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex ? 'bg-gold w-8' : 'bg-gray-300 hover:bg-navy/50'
                }`}
                aria-label={`Voir le témoignage ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
