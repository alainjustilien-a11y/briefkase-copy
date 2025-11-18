import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export default function ProcessingState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      <Card className="p-16 bg-white border-slate-200 shadow-xl">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 mx-auto mb-8"
          >
            <div className="w-full h-full bg-gradient-to-br from-amber-400 to-amber-600 rounded-3xl flex items-center justify-center">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
          </motion.div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Creating Your Portfolio
          </h2>
          <p className="text-slate-600 text-lg max-w-md mx-auto">
            Our AI is analyzing the resume and extracting key information to build a stunning portfolio
          </p>
          <div className="mt-8 flex justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                className="w-3 h-3 bg-amber-400 rounded-full"
              />
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}