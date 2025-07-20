const Footer = () => {
	return (
		<footer className="bg-gray-900 text-gray-300 py-6 mt-10">
			<div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
				<p>&copy; {new Date().getFullYear()} Junior Arias. Todos los derechos reservados.</p>

				<div className="flex gap-4">
					<a
						href="https://github.com/stark"
						target="_blank"
						rel="noopener noreferrer"
						className="hover:text-white transition"
					>
						GitHub
					</a>
					<a
						href="https://linkedin.com/in/stark"
						target="_blank"
						rel="noopener noreferrer"
						className="hover:text-white transition"
					>
						LinkedIn
					</a>
					<a
						href="mailto:junistark@correo.com"
						className="hover:text-white transition"
					>
						Contacto
					</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
