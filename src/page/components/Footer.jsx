import { FiGithub, FiLinkedin, FiMail, FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";
import RUTAS from "../../router/router";

const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-gray-950 text-gray-400 py-12 relative overflow-hidden border-t border-gray-800">
			{/* Top Gradient Line */}
			<div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />

			<div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">

				{/* Brand & Bio */}
				<div className="col-span-1 md:col-span-2">
					<h3 className="text-2xl font-bold text-white mb-4">
						<span className="text-indigo-400">&lt;</span>
						Junior Arias
						<span className="text-indigo-400">/&gt;</span>
					</h3>
					<p className="text-sm leading-relaxed mb-6 max-w-sm">
						
					</p>
					<div className="flex gap-4">
						<SocialIcon href="https://github.com/JuniorArias02" icon={<FiGithub />} />
						<SocialIcon href="https://www.linkedin.com/in/juniorarias02/" icon={<FiLinkedin />} />
						<SocialIcon href="mailto:junior.arias02yt@gmail.com" icon={<FiMail />} />
					</div>
				</div>

				{/* Quick Links */}
				<div>
					<h4 className="text-white font-semibold mb-4">Navegación</h4>
					<ul className="space-y-2 text-sm">
						<FooterLink to={RUTAS.INICIO}>Inicio</FooterLink>
						<FooterLink to={RUTAS.PROYECTOS}>Proyectos</FooterLink>
						<FooterLink to={RUTAS.HABILIDADES}>Habilidades</FooterLink>
						<FooterLink to={RUTAS.GITHUB}>GitHub Repo</FooterLink>
					</ul>
				</div>

				{/* Contact / Terminal */}
				<div>
					<h4 className="text-white font-semibold mb-4">Sistema</h4>
					<div className="bg-gray-900 rounded-lg p-3 font-mono text-xs border border-gray-800">
						<div className="flex gap-1.5 mb-2">
							<div className="w-2 h-2 rounded-full bg-red-500" />
							<div className="w-2 h-2 rounded-full bg-yellow-500" />
							<div className="w-2 h-2 rounded-full bg-green-500" />
						</div>
						<p className="text-green-400">$ status check</p>
						<p className="text-gray-400">All systems operational.</p>
						<p className="text-gray-400">Ready for new challenges.</p>
						<span className="animate-pulse text-indigo-400">_</span>
					</div>
				</div>

			</div>

			<div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
				<p>&copy; {currentYear} Junior Arias. Built with React & Tailwind.</p>
				<p className="flex items-center gap-1">
					Hecho con <FiHeart className="text-red-500 fill-red-500" size={10} /> en cucuta / colombia
				</p>
			</div>
		</footer>
	);
};

const SocialIcon = ({ href, icon }) => (
	<a
		href={href}
		target="_blank"
		rel="noopener noreferrer"
		className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center border border-gray-800 hover:border-indigo-500 hover:text-indigo-400 hover:shadow-[0_0_15px_rgba(99,102,241,0.3)] transition-all duration-300"
	>
		{icon}
	</a>
);

const FooterLink = ({ to, children }) => (
	<li>
		<Link to={to} className="hover:text-indigo-400 transition-colors flex items-center gap-1 group">
			<span className="opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-indigo-500">&gt;</span>
			{children}
		</Link>
	</li>
);

export default Footer;
