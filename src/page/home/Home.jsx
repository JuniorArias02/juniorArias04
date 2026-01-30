import { motion, useAnimation } from "framer-motion";
import {
	FiGithub,
	FiLinkedin,
	FiDownload,
	FiCode,
	FiCpu,
	FiTerminal,
	FiActivity,
	FiCoffee,
	FiServer
} from "react-icons/fi";
import RUTAS from "../../router/router";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

// Matrix rain effect component
const MatrixRain = () => {
	const canvasRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヂギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロヲゴゾドボポ1234567890';
		const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		const nums = '0123456789';
		const alphabet = katakana + latin + nums;

		const fontSize = 16;
		const columns = canvas.width / fontSize;
		const rainDrops = Array.from({ length: columns }).map(() => 1);

		const draw = () => {
			ctx.fillStyle = 'rgba(17, 24, 39, 0.05)';
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			ctx.fillStyle = '#0F0'; // Neon Green
			ctx.font = fontSize + 'px monospace';

			for (let i = 0; i < rainDrops.length; i++) {
				const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
				ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

				if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
					rainDrops[i] = 0;
				}
				rainDrops[i]++;
			}
		};

		const interval = setInterval(draw, 30);

		const handleResize = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};
		window.addEventListener('resize', handleResize);

		return () => {
			clearInterval(interval);
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" />;
};

const TerminalWindow = () => {
	const [text, setText] = useState('');
	const fullText = "> Initializing system...\n> Loading modules...\n> React... [OK]\n> Node.js... [OK]\n> Tailwind... [OK]\n> Artificial Intelligence... [OK]\n> System Ready.";

	useEffect(() => {
		let index = 0;
		const interval = setInterval(() => {
			setText(fullText.slice(0, index));
			index++;
			if (index > fullText.length) clearInterval(interval);
		}, 50);
		return () => clearInterval(interval);
	}, []);

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.8 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ delay: 0.5 }}
			className="bg-gray-900/90 border border-gray-700 rounded-lg p-4 font-mono text-xs md:text-sm text-green-400 w-full max-w-md shadow-2xl backdrop-blur-sm relative overflow-hidden"
		>
			<div className="absolute top-0 left-0 w-full h-6 bg-gray-800 flex items-center px-2 gap-1.5">
				<div className="w-2.5 h-2.5 rounded-full bg-red-500" />
				<div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
				<div className="w-2.5 h-2.5 rounded-full bg-green-500" />
			</div>
			<div className="mt-4 whitespace-pre-line min-h-[120px]">
				{text}
				<span className="animate-pulse">_</span>
			</div>
		</motion.div>
	);
};

const Home = () => {
	return (
		<main className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-6 relative overflow-hidden">
			<MatrixRain />

			{/* Background Gradient Blurs */}
			<div className="absolute top-20 left-20 w-72 h-72 bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none" />
			<div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-600/10 rounded-full blur-[100px] pointer-events-none" />

			<div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 py-10">

				{/* Left Content */}
				<motion.div
					initial={{ opacity: 0, x: -50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8 }}
					className="flex flex-col items-start text-left"
				>
					<div className="flex items-center gap-2 mb-4 px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 rounded-full text-indigo-400 text-sm font-mono">
						<span className="relative flex h-2 w-2">
							<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
							<span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
						</span>
						Available for hire
					</div>

					<h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
						Hola, soy <br />
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400 animate-gradient-x">
							Junior Arias
						</span>
					</h1>

					<p className="text-lg text-gray-400 mb-8 max-w-lg leading-relaxed">
						<span className="text-indigo-300 font-semibold">Desarrollador Full Stack</span> & entusiasta de la tecnología.
						Transformo líneas de código en soluciones digitales robustas, escalables y visualmente impactantes.
					</p>

					<div className="flex flex-wrap gap-4">
						<Link to={RUTAS.PROYECTOS}>
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium shadow-lg shadow-indigo-500/30 transition-all flex items-center gap-2"
							>
								<FiCode /> Ver Proyectos
							</motion.button>
						</Link>

						<a href="/tu-cv.pdf" download="Junior_Arias_CV.pdf">
							{/* NOTA: Asegúrate de poner tu archivo 'tu-cv.pdf' en la carpeta public/ */}
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700 rounded-lg font-medium transition-all flex items-center gap-2 group"
							>
								<FiDownload className="group-hover:translate-y-1 transition-transform" /> Descargar CV
							</motion.button>
						</a>
					</div>

					<div className="flex gap-6 mt-10">
						<SocialLink href="https://github.com/JuniorArias02" icon={<FiGithub />} />
						<SocialLink href="https://www.linkedin.com/in/juniorarias02/" icon={<FiLinkedin />} />
						{/* Add more social links here */}
					</div>
				</motion.div>

				{/* Right Content - Interactive/Visual */}
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.8, delay: 0.2 }}
					className="relative hidden lg:flex flex-col items-center justify-center p-8"
				>
					{/* Floating Tech Icons */}
					<FloatingIcon icon={<FiCode />} delay={0} x={-120} y={-80} color="text-blue-400" />
					<FloatingIcon icon={<FiCpu />} delay={1.5} x={140} y={-40} color="text-purple-400" />
					<FloatingIcon icon={<FiServer />} delay={3} x={-100} y={100} color="text-emerald-400" />
					<FloatingIcon icon={<FiActivity />} delay={4.5} x={120} y={120} color="text-amber-400" />

					<TerminalWindow />

					{/* System Stats Card */}
					<div className="mt-8 grid grid-cols-2 gap-4 w-full max-w-md">
						<StatCard icon={<FiActivity />} label="Uptime" value="99.9%" color="text-green-400" />
						<StatCard icon={<FiCoffee />} label="Caffeine" value="100%" color="text-amber-500" />
					</div>
				</motion.div>
			</div>

			{/* Scroll Indicator */}
			<motion.div
				animate={{ y: [0, 10, 0] }}
				transition={{ duration: 2, repeat: Infinity }}
				className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500 flex flex-col items-center gap-2"
			>
				<span className="text-xs uppercase tracking-widest opacity-50">Scroll</span>
				<div className="w-1 h-12 bg-gradient-to-b from-indigo-500 to-transparent rounded-full" />
			</motion.div>
		</main>
	);
};

const SocialLink = ({ href, icon }) => (
	<motion.a
		href={href}
		target="_blank"
		rel="noopener noreferrer"
		whileHover={{ y: -3, color: "#818CF8" }}
		className="text-gray-400 text-2xl hover:text-indigo-400 transition-colors bg-gray-900 p-3 rounded-xl border border-gray-800 shadow-sm"
	>
		{icon}
	</motion.a>
);

const FloatingIcon = ({ icon, delay, x, y, color }) => (
	<motion.div
		animate={{
			y: [y, y - 20, y],
			x: [x, x + 10, x],
			rotate: [0, 5, -5, 0]
		}}
		transition={{
			duration: 6,
			repeat: Infinity,
			delay: delay,
			ease: "easeInOut"
		}}
		className={`absolute text-4xl ${color} opacity-20 filter blur-[1px]`}
		style={{ left: '50%', top: '50%', x, y }} // Approximate positioning handled by animate
	>
		{icon}
	</motion.div>
);

const StatCard = ({ icon, label, value, color }) => (
	<motion.div
		whileHover={{ scale: 1.02 }}
		className="bg-gray-900/50 border border-gray-800 p-4 rounded-xl flex items-center gap-4 backdrop-blur-sm"
	>
		<div className={`p-2 rounded-lg bg-gray-800 ${color}`}>
			{icon}
		</div>
		<div>
			<div className="text-xs text-gray-500 uppercase tracking-wider">{label}</div>
			<div className="text-lg font-bold text-gray-200">{value}</div>
		</div>
	</motion.div>
);

export default Home;