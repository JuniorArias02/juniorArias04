import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
	FiFolder,
	FiFile,
	FiChevronRight,
	FiHome,
	FiGithub,
	FiArrowLeft,
	FiExternalLink,
	FiCode,
	FiImage,
	FiFileText,
	FiPackage
} from "react-icons/fi";
import { getRepoContents, handleViewFile } from "../../../services/githubApi/githubService";


const RepoDetail = () => {
	const { repoName } = useParams();
	const [files, setFiles] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();
	const [selectedFileContent, setSelectedFileContent] = useState(null);
	const [viewingFile, setViewingFile] = useState(null);
	const [searchParams] = useSearchParams();
	const initialPath = searchParams.get("path") || "";
	const [currentPath, setCurrentPath] = useState(initialPath);


	// Helper para iconos de archivo
	const getFileIcon = (fileName, type) => {
		if (type === 'dir') return <FiFolder className="text-indigo-400 group-hover:text-indigo-300 transition-colors" size={20} />;

		const ext = fileName.split('.').pop().toLowerCase();
		switch (ext) {
			case 'js':
			case 'jsx':
			case 'ts':
			case 'tsx':
			case 'py':
			case 'html':
			case 'css':
				return <FiCode className="text-emerald-400 group-hover:text-emerald-300 transition-colors" size={20} />;
			case 'json':
			case 'yml':
			case 'xml':
				return <FiPackage className="text-amber-400 group-hover:text-amber-300 transition-colors" size={20} />;
			case 'png':
			case 'jpg':
			case 'jpeg':
			case 'svg':
			case 'gif':
				return <FiImage className="text-purple-400 group-hover:text-purple-300 transition-colors" size={20} />;
			case 'md':
			case 'txt':
				return <FiFileText className="text-gray-400 group-hover:text-gray-300 transition-colors" size={20} />;
			default:
				return <FiFile className="text-gray-500 group-hover:text-gray-400 transition-colors" size={20} />;
		}
	};

	const onViewFile = async (file) => {
		const content = await handleViewFile(file, import.meta.env.VITE_GITHUB_TOKEN);
		if (content) {
			setSelectedFileContent(content);
			setViewingFile(file.name);
		}
	};

	useEffect(() => {
		const fetchContents = async () => {
			setIsLoading(true);
			try {
				const content = await getRepoContents(repoName, currentPath);
				// Ordenar: primero carpetas, luego archivos
				const sortedContent = content.sort((a, b) => {
					if (a.type === b.type) return a.name.localeCompare(b.name);
					return a.type === 'dir' ? -1 : 1;
				});
				setFiles(sortedContent);
			} catch (error) {
				console.error("Error fetching repo contents:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchContents();
	}, [repoName, currentPath]);

	const handleNavigate = (folder) => {
		setCurrentPath((prev) => `${prev ? `${prev}/` : ""}${folder}`);
	};

	useEffect(() => {
		navigate(`/github/${repoName}?path=${encodeURIComponent(currentPath)}`, { replace: true });
	}, [currentPath]);


	const handleOpenFilePage = (file) => {
		if (file.type !== "file") return;
		const fullPath = `${currentPath ? `${currentPath}/` : ""}${file.name}`;
		navigate(`/github/${repoName}/view?path=${encodeURIComponent(fullPath)}`);
	};


	const handleBack = () => {
		setCurrentPath((prev) => prev.split("/").slice(0, -1).join("/"));
	};

	const goToMainGithub = () => {
		navigate("/github");
	};

	const pathSegments = currentPath ? currentPath.split("/") : [];

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className="min-h-screen bg-gray-950 text-gray-100 p-6 md:p-8 lg:p-12 relative overflow-hidden"
		>
			{/* Background Ambient Effects */}
			<div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-indigo-900/10 to-transparent pointer-events-none" />
			<div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

			<div className="max-w-6xl mx-auto relative z-10">

				{/* Top Navigation Bar */}
				<motion.div
					initial={{ y: -20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 bg-gray-900/60 backdrop-blur-md p-4 rounded-2xl border border-gray-800/50 sticky top-4 z-50 shadow-xl"
				>
					<div className="flex items-center gap-4 overflow-x-auto w-full md:w-auto no-scrollbar">
						<button
							onClick={goToMainGithub}
							className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
							title="Volver a Repositorios"
						>
							<FiArrowLeft size={20} />
						</button>

						<div className="h-6 w-px bg-gray-700/50" />

						<div className="flex items-center gap-2 text-sm font-mono whitespace-nowrap">
							<button
								onClick={() => setCurrentPath("")}
								className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${!currentPath ? 'bg-indigo-500/20 text-indigo-300' : 'hover:bg-gray-800 text-gray-400'}`}
							>
								<FiGithub />
								{repoName}
							</button>

							{pathSegments.map((segment, index) => (
								<div key={index} className="flex items-center gap-2">
									<FiChevronRight className="text-gray-600" size={14} />
									<button
										onClick={() => setCurrentPath(pathSegments.slice(0, index + 1).join("/"))}
										className={`px-3 py-1.5 rounded-lg transition-colors ${index === pathSegments.length - 1 ? 'bg-indigo-500/20 text-indigo-300 font-semibold' : 'hover:bg-gray-800 text-gray-400'}`}
									>
										{segment}
									</button>
								</div>
							))}
						</div>
					</div>
				</motion.div>

				{/* File Explorer Content */}
				<div className="bg-gray-900/40 backdrop-blur-md border border-gray-800/50 rounded-2xl overflow-hidden shadow-2xl min-h-[500px]">

					{/* Header Row */}
					<div className="grid grid-cols-12 px-6 py-4 bg-gray-800/50 border-b border-gray-700/50 text-xs font-semibold text-gray-400 uppercase tracking-wider">
						<div className="col-span-8 md:col-span-9">Nombre</div>
						<div className="col-span-4 md:col-span-3 text-right">Tipo</div>
					</div>

					{/* Loading State */}
					{isLoading && (
						<div className="p-6 space-y-3">
							{[...Array(5)].map((_, i) => (
								<div key={i} className="h-12 bg-gray-800/50 rounded-lg animate-pulse" />
							))}
						</div>
					)}

					{/* Empty State */}
					{!isLoading && files.length === 0 && (
						<div className="flex flex-col items-center justify-center py-20 text-gray-500">
							<FiFolder size={48} className="mb-4 opacity-50" />
							<p>Este directorio está vacío.</p>
						</div>
					)}

					{/* File List */}
					<div className="divide-y divide-gray-800/50">
						<AnimatePresence mode="wait">
							{!isLoading && files.map((file, index) => (
								<motion.div
									key={file.path}
									initial={{ opacity: 0, x: -10 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: index * 0.03 }}
									whileHover={{ backgroundColor: "rgba(55, 65, 81, 0.4)" }}
									className="grid grid-cols-12 px-6 py-4 items-center gap-4 cursor-pointer group transition-colors"
									onClick={() => file.type === "dir" ? handleNavigate(file.name) : handleOpenFilePage(file)}
								>
									<div className="col-span-8 md:col-span-9 flex items-center gap-3 overflow-hidden">
										{getFileIcon(file.name, file.type)}
										<span className="truncate text-gray-300 group-hover:text-white transition-colors font-medium">
											{file.name}
										</span>
									</div>
									<div className="col-span-4 md:col-span-3 text-right text-sm text-gray-500 font-mono">
										{file.type === "dir" ? "Carpeta" : "Archivo"}
									</div>
								</motion.div>
							))}
						</AnimatePresence>
					</div>
				</div>

				{/* File Preview (if applicable) */}
				{selectedFileContent && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="mt-8 bg-gray-900 border border-gray-800 p-6 rounded-2xl overflow-hidden shadow-2xl"
					>
						<div className="flex justify-between items-center mb-4 border-b border-gray-800 pb-4">
							<h4 className="font-mono text-indigo-400 font-bold flex items-center gap-2">
								<FiFileText /> {viewingFile}
							</h4>
							<button
								onClick={() => setSelectedFileContent(null)}
								className="text-gray-500 hover:text-white transition-colors text-sm"
							>
								Cerrar Vista Previa
							</button>
						</div>
						<div className="overflow-x-auto">
							<pre className="font-mono text-sm text-gray-300 leading-relaxed">
								{selectedFileContent}
							</pre>
						</div>

					</motion.div>
				)}
			</div>
		</motion.div>
	);
};

export default RepoDetail;