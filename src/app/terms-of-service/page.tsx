import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-[#071a12] text-[#E5EDDE] pt-32 pb-20 selection:bg-[#c9a973] selection:text-[#071a12]">
      <div className="max-w-4xl mx-auto px-6">
        <Link href="/appointment" className="inline-flex items-center gap-2 text-[#c9a973] hover:text-white transition-colors mb-12">
          <ArrowLeft size={20} /> Back to Booking
        </Link>
        
        <h1 className="text-5xl md:text-7xl font-serif tracking-tight mb-8">Terms of Service</h1>
        <p className="text-lg text-white/70 mb-12">Effective Date: October 24, 2026</p>

        <div className="space-y-12 font-light leading-relaxed opacity-90">
          <section>
            <h2 className="text-2xl font-serif text-[#c9a973] mb-4">1. Agreement to Terms</h2>
            <p>
              These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and DEMO Dental Studio ("we," "us" or "our"), concerning your access to and use of our website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-[#c9a973] mb-4">2. Medical Disclaimer</h2>
            <p>
              The information provided on this website is for general informational purposes only and is not intended to be a substitute for professional medical or dental advice, diagnosis, or treatment. Always seek the advice of your dentist or other qualified health provider with any questions you may have regarding a medical condition.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-[#c9a973] mb-4">3. Appointment Cancellations</h2>
            <p>
              We require at least 24 hours notice if you need to cancel or reschedule your appointment. Failure to provide 24 hours notice may result in a cancellation fee. We understand that emergencies happen, and we will do our best to accommodate exceptional circumstances on a case-by-case basis.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-[#c9a973] mb-4">4. Payment Terms</h2>
            <p>
              Payment is expected at the time services are rendered unless prior financial arrangements have been made. We accept major credit cards, cash, and select insurance plans. It is your responsibility to understand your insurance coverage and limitations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-[#c9a973] mb-4">5. User Data</h2>
            <p>
              We will maintain certain data that you transmit to the website for the purpose of managing the performance of the website, as well as data relating to your use of the website. Although we perform regular routine backups of data, you are solely responsible for all data that you transmit or that relates to any activity you have undertaken using the website.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
