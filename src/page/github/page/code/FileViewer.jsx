import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FiChevronLeft,
  FiExternalLink,
  FiCopy,
  FiDownload,
  FiMenu,
  FiX
} from "react-icons/fi";
import { getFileContent } from "../../../../services/githubApi/githubService";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const FileViewer = () => {
  const { repoName } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const filePath = decodeURIComponent(location.pathname.split(`/view/`)[1]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const fileExtension = filePath.split('.').pop();
  const fileName = filePath.split('/').pop();

  // Detectamos el lenguaje para resaltado de sintaxis
  const getLanguage = (extension) => {
    const languages = {
      js: 'javascript',
      jsx: 'javascript',
      ts: 'typescript',
      tsx: 'typescript',
      py: 'python',
      java: 'java',
      c: 'c',
      cpp: 'cpp',
      html: 'html',
      css: 'css',
      json: 'json',
      md: 'markdown',
      sh: 'bash',
      yml: 'yaml',
      yaml: 'yaml',
      go: 'go',
      rs: 'rust',
      php: 'php',
      rb: 'ruby',
      cs: 'csharp',
      sql: 'sql',
    };
    return languages[extension] || 'plaintext';
  };

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const text = await getFileContent(repoName, filePath);
        setContent(text);
      } catch (err) {
        setContent("// No se pudo cargar el archivo 😢\n" + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFile();
  }, [repoName, filePath]);

  // Efecto para el mensaje de copiado
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  // Manejar redimensionamiento
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowSize.width < 768;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gray-900 text-white min-h-screen"
    >
      {/* Barra superior del editor */}
      <div className="bg-gray-800 border-b border-gray-700 p-3 md:p-4 flex justify-between items-center">
        <div className="flex items-center gap-2 md:gap-4">
          <motion.button
            whileHover={{ x: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 md:gap-2 text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <FiChevronLeft size={isMobile ? 16 : 20} />
            {!isMobile && <span>Volver</span>}
          </motion.button>
          
          {!isMobile && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-400">Repositorio:</span>
              <span className="font-mono text-emerald-400 truncate max-w-xs">{repoName}</span>
            </div>
          )}
        </div>

        {/* Menú móvil */}
        {isMobile ? (
          <div className="relative">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 p-1"
            >
              {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
            
            {mobileMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 top-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10 w-48"
              >
                <a
                  href={`https://github.com/${repoName}/blob/main/${filePath}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:bg-gray-700 transition-colors"
                >
                  <FiExternalLink size={16} />
                  <span>Abrir en GitHub</span>
                </a>
                
                <CopyToClipboard
                  text={content}
                  onCopy={() => {
                    setCopied(true);
                    setMobileMenuOpen(false);
                  }}
                >
                  <button className="w-full flex items-center gap-2 px-4 py-2 text-gray-300 hover:bg-gray-700 transition-colors">
                    <FiCopy size={16} />
                    <span>{copied ? '¡Copiado!' : 'Copiar'}</span>
                  </button>
                </CopyToClipboard>
                
                <button
                  onClick={() => {
                    const blob = new Blob([content], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = fileName;
                    a.click();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-gray-300 hover:bg-gray-700 transition-colors"
                >
                  <FiDownload size={16} />
                  <span>Descargar</span>
                </button>
              </motion.div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2 md:gap-4">
            <a
              href={`https://github.com/${repoName}/blob/main/${filePath}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 md:gap-2 text-gray-300 hover:text-indigo-400 transition-colors text-sm md:text-base"
            >
              <FiExternalLink size={isMobile ? 16 : 18} />
              <span>Abrir en GitHub</span>
            </a>

            <CopyToClipboard
              text={content}
              onCopy={() => setCopied(true)}
            >
              <button className="flex items-center gap-1 md:gap-2 text-gray-300 hover:text-amber-400 transition-colors text-sm md:text-base">
                <FiCopy size={isMobile ? 16 : 18} />
                <span>{copied ? '¡Copiado!' : 'Copiar'}</span>
              </button>
            </CopyToClipboard>

            <button
              onClick={() => {
                const blob = new Blob([content], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = fileName;
                a.click();
              }}
              className="flex items-center gap-1 md:gap-2 text-gray-300 hover:text-emerald-400 transition-colors text-sm md:text-base"
            >
              <FiDownload size={isMobile ? 16 : 18} />
              <span>Descargar</span>
            </button>
          </div>
        )}
      </div>

      {/* Ruta del archivo */}
      <div className="bg-gray-800/50 px-3 md:px-6 py-2 md:py-3 border-b border-gray-700 overflow-x-auto">
        <div className="font-mono text-xs md:text-sm text-gray-300 flex items-center gap-1 min-w-max">
          {filePath.split('/').map((part, index, arr) => (
            <span key={index} className="flex items-center">
              {index > 0 && <span className="mx-1 text-gray-500">/</span>}
              {index === arr.length - 1 ? (
                <span className="text-indigo-400">{part}</span>
              ) : (
                <span>{part}</span>
              )}
            </span>
          ))}
        </div>
      </div>

      {/* Contenido del archivo */}
      {loading ? (
        <div className="p-4 md:p-8 flex justify-center">
          <div className="animate-pulse text-gray-400">Cargando archivo...</div>
        </div>
      ) : (
        <div className="relative">
          <SyntaxHighlighter
            language={getLanguage(fileExtension)}
            style={dracula}
            showLineNumbers={!isMobile}
            wrapLines
            lineNumberStyle={{ 
              color: '#6B7280', 
              minWidth: isMobile ? '1.5em' : '2.5em',
              paddingRight: isMobile ? '0.5em' : '1em'
            }}
            customStyle={{
              margin: 0,
              padding: isMobile ? '1rem' : '1.5rem',
              background: '#111827',
              height: isMobile ? 'calc(100vh - 90px)' : 'calc(100vh - 110px)',
              overflow: 'auto',
              fontSize: isMobile ? '0.8rem' : '0.9rem',
              lineHeight: isMobile ? '1.4' : '1.5'
            }}
          >
            {content}
          </SyntaxHighlighter>
        </div>
      )}
    </motion.div>
  );
};

export default FileViewer;