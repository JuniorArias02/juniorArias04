const RUTAS = {
	INICIO: "/",
	PROYECTOS: "/proyectos",
	HABILIDADES: "/habilidades",
	CONTACTO: "/contacto",
	GITHUB: "/github",
	GITHUB_VIEW: (repo, path) => `/github/${repo}/view/${encodeURIComponent(path)}`

}

export default RUTAS;