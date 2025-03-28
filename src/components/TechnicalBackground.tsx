import React from "react";
import { motion } from "framer-motion";
import { Binary, Cpu, Network, Brain } from "lucide-react";

const FloatingIcon = ({
  children,
  delay,
  x,
  y,
}: {
  children: React.ReactNode;
  delay: number;
  x: number;
  y: number;
}) => (
  <motion.div
    initial={{ opacity: 0, x: 0, y: 0 }}
    animate={{
      opacity: [0.3, 0.6, 0.3],
      x: [x, x + 20, x],
      y: [y, y - 20, y],
    }}
    transition={{
      duration: 5,
      delay,
      repeat: Infinity,
      ease: "linear",
    }}
    className="absolute text-blue-400/40"
  >
    {children}
  </motion.div>
);

const TechnicalBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <FloatingIcon delay={0} x={100} y={100}>
        <Binary className="w-16 h-16" />
      </FloatingIcon>
      <FloatingIcon delay={1} x={300} y={200}>
        <Cpu className="w-20 h-20" />
      </FloatingIcon>
      <FloatingIcon delay={2} x={500} y={150}>
        <Network className="w-24 h-24" />
      </FloatingIcon>
      <FloatingIcon delay={3} x={200} y={400}>
        <Brain className="w-16 h-16" />
      </FloatingIcon>

      {/* Neural Network Lines */}
      <svg className="absolute inset-0 w-full h-full">
        <motion.path
          d="M0 100 Q 400 300, 800 100"
          stroke="rgba(96, 165, 250, 0.2)"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.path
          d="M100 0 Q 400 200, 700 400"
          stroke="rgba(167, 139, 250, 0.2)"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        />
      </svg>
    </div>
  );
};

export default TechnicalBackground;
