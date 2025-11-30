import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Plus, Users, Download, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import PortfolioCard from "../components/dashboard/PortfolioCard";
import StatsOverview from "../components/dashboard/StatsOverview";

export default function Dashboard() {
  const [downloadingAll, setDownloadingAll] = React.useState(false);

  const { data: salespeople, isLoading, error } = useQuery({
    queryKey: ['salespeople'],
    queryFn: () => base44.entities.Salesperson.list('-created_date'),
    initialData: [],
    retry: 2,
    refetchOnWindowFocus: false,
  });

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Unable to load portfolios</h2>
          <p className="text-slate-600 mb-4">Please refresh the page to try again</p>
          <Button onClick={() => window.location.reload()} className="bg-slate-900 hover:bg-slate-800">
            Refresh Page
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-2">
              Sales Portfolios
            </h1>
            <p className="text-slate-600 text-lg">
              Showcase your team's excellence
            </p>
          </div>
          <div className="flex gap-3">
            {salespeople.length > 0 && (
              <Button 
                variant="outline"
                className="px-6 py-6 rounded-xl"
                disabled={downloadingAll}
                onClick={() => {
                  setDownloadingAll(true);
                  toast.info(`Opening ${salespeople.length} portfolios for PDF download...`);
                  salespeople.forEach((person, i) => {
                    setTimeout(() => {
                      window.open(createPageUrl(`Portfolio?id=${person.id}`), '_blank');
                    }, i * 500);
                  });
                  setTimeout(() => {
                    setDownloadingAll(false);
                    toast.success("Use Print > Save as PDF in each tab to download");
                  }, salespeople.length * 500 + 500);
                }}
              >
                {downloadingAll ? (
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <Download className="w-5 h-5 mr-2" />
                )}
                Download All PDFs
              </Button>
            )}
            <Link to={createPageUrl("CreatePortfolio")}>
              <Button className="bg-slate-900 hover:bg-slate-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-6 rounded-xl">
                <Plus className="w-5 h-5 mr-2" />
                Create Portfolio
              </Button>
            </Link>
          </div>
        </motion.div>

        <StatsOverview salespeople={salespeople} />

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 bg-white rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : salespeople.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">No portfolios yet</h3>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">
              Start building your team's portfolio by creating your first salesperson profile
            </p>
            <Link to={createPageUrl("CreatePortfolio")}>
              <Button className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-6 rounded-xl text-lg">
                <Plus className="w-5 h-5 mr-2" />
                Create First Portfolio
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {salespeople.map((person, index) => (
              <PortfolioCard key={person.id} person={person} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}