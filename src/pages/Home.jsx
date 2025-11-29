import React from "react";
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
                          <img 
                                                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/691bdb06ad7d9d6aed9c3e5c/85a82ec1f_goldblackminimalistchessknightlogodesign3.png"
                                                alt="Briefkase"
                                                className="h-16 mb-6"
                                              />
                          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Stand Out. Get More Interviews.{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                  Close Your Next Job Faster.
                </span>
              </h1>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Your professionally designed sales portfolio tells your story, showcases your wins, and gets you noticed — instantly.
              </p>

              {/* Benefits Checklist */}
              <div className="space-y-3 mb-8">
                {[
                  "Recruiters see your real value",
                  "Highlight metrics & deals",
                  "Show professionalism beyond a resume",
                  "Designed to convert interviews"
                ].map((benefit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                    <span className="text-slate-300">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              {/* Mini Packages */}
              <div className="flex items-center gap-4 mb-8 text-sm">
                <span className="text-slate-400">Starting at:</span>
                <div className="flex gap-3">
                  <span className="bg-slate-800 text-amber-400 px-3 py-1 rounded-full font-semibold">$49</span>
                  <span className="bg-slate-800 text-amber-400 px-3 py-1 rounded-full font-semibold">$149</span>
                  <span className="bg-slate-800 text-amber-400 px-3 py-1 rounded-full font-semibold">$299</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link to={createPageUrl("CreatePortfolio")}>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-bold text-lg px-8 py-6 rounded-xl"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Build My Portfolio
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
            </motion.div>

            {/* Right: Before/After Visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                {/* Before/After Container */}
                <div className="flex gap-4 items-stretch">
                  {/* BEFORE - Resume */}
                  <div className="flex-1 relative">
                    <div className="absolute -top-3 left-4 bg-slate-600 text-slate-300 px-3 py-1 rounded-full text-xs font-semibold z-10">
                      BEFORE
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-xl opacity-60 h-full">
                      <div className="space-y-3">
                        <div className="h-4 w-3/4 bg-slate-300 rounded" />
                        <div className="h-3 w-1/2 bg-slate-200 rounded" />
                        <div className="border-t border-slate-200 pt-3 mt-3">
                          <div className="h-2 w-full bg-slate-200 rounded mb-2" />
                          <div className="h-2 w-full bg-slate-200 rounded mb-2" />
                          <div className="h-2 w-4/5 bg-slate-200 rounded mb-2" />
                        </div>
                        <div className="border-t border-slate-200 pt-3">
                          <div className="h-2 w-full bg-slate-200 rounded mb-2" />
                          <div className="h-2 w-full bg-slate-200 rounded mb-2" />
                          <div className="h-2 w-3/4 bg-slate-200 rounded" />
                        </div>
                        <div className="border-t border-slate-200 pt-3">
                          <div className="h-2 w-full bg-slate-200 rounded mb-2" />
                          <div className="h-2 w-5/6 bg-slate-200 rounded" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex items-center">
                    <ArrowRight className="w-8 h-8 text-amber-500" />
                  </div>

                  {/* AFTER - Portfolio */}
                  <div className="flex-1 relative">
                    <div className="absolute -top-3 left-4 bg-amber-500 text-slate-900 px-3 py-1 rounded-full text-xs font-bold z-10">
                      AFTER
                    </div>
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-4 shadow-2xl border-2 border-amber-500/30 h-full">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-amber-500/30" />
                        <div>
                          <div className="h-3 w-20 bg-white/30 rounded mb-1" />
                          <div className="h-2 w-16 bg-amber-500/50 rounded" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <div className="bg-slate-700/50 rounded-lg p-2 text-center">
                          <div className="text-amber-400 font-bold text-sm">142%</div>
                          <div className="text-[10px] text-slate-400">Quota</div>
                        </div>
                        <div className="bg-slate-700/50 rounded-lg p-2 text-center">
                          <div className="text-amber-400 font-bold text-sm">$2.8M</div>
                          <div className="text-[10px] text-slate-400">Revenue</div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 w-full bg-slate-700/50 rounded" />
                        <div className="h-2 w-4/5 bg-slate-700/50 rounded" />
                      </div>
                      <div className="mt-3 flex gap-2">
                        <div className="flex-1 h-8 bg-amber-500/20 rounded" />
                        <div className="flex-1 h-8 bg-slate-700/50 rounded" />
                      </div>
                    </div>
                  </div>
                </div>
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
            {/* Deal Wins Page */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <div>
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6">
                  <Trophy className="w-8 h-8 text-amber-500" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">Deal Wins Page</h3>
                <p className="text-lg text-slate-600 leading-relaxed">Showcase your biggest closes, deal sizes, timelines, and impact. Let your results speak louder than any resume.</p>
              </div>
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 shadow-xl">
                <h4 className="text-amber-400 font-semibold mb-4 text-sm">DEAL WINS</h4>
                <div className="space-y-3">
                  {[
                    { size: "$1.2M", industry: "Enterprise SaaS" },
                    { size: "$800K", industry: "FinTech" },
                    { size: "$450K", industry: "Healthcare" }
                  ].map((deal, i) => (
                    <div key={i} className="bg-slate-700/50 rounded-lg p-3 flex items-center justify-between">
                      <span className="text-amber-400 font-bold">{deal.size}</span>
                      <span className="text-slate-400 text-sm">{deal.industry}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Sales Dashboard */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <div className="md:order-2">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6">
                  <BarChart3 className="w-8 h-8 text-amber-500" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">Sales Dashboard</h3>
                <p className="text-lg text-slate-600 leading-relaxed">Present your KPIs, quota performance, pipeline progress, and results in a clear, visual format recruiters love.</p>
              </div>
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 shadow-xl md:order-1">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[
                    { label: "Quota", value: "142%" },
                    { label: "Revenue", value: "$2.8M" },
                    { label: "Pipeline", value: "$5.2M" },
                    { label: "Win Rate", value: "34%" }
                  ].map((kpi, i) => (
                    <div key={i} className="bg-slate-700/50 rounded-lg p-3 text-center">
                      <div className="text-amber-400 font-bold text-lg">{kpi.value}</div>
                      <div className="text-slate-400 text-xs">{kpi.label}</div>
                    </div>
                  ))}
                </div>
                <div className="flex items-end gap-2 h-16">
                  {[40, 60, 80, 100].map((h, i) => (
                    <div key={i} className="flex-1 bg-amber-500/80 rounded-t" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Case Studies */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <div>
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6">
                  <BookOpen className="w-8 h-8 text-amber-500" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">Case Studies</h3>
                <p className="text-lg text-slate-600 leading-relaxed">Mini win stories that demonstrate your ability to close, strategize, and execute on complex deals.</p>
              </div>
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 shadow-xl">
                <h4 className="text-amber-400 font-semibold mb-4 text-sm">CASE STUDY</h4>
                <div className="space-y-3">
                  <div className="border-l-2 border-red-500 pl-3">
                    <div className="text-xs text-slate-500">PROBLEM</div>
                    <div className="text-slate-300 text-sm">40% productivity loss</div>
                  </div>
                  <div className="border-l-2 border-blue-500 pl-3">
                    <div className="text-xs text-slate-500">STRATEGY</div>
                    <div className="text-slate-300 text-sm">Phased implementation</div>
                  </div>
                  <div className="border-l-2 border-amber-500 pl-3">
                    <div className="text-xs text-slate-500">RESULT</div>
                    <div className="text-amber-400 font-bold">$2.4M Contract</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Skills & Tech Stack */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <div className="md:order-2">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6">
                  <Wrench className="w-8 h-8 text-amber-500" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">Skills & Tech Stack</h3>
                <p className="text-lg text-slate-600 leading-relaxed">ATS-friendly, modern, visually structured overview of your sales strengths and tools you've mastered.</p>
              </div>
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 shadow-xl md:order-1">
                <h4 className="text-amber-400 font-semibold mb-4 text-sm">TECH STACK</h4>
                <div className="grid grid-cols-3 gap-2">
                  {["Salesforce", "HubSpot", "Outreach", "Gong", "LinkedIn", "ZoomInfo"].map((tool, i) => (
                    <div key={i} className="bg-slate-700/50 rounded-lg p-2 text-center">
                      <div className="text-slate-300 text-xs">{tool}</div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {["MEDDIC", "SPIN", "Challenger"].map((method, i) => (
                    <span key={i} className="bg-amber-500/20 text-amber-400 px-2 py-1 rounded text-xs">{method}</span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Branded Cover Page */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <div>
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6">
                  <User className="w-8 h-8 text-amber-500" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">Branded Cover Page</h3>
                <p className="text-lg text-slate-600 leading-relaxed">A premium, personal visual introduction designed to set you apart instantly from other candidates.</p>
              </div>
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 shadow-xl text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-slate-900">JD</span>
                </div>
                <div className="text-white text-xl font-bold mb-1">John Doe</div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-8 h-0.5 bg-amber-500" />
                  <span className="text-amber-400 text-sm tracking-widest">SALES PORTFOLIO</span>
                  <div className="w-8 h-0.5 bg-amber-500" />
                </div>
                <div className="text-slate-400 text-sm">Enterprise Account Executive</div>
              </div>
            </motion.div>

            {/* Easy Sharing */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <div className="md:order-2">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6">
                  <Share2 className="w-8 h-8 text-amber-500" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">Easy Sharing</h3>
                <p className="text-lg text-slate-600 leading-relaxed">Download your portfolio as a PDF or share it with a branded link. Perfect for emails and LinkedIn.</p>
              </div>
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 shadow-xl md:order-1">
                <div className="space-y-3">
                  <div className="bg-slate-700/50 rounded-lg p-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-red-500/20 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-red-400" />
                    </div>
                    <span className="text-slate-300 text-sm">Download PDF</span>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-blue-500/20 flex items-center justify-center">
                      <Share2 className="w-4 h-4 text-blue-400" />
                    </div>
                    <span className="text-slate-300 text-sm">thebriefkase.com/john-doe</span>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-amber-500/20 flex items-center justify-center">
                      <Monitor className="w-4 h-4 text-amber-400" />
                    </div>
                    <span className="text-slate-300 text-sm">Copy Link to Share</span>
                  </div>
                </div>
              </div>
            </motion.div>
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
            {[
              { name: 'Executive', colors: ['from-slate-900', 'to-slate-800'], accent: 'bg-amber-400' },
              { name: 'Modern', colors: ['from-blue-500', 'to-purple-600'], accent: 'bg-white' },
              { name: 'Creative', colors: ['from-pink-500', 'to-orange-500'], accent: 'bg-white' },
              { name: 'Professional Blue', colors: ['from-blue-700', 'to-blue-900'], accent: 'bg-yellow-400' }
            ].map((template, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={createPageUrl("Dashboard")}>
                  <Card className="bg-slate-100 border-slate-200 overflow-hidden hover:border-amber-500 transition-all cursor-pointer group hover:shadow-lg">
                    <div className={`aspect-[3/4] bg-gradient-to-br ${template.colors[0]} ${template.colors[1]} relative overflow-hidden p-4`}>
                      {/* Mini Portfolio Preview */}
                      <div className="h-full flex flex-col">
                        {/* Header */}
                        <div className="flex items-center gap-2 mb-3">
                          <div className={`w-8 h-8 rounded-full ${template.accent}`} />
                          <div className="flex-1">
                            <div className="h-2 w-16 bg-white/30 rounded mb-1" />
                            <div className="h-1.5 w-12 bg-white/20 rounded" />
                          </div>
                        </div>
                        {/* KPI Grid */}
                        <div className="grid grid-cols-2 gap-1.5 mb-3">
                          {[1,2,3,4].map(n => (
                            <div key={n} className="bg-white/10 rounded p-1.5 text-center">
                              <div className={`text-xs font-bold ${template.accent === 'bg-amber-400' ? 'text-amber-400' : template.accent === 'bg-yellow-400' ? 'text-yellow-400' : 'text-white'}`}>
                                {['142%', '$2.8M', '$5.2M', '34%'][n-1]}
                              </div>
                            </div>
                          ))}
                        </div>
                        {/* Content Lines */}
                        <div className="flex-1 space-y-1.5">
                          <div className="h-1.5 w-full bg-white/20 rounded" />
                          <div className="h-1.5 w-4/5 bg-white/20 rounded" />
                          <div className="h-1.5 w-3/4 bg-white/20 rounded" />
                        </div>
                        {/* Footer */}
                        <div className="flex gap-1.5 mt-2">
                          <div className={`flex-1 h-6 ${template.accent} rounded opacity-80`} />
                          <div className="flex-1 h-6 bg-white/20 rounded" />
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-white">
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">{template.name}</h3>
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
              Get the portfolio template that gets sales pros hired faster — free.
            </p>
            <Link to={createPageUrl("LeadCapture")}>
              <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-bold px-8 py-6 rounded-xl">
                Get My Free Template
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
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
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/691bdb06ad7d9d6aed9c3e5c/85a82ec1f_goldblackminimalistchessknightlogodesign3.png"
                alt="Briefkase"
                className="h-24"
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
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/691bdb06ad7d9d6aed9c3e5c/85a82ec1f_goldblackminimalistchessknightlogodesign3.png"
                alt="Briefkase"
                className="h-12 ml-auto mb-2"
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