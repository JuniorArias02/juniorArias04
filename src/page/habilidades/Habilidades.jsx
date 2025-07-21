import { habilidades } from "../../backend/data/habilidades.json.";
import { motion } from "framer-motion";
import {
	FaReact,
	FaNodeJs,
	FaJs,
	FaHtml5,
	FaCss3Alt,
	FaGitAlt,
	FaPython,
	FaDatabase,
	FaGithub,
	FaStripeS
} from "react-icons/fa";
import {
	SiTypescript,
	SiTailwindcss,
	SiNextdotjs,
	SiMongodb,
	SiExpress,
	SiDocker,
	SiMysql,
	SiNpm
} from "react-icons/si";

const Habilidades = () => {
	// Mapeo de iconos
	const getIcon = (iconName) => {
		const iconSize = 24;
		const icons = {
			react: <FaReact size={iconSize} className="text-[#61DAFB]" />,
			node: <FaNodeJs size={iconSize} className="text-[#68A063]" />,
			npm: <SiNpm size={iconSize} className="text-[#CB3837]" />,
			javascript: <FaJs size={iconSize} className="text-[#F7DF1E]" />,
			typescript: <SiTypescript size={iconSize} className="text-[#3178C6]" />,
			html: <FaHtml5 size={iconSize} className="text-[#E34F26]" />,
			css: <FaCss3Alt size={iconSize} className="text-[#1572B6]" />,
			tailwind: <SiTailwindcss size={iconSize} className="text-[#06B6D4]" />,
			nextjs: <SiNextdotjs size={iconSize} className="text-white" />,
			git: <FaGitAlt size={iconSize} className="text-[#F05032]" />,
			github: <FaGithub size={iconSize} className="text-white" />,
			python: <FaPython size={iconSize} className="text-[#3776AB]" />,
			mongodb: <SiMongodb size={iconSize} className="text-[#47A248]" />,
			express: <SiExpress size={iconSize} className="text-white" />,
			docker: <SiDocker size={iconSize} className="text-[#2496ED]" />,
			mysql: <SiMysql size={iconSize} className="text-[#00758F]" />,
			stripe: <FaStripeS size={iconSize} className="text-[#635bff]" />,
			database: <FaDatabase size={iconSize} className="text-[#336791]" />
		};
		return icons[iconName.toLowerCase()] || <FaJs size={iconSize} />;
	};

	// Animaciones
	const container = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1
			}
		}
	};

	const item = {
		hidden: { y: 20, opacity: 0 },
		show: { y: 0, opacity: 1 }
	};

	return (
		<section className="p-8 max-w-7xl mx-auto">
			<motion.h2
				initial={{ y: -20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				className="text-4xl font-bold mb-12 bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent text-center"
			>
				Mis Habilidades
			</motion.h2>

			<motion.div
				variants={container}
				initial="hidden"
				animate="show"
				className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
			>
				{habilidades.map((hab) => (
					<motion.div
						key={hab.id}
						variants={item}
						whileHover={{ y: -5 }}
						className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-indigo-400/30 transition-all group"
					>
						<div className="flex items-start justify-between">
							<div>
								<h3 className="text-xl font-semibold text-gray-100 group-hover:text-indigo-300 transition-colors">
									{hab.nombre}
								</h3>
								<p className="text-sm text-gray-400 mt-1">{hab.tipo}</p>
							</div>
							<div className="p-2 bg-gray-700/50 rounded-lg">
								{getIcon(hab.icono)}
							</div>
						</div>

						<p className="text-sm text-gray-300 mt-3 line-clamp-2">
							{hab.descripcion}
						</p>

						<div className="mt-4">
							<div className="flex justify-between text-xs text-gray-400 mb-1">
								<span>Dominio</span>
								<span>{hab.nivel}%</span>
							</div>
							<div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
								<motion.div
									initial={{ width: 0 }}
									animate={{ width: `${hab.nivel}%` }}
									transition={{ duration: 1.5, type: "spring" }}
									className={`h-full rounded-full ${hab.nivel > 70 ? 'bg-emerald-400' :
										hab.nivel > 40 ? 'bg-amber-400' : 'bg-rose-400'
										}`}
								/>
							</div>
						</div>

						<div className="mt-4 pt-3 border-t border-gray-700/50 flex justify-between items-center">
							<span className="text-xs text-gray-400">
								Experiencia: <span className="text-indigo-300">{hab.experiencia}</span>
							</span>
							{hab.proyectosRelacionados && hab.proyectosRelacionados.length > 0 && (
								<span className="text-xs bg-indigo-900/30 text-indigo-400 px-2 py-1 rounded-full">
									{hab.proyectosRelacionados.length} proyecto{hab.proyectosRelacionados.length > 1 ? 's' : ''}
								</span>
							)}
						</div>
					</motion.div>
				))}
			</motion.div>
		</section>
	);
};

export default Habilidades;