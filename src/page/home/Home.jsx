import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiTwitter, FiCode, FiCpu } from "react-icons/fi";
import RUTAS from "../../router/router";
import { Link } from "react-router-dom";

const Home = () => {
	return (
		<main className="min-h-[80vh] bg-gray-900 flex flex-col items-center justify-center px-6 text-center">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
				className="max-w-4xl"
			>
				{/* Tech stack floating icons */}
				<div className="relative">
					<motion.div
						animate={{
							y: [0, -10, 0],
							rotate: [0, 5, 0]
						}}
						transition={{
							duration: 6,
							repeat: Infinity,
							ease: "easeInOut"
						}}
						className="absolute -top-12 -left-8 text-indigo-400 opacity-60"
					>
						<FiCode size={32} />
					</motion.div>
					<motion.div
						animate={{
							y: [0, -15, 0],
							rotate: [0, -5, 0]
						}}
						transition={{
							duration: 5,
							repeat: Infinity,
							ease: "easeInOut",
							delay: 0.5
						}}
						className="absolute -top-6 -right-10 text-emerald-400 opacity-60"
					>
						<FiCpu size={40} />
					</motion.div>
				</div>

				<h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400 mb-4">
					<motion.span
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.3 }}
					>
						Hola, soy
					</motion.span>
					<br />
					<motion.span
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 0.5 }}
						className="block mt-2"
					>
						Junior Arias
					</motion.span>
				</h1>

				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.7 }}
					className="text-lg text-gray-300 max-w-2xl mx-auto mb-8"
				>
					<span className="text-indigo-300">Desarrollador Junior</span> especializado en crear experiencias digitales innovadoras. Combino código elegante con diseño intuitivo para construir el futuro.
				</motion.p>

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.9 }}
					className="flex flex-col sm:flex-row items-center justify-center gap-4"
				>
					<motion.div
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						<Link
							to={RUTAS.PROYECTOS}
							className="bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 text-white px-8 py-3 rounded-lg text-sm font-medium shadow-lg transition-all"
						>
							Explorar Proyectos
						</Link>
					</motion.div>

					<motion.a
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						href="#contacto"
						className="border border-indigo-500 text-indigo-300 hover:bg-indigo-900/30 px-8 py-3 rounded-lg text-sm font-medium transition-all"
					>
						Contactar
					</motion.a>
				</motion.div>

				{/* Social links */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 1.1 }}
					className="flex justify-center gap-4 mt-12"
				>
					<motion.a
						whileHover={{ y: -3, color: "#818CF8" }}
						href="https://github.com/JuniorArias02"
						className="text-gray-400 hover:text-indigo-400 transition-colors"
						aria-label="GitHub"
					>
						<FiGithub size={20} />
					</motion.a>
					<motion.a
						whileHover={{ y: -3, color: "#818CF8" }}
						href="https://www.linkedin.com/in/juniorarias02/"
						className="text-gray-400 hover:text-indigo-400 transition-colors"
						aria-label="LinkedIn"
					>
						<FiLinkedin size={20} />
					</motion.a>
				</motion.div>

				{/* Animated code snippet */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 0.2 }}
					transition={{ delay: 1.3 }}
					className="absolute bottom-10 left-0 right-0 flex justify-center"
				>
					<code className="text-xs text-gray-500 font-mono">
						{`// "La mejor manera de predecir el futuro es crearlo" - Peter Drucker`}
					</code>
				</motion.div>
			</motion.div>
		</main>
	);
};

export default Home;