import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import RUTAS from "../../router/router";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const links = [
    { name: "Inicio", to:RUTAS.INICIO },
    { name: "Proyectos", to:RUTAS.PROYECTOS },
    { name: "Habilidades", to: "/habilidades" },
    { name: "Contacto", to: "/contacto" },
  ];

  // Animaciones
  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800/80 backdrop-blur-md border-b border-gray-700 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link 
            to="/" 
            className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent"
          >
            JuniDev
          </Link>
        </motion.div>

        {/* Desktop menu */}
        <nav className="hidden md:flex space-x-6">
          {links.map((link) => (
            <motion.div key={link.to} whileHover={{ y: -2 }}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-all ${
                    isActive 
                      ? "text-indigo-400" 
                      : "text-gray-300 hover:text-emerald-400"
                  }`
                }
              >
                {link.name}
              </NavLink>
            </motion.div>
          ))}
        </nav>

        {/* Mobile menu toggle */}
        <motion.button 
          whileTap={{ scale: 0.9 }}
          className="md:hidden text-gray-300 hover:text-indigo-400 transition-colors" 
          onClick={toggleMenu}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
            className="md:hidden px-4 pb-4 space-y-3 bg-gray-800/95 backdrop-blur-sm"
          >
            {links.map((link) => (
              <motion.div key={link.to} variants={itemVariants}>
                <NavLink
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block py-2 px-3 rounded-md text-sm font-medium ${
                      isActive 
                        ? "bg-gray-700 text-indigo-400" 
                        : "text-gray-300 hover:bg-gray-700 hover:text-emerald-400"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;