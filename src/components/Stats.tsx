import { useEffect, useState, useRef } from 'react';

function Counter({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (nodeRef.current) {
      observer.observe(nodeRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Ease out quad
      const easeOut = progress * (2 - progress);
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [hasStarted, end, duration]);

  return <span ref={nodeRef}>{count.toLocaleString()}</span>;
}

export default function Stats() {
  const stats = [
    { id: 1, name: 'Voyageurs', value: 250000, suffix: '+' },
    { id: 2, name: 'Destinations', value: 2, suffix: '' },
    { id: 3, name: 'Années d\'expérience', value: 10, suffix: '+' },
    { id: 4, name: 'Bus en service', value: 45, suffix: '' },
  ];

  return (
    <div className="bg-white py-20 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center">
          {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col items-center">
              <div className="text-4xl md:text-5xl font-extrabold text-navy font-sans mb-2 flex items-baseline">
                <Counter end={stat.value} />
                <span className="text-gold ml-1">{stat.suffix}</span>
              </div>
              <div className="text-sm md:text-base font-semibold text-gray-500 uppercase tracking-wider">
                {stat.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
