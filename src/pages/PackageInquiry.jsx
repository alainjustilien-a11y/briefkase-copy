import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { CheckCircle, Sparkles, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";

export default function PackageInquiry() {
  const packages = {
    Starter: { price: "$49", color: "from-slate-900 to-slate-800" },
    Professional: { price: "$149", color: "from-amber-500 to-amber-600" },
    Elite: { price: "$299", color: "from-purple-600 to-purple-800" }
  };

  const urlParams = new URLSearchParams(window.location.search);
  const requestedPackage = urlParams.get('package') || 'Professional';
  const packageName = packages[requestedPackage] ? requestedPackage : 'Professional';
  
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    package_selected: packageName,
    company: "",
    job_title: "",
    message: ""
  });

  const submitMutation = useMutation({
    mutationFn: (data) => base44.entities.PackageInquiry.create(data),
    onSuccess: async (inquiry) => {
      await base44.integrations.Core.SendEmail({
        to: formData.email,
        subject: `Your ${packageName} Portfolio Package - Next Steps`,
        body: `Hi ${formData.full_name},\n\nThank you for choosing TheBriefkase ${packageName} package!\n\nWe've received your request and will be in touch within 24 hours to get started on your professional sales portfolio.\n\nPackage Selected: ${packageName}\n\nWhat happens next:\n1. We'll review your information\n2. Schedule a brief consultation call\n3. Begin crafting your portfolio\n4. Deliver your final portfolio\n\nQuestions? Just reply to this email.\n\nBest regards,\nThe Briefkase Team`
      });
      setSubmitted(true);
    },
    onError: (error) => {
      alert("Something went wrong. Please try again or contact us directly.");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    submitMutation.mutate(formData);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full"
        >
          <Card className="p-12 text-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4">
              Request Received!
            </h1>
            <p className="text-xl text-slate-600 mb-2">
              Thank you for choosing the <span className="font-bold text-amber-600">{packageName}</span> package.
            </p>
            <p className="text-slate-600 mb-8">
              We've sent a confirmation email to <span className="font-semibold">{formData.email}</span>. 
              Our team will reach out within 24 hours to get started on your portfolio.
            </p>
            <Link to={createPageUrl("Home")}>
              <Button className="bg-slate-900 hover:bg-slate-800 text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <Link to={createPageUrl("Home")} className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Package Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className={`bg-gradient-to-br ${packages[packageName].color} rounded-2xl p-8 text-white mb-6 shadow-xl`}>
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="w-8 h-8" />
                  <div>
                    <h2 className="text-3xl font-bold">{packageName}</h2>
                    <div className="text-4xl font-bold mt-2">{packages[packageName].price}</div>
                  </div>
                </div>
              </div>

              <Card className="p-6 bg-white">
                <h3 className="font-bold text-slate-900 mb-4">What's Included:</h3>
                <ul className="space-y-3 text-slate-600">
                  {packageName === 'Starter' && (
                    <>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span>Single-page brief</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span>Cover page</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span>Basic layout</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span>Quick delivery</span>
                      </li>
                    </>
                  )}
                  {packageName === 'Professional' && (
                    <>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span>Multi-page portfolio</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span>Metrics dashboard</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span>Case studies included</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span>Custom branding</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span>PDF + Web versions</span>
                      </li>
                    </>
                  )}
                  {packageName === 'Elite' && (
                    <>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span>Fully done-for-you portfolio</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span>Custom copywriting</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span>Full redesign + revisions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span>24-hour delivery</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span>Premium branding included</span>
                      </li>
                    </>
                  )}
                </ul>
              </Card>
            </motion.div>
          </div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Let's Get Started</h2>
              <p className="text-slate-600 mb-6">Fill out the form below and we'll be in touch within 24 hours.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name *
                  </label>
                  <Input
                    required
                    value={formData.full_name}
                    onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email *
                  </label>
                  <Input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Phone
                  </label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Current Job Title
                  </label>
                  <Input
                    value={formData.job_title}
                    onChange={(e) => setFormData({...formData, job_title: e.target.value})}
                    placeholder="Account Executive"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Company
                  </label>
                  <Input
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    placeholder="Acme Corp"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Additional Details
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Tell us about your goals, timeline, or any specific requirements..."
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-bold py-6"
                  disabled={submitMutation.isPending}
                >
                  {submitMutation.isPending ? "Submitting..." : "Submit Request"}
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}