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
	FaStripeS,
	FaPhp
} from "react-icons/fa";
import {
	SiTypescript,
	SiTailwindcss,
	SiNextdotjs,
	SiMongodb,
	SiExpress,
	SiDocker,
	SiMysql,
	SiNpm,
	SiOpenjdk
} from "react-icons/si";
import { FiCpu, FiActivity, FiLayers } from "react-icons/fi";

const Habilidades = () => {
	// Mapeo de iconos
	const getIcon = (iconName) => {
		const iconSize = 28;
		const icons = {
			react: <FaReact size={iconSize} className="text-[#61DAFB]" />,
			node: <FaNodeJs size={iconSize} className="text-[#68A063]" />,
			npm: <SiNpm size={iconSize} className="text-[#CB3837]" />,
			javascript: <FaJs size={iconSize} className="text-[#F7DF1E]" />,
			typescript: <SiTypescript size={iconSize} className="text-[#3178C6]" />,
			html: <FaHtml5 size={iconSize} className="text-[#E34F26]" />,
			css: <FaCss3Alt size={iconSize} className="text-[#1572B6]" />,
			php: <FaPhp size={iconSize} className="text-[#8892BF]" />,
			tailwind: <SiTailwindcss size={iconSize} className="text-[#06B6D4]" />,
			nextjs: <SiNextdotjs size={iconSize} className="text-white" />,
			git: <FaGitAlt size={iconSize} className="text-[#F05032]" />,
			github: <FaGithub size={iconSize} className="text-white" />,
			python: <FaPython size={iconSize} className="text-[#3776AB]" />,
			java: <SiOpenjdk size={iconSize} className="text-[#007396]" />,
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
				staggerChildren: 0.05
			}
		}
	};

	const item = {
		hidden: { scale: 0.8, opacity: 0 },
		show: { scale: 1, opacity: 1 }
	};

	return (
		<section className="p-6 md:p-12 max-w-7xl mx-auto min-h-screen relative">
			{/* Background elements */}
			<div className="absolute top-20 right-20 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="mb-16 text-center relative z-10"
			>
				<div className="inline-block relative">
					<h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-2 flex items-center justify-center gap-3">
						<FiCpu className="text-indigo-500 animate-pulse" />
						SYSTEM<span className="text-indigo-500">.</span>SKILLS
					</h2>
					<div className="flex items-center justify-center gap-2 text-xs font-mono text-gray-500">
						<span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
						<span>MODULES_LOADED: {habilidades.length}</span>
						<span className="w-px h-3 bg-gray-700 mx-2" />
						<span>INTEGRITY: 100%</span>
					</div>
				</div>
			</motion.div>

			<motion.div
				variants={container}
				initial="hidden"
				animate="show"
				className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative z-10"
			>
				{habilidades.map((hab, index) => (
					<motion.div
						key={hab.id}
						variants={item}
						whileHover={{ y: -5, scale: 1.02 }}
						className="group relative bg-gray-900 border border-gray-800 rounded-lg p-5 hover:border-indigo-500/50 hover:shadow-[0_0_20px_rgba(79,70,229,0.1)] transition-all duration-300"
					>
						{/* Tech Corners */}
						<div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-gray-600 group-hover:border-indigo-400 transition-colors" />
						<div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-gray-600 group-hover:border-indigo-400 transition-colors" />
						<div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-gray-600 group-hover:border-indigo-400 transition-colors" />
						<div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-gray-600 group-hover:border-indigo-400 transition-colors" />

						{/* Header: Icon & Name */}
						<div className="flex items-center justify-between mb-4">
							<div className="flex items-center gap-3">
								<div className="p-2 bg-gray-800 rounded border border-gray-700 group-hover:bg-gray-700 transition-colors">
									{getIcon(hab.icono)}
								</div>
								<div>
									<h3 className="font-bold text-gray-200 group-hover:text-white transition-colors">
										{hab.nombre}
									</h3>
									<span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider">
										[{hab.tipo}]
									</span>
								</div>
							</div>
							<div className="text-[10px] font-mono text-gray-600">
								0{index + 1}
							</div>
						</div>

						{/* Description */}
						<p className="text-xs text-gray-400 mb-4 line-clamp-2 h-8 leading-relaxed">
							{hab.descripcion}
						</p>

						{/* Footer: Visual Stats & Projects */}
						<div className="pt-3 border-t border-gray-800 flex items-center justify-between">
							{/* Fake Status Bar */}
							<div className="flex gap-0.5">
								<div className="w-1 h-3 bg-emerald-500 rounded-sm" />
								<div className="w-1 h-3 bg-emerald-500/80 rounded-sm" />
								<div className="w-1 h-3 bg-emerald-500/60 rounded-sm" />
								<div className="w-1 h-3 bg-emerald-500/40 rounded-sm" />
								<div className="w-1 h-3 bg-gray-700 rounded-sm" />
							</div>

							{hab.proyectosRelacionados && hab.proyectosRelacionados.length > 0 && (
								<div className="flex items-center gap-1.5 text-[10px] text-gray-400 bg-gray-800/50 px-2 py-1 rounded border border-gray-700/50">
									<FiLayers className="text-indigo-400" />
									<span>{hab.proyectosRelacionados.length} Linked</span>
								</div>
							)}
						</div>
					</motion.div>
				))}
			</motion.div>
		</section>
	);
};

export default Habilidades;