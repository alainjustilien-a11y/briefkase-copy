import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Sparkles, FileText, Palette, Rocket, Star, ArrowRight, Mail, Phone, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function Home() {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
        {/* Background accents */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Turn Your Sales Success Into a{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                  Visual Story
                </span>{" "}
                That Closes Deals
              </h1>
              <p className="text-2xl text-slate-300 mb-8 leading-relaxed">
                Custom-designed sales portfolios that win you the job, the client, and the big commission.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={() => scrollToSection('samples')}
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-bold text-lg px-8 py-6 rounded-xl"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  See Portfolio Samples
                </Button>
                <Link to={createPageUrl("CreatePortfolio")}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-amber-500 text-amber-500 hover:bg-amber-500/10 text-lg px-8 py-6 rounded-xl"
                  >
                    <Rocket className="w-5 h-5 mr-2" />
                    Create Your Portfolio
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-amber-500/20">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
                  alt="Portfolio Preview"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="py-20 px-6 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-bold text-center text-white mb-16"
          >
            Why Resumes Aren't Enough
          </motion.h2>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-amber-400 mb-6">The Problem</h3>
              <ul className="space-y-4">
                {[
                  "Sales roles are more competitive than ever",
                  "Resumes don't show your impact visually",
                  "Hiring managers forget your pitch without proof",
                  "Your achievements get lost in text-heavy documents"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-lg text-slate-300">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-3 h-3 bg-red-500 rounded-full" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-amber-400 mb-6">The Solution</h3>
              <Card className="bg-gradient-to-br from-amber-500/10 to-amber-600/10 border-amber-500/30 p-8">
                <p className="text-xl text-white leading-relaxed mb-6">
                  Our custom portfolios turn your results into compelling visuals that employers and clients can't ignore.
                </p>
                <ul className="space-y-3">
                  {[
                    "Stand out with professional design",
                    "Showcase metrics that matter",
                    "Tell your story visually",
                    "Make a lasting impression"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-200">
                      <CheckCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
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
            className="text-5xl font-bold text-center text-white mb-6"
          >
            From Data to a Deal-Closing Portfolio
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl text-slate-300 text-center mb-16 max-w-3xl mx-auto"
          >
            Our simple 3-step process transforms your sales achievements into a professional portfolio
          </motion.p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: FileText,
                step: "01",
                title: "Upload",
                description: "Share your resume and achievements. We'll analyze your sales metrics and career story."
              },
              {
                icon: Palette,
                step: "02",
                title: "Design",
                description: "Choose from stunning templates. AI transforms your data into compelling visual narratives."
              },
              {
                icon: Rocket,
                step: "03",
                title: "Deliver",
                description: "Get your portfolio instantly. Download, share, and start landing those interviews."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <Card className="bg-slate-800/50 border-slate-700 p-8 hover:border-amber-500/50 transition-all h-full">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center mb-6">
                    <item.icon className="w-8 h-8 text-slate-900" />
                  </div>
                  <div className="text-6xl font-bold text-slate-700 mb-4">{item.step}</div>
                  <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-slate-300 leading-relaxed">{item.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Samples */}
      <section id="samples" className="py-20 px-6 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-bold text-center text-white mb-16"
          >
            Portfolio Samples
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
                <Card className="bg-slate-800 border-slate-700 overflow-hidden hover:border-amber-500/50 transition-all cursor-pointer group">
                  <div className="aspect-[3/4] bg-gradient-to-br from-slate-700 to-slate-800 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-bold text-slate-600 group-hover:text-amber-500 transition-colors">
                        {template}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">{template}</h3>
                    <Button variant="ghost" className="text-amber-400 hover:text-amber-300 p-0 h-auto">
                      View Template <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </Card>
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

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-bold text-center text-white mb-16"
          >
            What Sales Professionals Say
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "The portfolio got me into final-round interviews with 3 companies in a week. Game changer!",
                name: "Sarah L.",
                title: "Enterprise Sales"
              },
              {
                quote: "I closed my biggest deal yet after showing my portfolio to the prospect. Visual proof wins.",
                name: "Marcus T.",
                title: "Account Executive"
              },
              {
                quote: "Finally, a way to showcase my achievements that actually gets noticed. Worth every penny.",
                name: "Jennifer K.",
                title: "Sales Director"
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
                    <p className="text-white font-semibold">{testimonial.name}</p>
                    <p className="text-slate-400">{testimonial.title}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-6 bg-gradient-to-r from-amber-500 to-amber-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-slate-900 mb-6">
              Ready to Land Your Next Big Role or Client?
            </h2>
            <p className="text-2xl text-slate-800 mb-8">
              Start creating your professional sales portfolio today
            </p>
            <Link to={createPageUrl("CreatePortfolio")}>
              <Button
                size="lg"
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xl px-12 py-8 rounded-xl"
              >
                <Rocket className="w-6 h-6 mr-3" />
                Create Your Portfolio Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-12 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/691bdb06ad7d9d6aed9c3e5c/9e08195bb_riefKase1.png"
                  alt="Briefkase"
                  className="h-10"
                />
              </div>
              <p className="text-slate-400">
                Transform your sales success into visual stories that close deals.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-amber-400 transition-colors">Home</a></li>
                <li><Link to={createPageUrl("Dashboard")} className="text-slate-400 hover:text-amber-400 transition-colors">Dashboard</Link></li>
                <li><Link to={createPageUrl("CreatePortfolio")} className="text-slate-400 hover:text-amber-400 transition-colors">Create Portfolio</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Templates</h4>
              <ul className="space-y-2">
                <li><a href="#samples" className="text-slate-400 hover:text-amber-400 transition-colors">View Samples</a></li>
                <li><a href="#samples" className="text-slate-400 hover:text-amber-400 transition-colors">All Templates</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-slate-400">
                  <Mail className="w-4 h-4" />
                  <span>hello@portfoliohub.com</span>
                </li>
                <li className="flex items-center gap-2 text-slate-400">
                  <Phone className="w-4 h-4" />
                  <span>(555) 123-4567</span>
                </li>
                <li>
                  <a href="#" className="inline-flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors">
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 text-center text-slate-500">
            <p>&copy; 2025 Briefkase. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}