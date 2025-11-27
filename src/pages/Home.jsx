import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  CheckCircle, Sparkles, FileText, Palette, Rocket, Star, ArrowRight, 
  Trophy, BarChart3, BookOpen, Wrench, User, Share2, Check, Monitor
} from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function Home() {
  const [email, setEmail] = useState("");

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* HERO SECTION - Left/Right Split */}
      <section className="min-h-screen flex items-center px-6 py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Your Sales Portfolio.{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                  Reinvented.
                </span>
              </h1>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Stand out in the hiring process with a conversion-optimized, professionally designed sales portfolio — built to prove your value instantly.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <Link to={createPageUrl("CreatePortfolio")}>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-bold text-lg px-8 py-6 rounded-xl"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Create My Portfolio
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => scrollToSection('examples')}
                  className="border-2 border-amber-500 text-amber-500 hover:bg-amber-500/10 text-lg px-8 py-6 rounded-xl"
                >
                  See Examples
                </Button>
              </div>
              
              {/* Trust Logos */}
              <div className="pt-8 border-t border-slate-700">
                <p className="text-slate-500 text-sm mb-4">Trusted by Sales Professionals at</p>
                <div className="flex flex-wrap gap-6 items-center opacity-60">
                  <span className="text-slate-400 font-semibold">SaaS</span>
                  <span className="text-slate-400 font-semibold">Tech</span>
                  <span className="text-slate-400 font-semibold">B2B</span>
                  <span className="text-slate-400 font-semibold">Enterprise</span>
                  <span className="text-slate-400 font-semibold">Startups</span>
                </div>
              </div>
            </motion.div>

            {/* Right: Laptop Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                {/* Laptop Frame */}
                <div className="bg-slate-800 rounded-t-2xl p-3 shadow-2xl">
                  <div className="flex gap-2 mb-3">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="bg-slate-900 rounded-lg overflow-hidden aspect-[16/10]">
                    {/* Portfolio Preview */}
                    <div className="h-full bg-gradient-to-br from-slate-800 to-slate-900 p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 rounded-full bg-amber-500/20" />
                        <div>
                          <div className="h-4 w-32 bg-white/20 rounded mb-2" />
                          <div className="h-3 w-24 bg-amber-500/40 rounded" />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="bg-slate-700/50 rounded-lg p-3 text-center">
                          <div className="text-amber-400 font-bold text-lg">150%</div>
                          <div className="text-xs text-slate-400">Quota</div>
                        </div>
                        <div className="bg-slate-700/50 rounded-lg p-3 text-center">
                          <div className="text-amber-400 font-bold text-lg">$2.5M</div>
                          <div className="text-xs text-slate-400">Revenue</div>
                        </div>
                        <div className="bg-slate-700/50 rounded-lg p-3 text-center">
                          <div className="text-amber-400 font-bold text-lg">45+</div>
                          <div className="text-xs text-slate-400">Deals</div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-3 w-full bg-slate-700/50 rounded" />
                        <div className="h-3 w-4/5 bg-slate-700/50 rounded" />
                        <div className="h-3 w-3/4 bg-slate-700/50 rounded" />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Laptop Base */}
                <div className="bg-slate-700 h-4 rounded-b-lg mx-8" />
                <div className="bg-slate-600 h-2 rounded-b-xl mx-16" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* VALUE PROPOSITION - 3 Column Grid */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center text-slate-900 mb-16"
          >
            Why Sales Professionals Choose{" "}
            <span className="text-amber-500">The Briefkase</span>
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Trophy,
                title: "Closes More Interviews",
                description: "Custom-designed portfolios that communicate your wins, pipeline, deals, and metrics faster than a resume ever could."
              },
              {
                icon: BarChart3,
                title: "Built to Convert",
                description: "Designed using recruiter psychology to highlight storytelling, achievement, and measurable impact."
              },
              {
                icon: Palette,
                title: "Professionally Designed",
                description: "Clean, modern layouts that elevate your personal brand and position you as a top performer."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center mb-6 mx-auto shadow-lg shadow-amber-500/20">
                  <item.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURE SHOWCASE - Alternating Layout */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              What's Inside Your Sales Portfolio
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Everything you need to showcase your sales excellence
            </p>
          </motion.div>

          <div className="space-y-20">
            {[
              {
                icon: Trophy,
                title: "Deal Wins Page",
                description: "Showcase your biggest closes, deal sizes, timelines, and impact. Let your results speak louder than any resume.",
                align: "left"
              },
              {
                icon: BarChart3,
                title: "Sales Dashboard",
                description: "Present your KPIs, quota performance, pipeline progress, and results in a clear, visual format recruiters love.",
                align: "right"
              },
              {
                icon: BookOpen,
                title: "Case Studies",
                description: "Mini win stories that demonstrate your ability to close, strategize, and execute on complex deals.",
                align: "left"
              },
              {
                icon: Wrench,
                title: "Skills & Tech Stack",
                description: "ATS-friendly, modern, visually structured overview of your sales strengths and tools you've mastered.",
                align: "right"
              },
              {
                icon: User,
                title: "Branded Cover Page",
                description: "A premium, personal visual introduction designed to set you apart instantly from other candidates.",
                align: "left"
              },
              {
                icon: Share2,
                title: "Easy Sharing",
                description: "Download your portfolio as a PDF or share it with a branded link. Perfect for emails and LinkedIn.",
                align: "right"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`grid md:grid-cols-2 gap-12 items-center ${feature.align === 'right' ? 'md:flex-row-reverse' : ''}`}
              >
                <div className={feature.align === 'right' ? 'md:order-2' : ''}>
                  <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6">
                    <feature.icon className="w-8 h-8 text-amber-500" />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                  <p className="text-lg text-slate-600 leading-relaxed">{feature.description}</p>
                </div>
                <div className={`bg-slate-100 rounded-2xl aspect-video flex items-center justify-center ${feature.align === 'right' ? 'md:order-1' : ''}`}>
                  <div className="w-20 h-20 rounded-2xl bg-slate-200 flex items-center justify-center">
                    <feature.icon className="w-10 h-10 text-slate-400" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF - 3 Card Testimonials */}
      <section className="py-20 px-6 bg-slate-100">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center text-slate-900 mb-16"
          >
            Trusted by High-Performing Sales Pros
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "I booked three interviews in one week after sending my portfolio.",
                name: "SDR Candidate"
              },
              {
                quote: "Recruiters told me it was the best candidate presentation they've seen.",
                name: "Account Executive"
              },
              {
                quote: "The Briefkase boosted my confidence and helped me stand out instantly.",
                name: "SaaS Sales Professional"
              }
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="bg-white border-0 shadow-lg p-8 h-full">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-700 italic text-lg mb-6 leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div className="border-t border-slate-100 pt-4">
                    <p className="text-amber-600 font-semibold">— {testimonial.name}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS - 3 Step Horizontal */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center text-slate-900 mb-16"
          >
            Your Portfolio — Done for You
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-16 left-1/4 right-1/4 h-0.5 bg-amber-200" />
            
            {[
              {
                step: "01",
                title: "Choose a template",
                description: "Pick from modern, clean, conversion-optimized portfolio designs."
              },
              {
                step: "02",
                title: "Upload your wins",
                description: "Share your sales achievements, deals, metrics, and resume."
              },
              {
                step: "03",
                title: "Get your portfolio",
                description: "Delivered in PDF + Web formats, ready to send to recruiters and hiring managers."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="text-center relative z-10"
              >
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-amber-500/20">
                  <span className="text-4xl font-bold text-white">{item.step}</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link to={createPageUrl("CreatePortfolio")}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-bold text-lg px-8 py-6 rounded-xl"
              >
                <Rocket className="w-5 h-5 mr-2" />
                Build My Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* PRICING - 3 Tier Cards */}
      <section id="pricing" className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center text-slate-900 mb-16"
          >
            Simple, Transparent Pricing
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Starter",
                price: "$49",
                features: [
                  "Single-page brief",
                  "Cover page",
                  "Basic layout",
                  "Quick delivery"
                ],
                popular: false
              },
              {
                name: "Professional",
                price: "$149",
                features: [
                  "Multi-page portfolio",
                  "Metrics dashboard",
                  "Case studies included",
                  "Custom branding",
                  "PDF + Web versions"
                ],
                popular: true
              },
              {
                name: "Elite",
                price: "$299",
                features: [
                  "Fully done-for-you portfolio",
                  "Custom copywriting",
                  "Full redesign + revisions",
                  "24-hour delivery",
                  "Premium branding included"
                ],
                popular: false
              }
            ].map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className={`p-8 h-full relative border-2 ${
                  plan.popular 
                    ? 'bg-white border-amber-500 shadow-xl shadow-amber-500/10 scale-105' 
                    : 'bg-white border-slate-200'
                }`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                      Most Popular
                    </div>
                  )}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                    <div className="text-5xl font-bold text-slate-900">{plan.price}</div>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-3 text-slate-600">
                        <Check className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to={createPageUrl("CreatePortfolio")}>
                    <Button className={`w-full py-6 rounded-xl font-bold ${
                      plan.popular
                        ? 'bg-amber-500 hover:bg-amber-600 text-white'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}>
                      Get Started
                    </Button>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Examples */}
      <section id="examples" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center text-slate-900 mb-16"
          >
            Portfolio Examples
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {['Executive', 'Modern', 'Creative', 'Professional Blue'].map((template, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={createPageUrl("Dashboard")}>
                  <Card className="bg-slate-100 border-slate-200 overflow-hidden hover:border-amber-500 transition-all cursor-pointer group hover:shadow-lg">
                    <div className="aspect-[3/4] bg-gradient-to-br from-slate-200 to-slate-100 relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-slate-400 group-hover:text-amber-500 transition-colors text-center px-4">
                          {template}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 bg-white">
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">{template}</h3>
                      <span className="text-amber-500 hover:text-amber-600 flex items-center text-sm font-medium">
                        View Template <ArrowRight className="w-4 h-4 ml-2" />
                      </span>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link to={createPageUrl("Dashboard")}>
              <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-lg px-8 py-6 rounded-xl">
                View All Templates
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* LEAD MAGNET - Full Width Navy Band */}
      <section className="py-20 px-6 bg-slate-900">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <FileText className="w-16 h-16 text-amber-400 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Free Sales Portfolio Template
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Download the top-performing layout recruiters love — free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white border-0 text-slate-900 placeholder:text-slate-500 py-6 rounded-xl"
              />
              <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-bold px-8 py-6 rounded-xl whitespace-nowrap">
                Get My Free Template
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT - Left Image / Right Copy */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Brand Element */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-12 flex items-center justify-center"
            >
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/691bdb06ad7d9d6aed9c3e5c/9e08195bb_riefKase1.png"
                alt="Briefkase"
                className="h-16"
              />
            </motion.div>

            {/* Right: Copy */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                About The Briefkase
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed">
                The Briefkase helps sales professionals communicate their real value beyond a traditional resume. We design modern, data-driven sales portfolios that showcase your wins through metrics, storytelling, and clean visual presentation. Our mission is simple: help you stand out and get hired faster.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER - 2 Column */}
      <footer className="bg-slate-900 py-12 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
            {/* Left: Navigation */}
            <div className="flex flex-wrap gap-6 text-sm">
              <Link to={createPageUrl("Home")} className="text-slate-400 hover:text-amber-400 transition-colors">Home</Link>
              <a href="#pricing" className="text-slate-400 hover:text-amber-400 transition-colors">Pricing</a>
              <Link to={createPageUrl("Dashboard")} className="text-slate-400 hover:text-amber-400 transition-colors">Templates</Link>
              <a href="#examples" className="text-slate-400 hover:text-amber-400 transition-colors">Examples</a>
              <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors">Contact</a>
              <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors">Privacy Policy</a>
              <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors">Terms</a>
            </div>

            {/* Right: Brand Statement */}
            <div className="text-right">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/691bdb06ad7d9d6aed9c3e5c/9e08195bb_riefKase1.png"
                alt="Briefkase"
                className="h-8 ml-auto mb-2"
              />
              <p className="text-slate-500 text-sm">Stand out. Get hired.</p>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
            <p>© 2025 TheBriefkase.com — All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}