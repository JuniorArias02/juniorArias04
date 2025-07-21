import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
	FiFolder,
	FiFile,
	FiChevronLeft,
	FiHome,
	FiGithub,
	FiArrowLeft,
	FiExternalLink
} from "react-icons/fi";
import { getRepoContents, handleViewFile } from "../../../services/githubApi/githubService";


const RepoDetail = () => {
	const { repoName } = useParams();
	const [files, setFiles] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();
	const [selectedFileContent, setSelectedFileContent] = useState(null);
	const [viewingFile, setViewingFile] = useState(null);
	const location = useLocation();
	const [searchParams] = useSearchParams();
	const initialPath = searchParams.get("path") || "";
	const [currentPath, setCurrentPath] = useState(initialPath);


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
				setFiles(content);
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
			className="min-h-screen bg-gray-900 p-6 md:p-8 lg:p-12"
		>
			{/* Breadcrumbs y navegación */}
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
				<div className="flex items-center gap-2">
					{!currentPath ? (
						// Si estás en raíz del repo
						<motion.button
							whileHover={{ x: -2 }}
							whileTap={{ scale: 0.95 }}
							onClick={goToMainGithub}
							className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors"
						>
							<FiArrowLeft size={18} />
							<span>Volver a repositorios</span>
						</motion.button>
					) : (
						<>
							{/* Retroceder */}
							<motion.button
								whileHover={{ x: -2 }}
								whileTap={{ scale: 0.95 }}
								onClick={() => {
									const pathParts = currentPath.split("/");
									pathParts.pop();
									setCurrentPath(pathParts.join("/"));
								}}
								className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors"
							>
								<FiArrowLeft size={18} />
								<span>Retroceder</span>
							</motion.button>

							{/* Ir a raíz del repo */}
							<motion.button
								whileHover={{ x: -2 }}
								whileTap={{ scale: 0.95 }}
								onClick={() => setCurrentPath("")}
								className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors ml-4"
							>
								<FiHome size={18} />
								<span>Inicio</span>
							</motion.button>
						</>
					)}

				</div>

				<div className="flex items-center text-sm text-gray-400 bg-gray-800/50 px-3 py-2 rounded-lg">
					<FiGithub className="mr-2" />
					<span className="font-mono">{repoName}</span>
					{pathSegments.length > 0 && (
						<span className="mx-1 text-gray-500">/</span>
					)}
					{pathSegments.map((segment, index) => (
						<div key={index} className="flex items-center">
							<button
								onClick={() => setCurrentPath(pathSegments.slice(0, index + 1).join("/"))}
								className="hover:text-indigo-300 transition-colors font-mono"
							>
								{segment}
							</button>
							{index < pathSegments.length - 1 && (
								<span className="mx-1 text-gray-500">/</span>
							)}
						</div>
					))}
				</div>
			</div>

			{/* Título */}
			<motion.h2
				initial={{ y: -10, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent"
			>
				{repoName}
				{currentPath && (
					<span className="text-gray-300"> / {currentPath}</span>
				)}
			</motion.h2>

			{/* Contenido */}
			{isLoading ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{[...Array(6)].map((_, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0.5 }}
							animate={{ opacity: [0.5, 0.8, 0.5] }}
							transition={{ duration: 1.5, repeat: Infinity }}
							className="bg-gray-800/50 h-16 rounded-lg"
						/>
					))}
				</div>
			) : (
				<motion.ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					<AnimatePresence>
						{files.map((file) => (
							<motion.li
								key={file.path}
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0 }}
								transition={{ type: "spring", stiffness: 300 }}
								className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-indigo-400/50 transition-all overflow-hidden"
							>
								{file.type === "dir" ? (
									<motion.button
										whileHover={{ x: 5 }}
										onClick={() => handleNavigate(file.name)}
										className="w-full h-full p-4 text-left flex items-center gap-4"
									>
										<div className="text-indigo-400">
											<FiFolder size={24} />
										</div>
										<div className="flex-1 min-w-0">
											<h3 className="text-lg font-medium text-gray-100 truncate">{file.name}</h3>
											<p className="text-sm text-gray-400">Directorio</p>
										</div>
										<FiChevronLeft className="text-gray-500 rotate-180" />
									</motion.button>

								) : (
									<button
										onClick={() => handleOpenFilePage(file)}
										className="w-full h-full p-4 flex items-center gap-4 text-left group"
									>
										<div className="text-emerald-400">
											<FiFile size={24} />
										</div>
										<div className="flex-1 min-w-0">
											<h3 className="text-lg font-medium text-gray-100 truncate group-hover:text-emerald-300 transition-colors">
												{file.name}
											</h3>
											<p className="text-sm text-gray-400">Archivo</p>
										</div>
										<FiExternalLink className="text-gray-500 group-hover:text-emerald-300 transition-colors" />
									</button>

								)}
							</motion.li>
						))}
					</AnimatePresence>
				</motion.ul>
			)}
			{selectedFileContent && (
				<div className="mt-8 bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm text-gray-200 whitespace-pre">
					<h4 className="mb-2 font-bold">{viewingFile}</h4>
					<pre>{selectedFileContent}</pre>
				</div>
			)}

			{/* Estado vacío */}
			{!isLoading && files.length === 0 && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="text-center py-12"
				>
					<div className="text-6xl mb-4">📁</div>
					<h3 className="text-xl font-medium text-gray-300">Directorio vacío</h3>
					<p className="text-gray-400 mt-2">No hay archivos en esta ubicación</p>
				</motion.div>
			)}
		</motion.div>
	);
};

export default RepoDetail;