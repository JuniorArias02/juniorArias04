import { useState, useEffect } from "react";
import { proyectos } from "../../backend/data/proyectos.json";
import { motion, AnimatePresence } from "framer-motion";
import { FiExternalLink, FiGithub, FiCode, FiX, FiUsers, FiCpu, FiDatabase, FiServer, FiLayers } from "react-icons/fi";
import {
  FaReact,
  FaNodeJs,
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
  FaPython,
  FaDatabase
} from "react-icons/fa";
import {
  SiTypescript,
  SiTailwindcss,
  SiNextdotjs,
  SiMongodb,
  SiExpress,
  SiDocker,
  SiNpm,
  SiMysql,
  SiStripe
} from "react-icons/si";

const Proyectos = () => {
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedId]);

  // Mapeo de iconos de tecnologías
  const getTechIcon = (techName) => {
    const iconSize = 16;
    const icons = {
      react: <FaReact size={iconSize} className="text-[#61DAFB]" />,
      node: <FaNodeJs size={iconSize} className="text-[#68A063]" />,
      javascript: <FaJs size={iconSize} className="text-[#F7DF1E]" />,
      typescript: <SiTypescript size={iconSize} className="text-[#3178C6]" />,
      html: <FaHtml5 size={iconSize} className="text-[#E34F26]" />,
      css: <FaCss3Alt size={iconSize} className="text-[#1572B6]" />,
      tailwind: <SiTailwindcss size={iconSize} className="text-[#06B6D4]" />,
      nextjs: <SiNextdotjs size={iconSize} className="text-white" />,
      git: <FaGitAlt size={iconSize} className="text-[#F05032]" />,
      python: <FaPython size={iconSize} className="text-[#3776AB]" />,
      mongodb: <SiMongodb size={iconSize} className="text-[#47A248]" />,
      express: <SiExpress size={iconSize} className="text-white" />,
      docker: <SiDocker size={iconSize} className="text-[#2496ED]" />,
      mysql: <SiMysql size={iconSize} className="text-[#00758F]" />,
      stripe: <SiStripe size={iconSize} className="text-[#635bff]" />,
      database: <FaDatabase size={iconSize} className="text-[#336791]" />,
      npm: <SiNpm size={iconSize} className="text-[#CB3837]" />
    };

    const techLower = techName.toLowerCase();
    return icons[techLower] || <FiCode size={iconSize} className="text-gray-400" />;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto relative z-10 min-h-screen">

      {/* Header Tech Style */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 text-center relative"
      >
        <div className="inline-block relative">
          <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 tracking-tighter uppercase mb-2">
            System.Projects
          </h1>
          <div className="h-1 w-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full" />
          <p className="font-mono text-xs text-emerald-400 mt-2 tracking-widest">
                // INITIALIZING_MODULE: PORTFOLIO_V2
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {proyectos.map((proyecto) => (
          <motion.div
            key={proyecto.id}
            layoutId={`project-${proyecto.id}`}
            onClick={() => setSelectedId(proyecto.id)}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="cursor-pointer group relative bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-2xl hover:shadow-[0_0_20px_rgba(79,70,229,0.15)] transition-all duration-300"
          >
            {/* Holographic scanning effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/10 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000 pointer-events-none z-20" />

            {/* Tech Decoration */}
            <div className="absolute top-2 left-2 z-20 flex gap-1">
              <div className="w-1 h-1 bg-red-500 rounded-full" />
              <div className="w-1 h-1 bg-gray-600 rounded-full" />
            </div>
            <div className="absolute top-2 right-2 z-20 font-mono text-[10px] text-gray-500">
              ID: 0x0{proyecto.id}
            </div>

            {/* Imagen Principal */}
            <motion.div className="h-48 overflow-hidden relative border-b border-gray-800">
              <motion.img
                src={proyecto.img}
                alt={proyecto.titulo}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter grayscale-[20%] group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-indigo-900/10 mix-blend-overlay" />
            </motion.div>

            {/* Contenido Card Minimalista */}
            <div className="p-5 relative">
              <motion.h2 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors flex items-center gap-2">
                <FiCpu className="text-gray-600 group-hover:text-indigo-500 transition-colors" size={16} />
                {proyecto.titulo}
              </motion.h2>
              <p className="text-gray-400 text-sm line-clamp-2 mb-4 h-10 font-mono text-xs leading-relaxed">
                {proyecto.descripcion}
              </p>

              <div className="flex flex-wrap gap-1.5 mt-auto">
                {proyecto.tecnologias.slice(0, 3).map((tech, index) => (
                  <span key={index} className="text-[10px] uppercase tracking-wider bg-gray-800 text-gray-400 px-2 py-1 rounded border border-gray-700">
                    {tech}
                  </span>
                ))}
                {proyecto.tecnologias.length > 3 && (
                  <span className="text-[10px] bg-gray-800 text-gray-400 px-2 py-1 rounded border border-gray-700">
                    +{proyecto.tecnologias.length - 3}
                  </span>
                )}
              </div>
            </div>

            {/* Bottom Status Bar */}
            <div className="px-5 py-2 bg-gray-950 border-t border-gray-800 flex justify-between items-center text-[10px] font-mono text-gray-500">
              <span>STATUS: ONLINE</span>
              <span className="text-emerald-500">● READY</span>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedId && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[999] flex items-center justify-center p-4 md:p-8"
            >
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)',
                  backgroundSize: '24px 24px'
                }}
              />

              <motion.div
                layoutId={`project-${selectedId}`}
                className="bg-gray-900 w-full max-w-6xl h-[85vh] rounded-xl overflow-hidden shadow-2xl relative flex flex-col md:flex-row border border-gray-700 ring-1 ring-white/10"
                onClick={(e) => e.stopPropagation()}
              >

                {/* Tech Blueprint Corners */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-indigo-500 z-30 pointer-events-none" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-indigo-500 z-30 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-indigo-500 z-30 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-indigo-500 z-30 pointer-events-none" />

                {/* Botón Cerrar */}
                <button
                  onClick={() => setSelectedId(null)}
                  className="absolute top-4 right-4 z-40 bg-gray-950/80 p-2 rounded-lg text-white hover:bg-red-500/80 transition-colors border border-gray-700"
                >
                  <FiX size={20} />
                </button>

                {/* Columna Izquierda: Galería e Info Visual */}
                <div className="w-full md:w-5/12 h-64 md:h-full bg-gray-950 relative overflow-hidden flex-shrink-0 border-r border-gray-800">
                  {(() => {
                    const project = proyectos.find(p => p.id === selectedId);
                    return (
                      <>
                        <img
                          src={project.img}
                          alt={project.titulo}
                          className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
                        />
                        {/* Scanline Effect */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent bg-[length:100%_4px] opacity-20" />

                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />

                        <div className="absolute bottom-0 left-0 p-8 w-full">
                          <div className="flex gap-2 mb-2 font-mono text-xs text-indigo-400">
                            <span>&lt;PROJECT_DETAILS&gt;</span>
                          </div>
                          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-none glitch-text tracking-tight">
                            {project.titulo}
                          </h2>

                          <div className="flex flex-wrap gap-2 mb-4 font-mono text-xs">
                            {project.estado && (
                              <span className={`px-2 py-1 rounded border ${project.estado === 'Completado' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
                                }`}>
                                [STATUS: {project.estado.toUpperCase()}]
                              </span>
                            )}
                            {project.duracion && (
                              <span className="px-2 py-1 rounded bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
                                [TIME: {project.duracion}]
                              </span>
                            )}
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>

                {/* Columna Derecha: Detalles y Scroll */}
                <div className="w-full md:w-7/12 p-8 md:p-10 overflow-y-auto custom-scrollbar bg-gray-900 flex flex-col relative">
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>

                  {(() => {
                    const project = proyectos.find(p => p.id === selectedId);
                    return (
                      <div className="space-y-10 pb-8 relative z-10">

                        {/* Description Section */}
                        <div>
                          <h3 className="flex items-center gap-2 text-sm font-bold text-indigo-400 mb-4 tracking-wider uppercase font-mono">
                            <FiLayers /> 01. System Overview
                          </h3>
                          <div className="pl-4 border-l-2 border-gray-800">
                            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                              {project.descripcion}
                            </p>
                          </div>
                        </div>

                        {/* Tech Stack Section */}
                        <div>
                          <h3 className="flex items-center gap-2 text-sm font-bold text-emerald-400 mb-4 tracking-wider uppercase font-mono">
                            <FiDatabase /> 02. Module Dependencies
                          </h3>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {project.tecnologias.map((tech, i) => (
                              <div key={i} className="flex items-center gap-2 bg-gray-950 p-2 rounded border border-gray-800 hover:border-emerald-500/50 transition-colors group">
                                {getTechIcon(tech)}
                                <span className="text-xs text-gray-400 group-hover:text-emerald-300 font-mono transition-colors">{tech}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Functionalities Section */}
                        {project.funcionalidades && project.funcionalidades[0] !== "None" && (
                          <div>
                            <h3 className="flex items-center gap-2 text-sm font-bold text-amber-400 mb-4 tracking-wider uppercase font-mono">
                              <FiServer /> 03. Core Functions
                            </h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                              {project.funcionalidades.map((func, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
                                  <span className="text-amber-500 mt-1">▹</span>
                                  {func}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Team & Client */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-950/50 p-4 rounded-lg border border-gray-800 dashed-border">
                          {project.team && project.team !== "None" && (
                            <div>
                              <div className="flex items-center gap-2 text-gray-500 mb-2 font-mono text-[10px] uppercase">
                                <FiUsers /> Team
                              </div>
                              <p className="text-sm text-gray-200">{project.team}</p>
                              {project.paginaTeam && project.paginaTeam !== "None" && (
                                <a href={project.paginaTeam} target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-400 hover:text-indigo-300 mt-1 inline-block hover:underline">
                                  View Organization
                                </a>
                              )}
                            </div>
                          )}
                          {project.cliente && project.cliente !== "None" && (
                            <div>
                              <div className="flex items-center gap-2 text-gray-500 mb-2 font-mono text-[10px] uppercase">
                                <FiUsers /> Client
                              </div>
                              <p className="text-sm text-gray-200">{project.cliente}</p>
                              <p className="text-xs text-gray-500">{project.ubicacion}</p>
                            </div>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-2 flex flex-col sm:flex-row gap-4 mt-auto">
                          {project.url && project.url !== "None" && (
                            <a
                              href={project.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-indigo-500/25 border border-indigo-500/50 group"
                            >
                              <FiExternalLink className="group-hover:rotate-45 transition-transform" />
                              <span className="tracking-wide">Lauch Demo</span>
                            </a>
                          )}
                          {project.repositorio && project.repositorio !== "None" && (
                            <a
                              href={project.repositorio}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all border border-gray-700 hover:border-gray-500 group"
                            >
                              <FiGithub className="group-hover:scale-110 transition-transform" />
                              <span className="tracking-wide">Source Code</span>
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Proyectos;