import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Download, Mail, Share2, Check, Loader2, FileText, Image } from "lucide-react";
import { toast } from "sonner";

export default function PortfolioActions({ person, portfolioUrl }) {
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleDownloadImages = async () => {
    setDownloading(true);
    toast.info("Preparing portfolio - this may take a moment...");
    
    try {
      // Scroll through entire page first to ensure all content is rendered
      const scrollHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      
      for (let i = 0; i < scrollHeight; i += viewportHeight) {
        window.scrollTo(0, i);
        await new Promise(r => setTimeout(r, 100));
      }
      window.scrollTo(0, 0);
      await new Promise(r => setTimeout(r, 300));
      
      // Get all sections
      const sections = document.querySelectorAll('section');
      
      if (sections.length === 0) {
        toast.error("No sections found to download");
        setDownloading(false);
        return;
      }

      // Create a simple canvas-based screenshot for each section
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        
        // Scroll section into view
        section.scrollIntoView({ behavior: 'instant' });
        await new Promise(r => setTimeout(r, 200));
        
        // Get section dimensions
        const rect = section.getBoundingClientRect();
        
        // Create canvas matching section size
        const canvas = document.createElement('canvas');
        const scale = 2; // For higher quality
        canvas.width = rect.width * scale;
        canvas.height = rect.height * scale;
        
        const ctx = canvas.getContext('2d');
        ctx.scale(scale, scale);
        
        // Draw background color
        const computedStyle = window.getComputedStyle(section);
        ctx.fillStyle = computedStyle.backgroundColor || '#ffffff';
        ctx.fillRect(0, 0, rect.width, rect.height);
        
        // Use SVG foreignObject approach for better rendering
        const data = `
          <svg xmlns="http://www.w3.org/2000/svg" width="${rect.width}" height="${rect.height}">
            <foreignObject width="100%" height="100%">
              <div xmlns="http://www.w3.org/1999/xhtml">
                ${section.outerHTML}
              </div>
            </foreignObject>
          </svg>
        `;
        
        const img = new window.Image();
        const svgBlob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);
        
        await new Promise((resolve, reject) => {
          img.onload = () => {
            ctx.drawImage(img, 0, 0);
            URL.revokeObjectURL(url);
            
            // Download the canvas as JPEG
            canvas.toBlob((blob) => {
              if (blob) {
                const downloadUrl = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.download = `${person.full_name?.replace(/\s+/g, '_') || 'portfolio'}_page_${i + 1}.jpg`;
                link.href = downloadUrl;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(downloadUrl);
              }
              resolve();
            }, 'image/jpeg', 0.9);
          };
          img.onerror = () => {
            URL.revokeObjectURL(url);
            resolve(); // Continue even if one fails
          };
          img.src = url;
        });
        
        await new Promise(r => setTimeout(r, 300));
      }
      
      window.scrollTo(0, 0);
      toast.success(`Portfolio download complete!`);
    } catch (error) {
      console.error("Error downloading images:", error);
      toast.error("Download failed. Try using Print / Save as PDF instead.");
    }
    
    setDownloading(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Portfolio link copied to clipboard!");
  };

  const handleEmailPortfolio = async () => {
    if (!email) {
      toast.error("Please enter an email address");
      return;
    }

    setSending(true);
    try {
      const portfolioLink = window.location.href;
      
      await base44.integrations.Core.SendEmail({
        to: email,
        subject: `${person.full_name}'s Sales Portfolio`,
        body: `
Hello,

${person.full_name} has shared their professional sales portfolio with you.

View the portfolio here: ${portfolioLink}

Portfolio Highlights:
• Title: ${person.title || 'Sales Professional'}
• Experience: ${person.experience?.length || 0} positions
• Key Skills: ${person.skills?.slice(0, 5).join(', ') || 'View portfolio for details'}

Best regards,
The Briefkase Team
        `.trim()
      });

      toast.success(`Portfolio sent to ${email}!`);
      setShowEmailDialog(false);
      setEmail("");
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Failed to send email. Please try again.");
    }
    setSending(false);
  };

  return (
    <>
      <div className="fixed bottom-6 left-6 z-50 flex gap-2">
        {/* Download/Print Button */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-slate-900 text-white shadow-lg hover:bg-slate-800 rounded-full px-5">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuItem onClick={handleDownloadImages} className="cursor-pointer" disabled={downloading}>
              {downloading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Downloading pages...
                </>
              ) : (
                <>
                  <Image className="w-4 h-4 mr-2" />
                  Download as Images (JPG)
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handlePrint} className="cursor-pointer">
              <FileText className="w-4 h-4 mr-2" />
              Print / Save as PDF
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleCopyLink} className="cursor-pointer">
              <Share2 className="w-4 h-4 mr-2" />
              Copy Link
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Email Button */}
        <Button 
          onClick={() => setShowEmailDialog(true)}
          className="bg-amber-500 text-slate-900 shadow-lg hover:bg-amber-600 rounded-full px-5"
        >
          <Mail className="w-4 h-4 mr-2" />
          Email
        </Button>
      </div>

      {/* Email Dialog */}
      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Email Portfolio</DialogTitle>
            <DialogDescription>
              Send a link to this portfolio via email
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <Input
              type="email"
              placeholder="Enter recipient's email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-lg"
            />
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowEmailDialog(false)}
                className="flex-1"
                disabled={sending}
              >
                Cancel
              </Button>
              <Button
                onClick={handleEmailPortfolio}
                className="flex-1 bg-amber-500 hover:bg-amber-600 text-slate-900"
                disabled={sending}
              >
                {sending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 mr-2" />
                    Send
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Print Styles */}
      <style>{`
        @media print {
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          .fixed {
            display: none !important;
          }
          
          html {
            height: auto !important;
            overflow: visible !important;
          }
          
          body {
            height: auto !important;
            overflow: visible !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          
          body > div,
          body > div > div,
          #root,
          #root > div {
            height: auto !important;
            overflow: visible !important;
            display: block !important;
          }
          
          section {
            display: block !important;
            position: relative !important;
            overflow: visible !important;
            height: auto !important;
            min-height: 0 !important;
            padding-top: 40px !important;
            padding-bottom: 40px !important;
            page-break-after: always !important;
            break-after: page !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          
          section:last-of-type {
            page-break-after: avoid !important;
            break-after: avoid !important;
          }
          
          /* Remove flex centering that causes issues */
          section.min-h-screen {
            min-height: 0 !important;
            height: auto !important;
          }
          
          section.flex {
            display: block !important;
          }
          
          section .flex.items-center.justify-center {
            display: block !important;
          }
          
          /* Ensure content is visible */
          .motion-div, [class*="motion"] {
            opacity: 1 !important;
            transform: none !important;
          }
          
          /* Hide animations */
          [class*="animate-"] {
            animation: none !important;
          }
        }
        
        @page {
          size: A4;
          margin: 0;
        }
      `}</style>
    </>
  );
}