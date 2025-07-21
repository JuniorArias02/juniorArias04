import { proyectos } from "../../backend/data/proyectos.json";
import { motion } from "framer-motion";
import { FiExternalLink, FiGithub, FiCode } from "react-icons/fi";
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
    <div className="p-6 max-w-7xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-12 bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent text-center"
      >
        Mis Proyectos
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {proyectos.map((proyecto) => (
          <motion.div
            key={proyecto.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-indigo-400/30 transition-all group"
          >
            {/* Imagen con efecto hover */}
            <div className="relative overflow-hidden h-48">
              <img
                src={proyecto.img}
                alt={proyecto.titulo}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div className="flex flex-wrap gap-2">
                  {proyecto.tecnologias.map((tech, index) => (
                    <span 
                      key={index} 
                      className="text-xs bg-gray-800/90 text-gray-100 px-2 py-1 rounded-md flex items-center gap-1"
                    >
                      {getTechIcon(tech)}
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Contenido de la card */}
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-semibold text-gray-100 group-hover:text-indigo-300 transition-colors">
                  {proyecto.titulo}
                </h2>
                <div className="flex space-x-2">
                  {proyecto.url !== "None" && (
                    <a
                      href={proyecto.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-indigo-400 transition-colors"
                      aria-label="Ver proyecto"
                    >
                      <FiExternalLink size={18} />
                    </a>
                  )}
                  {proyecto.repositorio !== "None" && (
                    <a
                      href={proyecto.repositorio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-emerald-400 transition-colors"
                      aria-label="Repositorio"
                    >
                      <FiGithub size={18} />
                    </a>
                  )}
                </div>
              </div>

              {/* Metadatos del proyecto */}
              <div className="mt-3 flex flex-wrap gap-2">
                {proyecto.estado && (
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    proyecto.estado === "Completado" 
                      ? "bg-emerald-900/50 text-emerald-400" 
                      : "bg-yellow-900/50 text-yellow-400"
                  }`}>
                    {proyecto.estado}
                  </span>
                )}
                {proyecto.duracion && (
                  <span className="text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded-full flex items-center gap-1">
                    ⏱️ {proyecto.duracion}
                  </span>
                )}
                {proyecto.responsive && (
                  <span className="text-xs bg-indigo-900/30 text-indigo-400 px-2 py-1 rounded-full flex items-center gap-1">
                    📱 Responsive
                  </span>
                )}
              </div>

              <p className="mt-4 text-sm text-gray-300 line-clamp-3">
                {proyecto.descripcion}
              </p>

              {/* Equipo */}
              {proyecto.team && proyecto.team !== "None" && (
                <div className="mt-3 pt-3 border-t border-gray-700/50">
                  <p className="text-xs text-gray-400">Equipo:</p>
                  <p className="text-sm text-indigo-300 mt-1">
                    {proyecto.team} + Junior Dev
                  </p>
                </div>
              )}

              {/* Footer de la card */}
              <div className="mt-6 pt-4 border-t border-gray-700/50 flex justify-between items-center">
                {proyecto.cliente && proyecto.cliente !== "None" && (
                  <span className="text-xs text-gray-400">
                    Cliente: <span className="text-indigo-300">{proyecto.cliente}</span>
                  </span>
                )}
                <a
                  href={proyecto.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium flex items-center text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Ver detalles <FiCode className="ml-1" size={14} />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Proyectos;