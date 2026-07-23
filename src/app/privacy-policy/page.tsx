import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#071a12] text-[#E5EDDE] pt-32 pb-20 selection:bg-[#c9a973] selection:text-[#071a12]">
      <div className="max-w-4xl mx-auto px-6">
        <Link href="/appointment" className="inline-flex items-center gap-2 text-[#c9a973] hover:text-white transition-colors mb-12">
          <ArrowLeft size={20} /> Back to Booking
        </Link>
        
        <h1 className="text-5xl md:text-7xl font-serif tracking-tight mb-8">Privacy Policy</h1>
        <p className="text-lg text-white/70 mb-12">Effective Date: October 24, 2026</p>

        <div className="space-y-12 font-light leading-relaxed opacity-90">
          <section>
            <h2 className="text-2xl font-serif text-[#c9a973] mb-4">1. Information We Collect</h2>
            <p className="mb-4">
              At DEMO Dental Studio, your privacy is our utmost priority. We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, or when you participate in activities on the website.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li><strong>Personal Information:</strong> Name, phone number, email address, and demographic information.</li>
              <li><strong>Medical Information:</strong> Relevant dental and medical history necessary for providing safe treatment.</li>
              <li><strong>Automatically Collected Data:</strong> IP addresses, browser characteristics, and device information when you visit our site.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-[#c9a973] mb-4">2. How We Use Your Information</h2>
            <p className="mb-4">We use personal information collected via our website for a variety of business purposes described below:</p>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>To facilitate account creation and logon process.</li>
              <li>To send administrative information to you, such as appointment reminders and policy updates.</li>
              <li>To fulfill and manage your dental appointments and treatments.</li>
              <li>To protect our Services and ensure legal compliance.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-[#c9a973] mb-4">3. Will Your Information Be Shared?</h2>
            <p>
              We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We strictly adhere to HIPAA regulations regarding the handling of your medical and dental records. We do not sell your personal data to third-party marketing companies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-[#c9a973] mb-4">4. Security of Your Information</h2>
            <p>
              We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure. Although we will do our best to protect your personal information, transmission of personal information to and from our website is at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-[#c9a973] mb-4">5. Contact Us</h2>
            <p>
              If you have questions or comments about this notice, you may email us at privacy@demodental.com or by post to:
              <br /><br />
              DEMO Dental Studio<br />
              123 Premium Smile Blvd<br />
              New York, NY 10001
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
