import { Link, NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import RUTAS from "../../router/router";

const Navbar = () => {
	const location = useLocation();
	const isHome = location.pathname === "/" || location.pathname === "/inicio";
	const [isOpen, setIsOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	const toggleMenu = () => setIsOpen(!isOpen);

	const links = [
		{ name: "Inicio", to: RUTAS.INICIO },
		{ name: "Proyectos", to: RUTAS.PROYECTOS },
		{ name: "Habilidades", to: RUTAS.HABILIDADES },
		{ name: "GitHub", to: RUTAS.GITHUB },
		{ name: "Contacto", to: "/contacto" },
	];

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 20);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// --------------------------------------------------------------------------
	// MODE 1: HOME NAVBAR (Centered, Floating, Standard)
	// --------------------------------------------------------------------------
	if (isHome) {
		return (
			<>
				<motion.header
					initial={{ y: -100 }}
					animate={{ y: 0 }}
					transition={{ type: "spring", stiffness: 100, damping: 20 }}
					className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 md:pt-6 pointer-events-none"
				>
					<nav className={`
                    flex items-center justify-between pointer-events-auto
                    bg-gray-900/60 backdrop-blur-xl border border-white/10
                    shadow-lg shadow-indigo-500/10
                    rounded-full px-6 py-3
                    transition-all duration-300
                    ${scrolled ? "w-full md:w-[60%] lg:w-[50%]" : "w-full md:w-[70%] lg:w-[60%]"}
                `}>
						<motion.div whileHover={{ scale: 1.05 }}>
							<Link
								to="/"
								className="text-lg font-bold font-mono tracking-tighter"
							>
								<span className="text-indigo-400">&lt;</span>s
								<span className="text-white">Juni</span>
								<span className="text-emerald-400">Dev</span>
								<span className="text-indigo-400">/&gt;</span>
							</Link>
						</motion.div>

						{/* Desktop menu */}
						<div className="hidden md:flex space-x-1">
							{links.map((link) => (
								<NavLink
									key={link.to}
									to={link.to}
									className="relative px-4 py-2 text-sm font-medium transition-colors"
								>
									{({ isActive }) => (
										<>
											<span className={`relative z-10 ${isActive ? "text-white" : "text-gray-400 hover:text-white"}`}>
												{link.name}
											</span>
											{isActive && (
												<motion.div
													layoutId="navbar-seed-home"
													className="absolute inset-0 bg-white/10 rounded-full"
													transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
												/>
											)}
										</>
									)}
								</NavLink>
							))}
						</div>

						{/* Mobile menu toggle */}
						<motion.button
							whileTap={{ scale: 0.9 }}
							className="md:hidden text-gray-300 hover:text-indigo-400 transition-colors"
							onClick={toggleMenu}
						>
							{isOpen ? <X size={20} /> : <Menu size={20} />}
						</motion.button>
					</nav>
				</motion.header>

				{/* Mobile Menu Overlay for Home */}
				<AnimatePresence>
					{isOpen && (
						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.95 }}
							className="fixed inset-x-4 top-20 z-40 bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl md:hidden overflow-hidden"
						>
							<div className="flex flex-col p-4 space-y-2">
								{links.map((link, i) => (
									<motion.div
										key={link.to}
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: i * 0.1 }}
									>
										<NavLink
											to={link.to}
											onClick={() => setIsOpen(false)}
											className={({ isActive }) =>
												`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive
													? "bg-indigo-500/20 text-indigo-300"
													: "text-gray-300 hover:bg-white/5"
												}`
											}
										>
											{link.name}
										</NavLink>
									</motion.div>
								))}
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</>
		);
	}

	// --------------------------------------------------------------------------
	// MODE 2: INNER PAGES NAVBAR (Right-Aligned, Collapsible)
	// --------------------------------------------------------------------------
	return (
		<div className="fixed top-6 right-6 z-50 flex flex-col items-end">

			<motion.nav
				layout
				className={`
                    flex items-center gap-4
                    bg-gray-900/80 backdrop-blur-xl border border-white/10
                    shadow-lg shadow-indigo-500/10
                    rounded-full p-2 pl-6 pr-2
                    transition-all duration-300
                    overflow-hidden
                `}
				style={{ borderRadius: "50px" }}
			>
				{/* Brand/Toggle Trigger */}
				<motion.button
					layout="position"
					onClick={toggleMenu}
					className="flex items-center gap-2 group cursor-pointer focus:outline-none"
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					<span className="text-lg font-bold font-mono tracking-tighter whitespace-nowrap">
						<span className="text-indigo-400">&lt;</span>
						<span className="text-white group-hover:text-indigo-200 transition-colors">Junior</span>
						<span className="text-emerald-400">Dev</span>
						<span className="text-indigo-400">/&gt;</span>
					</span>
					<div className={`p-2 rounded-full bg-white/5 group-hover:bg-indigo-500/20 transition-colors ${isOpen ? "rotate-90" : "rotate-0"} transition-transform duration-300`}>
						{isOpen ? <X size={18} className="text-indigo-400" /> : <Menu size={18} className="text-white" />}
					</div>
				</motion.button>

				{/* Collapsible Links */}
				<AnimatePresence>
					{isOpen && (
						<motion.div
							initial={{ width: 0, opacity: 0 }}
							animate={{ width: "auto", opacity: 1 }}
							exit={{ width: 0, opacity: 0 }}
							transition={{ duration: 0.3, ease: "easeInOut" }}
							className="flex items-center gap-1 overflow-hidden"
						>
							<div className="w-px h-6 bg-white/10 mx-2" />
							{links.map((link) => (
								<NavLink
									key={link.to}
									to={link.to}
									onClick={() => setIsOpen(false)}
									className="relative px-3 py-1.5 text-sm font-medium transition-colors whitespace-nowrap"
								>
									{({ isActive }) => (
										<>
											<span className={`relative z-10 ${isActive ? "text-white" : "text-gray-400 hover:text-white"}`}>
												{link.name}
											</span>
											{isActive && (
												<motion.div
													layoutId="navbar-pill-inner"
													className="absolute inset-0 bg-indigo-500/30 rounded-full"
													transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
												/>
											)}
										</>
									)}
								</NavLink>
							))}
						</motion.div>
					)}
				</AnimatePresence>
			</motion.nav>

		</div>
	);
};

export default Navbar;