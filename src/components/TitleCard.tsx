import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function TitleCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const boxRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {

      gsap.set(titleRef.current,  { opacity: 1})
      gsap.set(boxRef.current, {x: 0, rotation: 0, backgroundColor: 'red'})

      gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top -20%',
          end: 'bottom top',
          scrub: 1,
          pin: false
        },
      }).to(
        boxRef.current,
        {x: 1000, rotation: 360, ease: 'none', backgroundColor: 'green'},
  
      ).to(
        titleRef.current,
        { opacity: 0, ease: 'out' }
      )
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center h-screen w-screen"
    >
      <div ref={boxRef} className="test-box w-4 h-4 bg-red-500"></div>
      <h2
        ref={titleRef}
        className="text-2xl font-bold"
      >
        seattle city employees: demographics
      </h2>
    </div>
  );
}