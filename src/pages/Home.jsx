import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  CheckCircle, Sparkles, FileText, Palette, Rocket, Star, ArrowRight, 
  Mail, Trophy, BarChart3, BookOpen, Wrench, User, Share2, Check
} from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function Home() {
  const [email, setEmail] = useState("");

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Your Sales Portfolio.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                Reinvented.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-10 leading-relaxed max-w-3xl mx-auto">
              Stand out in the hiring process with a conversion-optimized, professionally designed sales portfolio — built to prove your value instantly.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mb-8">
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
            <p className="text-slate-400 text-sm">
              Trusted by Sales Professionals across SaaS, Tech, and B2B industries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 px-6 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center text-white mb-16"
          >
            Why Sales Professionals Choose{" "}
            <span className="text-amber-400">The Briefkase</span>
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
              >
                <Card className="bg-slate-800/50 border-slate-700 p-8 hover:border-amber-500/50 transition-all h-full text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center mb-6 mx-auto">
                    <item.icon className="w-8 h-8 text-slate-900" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-slate-300 leading-relaxed">{item.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center text-white mb-6"
          >
            What's Inside Your Sales Portfolio
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl text-slate-300 text-center mb-16 max-w-3xl mx-auto"
          >
            Everything you need to showcase your sales excellence
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Trophy,
                title: "Deal Wins Page",
                description: "Showcase your biggest closes, deal sizes, timelines, and impact."
              },
              {
                icon: BarChart3,
                title: "Sales Dashboard",
                description: "Present your KPIs, quota performance, pipeline progress, and results clearly."
              },
              {
                icon: BookOpen,
                title: "Case Studies",
                description: "Mini win stories that demonstrate your ability to close, strategize, and execute."
              },
              {
                icon: Wrench,
                title: "Skills & Tech Stack",
                description: "ATS-friendly, modern, visually structured overview of your sales strengths."
              },
              {
                icon: User,
                title: "Branded Cover Page",
                description: "A premium, personal visual introduction designed to set you apart instantly."
              },
              {
                icon: Share2,
                title: "Easy Sharing",
                description: "Download your portfolio as a PDF or share it with a branded link."
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="bg-slate-800/30 border-slate-700 p-6 hover:border-amber-500/30 transition-all h-full">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                      <p className="text-slate-400">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center text-white mb-16"
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
                <Card className="bg-slate-800/50 border-slate-700 p-8 h-full">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-200 italic text-lg mb-6 leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div className="border-t border-slate-700 pt-4">
                    <p className="text-amber-400 font-semibold">— {testimonial.name}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center text-white mb-16"
          >
            Your Portfolio — Done for You
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
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
              >
                <Card className="bg-slate-800/50 border-slate-700 p-8 hover:border-amber-500/50 transition-all h-full text-center">
                  <div className="text-6xl font-bold text-amber-500/30 mb-4">{item.step}</div>
                  <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-slate-300 leading-relaxed">{item.description}</p>
                </Card>
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

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center text-white mb-16"
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
                <Card className={`p-8 h-full relative ${
                  plan.popular 
                    ? 'bg-gradient-to-br from-amber-500/20 to-amber-600/10 border-amber-500' 
                    : 'bg-slate-800/50 border-slate-700'
                }`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-900 px-4 py-1 rounded-full text-sm font-bold">
                      Most Popular
                    </div>
                  )}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <div className="text-5xl font-bold text-amber-400">{plan.price}</div>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-3 text-slate-300">
                        <Check className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to={createPageUrl("CreatePortfolio")}>
                    <Button className={`w-full py-6 rounded-xl font-bold ${
                      plan.popular
                        ? 'bg-amber-500 hover:bg-amber-600 text-slate-900'
                        : 'bg-slate-700 hover:bg-slate-600 text-white'
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
      <section id="examples" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center text-white mb-16"
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
                  <Card className="bg-slate-800 border-slate-700 overflow-hidden hover:border-amber-500/50 transition-all cursor-pointer group">
                    <div className="aspect-[3/4] bg-gradient-to-br from-slate-700 to-slate-800 relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold text-slate-600 group-hover:text-amber-500 transition-colors text-center px-4">
                          {template}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-white mb-2">{template}</h3>
                      <span className="text-amber-400 hover:text-amber-300 flex items-center text-sm">
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
              <Button size="lg" className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-bold text-lg px-8 py-6 rounded-xl">
                View All Templates
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Lead Magnet */}
      <section className="py-20 px-6 bg-gradient-to-r from-amber-500 to-amber-600">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <FileText className="w-16 h-16 text-slate-900 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Free Sales Portfolio Template
            </h2>
            <p className="text-xl text-slate-800 mb-8">
              Download the top-performing layout recruiters love — free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/90 border-0 text-slate-900 placeholder:text-slate-500 py-6 rounded-xl"
              />
              <Button className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-6 rounded-xl whitespace-nowrap">
                Get My Free Template
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              About The Briefkase
            </h2>
            <p className="text-xl text-slate-300 leading-relaxed">
              The Briefkase helps sales professionals communicate their real value beyond a traditional resume. We design modern, data-driven sales portfolios that showcase your wins through metrics, storytelling, and clean visual presentation. Our mission is simple: help you stand out and get hired faster.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-12 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
            <Link to={createPageUrl("Home")} className="text-slate-400 hover:text-amber-400 transition-colors">Home</Link>
            <a href="#pricing" className="text-slate-400 hover:text-amber-400 transition-colors">Pricing</a>
            <Link to={createPageUrl("Dashboard")} className="text-slate-400 hover:text-amber-400 transition-colors">Templates</Link>
            <a href="#examples" className="text-slate-400 hover:text-amber-400 transition-colors">Examples</a>
            <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors">Contact</a>
            <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors">Privacy Policy</a>
            <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors">Terms</a>
          </div>

          <div className="text-center text-slate-500">
            <p>© 2025 TheBriefkase.com — All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}