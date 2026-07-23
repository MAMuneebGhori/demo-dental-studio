"use client";

import { useScroll, useTransform, motion, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

interface Image {
  src: string;
  alt?: string;
}

interface ZoomParallaxProps {
  /** Array of images to be displayed in the parallax effect max 7 images */
  images: Image[];
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
}

export function ZoomParallax({ images, title, subtitle }: ZoomParallaxProps) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const [showSubtitle, setShowSubtitle] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.7) {
      setShowSubtitle(true);
    } else {
      setShowSubtitle(false);
    }
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

  const positions = [
    "h-[40vh] w-[75vw] md:h-[25vh] md:w-[25vw]", // Center
    "!-top-[30vh] !left-[5vw] !h-[25vh] !w-[50vw] md:!-top-[30vh] md:!left-[5vw] md:!h-[30vh] md:!w-[35vw]", // 1
    "!-top-[15vh] !-left-[30vw] !h-[35vh] !w-[45vw] md:!-top-[10vh] md:!-left-[25vw] md:!h-[45vh] md:!w-[20vw]", // 2
    "!left-[35vw] !h-[25vh] !w-[45vw] md:!left-[27.5vw] md:!h-[25vh] md:!w-[25vw]", // 3
    "!top-[35vh] !left-[10vw] !h-[25vh] !w-[50vw] md:!top-[27.5vh] md:!left-[5vw] md:!h-[25vh] md:!w-[20vw]", // 4
    "!top-[35vh] !-left-[30vw] !h-[25vh] !w-[55vw] md:!top-[27.5vh] md:!-left-[22.5vw] md:!h-[25vh] md:!w-[30vw]", // 5
    "!top-[25vh] !left-[35vw] !h-[20vh] !w-[35vw] md:!top-[22.5vh] md:!left-[25vw] md:!h-[15vh] md:!w-[15vw]" // 6
  ];

  return (
    <div ref={container} className="relative h-[400vh] sm:h-[300vh] bg-[#E5EDDE]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {images.map(({ src, alt }, index) => {
          const scale = scales[index % scales.length];
          const posClass = positions[index % positions.length];

          return (
            <motion.div
              key={index}
              style={{ scale }}
              className="absolute top-0 flex h-full w-full items-center justify-center"
            >
              <div className={`relative ${posClass}`}>
                <img
                  src={src || "/placeholder.svg"}
                  alt={alt || `Parallax image ${index + 1}`}
                  className="h-full w-full object-cover rounded-xl shadow-2xl"
                />
              </div>
            </motion.div>
          );
        })}
        {title && (
          <div className="absolute top-0 flex w-full pt-16 md:pt-24 justify-center pointer-events-none z-50">
            {title}
          </div>
        )}
        <AnimatePresence>
          {showSubtitle && subtitle && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.8 }}
              className="absolute bottom-8 md:bottom-12 flex w-full justify-center pointer-events-none z-50"
            >
              {subtitle}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
