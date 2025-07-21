import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
	FiGithub,
	FiStar,
	FiGitBranch,
	FiEye,
	FiCode,
	FiChevronRight,
	FiArrowLeft
} from "react-icons/fi";
import {
	PieChart,
	Pie,
	Cell,
	Tooltip,
	ResponsiveContainer,
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid
} from "recharts";
import { useNavigate } from "react-router-dom";
import { getUserData, getRepos, getLanguages } from "../../services/githubApi/githubService";

const COLORS = [
	"#6366f1", // indigo-500
	"#10b981", // emerald-500
	"#f59e0b", // amber-500
	"#f97316", // orange-500
	"#8b5cf6", // violet-500
	"#ec4899", // pink-500
	"#14b8a6", // teal-500
];

const Github = () => {
	const [userData, setUserData] = useState(null);
	const [repos, setRepos] = useState([]);
	const [languagesData, setLanguagesData] = useState([]);
	const [activeTab, setActiveTab] = useState("repos");
	const [filter, setFilter] = useState("all");
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			const [user, repos] = await Promise.all([
				getUserData(),
				getRepos()
			]);

			const langs = await getLanguages(repos);

			setUserData(user);
			setRepos(repos.sort((a, b) => b.stargazers_count - a.stargazers_count));
			setLanguagesData(langs);
		};

		fetchData();
	}, []);

	if (!userData) {
		return (
			<div className="min-h-screen bg-gray-900 flex items-center justify-center">
				<motion.div
					animate={{ rotate: 360 }}
					transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
					className="text-indigo-400"
				>
					<FiGithub size={48} />
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

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className="min-h-screen bg-gray-900 p-6 md:p-8 lg:p-12"
		>
			{/* Perfil con animación */}
			<motion.div
				initial={{ y: -20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.5 }}
				className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-10"
			>
				<motion.div whileHover={{ scale: 1.05 }}>
					<img
						src={userData.avatar_url}
						alt="avatar"
						className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-indigo-400/30 hover:border-indigo-400 transition-all"
					/>
				</motion.div>

				<div>
					<h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">
						{userData.name}
					</h1>
					<p className="text-lg text-gray-300 mt-2">{userData.bio}</p>

					<div className="flex flex-wrap gap-4 mt-4">
						<a
							href={userData.html_url}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-2 text-sm bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors"
						>
							<FiGithub /> Ver perfil en GitHub
						</a>

						<div className="flex items-center gap-2 text-sm text-gray-400">
							<FiEye /> {userData.followers} seguidores • {userData.following} siguiendo
						</div>
					</div>
				</div>
			</motion.div>

			{/* Stats con gráficos mejorados */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.2 }}
				className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12"
			>
				{/* Tarjeta de repos */}
				<motion.div
					whileHover={{ y: -5 }}
					className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-indigo-400/30 transition-all"
				>
					<h2 className="text-lg font-semibold text-gray-300 mb-2">Repositorios públicos</h2>
					<div className="flex items-end gap-2">
						<span className="text-4xl font-bold text-indigo-400">{userData.public_repos}</span>
						<span className="text-gray-400 text-sm mb-1">repositorios</span>
					</div>
				</motion.div>

				{/* Gráfico de lenguajes */}
				<motion.div
					whileHover={{ y: -5 }}
					className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-emerald-400/30 transition-all lg:col-span-2"
				>
					<h2 className="text-lg font-semibold text-gray-300 mb-4">Lenguajes más usados</h2>
					<div className="h-[250px]">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart
								data={languagesData}
								layout="vertical"
								margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
							>
								<CartesianGrid strokeDasharray="3 3" stroke="#374151" />
								<XAxis type="number" stroke="#9CA3AF" />
								<YAxis
									dataKey="name"
									type="category"
									stroke="#9CA3AF"
									width={80}
									tickFormatter={(value) => value.length > 10 ? `${value.substring(0, 8)}...` : value}
								/>
								<Tooltip
									contentStyle={{
										background: '#1F2937',
										borderColor: '#4B5563',
										borderRadius: '0.5rem'
									}}
								/>
								<Bar dataKey="value" fill="#8884d8" animationDuration={1500}>
									{languagesData.map((entry, index) => (
										<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
									))}
								</Bar>
							</BarChart>
						</ResponsiveContainer>
					</div>
				</motion.div>
			</motion.div>

			{/* Filtros y tabs */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.3 }}
				className="mb-6"
			>
				<div className="flex flex-wrap gap-4 mb-6">
					<button
						onClick={() => setFilter("all")}
						className={`px-4 py-2 rounded-lg transition-all ${filter === "all"
								? "bg-indigo-600 text-white"
								: "bg-gray-800 text-gray-300 hover:bg-gray-700"
							}`}
					>
						Todos
					</button>
					<button
						onClick={() => setFilter("stars")}
						className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${filter === "stars"
								? "bg-amber-600 text-white"
								: "bg-gray-800 text-gray-300 hover:bg-gray-700"
							}`}
					>
						<FiStar /> Destacados
					</button>
					<button
						onClick={() => setFilter("forks")}
						className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${filter === "forks"
								? "bg-emerald-600 text-white"
								: "bg-gray-800 text-gray-300 hover:bg-gray-700"
							}`}
					>
						<FiGitBranch /> Con forks
					</button>
				</div>

				{/* Lista de repositorios */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{filteredRepos.map((repo) => (
						<motion.div
							key={repo.id}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							whileHover={{ y: -5 }}
							transition={{ type: "spring", stiffness: 300 }}
							onClick={() => navigate(`/github/${repo.name}`)}
							className="bg-gray-800/50 backdrop-blur-sm p-5 rounded-xl border border-gray-700 hover:border-indigo-400/50 cursor-pointer transition-all group"
						>
							<div className="flex justify-between items-start">
								<div>
									<h3 className="text-lg font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors">
										{repo.name}
									</h3>
									<p className="text-sm text-gray-400 mt-1 line-clamp-2">
										{repo.description || "Sin descripción"}
									</p>
								</div>
								<FiChevronRight className="text-gray-500 group-hover:text-indigo-400 transition-colors mt-1" />
							</div>

							<div className="flex flex-wrap gap-3 mt-4 pt-3 border-t border-gray-700/50">
								{repo.language && (
									<span className="flex items-center gap-1 text-xs bg-gray-700/50 text-emerald-400 px-2 py-1 rounded-full">
										<FiCode size={12} /> {repo.language}
									</span>
								)}
								<span className="flex items-center gap-1 text-xs bg-gray-700/50 text-amber-400 px-2 py-1 rounded-full">
									<FiStar size={12} /> {repo.stargazers_count}
								</span>
								<span className="flex items-center gap-1 text-xs bg-gray-700/50 text-violet-400 px-2 py-1 rounded-full">
									<FiGitBranch size={12} /> {repo.forks_count}
								</span>
							</div>
						</motion.div>
					))}
				</div>
			</motion.div>
		</motion.div>
	);
};

export default Github;