"use client";

import InteractiveBentoGallery from "@/components/ui/interactive-bento-gallery";
import { MediaItemType } from "@/components/ui/interactive-bento-gallery";

const mediaItems: MediaItemType[] = [
  {
    id: 1,
    type: "image",
    title: "All-on-X Implants",
    desc: "Full mouth rehabilitation with All-on-X.",
    url: "/patients/ai_implants_after.png",
    beforeUrl: "/patients/ai_implants_before.png",
    afterUrl: "/patients/ai_implants_after.png",
    longDescription: `Clinical case: Full mouth rehabilitation with All-on-X dental implants
A patient presented with severe dental decay, missing teeth, and failing restorations, leading to difficulty in chewing and extreme self-consciousness.

Treatment approach and process
We utilized the All-on-X concept, a revolutionary approach where a full arch of teeth is supported by just four to six strategically placed dental implants. After a thorough 3D CBCT scan and digital planning, any remaining compromised teeth were extracted, and the implants were placed in a single surgery.

Result
A temporary, fixed acrylic bridge was attached the same day, allowing the patient to leave the clinic with a brand-new smile. After a healing period of 4 months to allow for osseointegration, the final ultra-strong zirconia bridge was custom-milled and permanently secured. The patient's chewing function is fully restored, and their confidence has been completely transformed.

Treatment methods: All-on-X Implants
About the service -> Make an appointment`,
    span: "md:col-span-2 md:row-span-2 sm:col-span-2 sm:row-span-2",
    serviceId: "05", // ALL-ON-X
  },
  {
    id: 2,
    type: "image",
    title: "Endodontics & Crown",
    desc: "Root canal therapy and restoration.",
    url: "/patients/ai_endodontics_after.png",
    beforeUrl: "/patients/ai_endodontics_before.png",
    afterUrl: "/patients/ai_endodontics_after.png",
    longDescription: `Clinical case: Saving a severely decayed molar
A patient arrived with acute pain in a lower molar. Clinical and radiographic examination revealed deep caries reaching the pulp chamber, causing irreversible pulpitis.

Treatment approach and process
Under local anesthesia, the tooth was isolated with a rubber dam. We performed a precise root canal treatment using rotary instruments and a surgical microscope to ensure complete removal of infected tissue. The canals were then obturated with warm gutta-percha.

Result
To restore the tooth's structural integrity, a custom-shaded ceramic crown was fabricated using CAD/CAM technology. The tooth was saved from extraction and fully restored in both function and aesthetics.

Treatment methods: Endodontics, Dental Crowns
About the service -> Make an appointment`,
    span: "md:col-span-1 md:row-span-2 sm:col-span-1 sm:row-span-2",
    serviceId: "09", // Therapeutic dentistry
  },
  {
    id: 3,
    type: "image",
    title: "Ceramic Veneers",
    desc: "Natural aesthetics with non-prep veneers",
    url: "/patients/ai_veneers_after.png",
    beforeUrl: "/patients/ai_veneers_before.png",
    afterUrl: "/patients/ai_veneers_after.png",
    longDescription: `A patient came to us who wanted to makeover her smile to give it a more natural appearance. Although her teeth were positioned correctly, her front teeth were covered with composite veneers that looked artificial and did not match the rest of her smile. This caused her discomfort and desiring an aesthetically flawless, but at the same time caring solution.

Treatment approach and process
Our job was to improve the look of her front teeth, retaining their natural shape and harmony with the rest of her teeth. To this end, we chose non-prep veneers – a modern technology enabling us to apply ceramic plates with no need to grind the enamel. This is the most gentle and caring method possible and completely preserves the natural anatomy of teeth. Treatment was conducted on the patient's eight front teeth, as a result of which her smile is now completely visually harmonious.

Aesthetic art
To achieve the ideal result, the veneers were hand-crafted in our partner laboratory in Dubai. Master ceramists created ultra-thin plates with natural translucency, relief and depth of colour, precisely replicating the natural structure of the patient’s teeth. Outstanding light penetration and precision of form ensured that the veneers integrated into the patient’s smile organically, making her teeth look completely natural and alive.

Result
Just three appointments (one month) were required for the treatment – as the patient lived abroad, we adapted the process to meet her needs. The end result was that we applied eight non-prep veneers, which gave her smile a natural, attractive and harmonious look and kept her natural teeth tissue untouched.

The patient acquired a new smile – one that is natural, harmonious and uniquely her own, truly reflecting her individuality.

Treatment methods: Veneers
About the service -> Make an appointment`,
    span: "md:col-span-1 md:row-span-1 sm:col-span-1 sm:row-span-1",
    serviceId: "03", // Veneers
  },
  {
    id: 4,
    type: "image",
    title: "Smile Design",
    desc: "Custom designed harmonious smile.",
    url: "/patients/ai_smile_design_after.png",
    beforeUrl: "/patients/ai_smile_design_before.png",
    afterUrl: "/patients/ai_smile_design_after.png",
    longDescription: `Clinical case: Comprehensive Digital Smile Design
A patient was unhappy with the uneven shape, slight chipping, and minor misalignments of their front teeth. They desired a completely transformed, harmonious smile that fit their facial features naturally.

Treatment approach and process
Using Digital Smile Design (DSD) software, we mapped the patient's facial proportions and designed a custom smile. A mock-up was temporarily placed in the patient's mouth so they could "test drive" their new smile before any permanent changes were made.

Result
Once approved, ultra-thin porcelain restorations were crafted and bonded. The final result is a breathtaking, natural-looking smile that perfectly complements the patient's facial aesthetics.

Treatment methods: Digital Smile Design, Cosmetic Dentistry
About the service -> Make an appointment`,
    span: "md:col-span-1 md:row-span-1 sm:col-span-1 sm:row-span-1",
    serviceId: "03", // Veneers
  },
  {
    id: 5,
    type: "image",
    title: "Teeth Whitening",
    desc: "Removing years of deep staining.",
    url: "/patients/ai_whitening_after.png",
    beforeUrl: "/patients/ai_whitening_before.png",
    afterUrl: "/patients/ai_whitening_after.png",
    longDescription: `Clinical case: Advanced Professional Whitening
A patient presented with heavy discoloration and yellowing of their teeth, primarily due to years of coffee consumption and natural aging. They were looking for a safe, highly effective way to rejuvenate their smile.

Treatment approach and process
We performed an in-office laser whitening session. The gums were carefully protected with a resin barrier, and a professional-grade whitening gel was applied and activated with a specialized LED light to break down deep stains without damaging the enamel.

Result
In just 60 minutes, the patient's teeth became several shades whiter. The result is a brilliantly bright, healthy-looking smile that instantly boosted the patient's confidence.

Treatment methods: Laser Teeth Whitening
About the service -> Make an appointment`,
    span: "md:col-span-1 md:row-span-2 sm:col-span-1 sm:row-span-2",
    serviceId: "02", // Professional hygiene
  },
  {
    id: 6,
    type: "image",
    title: "Invisalign Aligners",
    desc: "Click to see the transformation of a crowded smile.",
    url: "/patients/ai_invisalign_after.png",
    beforeUrl: "/patients/ai_invisalign_before.png",
    afterUrl: "/patients/ai_invisalign_after.png",
    longDescription: `Clinical case: Orthodontic correction with Invisalign
A patient presented with severe crowding, misaligned teeth, and a narrow arch. They desired a straighter smile but did not want traditional metal braces.

Treatment approach and process
We utilized a series of custom-made, clear Invisalign aligners. Using a 3D digital scanner, we mapped out a precise treatment plan, allowing the patient to see the projected final result before starting. The patient wore each set of aligners for 1-2 weeks, gradually shifting their teeth into the correct positions.

Result
After 14 months of treatment, the patient achieved a perfectly straight, wide, and harmonious smile. The teeth are now beautifully aligned, improving both aesthetics and oral health.

Treatment methods: Invisalign, Orthodontics
About the service -> Make an appointment`,
    span: "md:col-span-1 md:row-span-2 sm:col-span-1 sm:row-span-2",
    serviceId: "01", // Complex diagnostics
  },
  {
    id: 7,
    type: "image",
    title: "Full Mouth Rehab",
    desc: "Rebuilding a healthy, beautiful smile.",
    url: "/patients/ai_smile_design_after.png",
    beforeUrl: "/patients/ai_smile_design_before.png",
    afterUrl: "/patients/ai_smile_design_after.png",
    longDescription: `Clinical case: Full Mouth Rehabilitation
A patient presented with severe wear, bite collapse, and multiple missing teeth. They were seeking a comprehensive solution to restore their chewing function and aesthetic appearance.

Planning stage
Following a detailed 3D diagnosis and digital bite analysis, we devised a full mouth rehabilitation plan using a combination of implants and ceramic restorations.

Result
The patient's bite was fully restored to its natural physiological state. The aesthetic outcome provided a harmonious and youthful smile, completely transforming their confidence.

Treatment methods: Full Mouth Rehabilitation
About the service -> Make an appointment`,
    span: "md:col-span-1 md:row-span-2 sm:col-span-1 sm:row-span-2",
    serviceId: "05", // ALL-ON-X
  },
  {
    id: 8,
    type: "image",
    title: "Composite Bonding",
    desc: "Repairing chipped teeth seamlessly.",
    url: "/patients/ai_endodontics_after.png",
    beforeUrl: "/patients/ai_endodontics_before.png",
    afterUrl: "/patients/ai_endodontics_after.png",
    longDescription: `Clinical case: Composite bonding to restore front teeth
A patient approached us with chipped and slightly misaligned front teeth, looking for a quick and minimally invasive cosmetic improvement.

Treatment approach and process
We utilized high-end aesthetic composite materials to meticulously sculpt and build up the missing tooth structure directly on the teeth, without any drilling or enamel removal.

Result
In just one visit, the patient achieved a perfectly symmetrical and natural-looking smile. The composite blends seamlessly with the natural teeth.

Treatment methods: Composite Bonding
About the service -> Make an appointment`,
    span: "md:col-span-1 md:row-span-2 sm:col-span-1 sm:row-span-2",
    serviceId: "09", // Therapeutic dentistry
  },
  {
    id: 9,
    type: "image",
    title: "Single Tooth Implant",
    desc: "Permanent replacement for a missing tooth.",
    url: "/patients/ai_implants_after.png",
    beforeUrl: "/patients/ai_implants_before.png",
    afterUrl: "/patients/ai_implants_after.png",
    longDescription: `Clinical case: Single posterior implant placement
The patient had lost a lower molar due to deep decay and was struggling with chewing on that side of their mouth.

Treatment approach and process
A titanium dental implant was surgically placed into the jawbone using a precise 3D surgical guide. After a brief healing period for osseointegration, a custom zirconia crown was attached.

Result
The new implant functions and feels exactly like a natural tooth, restoring full chewing capacity and preventing surrounding teeth from shifting.

Treatment methods: Dental Implants
About the service -> Make an appointment`,
    span: "md:col-span-2 md:row-span-2 sm:col-span-2 sm:row-span-2",
    serviceId: "04", // Dental implants
  },
  {
    id: 10,
    type: "image",
    title: "Gum Contouring",
    desc: "Correcting a 'gummy' smile.",
    url: "/patients/ai_veneers_after.png",
    beforeUrl: "/patients/ai_veneers_before.png",
    afterUrl: "/patients/ai_veneers_after.png",
    longDescription: `Clinical case: Laser gum contouring for aesthetic balance
A patient was self-conscious about their "gummy" smile, where excessive gingival tissue made their teeth appear unusually short.

Treatment approach and process
Using an advanced soft-tissue laser, we gently and painlessly reshaped the gum line to reveal more of the natural tooth crown and create symmetrical gingival margins.

Result
The laser contouring immediately provided a beautifully proportioned smile with minimal recovery time, allowing the patient's natural teeth to shine.

Treatment methods: Periodontics, Gum Contouring
About the service -> Make an appointment`,
    span: "md:col-span-1 md:row-span-2 sm:col-span-1 sm:row-span-2",
    serviceId: "08", // Periodontology
  },
  {
    id: 11,
    type: "image",
    title: "Pediatric Crown",
    desc: "Saving primary teeth.",
    url: "/patients/ai_whitening_after.png",
    beforeUrl: "/patients/ai_whitening_before.png",
    afterUrl: "/patients/ai_whitening_after.png",
    longDescription: `Clinical case: Stainless steel crown for a pediatric patient
A young patient presented with a severely decayed primary (baby) molar that was causing significant discomfort.

Treatment approach and process
To preserve the tooth until the permanent tooth is ready to erupt, we removed the decay and placed a durable stainless steel crown. This procedure was completed quickly to ensure the child's comfort.

Result
The child's pain was immediately eliminated, and the space is now safely maintained for their future permanent teeth.

Treatment methods: Pediatric Dentistry
About the service -> Make an appointment`,
    span: "md:col-span-1 md:row-span-2 sm:col-span-2 sm:row-span-2",
    serviceId: "10", // Pediatric dentistry
  }
];

export function PortfolioSection() {
  return (
    <section id="portfolio" className="relative py-32 bg-[#E5EDDE] text-[#0D241C]">
      <div className="w-full px-4 md:px-8 mb-16">
        <h2 className="text-5xl md:text-7xl font-light tracking-tight mb-8 max-w-[1400px] mx-auto leading-tight">
          Our patients' smiles speak for themselves.
        </h2>
      </div>
        
      <InteractiveBentoGallery 
        mediaItems={mediaItems}
        title=""
        description="Drag and explore our curated collection of patient transformations"
      />
    </section>
  );
}
