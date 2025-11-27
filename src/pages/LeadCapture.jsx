import React, { useState } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { 
  FileText, CheckCircle, Star, ArrowRight, Sparkles, 
  BarChart3, Trophy, Briefcase, Download
} from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function LeadCapture() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    setError("");

    try {
      // Check if lead already exists
      const existingLeads = await base44.entities.Lead.filter({ email });
      
      if (existingLeads.length === 0) {
        // Create new lead
        await base44.entities.Lead.create({
          email,
          source: "lead_magnet",
          status: "new",
          emails_sent: 0,
          discount_code: `BRIEFKASE20-${Date.now().toString(36).toUpperCase()}`
        });

        // Send first email with template
        await base44.integrations.Core.SendEmail({
          to: email,
          subject: "🎁 Your Free Sales Portfolio Template is Here!",
          body: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 40px; text-align: center;">
                <h1 style="color: #f59e0b; margin: 0;">Your Template is Ready!</h1>
              </div>
              
              <div style="padding: 30px; background: #fff;">
                <p style="font-size: 16px; color: #334155;">Hi there,</p>
                
                <p style="font-size: 16px; color: #334155;">
                  Thanks for downloading the Briefkase Sales Portfolio Template! You're already ahead of 90% of sales professionals who rely solely on resumes.
                </p>
                
                <div style="background: #f8fafc; border-left: 4px solid #f59e0b; padding: 20px; margin: 20px 0;">
                  <p style="margin: 0; color: #1e293b; font-weight: bold;">What's Inside:</p>
                  <ul style="color: #475569; margin-top: 10px;">
                    <li>Professional Cover Page Layout</li>
                    <li>KPI Dashboard Template</li>
                    <li>Deal Wins Showcase Section</li>
                    <li>Case Study Framework</li>
                    <li>Skills & Tools Grid</li>
                  </ul>
                </div>
                
                <p style="font-size: 16px; color: #334155;">
                  <strong>Pro Tip:</strong> The most successful portfolios include specific metrics. Don't just say "exceeded quota" — say "142% quota attainment generating $2.8M in revenue."
                </p>
                
                <div style="text-align: center; margin: 30px 0;">
                  <a href="https://thebriefkase.com" style="background: #f59e0b; color: #1e293b; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                    Build My Portfolio Now
                  </a>
                </div>
                
                <p style="font-size: 14px; color: #64748b;">
                  Stay tuned — I'll be sharing more tips on how to make your portfolio stand out.
                </p>
                
                <p style="font-size: 16px; color: #334155;">
                  To your success,<br/>
                  <strong>The Briefkase Team</strong>
                </p>
              </div>
              
              <div style="background: #1e293b; padding: 20px; text-align: center;">
                <p style="color: #94a3b8; font-size: 12px; margin: 0;">
                  © 2025 TheBriefkase.com — Stand out. Get hired.
                </p>
              </div>
            </div>
          `
        });

        // Update lead with email sent
        const [newLead] = await base44.entities.Lead.filter({ email });
        if (newLead) {
          await base44.entities.Lead.update(newLead.id, {
            emails_sent: 1,
            last_email_date: new Date().toISOString(),
            status: "nurturing"
          });
        }
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error("Error:", err);
      setError("Something went wrong. Please try again.");
    }
    
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg w-full text-center"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Check Your Inbox!
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            Your free Sales Portfolio Template is on its way to <span className="text-amber-400">{email}</span>
          </p>
          <div className="space-y-4">
            <Link to={createPageUrl("CreatePortfolio")}>
              <Button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-bold py-6 rounded-xl">
                <Sparkles className="w-5 h-5 mr-2" />
                Build My Portfolio Now
              </Button>
            </Link>
            <Link to={createPageUrl("Home")}>
              <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-800 py-6 rounded-xl">
                Back to Home
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center px-6 py-20 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-2 mb-6">
                <Download className="w-4 h-4 text-amber-400" />
                <span className="text-amber-400 text-sm font-medium">Free Download</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Get the Portfolio Template That Gets Sales Pros{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                  Hired Faster
                </span>
              </h1>

              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                The same proven layout used by top-performing sales professionals to land interviews at leading companies.
              </p>

              {/* Benefits */}
              <div className="space-y-4 mb-8">
                {[
                  "Professional cover page design",
                  "KPI dashboard layout",
                  "Deal wins showcase section",
                  "Case study framework",
                  "Skills & tools grid template"
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

              {/* Form */}
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 bg-white/10 border-slate-600 text-white placeholder:text-slate-400 py-6 rounded-xl"
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-bold px-8 py-6 rounded-xl whitespace-nowrap"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <>
                        <FileText className="w-5 h-5 mr-2" />
                        Get Free Template
                      </>
                    )}
                  </Button>
                </div>
                {error && <p className="text-red-400 text-sm">{error}</p>}
                <p className="text-sm text-slate-500">
                  No spam, ever. Unsubscribe anytime.
                </p>
              </motion.form>
            </motion.div>

            {/* Right - Template Preview */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <Card className="bg-white/5 border-slate-700 p-6 rounded-2xl backdrop-blur-sm">
                <div className="bg-slate-800 rounded-xl overflow-hidden">
                  {/* Template Preview Header */}
                  <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-center border-b border-slate-700">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mx-auto mb-4">
                      <Briefcase className="w-10 h-10 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">Your Name</div>
                    <div className="text-amber-400">Sales Portfolio</div>
                  </div>

                  {/* Dashboard Preview */}
                  <div className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: "Quota", value: "142%" },
                        { label: "Revenue", value: "$2.8M" },
                        { label: "Pipeline", value: "$5.2M" },
                        { label: "Win Rate", value: "34%" }
                      ].map((stat, i) => (
                        <div key={i} className="bg-slate-700/50 rounded-lg p-3 text-center">
                          <div className="text-amber-400 font-bold text-lg">{stat.value}</div>
                          <div className="text-xs text-slate-400">{stat.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Fake content lines */}
                    <div className="space-y-2">
                      <div className="h-3 bg-slate-700/50 rounded w-full" />
                      <div className="h-3 bg-slate-700/50 rounded w-4/5" />
                      <div className="h-3 bg-slate-700/50 rounded w-3/4" />
                    </div>
                  </div>
                </div>

                {/* Template Badge */}
                <div className="mt-4 flex items-center justify-center gap-2 text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span className="text-sm font-medium">Premium Template — FREE</span>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 px-6 border-t border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <p className="text-lg text-slate-300 italic mb-4">
            "I landed 3 interviews in my first week using this portfolio template."
          </p>
          <p className="text-amber-400 font-medium">— Enterprise AE, SaaS</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-slate-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Want Us to Build It For You?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Save time and let our team create a custom, conversion-optimized portfolio just for you.
          </p>
          <Link to={createPageUrl("Home") + "#pricing"}>
            <Button className="bg-white text-slate-900 hover:bg-slate-100 font-bold px-8 py-6 rounded-xl">
              View Pricing Options
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <img 
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/691bdb06ad7d9d6aed9c3e5c/9e08195bb_riefKase1.png"
            alt="Briefkase"
            className="h-6 mx-auto mb-4"
          />
          <p className="text-slate-500 text-sm">
            © 2025 TheBriefkase.com — Stand out. Get hired.
          </p>
        </div>
      </footer>
    </div>
  );
}