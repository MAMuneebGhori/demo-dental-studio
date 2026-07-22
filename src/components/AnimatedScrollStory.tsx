"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function AnimatedScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 3 high-quality dental clinic interior images from Unsplash
  const img1 = "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80"; // Bright clinic room
  const img2 = "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80"; // Dental interior
  const img3 = "https://images.unsplash.com/photo-1598128558393-70ff21433be0?w=1600&q=80"; // The one that expands (curtain/room texture)

  // Phase 1: 0 to 0.25 -> Horizontal scrolling of 3 images from left to right
  const x1 = useTransform(scrollYProgress, [0, 0.2], ["-100vw", "100vw"]);
  const x2 = useTransform(scrollYProgress, [0.05, 0.25], ["-100vw", "100vw"]);
  const x3 = useTransform(scrollYProgress, [0.1, 0.3], ["-100vw", "0vw"]); // img3 stops at center (0vw)

  // Vertical offsets to make the horizontal scroll look staggered and dynamic
  const y1 = useTransform(scrollYProgress, [0, 0.2], ["10vh", "-10vh"]);
  const y2 = useTransform(scrollYProgress, [0.05, 0.25], ["-10vh", "10vh"]);

  // Phase 2: 0.3 to 0.45 -> img3 expands to full screen
  const width3 = useTransform(scrollYProgress, [0.3, 0.45], ["30vw", "100vw"]);
  const height3 = useTransform(scrollYProgress, [0.3, 0.45], ["45vh", "100vh"]);
  const borderRadius3 = useTransform(scrollYProgress, [0.3, 0.45], ["24px", "0px"]);

  // Dark overlay that fades in as it goes full screen to make text readable
  const overlayOpacity = useTransform(scrollYProgress, [0.4, 0.45], [0, 0.6]);

  // Phase 3: 0.45 to 0.65 -> Typing text (clipPath wipe from left to right)
  const textOpacity = useTransform(scrollYProgress, [0.44, 0.45], [0, 1]);
  const clipRight = useTransform(scrollYProgress, [0.45, 0.65], [100, 0]);
  const textClipPath = useTransform(clipRight, (val) => `inset(0 ${val}% 0 0)`);
  
  // Phase 4: 0.7 to 0.9 -> Final local pictures come in
  // Doctor with microscope (operation.jpg) on right, female doc (female-dr.jpg) on bottom left
  const finalRightX = useTransform(scrollYProgress, [0.7, 0.85], ["50vw", "0vw"]);
  const finalRightOpacity = useTransform(scrollYProgress, [0.7, 0.85], [0, 1]);

  const finalLeftX = useTransform(scrollYProgress, [0.7, 0.85], ["-50vw", "0vw"]);
  const finalLeftOpacity = useTransform(scrollYProgress, [0.7, 0.85], [0, 1]);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-[#E5EDDE]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Background base color */}
        <div className="absolute inset-0 bg-[#E5EDDE] z-0" />

        {/* Phase 1 Images */}
        <motion.div 
          style={{ x: x1, y: y1, width: "30vw", height: "45vh" }}
          className="absolute top-1/2 mt-[-22.5vh] rounded-3xl overflow-hidden shadow-2xl z-10"
        >
          <img src={img1} className="w-full h-full object-cover" alt="Interior 1" />
        </motion.div>

        <motion.div 
          style={{ x: x2, y: y2, width: "30vw", height: "45vh" }}
          className="absolute top-1/2 mt-[-22.5vh] rounded-3xl overflow-hidden shadow-2xl z-20"
        >
          <img src={img2} className="w-full h-full object-cover" alt="Interior 2" />
        </motion.div>

        {/* Image 3 (Becomes full background) */}
        <motion.div 
          style={{ 
            x: x3, 
            width: width3, 
            height: height3, 
            borderRadius: borderRadius3,
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden shadow-2xl z-30 flex flex-col items-center justify-center"
        >
          <img src={img3} className="absolute inset-0 w-full h-full object-cover" alt="Interior 3" />
          
          <motion.div 
             style={{ opacity: overlayOpacity }}
             className="absolute inset-0 bg-[#0D241C]"
          />

          {/* Phase 3: Typing Text */}
          <motion.div 
            className="relative z-40 max-w-5xl px-8 w-full flex justify-center"
            style={{ opacity: textOpacity }}
          >
            <motion.h2 
              style={{ clipPath: textClipPath }}
              className="text-center text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#E5EDDE] drop-shadow-2xl"
            >
              So that you feel good every step of the way.
            </motion.h2>
          </motion.div>

          {/* Phase 4: Final Mosaic Images (on top of the full screen background) */}
          <motion.div
            style={{ x: finalRightX, opacity: finalRightOpacity }}
            className="absolute right-0 bottom-0 w-[45vw] h-[65vh] z-50 overflow-hidden shadow-2xl"
          >
            <img src="/operation.jpg" className="w-full h-full object-cover" alt="Doctor with microscope" />
          </motion.div>

          <motion.div
            style={{ x: finalLeftX, opacity: finalLeftOpacity }}
            className="absolute left-0 bottom-0 w-[35vw] h-[45vh] z-50 overflow-hidden shadow-2xl"
          >
            <img src="/female-dr.jpg" className="w-full h-full object-cover" alt="Female doctor" />
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
