import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
	FiGithub,
	FiStar,
	FiGitBranch,
	FiEye,
	FiCode,
	FiChevronRight,
	FiUsers,
	FiBookOpen,
	FiExternalLink
} from "react-icons/fi";
import {
	ResponsiveContainer,
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	Cell
} from "recharts";
import { useNavigate } from "react-router-dom";
import { getUserData, getRepos, getLanguages } from "../../services/githubApi/githubService";

const COLORS = [
	"#818cf8", // indigo-400
	"#34d399", // emerald-400
	"#fbbf24", // amber-400
	"#f472b6", // pink-400
	"#a78bfa", // violet-400
	"#2dd4bf", // teal-400
];

const Github = () => {
	const [userData, setUserData] = useState(null);
	const [repos, setRepos] = useState([]);
	const [languagesData, setLanguagesData] = useState([]);
	const [filter, setFilter] = useState("all");
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			const [user, reposData] = await Promise.all([
				getUserData(),
				getRepos()
			]);

			if (user && reposData) {
				const langs = await getLanguages(reposData);
				setUserData(user);
				setRepos(reposData.sort((a, b) => b.stargazers_count - a.stargazers_count));
				setLanguagesData(langs);
			}
		};

		fetchData();
	}, []);

	if (!userData) {
		return (
			<div className="min-h-screen bg-gray-950 flex items-center justify-center relative overflow-hidden">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-gray-900 to-gray-950"></div>
				<motion.div
					animate={{ rotate: 360 }}
					transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
					className="text-indigo-500 relative z-10"
				>
					<FiGithub size={64} />
				</motion.div>
			</div>
		);
	}

	const filteredRepos = repos.filter(repo => {
		if (filter === "all") return true;
		if (filter === "stars") return repo.stargazers_count > 0;
		if (filter === "forks") return repo.forks_count > 0;
		return true;
	});

	const stats = [
		{ label: "Repositorios", value: userData.public_repos, icon: FiBookOpen, color: "text-blue-400", bg: "bg-blue-500/10" },
		{ label: "Seguidores", value: userData.followers, icon: FiUsers, color: "text-emerald-400", bg: "bg-emerald-500/10" },
		{ label: "Siguiendo", value: userData.following, icon: FiUsers, color: "text-purple-400", bg: "bg-purple-500/10" },
	];

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className="min-h-screen bg-gray-950 text-gray-100 relative overflow-hidden"
		>
			{/* Background Elements */}
			<div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-indigo-900/20 to-transparent pointer-events-none" />
			<div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
			<div className="absolute top-1/2 -left-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

			<div className="max-w-7xl mx-auto px-6 py-12 relative z-10">

				{/* Hero Section */}
				<motion.div
					initial={{ y: 20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-16"
				>
					<motion.div
						whileHover={{ scale: 1.02 }}
						className="relative group"
					>
						<div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-1000 group-hover:duration-200"></div>
						<img
							src={userData.avatar_url}
							alt={userData.name}
							className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-gray-900 shadow-2xl"
						/>
					</motion.div>

					<div className="text-center md:text-left flex-1">
						<h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
							{userData.name}
						</h1>
						<div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-gray-400 mb-6 font-mono text-sm">
							<span className="text-indigo-400">@{userData.login}</span>
							<span className="hidden md:inline">•</span>
							<span>{userData.location || "Sin ubicación"}</span>
						</div>
						<p className="text-lg text-gray-300 max-w-2xl mb-6 leading-relaxed">
							{userData.bio || "Desarrollador apasionado construyendo el futuro de la web."}
						</p>

						<div className="flex flex-wrap gap-4 justify-center md:justify-start">
							<a
								href={userData.html_url}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl backdrop-blur-md transition-all border border-white/10 hover:border-white/20 font-medium"
							>
								<FiGithub size={20} /> Visitar Perfil
							</a>
							{userData.blog && (
								<a
									href={userData.blog.startsWith('http') ? userData.blog : `https://${userData.blog}`}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-2 text-gray-400 hover:text-white px-6 py-3 rounded-xl transition-all border border-transparent hover:border-gray-800"
								>
									<FiExternalLink /> Website
								</a>
							)}
						</div>
					</div>
				</motion.div>

				{/* Stats Grid */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
					{stats.map((stat, index) => (
						<motion.div
							key={stat.label}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.1 }}
							whileHover={{ y: -5 }}
							className="bg-gray-900/40 backdrop-blur-md border border-gray-800/50 p-6 rounded-2xl flex items-center justify-between group hover:border-indigo-500/30 transition-all shadow-lg"
						>
							<div>
								<p className="text-gray-400 text-sm font-medium mb-1">{stat.label}</p>
								<p className="text-3xl font-bold text-white group-hover:text-indigo-200 transition-colors">
									{stat.value}
								</p>
							</div>
							<div className={`p-4 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
								<stat.icon size={24} />
							</div>
						</motion.div>
					))}
				</div>

				{/* Content Grid (Charts & Repos) */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

					{/* Left Column: Languages Chart */}
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						className="lg:col-span-1"
					>
						<div className="bg-gray-900/40 backdrop-blur-md border border-gray-800/50 rounded-3xl p-6 h-full sticky top-8">
							<h3 className="text-xl font-bold mb-6 flex items-center gap-2">
								<FiCode className="text-indigo-400" /> Lenguajes Top
							</h3>
							<div className="h-[400px]">
								<ResponsiveContainer width="100%" height="100%">
									<BarChart
										data={languagesData}
										layout="vertical"
										margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
									>
										<XAxis type="number" hide />
										<YAxis
											dataKey="name"
											type="category"
											axisLine={false}
											tickLine={false}
											width={100}
											tick={{ fill: '#9ca3af', fontSize: 12 }}
										/>
										<Tooltip
											cursor={{ fill: 'rgba(255,255,255,0.05)' }}
											contentStyle={{ bg: '#111827', border: '1px solid #374151', borderRadius: '0.5rem' }}
										/>
										<Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
											{languagesData.map((entry, index) => (
												<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
											))}
										</Bar>
									</BarChart>
								</ResponsiveContainer>
							</div>
						</div>
					</motion.div>

					{/* Right Column: Repositories */}
					<div className="lg:col-span-2">

						{/* Filters */}
						<div className="flex overflow-x-auto pb-4 gap-3 mb-6 no-scrollbar">
							{['all', 'stars', 'forks'].map((f) => (
								<button
									key={f}
									onClick={() => setFilter(f)}
									className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${filter === f
											? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
											: 'bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-white border border-gray-700/50'
										}`}
								>
									{f === 'all' && 'Todos los repos'}
									{f === 'stars' && '🔥 Más populares'}
									{f === 'forks' && '🚀 Con forks'}
								</button>
							))}
						</div>

						<motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<AnimatePresence>
								{filteredRepos.map((repo) => (
									<motion.div
										layout
										key={repo.id}
										initial={{ opacity: 0, scale: 0.9 }}
										animate={{ opacity: 1, scale: 1 }}
										exit={{ opacity: 0, scale: 0.9 }}
										whileHover={{ y: -4 }}
										onClick={() => navigate(`/github/${repo.name}`)}
										className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 p-5 rounded-2xl cursor-pointer hover:bg-gray-800/50 hover:border-indigo-500/30 transition-all group relative overflow-hidden"
									>
										<div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-bl-full pointer-events-none" />

										<div className="flex justify-between items-start mb-3">
											<div className="bg-gray-700/30 p-2 rounded-lg text-indigo-400 group-hover:text-white group-hover:bg-indigo-500 transition-all">
												<FiBookOpen size={20} />
											</div>
											<div className="flex gap-2">
												{repo.stargazers_count > 0 && (
													<span className="flex items-center gap-1 text-xs font-semibold bg-amber-500/10 text-amber-400 px-2 py-1 rounded-md">
														<FiStar size={10} /> {repo.stargazers_count}
													</span>
												)}
												{repo.forks_count > 0 && (
													<span className="flex items-center gap-1 text-xs font-semibold bg-violet-500/10 text-violet-400 px-2 py-1 rounded-md">
														<FiGitBranch size={10} /> {repo.forks_count}
													</span>
												)}
											</div>
										</div>

										<h3 className="text-lg font-bold text-gray-200 group-hover:text-indigo-300 transition-colors mb-2 truncate">
											{repo.name}
										</h3>

										<p className="text-sm text-gray-400 line-clamp-2 mb-4 h-10">
											{repo.description || "Sin descripción disponible para este repositorio."}
										</p>

										<div className="flex items-center justify-between pt-4 border-t border-gray-700/30">
											<div className="flex items-center gap-2">
												{repo.language && (
													<span className="flex items-center gap-1.5 text-xs text-gray-400">
														<span className="w-2 h-2 rounded-full bg-emerald-400" />
														{repo.language}
													</span>
												)}
											</div>
											<span className="text-xs text-indigo-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
												Ver detalles <FiChevronRight />
											</span>
										</div>
									</motion.div>
								))}
							</AnimatePresence>
						</motion.div>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default Github;