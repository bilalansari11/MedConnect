"use client";

import React from "react";
import Link from "next/link";
import { 
  Button, 
  Card, 
  Header, 
  Footer 
} from "@/components"; // As per your logic
import { CustomCursor } from "@/components/CustomCursor";
import { 
  Calendar, 
  ShieldCheck, 
  Headphones, 
  Search, 
  UserPlus, 
  Star,
  Activity
} from "lucide-react";

// --- Logic Data (Aapki provide ki gayi arrays) ---
const teamMembers = [
  { name: "Hussain", role: "Lead Developer", image: "H" },
  { name: "Zain", role: "Backend Engineer", image: "Z" },
  { name: "Asher", role: "UI/UX Designer", image: "A" },
  { name: "Bilal", role: "Project Manager", image: "B" },
];

const features = [
  {
    title: "Easy Appointments",
    description: "Book appointments with doctors in just a few clicks. No more long waiting times.",
    icon: <Calendar className="w-8 h-8" />,
    color: "from-[#005c55] to-[#0f766e]", // Primary theme matching
  },
  {
    title: "Secure Health Records",
    description: "Your medical records are encrypted and securely stored. Access them anytime.",
    icon: <ShieldCheck className="w-8 h-8" />,
    color: "from-emerald-500 to-green-600",
  },
  {
    title: "24/7 Support",
    description: "Get round-the-clock support from our dedicated team for any queries.",
    icon: <Headphones className="w-8 h-8" />,
    color: "from-purple-500 to-violet-600",
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Patient",
    text: "MedConnect has completely transformed how I manage my healthcare. Booking appointments is now so convenient!",
    avatar: "S",
  },
  {
    name: "Dr. Michael Chen",
    role: "Cardiologist",
    text: "As a healthcare provider, this platform has streamlined my practice and improved patient communication significantly.",
    avatar: "M",
  },
  {
    name: "Emily Rodriguez",
    role: "Patient",
    text: "The ability to track my medical records and appointments in one place is incredible. Highly recommend!",
    avatar: "E",
  },
];

export default function HomePage() {
  return (
    <>
      <CustomCursor />
      <div className="min-h-screen flex flex-col bg-[#f7f9fb] text-[#191c1e] overflow-x-hidden">
        <Header transparent />

        <main className="flex-1">
          {/* Hero Section - Futuristic Design */}
          <section className="relative pt-32 pb-20 px-8 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#80d5cb]/20 rounded-full blur-[100px] animate-pulse"></div>
              <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#80f9c8]/20 rounded-full blur-[100px] animate-pulse delay-700"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10 text-center">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#80f9c8] text-[#002115] text-sm font-bold mb-8 shadow-sm">
                <Activity className="w-4 h-4 animate-bounce" />
                Next-Gen Clinical Precision ✨
              </div>

              <h1 className="text-5xl md:text-7xl font-extrabold font-headline mb-6 tracking-tight leading-tight text-[#191c1e]">
                AI-Powered <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#005c55] to-[#0f766e]">Telemedicine</span> Platform
              </h1>

              <p className="text-xl md:text-2xl text-[#3e4947] mb-12 max-w-2xl mx-auto leading-relaxed">
                Connect with doctors, manage appointments, and access your 
                medical records in a secure, intelligent environment.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/login">
                  <Button className="min-w-48 bg-gradient-to-br from-[#005c55] to-[#0f766e] text-white py-6 rounded-full text-lg shadow-xl shadow-[#005c55]/20 hover:scale-105 transition-all">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button variant="outline" className="min-w-48 border-2 border-[#005c55] text-[#005c55] py-6 rounded-full text-lg hover:bg-[#005c55] hover:text-white transition-all">
                    Sign Up Free
                  </Button>
                </Link>
              </div>

              {/* Logic: Stats integrated into Hero */}
              <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { value: "10K+", label: "Patients" },
                  { value: "500+", label: "Doctors" },
                  { value: "50+", label: "Specialties" },
                  { value: "4.9/5", label: "Satisfaction" },
                ].map((stat, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-white/50 backdrop-blur-md border border-white/50 shadow-lg">
                    <div className="text-4xl font-bold text-[#005c55]">{stat.value}</div>
                    <div className="text-[#3e4947] mt-1 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* About Section - Logic: Features Mapping */}
          <section className="py-24 px-8 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <span className="text-[#005c55] font-bold uppercase tracking-widest text-sm">Platform Capabilities</span>
                <h2 className="text-4xl md:text-5xl font-bold mt-2">Why Choose MedConnect?</h2>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <Card key={index} className="p-8 border-none bg-[#f2f4f6] hover:bg-white hover:shadow-2xl transition-all group duration-300 rounded-3xl">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                    <p className="text-[#3e4947] leading-relaxed">{feature.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Logic: How It Works Section */}
          <section className="py-24 px-8 bg-[#f2f4f6]">
            <div className="max-w-7xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-16">How It Works</h2>
              <div className="grid md:grid-cols-3 gap-12 relative">
                {[
                  { step: "1", title: "Sign Up", desc: "Create your free account", icon: <UserPlus /> },
                  { step: "2", title: "Choose Doctor", desc: "Find the right specialist", icon: <Search /> },
                  { step: "3", title: "Book Appt", desc: "Schedule your visit", icon: <Calendar /> },
                ].map((item, idx) => (
                  <div key={idx} className="relative z-10">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl text-[#005c55]">
                      {item.icon}
                    </div>
                    <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                    <p className="text-slate-500">{item.desc}</p>
                    {idx < 2 && <div className="hidden md:block absolute top-10 left-[60%] w-full h-[2px] bg-[#005c55]/20 -z-10" />}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Logic: Testimonials Section */}
          <section className="py-24 px-8 bg-white">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-center text-4xl font-bold mb-16">Patient Stories</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {testimonials.map((t, i) => (
                  <Card key={i} className="p-8 bg-[#f7f9fb] border-none rounded-2xl relative overflow-hidden">
                    <Star className="absolute top-4 right-4 text-[#80f9c8] w-8 h-8 opacity-20" />
                    <p className="italic text-lg mb-8">"{t.text}"</p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#005c55] text-white rounded-full flex items-center justify-center font-bold">{t.avatar}</div>
                      <div>
                        <p className="font-bold">{t.name}</p>
                        <p className="text-sm text-slate-500">{t.role}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Logic: Team Section */}
          <section className="py-24 px-8 bg-[#191c1e] text-white">
            <div className="max-w-7xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-16">Meet Our Team</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {teamMembers.map((member, i) => (
                  <div key={i} className="group cursor-pointer">
                    <div className="w-32 h-32 bg-[#2d3133] rounded-full flex items-center justify-center text-4xl font-bold mx-auto mb-6 group-hover:bg-[#005c55] transition-colors shadow-2xl">
                      {member.image}
                    </div>
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-slate-400">{member.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}