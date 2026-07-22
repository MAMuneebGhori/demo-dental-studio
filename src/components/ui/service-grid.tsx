"use client";
// components/ui/service-grid.tsx

import * as React from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

/**
 * Interface for a single service item.
 * @property {string} name - The name of the service.
 * @property {string} imageUrl - The URL for the service's representative image.
 * @property {string} href - The URL to navigate to when the service is clicked.
 */
export interface Service {
  name: string;
  imageUrl?: string;
  href?: string;
  id?: string;
}

/**
 * Props for the ServiceGrid component.
 * @property {string} title - The main heading for the grid.
 * @property {string} [subtitle] - An optional subheading displayed below the title.
 * @property {Service[]} services - An array of service objects to display in the grid.
 * @property {string} [className] - Optional additional CSS classes for the container.
 */
export interface ServiceGridProps {
  title?: string;
  subtitle?: string;
  services: Service[];
  className?: string;
  onServiceClick?: (service: Service) => void;
}

const ServiceGrid = React.forwardRef<HTMLDivElement, ServiceGridProps>(
  ({ title, subtitle, services, className, onServiceClick, ...props }, ref) => {
    // Animation variants for the container to orchestrate children animations
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1, // Stagger the animation of children by 0.1s
        },
      },
    };

    // Animation variants for each grid item
    const itemVariants: Variants = {
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 10,
        },
      },
    };

    return (
      <section
        ref={ref}
        className={cn("w-full py-12 md:py-16 lg:py-20", className)}
        {...props}
      >
        <div className="container mx-auto px-4 md:px-6 max-w-[1400px]">
          {/* Header Section */}
          {(title || subtitle) && (
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 md:mb-12 text-[#E5EDDE]">
              <div className="space-y-2">
                {title && (
                  <h2 className="text-3xl font-light tracking-tight sm:text-4xl md:text-5xl">
                    {title}
                  </h2>
                )}
                {subtitle && (
                  <p className="max-w-[700px] opacity-80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-light">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Animated Grid Section */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="group flex flex-col items-start justify-center gap-4 p-8 border border-white/10 rounded-3xl cursor-pointer hover:bg-white/5 transition-colors"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }} // Hover animation
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                onClick={() => onServiceClick?.(service)}
              >
                {service.href ? (
                  <Link href={service.href} className="flex flex-col items-start justify-center gap-4 w-full h-full">
                    <div className="flex items-center justify-between w-full">
                      <span className="text-sm font-light tracking-widest text-[#E5EDDE]/50">
                        {service.id || `0${index + 6}`}
                      </span>
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 text-[#E5EDDE] group-hover:bg-[#E5EDDE] group-hover:text-[#0D241C] transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 group-hover:rotate-45 transition-transform duration-300">
                          <line x1="7" y1="17" x2="17" y2="7"></line>
                          <polyline points="7 7 17 7 17 17"></polyline>
                        </svg>
                      </div>
                    </div>
                    <span className="text-2xl font-light text-[#E5EDDE] transition-colors duration-300">
                      {service.name}
                    </span>
                  </Link>
                ) : (
                  <>
                    <div className="flex items-center justify-between w-full">
                      <span className="text-sm font-light tracking-widest text-[#E5EDDE]/50">
                        {service.id || `0${index + 6}`}
                      </span>
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 text-[#E5EDDE] group-hover:bg-[#E5EDDE] group-hover:text-[#0D241C] transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 group-hover:rotate-45 transition-transform duration-300">
                          <line x1="7" y1="17" x2="17" y2="7"></line>
                          <polyline points="7 7 17 7 17 17"></polyline>
                        </svg>
                      </div>
                    </div>
                    <span className="text-2xl font-light text-[#E5EDDE] transition-colors duration-300">
                      {service.name}
                    </span>
                  </>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    );
  }
);

ServiceGrid.displayName = "ServiceGrid";

export { ServiceGrid };
