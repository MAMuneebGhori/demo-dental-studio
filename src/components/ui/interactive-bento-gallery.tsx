import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link';
import { X } from 'lucide-react';
import { BeforeAfterSlider } from '@/components/ui/before-after-slider';

// MediaItemType defines the structure of a media item
export interface MediaItemType {
    id: number;
    type: string;
    title: string;
    desc: string;
    url: string;
    span: string;
    beforeUrl?: string;
    afterUrl?: string;
    longDescription?: string;
}
// MediaItem component renders either a video or image based on item.type
const MediaItem = ({ item, className, onClick }: { item: MediaItemType, className?: string, onClick?: () => void }) => {
    const videoRef = useRef<HTMLVideoElement>(null); // Reference for video element
    const [isInView, setIsInView] = useState(false); // To track if video is in the viewport

    // Intersection Observer to detect if video is in view and play/pause accordingly
    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                setIsInView(entry.isIntersecting); // Set isInView to true if the video is in view
            });
        }, options);

        if (videoRef.current) {
            observer.observe(videoRef.current); // Start observing the video element
        }

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current); // Clean up observer when component unmounts
            }
        };
    }, []);
    // Handle video play/pause based on whether the video is in view or not
    useEffect(() => {
        if (!videoRef.current) return;

        if (isInView) {
            videoRef.current.play().catch(console.warn);
        } else {
            videoRef.current.pause();
        }
    }, [isInView]);

    // Render either a video or image based on item.type

    if (item.type === 'video') {
        return (
            <div className={`${className} relative overflow-hidden bg-black/5`}>
                <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    onClick={onClick}
                    playsInline
                    muted
                    loop
                    autoPlay
                    preload="auto"
                    src={item.url}
                />
            </div>
        );
    }

    return (
        <img
            src={item.url} // Image source URL
            alt={item.title} // Alt text for the image
            className={`${className} object-cover cursor-pointer`} // Style the image
            onClick={onClick} // Trigger onClick when the image is clicked
            loading="lazy" // Lazy load the image for performance
            decoding="async" // Decode the image asynchronously
        />
    );
};



// GalleryModal component displays the selected media item in a modal

interface GalleryModalProps {
    selectedItem: MediaItemType | null;
    isOpen: boolean;
    onClose: () => void;
    setSelectedItem: (item: MediaItemType | null) => void;
    mediaItems: MediaItemType[];
    topPosition: number;
}
const GalleryModal = ({ selectedItem, isOpen, onClose, setSelectedItem, mediaItems, topPosition }: GalleryModalProps) => {
    const [mounted, setMounted] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!isOpen) return;

        const handleWindowScroll = () => {
            if (!modalRef.current) return;
            
            // Check if user scrolled to the bottom of the modal
            const currentBottom = window.scrollY + window.innerHeight;
            const targetBottom = topPosition + modalRef.current.scrollHeight - 50;
            
            if (currentBottom >= targetBottom && window.scrollY > topPosition + 50) {
                onClose();
            }
        };

        window.addEventListener('scroll', handleWindowScroll, { passive: true });
        
        // Ensure the body is tall enough to scroll to the bottom of the absolute modal
        const modalHeight = modalRef.current?.scrollHeight || 0;
        const requiredHeight = topPosition + modalHeight;
        const originalMinHeight = document.body.style.minHeight;
        
        if (document.documentElement.scrollHeight < requiredHeight) {
            document.body.style.minHeight = `${requiredHeight}px`;
        }

        return () => {
            window.removeEventListener('scroll', handleWindowScroll);
            document.body.style.minHeight = originalMinHeight;
        };
    }, [isOpen, topPosition, onClose]);

    if (!mounted) return null; // Only prevent SSR, always return the portal otherwise

    const modalContent = (
        <AnimatePresence>
            {isOpen && selectedItem && (
            <motion.div
                key="modal"
                ref={modalRef}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
                transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 25,
                    mass: 1.2
                }}
                className="gallery-modal-portal absolute left-0 w-full bg-[#0D241C] z-[9999] pb-32"
                style={{ top: topPosition, colorScheme: 'dark', minHeight: '100vh' }}
            >
                {/* Main Content */}
                <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-start p-4 pt-12 gap-10 min-h-screen">
                        <motion.div
                            key={selectedItem.id}
                            className="relative w-full aspect-[4/3] md:aspect-[16/9] 
                                     h-auto max-h-[60vh] md:max-h-[80vh] rounded-lg overflow-hidden shadow-2xl flex-shrink-0 bg-black/10"
                            initial={{ opacity: 0, scale: 0.97 }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                transition: {
                                    type: "spring",
                                    stiffness: 500,
                                    damping: 30,
                                    mass: 0.5
                                }
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.97,
                                transition: { duration: 0.15 }
                            }}
                        >
                            {selectedItem.beforeUrl && selectedItem.afterUrl ? (
                                <BeforeAfterSlider beforeImage={selectedItem.beforeUrl} afterImage={selectedItem.afterUrl} />
                            ) : (
                                <MediaItem item={selectedItem} className="w-full h-full object-contain md:object-cover" />
                            )}
                        </motion.div>
                        
                        <motion.div 
                            key={`desc-${selectedItem.id}`}
                            className="w-full text-[#E5EDDE] flex flex-col items-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
                            exit={{ opacity: 0, y: 20 }}
                        >
                            <div className="w-full max-w-2xl text-left text-sm md:text-base leading-relaxed mb-12">
                                {selectedItem.longDescription ? (
                                    selectedItem.longDescription.split('\n\n').map((paragraph, idx) => {
                                        const lines = paragraph.split('\n');
                                        
                                        // Check if this is the Treatment Methods block
                                        if (lines[0].startsWith('Treatment methods')) {
                                            return (
                                                <div key={idx} className="w-full mt-12 pt-8">
                                                    <div className="flex flex-row justify-between items-center gap-6 border-b border-[#E5EDDE]/10 pb-6">
                                                        <h4 className="font-semibold text-lg md:text-xl text-[#E5EDDE]">{lines[0].replace('Treatment methods: ', '')}</h4>
                                                        <div className="flex items-center gap-3">
                                                            <Link href="/#services" className="text-[13px] md:text-sm font-medium text-[#E5EDDE]/80 hover:text-white transition-colors border border-white/20 rounded-full px-4 py-2 whitespace-nowrap">
                                                                Learn More
                                                            </Link>
                                                            <Link href="/appointment" className="text-[13px] md:text-sm font-medium text-[#0D241C] bg-[#c9a973] hover:bg-[#b09363] transition-colors rounded-full px-4 py-2 whitespace-nowrap shadow-lg">
                                                                Book Now
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }

                                        if (lines.length > 1) {
                                            return (
                                                <div key={idx} className="mb-6">
                                                    <h4 className="font-semibold mb-2">{lines[0]}</h4>
                                                    <p className="opacity-90">{lines.slice(1).join('\n')}</p>
                                                </div>
                                            );
                                        }
                                        return <p key={idx} className="mb-6 opacity-90">{paragraph}</p>;
                                    })
                                ) : (
                                    <p className="mb-6 opacity-90">{selectedItem.desc}</p>
                                )}
                            </div>

                            {/* Book Appointment Button */}
                            <div className="flex justify-center w-full mb-16">
                                <Link href="/appointment">
                                    <button className="bg-[#E5EDDE] text-[#0D241C] px-8 py-3 md:px-10 md:py-4 rounded-full font-semibold text-sm md:text-base hover:bg-white hover:text-black transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer">
                                        Make an appointment
                                    </button>
                                </Link>
                            </div>

                            {/* Additional Gallery (Matching Screenshot 3) */}
                            <div className="w-full flex flex-col gap-4 mt-8">
                                <img src={selectedItem.url} alt="Gallery Large" className="w-full aspect-[21/9] object-cover rounded-xl shadow-lg" />
                                <div className="grid grid-cols-2 gap-4">
                                    <img src={selectedItem.beforeUrl || selectedItem.url} alt="Gallery Detail 1" className="w-full aspect-[4/3] object-cover rounded-xl shadow-md" />
                                    <img src={selectedItem.afterUrl || selectedItem.url} alt="Gallery Detail 2" className="w-full aspect-[4/3] object-cover rounded-xl shadow-md" />
                                </div>
                            </div>
                            
                            {/* Scroll trigger hint */}
                            <div className="w-full h-32 mt-12 flex flex-col items-center justify-center opacity-40">
                                <div className="w-[2px] h-12 bg-current opacity-50 mb-4 animate-pulse rounded-full" />
                                <p className="text-xs tracking-[0.2em] uppercase font-semibold">Scroll to return</p>
                            </div>
                        </motion.div>
                </div>

                {/* Close Button */}
                <motion.button
                    className="fixed top-6 right-6 w-12 h-12 rounded-full bg-[#E5EDDE] text-[#0D241C] flex items-center justify-center hover:bg-white z-[9999] shadow-lg"
                    onClick={onClose}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <X size={24} />
                </motion.button>
            </motion.div>
            )}
        </AnimatePresence>
    );

    return createPortal(modalContent, document.body);
};



interface InteractiveBentoGalleryProps {
    mediaItems: MediaItemType[]
    title: string
    description: string

}

const InteractiveBentoGallery: React.FC<InteractiveBentoGalleryProps> = ({ mediaItems, title, description }) => {
    const [selectedItem, setSelectedItem] = useState<MediaItemType | null>(null);
    const [activeItem, setActiveItem] = useState<MediaItemType | null>(null);
    const [items, setItems] = useState(mediaItems);
    const [isDragging, setIsDragging] = useState(false);
    const galleryRef = useRef<HTMLDivElement>(null);

    // Save scroll position to place the absolute modal exactly over the viewport
    const [savedScroll, setSavedScroll] = useState(0);

    const handleOpen = (item: MediaItemType) => {
        setSavedScroll(window.scrollY);
        setSelectedItem(item);
        setActiveItem(item);
    };

    const handleClose = () => {
        setSelectedItem(null);
        
        const grid = document.getElementById('portfolio');
        if (grid) {
            const targetY = grid.getBoundingClientRect().top + window.scrollY;
            
            // Holy grail instant jump: override CSS with !important and force reflow
            const html = document.documentElement;
            const body = document.body;
            html.style.setProperty('scroll-behavior', 'auto', 'important');
            body.style.setProperty('scroll-behavior', 'auto', 'important');
            void html.offsetHeight; // force browser to apply CSS instantly
            
            window.scrollTo(0, targetY);
            
            setTimeout(() => {
                html.style.removeProperty('scroll-behavior');
                body.style.removeProperty('scroll-behavior');
            }, 50);
        } else {
            window.scrollTo(0, savedScroll);
        }
    };

    return (
        <div className="w-full" ref={galleryRef}>
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <div className="mb-8 text-center">
                    <motion.h1
                        className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent 
                                 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900
                                 dark:from-white dark:via-gray-200 dark:to-white"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {title}
                    </motion.h1>
                    <motion.p
                        className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        {description}
                    </motion.p>
                </div>
            
                <motion.div
                            id="gallery-grid"
                            className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 auto-rows-[250px]"
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: { staggerChildren: 0.1 }
                                }
                            }}
                        >
                            {items.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    layoutId={`media-${item.id}`}
                                    className={`relative overflow-hidden rounded-xl cursor-move ${item.span} group`}
                                    onClick={() => !isDragging && handleOpen(item)}
                                    variants={{
                                        hidden: { y: 50, scale: 0.9, opacity: 0 },
                                        visible: {
                                            y: 0,
                                            scale: 1,
                                            opacity: 1,
                                            transition: {
                                                type: "spring",
                                                stiffness: 350,
                                                damping: 25,
                                                delay: index * 0.05
                                            }
                                        }
                                    }}
                                    whileHover={{ scale: 1.02 }}
                                    drag
                                    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                                    dragElastic={1}
                                    onDragStart={() => setIsDragging(true)}
                                    onDragEnd={(e, info) => {
                                        setIsDragging(false);
                                        const moveDistance = info.offset.x + info.offset.y;
                                        if (Math.abs(moveDistance) > 50) {
                                            const newItems = [...items];
                                            const draggedItem = newItems[index];
                                            const targetIndex = moveDistance > 0 ?
                                                Math.min(index + 1, items.length - 1) :
                                                Math.max(index - 1, 0);
                                            newItems.splice(index, 1);
                                            newItems.splice(targetIndex, 0, draggedItem);
                                            setItems(newItems);
                                        }
                                    }}
                                >
                                    <MediaItem
                                        item={item}
                                        className="absolute inset-0 w-full h-full object-cover"
                                        onClick={() => !isDragging && handleOpen(item)}
                                    />
                                    <div
                                        className="absolute inset-0 flex flex-col justify-end p-2 sm:p-3 md:p-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                        <div className="relative z-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                            <h3 className="text-white text-sm md:text-lg font-medium drop-shadow-md">
                                                {item.title}
                                            </h3>
                                            <p className="text-white/80 text-xs md:text-sm mt-1 drop-shadow-sm line-clamp-3">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
            </div>

            <GalleryModal
                selectedItem={activeItem}
                isOpen={!!selectedItem}
                onClose={handleClose}
                setSelectedItem={setSelectedItem}
                mediaItems={items}
                topPosition={savedScroll}
            />
        </div>
    );
};


export default InteractiveBentoGallery;
