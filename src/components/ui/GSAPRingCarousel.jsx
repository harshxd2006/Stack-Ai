import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const GSAPRingCarousel = ({ items, onItemClick }) => {
  const ringRef = useRef(null);
  const containerRef = useRef(null);

  // Duplicate items if there are too few to make a good circle (need at least ~6)
  let displayItems = [...items];
  if (displayItems.length > 0 && displayItems.length < 6) {
    while (displayItems.length < 8) {
      displayItems = [...displayItems, ...items];
    }
  }
  
  // Cap at 15 items for performance and visual clarity
  if (displayItems.length > 15) {
    displayItems = displayItems.slice(0, 15);
  }

  const numItems = displayItems.length;
  const angle = 360 / Math.max(numItems, 1);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const radius = isMobile ? 250 : 500;
  const cardWidth = isMobile ? 200 : 300;
  const cardHeight = isMobile ? 280 : 400;
  const yOffset = isMobile ? -30 : -50;

  useEffect(() => {
    if (numItems === 0) return;

    let xPos = 0;
    const ring = ringRef.current;
    const imgs = ring.querySelectorAll('.ring-item');

    const getBgPos = (i) => {
      return (100 - gsap.utils.wrap(0, 360, gsap.getProperty(ring, 'rotationY') - 180 - i * angle) / 360 * 500) + 'px 0px';
    };

    const tl = gsap.timeline()
      .set(ring, { rotationY: 180, cursor: 'grab' }) 
      .set(imgs, { 
        rotateY: (i) => i * -angle,
        transformOrigin: `50% 50% ${radius}px`,
        z: -radius,
        y: yOffset,
        backgroundImage: (i) => {
          const item = displayItems[i];
          return item.image ? `url(${item.image})` : `url(https://picsum.photos/id/${(i * 10) + 32}/600/400/)`;
        },
        backgroundPosition: (i) => getBgPos(i),
        backfaceVisibility: 'hidden'
      })    
      .fromTo(imgs, 
        { y: 100, opacity: 0 },
        {
          duration: 1.5,
          y: yOffset,
          opacity: 1,
          stagger: 0.1,
          ease: 'expo'
        }
      )
      .add(() => {
        imgs.forEach(img => {
          img.addEventListener('mouseenter', (e) => {
            gsap.to(imgs, { opacity: (i, t) => (t === e.currentTarget) ? 1 : 0.5, ease: 'power3' });
          });
          img.addEventListener('mouseleave', () => {
            gsap.to(imgs, { opacity: 1, ease: 'power2.inOut' });
          });
        });
      }, '-=0.5');

    const dragStart = (e) => {
      if (e.touches) e.clientX = e.touches[0].clientX;
      xPos = Math.round(e.clientX);
      gsap.set(ring, { cursor: 'grabbing' });
      window.addEventListener('mousemove', drag);
      window.addEventListener('touchmove', drag);
    };

    const drag = (e) => {
      if (e.touches) e.clientX = e.touches[0].clientX;    
      gsap.to(ring, {
        rotationY: '-=' + ((Math.round(e.clientX) - xPos) % 360),
        onUpdate: () => { gsap.set(imgs, { backgroundPosition: (i) => getBgPos(i) }); }
      });
      xPos = Math.round(e.clientX);
    };

    const dragEnd = () => {
      window.removeEventListener('mousemove', drag);
      window.removeEventListener('touchmove', drag);
      gsap.set(ring, { cursor: 'grab' });
    };

    const container = containerRef.current;
    container.addEventListener('mousedown', dragStart);
    container.addEventListener('touchstart', dragStart);
    window.addEventListener('mouseup', dragEnd);
    window.addEventListener('touchend', dragEnd);

    return () => {
      container.removeEventListener('mousedown', dragStart);
      container.removeEventListener('touchstart', dragStart);
      window.removeEventListener('mouseup', dragEnd);
      window.removeEventListener('touchend', dragEnd);
      window.removeEventListener('mousemove', drag);
      window.removeEventListener('touchmove', drag);
      tl.kill();
    };
  }, [numItems, angle, displayItems, radius, yOffset]);

  if (numItems === 0) return null;

  return (
    <div 
      ref={containerRef} 
      className="w-full h-[400px] md:h-[600px] flex items-center justify-center relative perspective-[2000px] select-none overflow-visible"
      style={{ perspective: '2000px' }}
    >
      <div 
        ref={ringRef} 
        className="ring relative preserve-3d"
        style={{ transformStyle: 'preserve-3d', width: cardWidth, height: cardHeight }}
      >
        {displayItems.map((item, i) => (
          <div 
            key={`${item.id}-${i}`}
            onClick={() => onItemClick && onItemClick(item)}
            className="ring-item absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat rounded-2xl flex flex-col items-center justify-end p-4 md:p-6 border border-white/20 shadow-2xl overflow-hidden cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none"></div>
            <div className="relative z-10 text-center pointer-events-none">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mb-2 md:mb-3 mx-auto border border-white/20 shadow-lg">
                <span className="text-lg md:text-xl font-bold text-white">{item.title.charAt(0)}</span>
              </div>
              <h3 className="font-bold text-white text-lg md:text-xl leading-tight drop-shadow-md">{item.title}</h3>
              {item.subtitle && (
                <p className="text-white/70 text-xs md:text-sm mt-1">{item.subtitle}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GSAPRingCarousel;
