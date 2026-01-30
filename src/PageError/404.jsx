import { motion } from "framer-motion";
import { FiAlertTriangle, FiPower, FiTerminal, FiCpu } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const GlitchText = ({ text }) => {
  return (
    <div className="relative inline-block">
      <motion.span
        className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-500 to-pink-600 font-black tracking-tighter"
        initial={{ skew: 0 }}
        animate={{
          skew: [0, -5, 5, 0],
          x: [0, 2, -2, 0]
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "mirror",
          repeatDelay: 2
        }}
      >
        {text}
      </motion.span>
      <motion.span
        className="absolute top-0 left-0 -z-10 text-red-600 opacity-70 blur-[1px]"
        animate={{
          x: [0, -3, 3, 0],
          opacity: [0.7, 0.4, 0.7]
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatType: "mirror"
        }}
      >
        {text}
      </motion.span>
      <motion.span
        className="absolute top-0 left-0 -z-10 text-cyan-400 opacity-70 blur-[1px]"
        animate={{
          x: [0, 3, -3, 0],
          opacity: [0.7, 0.4, 0.7]
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          repeatType: "mirror"
        }}
      >
        {text}
      </motion.span>
    </div>
  );
};

const TerminalLoader = () => {
  const [lines, setLines] = useState([
    "> System check initiated...",
    "> Verifying route integrity...",
  ]);

  useEffect(() => {
    const timeout1 = setTimeout(() => {
      setLines(prev => [...prev, "> Error: Route not found [404]"]);
    }, 800);

    const timeout2 = setTimeout(() => {
      setLines(prev => [...prev, "> Status: Critical Failure"]);
    }, 1600);

    const timeout3 = setTimeout(() => {
      setLines(prev => [...prev, "> Recommendation: System Reboot"]);
    }, 2400);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
  }, []);

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-md p-4 font-mono text-xs md:text-sm text-green-500 w-full max-w-md mt-8 shadow-lg">
      <div className="flex gap-2 mb-2 border-b border-gray-800 pb-2">
        <FiTerminal size={14} className="mt-0.5" />
        <span className="text-gray-400">root@system:~/diagnostics</span>
      </div>
      <div className="space-y-1">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={line.includes("Error") || line.includes("Critical") ? "text-red-400 font-bold" : "text-green-400"}
          >
            {line}
          </motion.div>
        ))}
        <motion.div
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="w-2 h-4 bg-green-500 inline-block align-middle ml-1"
        />
      </div>
    </div>
  );
};

const Error404 = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden"
    >
      {/* Abstract Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-900/10 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-900/10 rounded-full blur-3xl opacity-50" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(30,41,59,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(30,41,59,0.2)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
      </div>

      <motion.div
        drag
        dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }}
        className="relative z-10 flex flex-col items-center"
      >
        <div className="mb-6 relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-8 border border-dashed border-gray-700 rounded-full opacity-30"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-12 border border-dotted border-gray-800 rounded-full opacity-30"
          />
          <FiAlertTriangle size={64} className="text-red-500" />
        </div>

        <h1 className="text-9xl font-bold mb-2 leading-none select-none">
          <GlitchText text="404" />
        </h1>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-200 mb-2 uppercase tracking-widest">
          System Failure
        </h2>

        <p className="text-gray-500 max-w-sm mx-auto mb-6">
          The requested trajectory cannot be calculated. The sector you are trying to access does not exist in this dimension.
        </p>

        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(220, 38, 38, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="group relative bg-red-600 hover:bg-red-500 text-white px-8 py-3 rounded-md font-bold text-sm tracking-wider uppercase transition-all flex items-center gap-3 overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 transform skew-y-12" />
            <FiPower className="text-lg" />
            <span>Reboot System</span>
          </motion.button>
        </Link>

        <TerminalLoader />

      </motion.div>

      {/* Footer System Info */}
      <div className="absolute bottom-6 left-0 w-full text-center text-[10px] text-gray-600 font-mono">
        ERROR_CODE: 0x4_NOT_FOUND | SYSTEM_INTEGRITY: 84% | MODULE: NAVIGATION
      </div>
    </motion.div>
  );
};

export default Error404;