import { motion } from "framer-motion";
import { FiAlertTriangle, FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-center p-6"
    >
      {/* Efecto de partículas digitales (simulado con texto) */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        <div className="grid grid-cols-10 gap-1 h-full w-full">
          {[...Array(100)].map((_, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0] }}
              transition={{
                duration: Math.random() * 3 + 1,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
              className="text-xs text-emerald-400"
            >
              {Math.random() > 0.5 ? "1" : "0"}
            </motion.span>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="relative z-10"
      >
        {/* Icono animado */}
        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
            y: [0, -10, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "mirror"
          }}
          className="mx-auto mb-6 text-indigo-400"
        >
          <FiAlertTriangle size={80} />
        </motion.div>

        {/* Texto con gradiente */}
        <h1 className="text-8xl md:text-9xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">
          404
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-medium text-gray-300 mb-6">
          Página no encontrada
        </h2>
        
        <p className="text-gray-400 max-w-md mx-auto mb-8">
          La página que buscas ha sido movida, eliminada o quizá nunca existió.
        </p>

        {/* Botón animado */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 text-white px-6 py-3 rounded-lg font-medium transition-all"
          >
            <FiArrowLeft />
            Volver al inicio
          </Link>
        </motion.div>
      </motion.div>

      {/* Código de error simulado */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-xs text-gray-600 font-mono text-left max-w-md w-full"
      >
        <div className="bg-gray-800/50 p-4 rounded-lg border-l-4 border-indigo-400">
          <p><span className="text-emerald-400">console</span>.<span className="text-indigo-400">warn</span>(<span className="text-yellow-300">"Route not found: {window.location.pathname}"</span>);</p>
          <p><span className="text-gray-500">// Status: 404</span></p>
          <p><span className="text-gray-500">// Solución: Verificar ruta o volver al inicio</span></p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Error404;