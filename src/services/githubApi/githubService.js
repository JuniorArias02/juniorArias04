import axios from "axios";
import { atob } from "atob";

const TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const USERNAME = "JuniorArias02";
const BASE_URL = `https://api.github.com/users/${USERNAME}`;

const axiosConfig = {
	headers: {
		Authorization: `token ${TOKEN}`,
	},
};

export const getUserData = async () => {
	try {
		const { data } = await axios.get(BASE_URL, axiosConfig);
		return data;
	} catch (error) {
		console.error("Error al traer datos del usuario", error);
		return null;
	}
};

export const getRepos = async () => {
	try {
		const { data } = await axios.get(`${BASE_URL}/repos?per_page=100`, axiosConfig);
		return data;
	} catch (error) {
		console.error("Error al traer los repos de GitHub", error);
		return [];
	}
};

export const getLanguages = async (repos) => {
	const langs = {};

	for (const repo of repos) {
		try {
			const { data } = await axios.get(repo.languages_url, axiosConfig);
			for (const [lang, val] of Object.entries(data)) {
				langs[lang] = (langs[lang] || 0) + val;
			}
		} catch (err) {
			console.error(`Error en lenguajes del repo ${repo.name}`, err);
		}
	}

	return Object.entries(langs).map(([name, value]) => ({ name, value }));
};

export const getRepoContents = async (repoName, path = "") => {
	try {
		const res = await axios.get(
			`https://api.github.com/repos/${USERNAME}/${repoName}/contents/${path}`,
			axiosConfig
		);
		return res.data;
	} catch (error) {
		console.error("Error al traer contenido del repo", error);
		return [];
	}
};


export const handleViewFile = async (file, token) => {
	try {
		const res = await axios.get(file.url, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		const decoded = window.atob(res.data.content);

		return decoded;
	} catch (err) {
		console.error("No se pudo cargar el archivo", err);
		return null;
	}
};

export const getFileContent = async (repoName, filePath) => {
	try {
		const url = `https://api.github.com/repos/${USERNAME}/${repoName}/contents/${filePath}`;
		const res = await axios.get(url, {
			headers: {
				Authorization: `Bearer ${TOKEN}`,
			},
		});

		if (Array.isArray(res.data)) {
			return null; 
		}

		const { content, encoding, type } = res.data;

		if (type !== "file" || encoding !== "base64" || typeof content !== "string") {
			return null;
		}


		const decodeBase64 = (str) => {
			if (typeof window !== "undefined" && window.atob) {
				return window.atob(str);
			} else {
				return Buffer.from(str, "base64").toString("utf-8"); 
			}
		};

		return decodeBase64(content);

	} catch (err) {
		console.error("Error al obtener el contenido del archivo:", err);
		throw err;
	}
};
