import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function TitleCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const numBoxes = 8;

  useGSAP(
    () => {
      // Target all boxes with the stagger-box class
      const boxes = gsap.utils.toArray(".stagger-box");

      // Set initial state
      gsap.set(boxes, { x: 0, rotation: 0, backgroundColor: "red" });

      // Create looping animation
      gsap
        .timeline({
          repeat: -1, // Infinite repeat
          ease: "in.out",
          yoyo: true,
        })
        .fromTo(
          boxes,
          {
            x: 0,
            rotation: 0,
            backgroundColor: "red",
            duration: 0.5,
            stagger: 0.05,
          },
          {
            x: 440,
            y: 0,
            rotation: 180,
            backgroundColor: "blue",
            duration: 0.5,
            stagger: 0.05,
          }
        );

      gsap
        .timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 30%",
            end: "bottom top",
            scrub: 1,
            pin: false,
          },
        })
        .to(boxes, {
          opacity: 0,
          ease: "out",
        })
        .to(titleRef.current, { opacity: 0, ease: "out" });
    },
    { scope: containerRef }
  );

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <div ref={containerRef} className="relative">
        <div className="w-96">
          {Array.from({
            length: numBoxes,
          }).map((_, i) => (
            <div
              key={i}
              className={`stagger-box w-2 h-2 rounded-xs bg-red-500`}
            ></div>
          ))}
        </div>
        <h2
          ref={titleRef}
          className="text-2xl font-bold z-10 whitespace-nowrap"
        >
          seattle city employees: demographics
        </h2>
      </div>
    </div>
  );
}
