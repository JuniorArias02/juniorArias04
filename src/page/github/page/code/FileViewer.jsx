import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiChevronLeft,
  FiExternalLink,
  FiCopy,
  FiDownload,
  FiCheck,
  FiCode,
  FiMaximize2
} from "react-icons/fi";
import { getFileContent } from "../../../../services/githubApi/githubService";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const FileViewer = () => {
  const { repoName } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [searchParams] = useSearchParams();
  const filePath = searchParams.get("path") || "";
  const fileName = filePath.split('/').pop();
  const fileExtension = fileName.split('.').pop();

  const getLanguage = (extension) => {
    const languages = {
      js: 'javascript', jsx: 'javascript', ts: 'typescript', tsx: 'typescript',
      py: 'python', java: 'java', html: 'html', css: 'css', json: 'json',
      md: 'markdown', sh: 'bash', yml: 'yaml', yaml: 'yaml', sql: 'sql',
      rs: 'rust', go: 'go', php: 'php'
    };
    return languages[extension] || 'plaintext';
  };

  useEffect(() => {
    const fetchFile = async () => {
      setLoading(true);
      try {
        if (!filePath) {
          setContent(null);
          return;
        }
        const text = await getFileContent(repoName, filePath);
        if (text === null) {
          navigate(`/github/${repoName}`);
          return;
        }
        setContent(text || "// Este archivo está vacío 🫥");
      } catch (err) {
        setContent("// No se pudo cargar el archivo 😢\n" + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFile();
  }, [repoName, filePath, navigate]);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleGoBack = () => {
    const pathParts = filePath.split("/");
    if (pathParts.length > 0) {
      pathParts.pop();
      const newPath = pathParts.join("/");
      navigate(`/github/${repoName}?path=${encodeURIComponent(newPath)}`);
    } else {
      navigate(`/github/${repoName}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gray-950 text-white min-h-screen p-4 md:p-8 flex items-center justify-center relative overflow-hidden"
    >
      {/* Background Ambient Effects */}
      <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-indigo-900/10 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-6xl relative z-10 flex flex-col h-[90vh]">

        {/* Navigation & Breadcrumbs */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center gap-4 mb-6"
        >
          <button
            onClick={handleGoBack}
            className="p-2 rounded-lg bg-gray-900/50 hover:bg-gray-800 text-gray-400 hover:text-white transition-colors border border-gray-800"
          >
            <FiChevronLeft size={20} />
          </button>
          <div className="text-gray-400 font-mono text-sm">
            <span className="text-indigo-400">{repoName}</span>
            <span className="mx-2">/</span>
            <span className="text-gray-200">{filePath}</span>
          </div>
        </motion.div>

        {/* IDE UI Container */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex-1 bg-[#1e222a] rounded-2xl overflow-hidden shadow-2xl border border-gray-800 flex flex-col relative"
        >
          {/* Window Title Bar */}
          <div className="bg-[#1e222a] border-b border-gray-800 p-4 flex items-center justify-between">

            {/* Mac-style Buttons */}
            <div className="flex items-center gap-2 w-24">
              <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 transition-colors" />
            </div>

            {/* Filename */}
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-400 font-mono bg-black/20 px-4 py-1.5 rounded-full border border-white/5">
              <FiCode size={14} className="text-indigo-400" />
              <span>{fileName}</span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 w-24 justify-end">
              <CopyToClipboard text={content} onCopy={() => setCopied(true)}>
                <button
                  className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-md transition-colors relative group"
                  title="Copiar código"
                >
                  {copied ? <FiCheck className="text-emerald-400" /> : <FiCopy />}
                  {copied && (
                    <span className="absolute -bottom-8 right-0 text-xs bg-emerald-500 text-white px-2 py-1 rounded shadow-lg whitespace-nowrap">
                      Copiado!
                    </span>
                  )}
                </button>
              </CopyToClipboard>

              <button
                onClick={handleDownload}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-md transition-colors"
                title="Descargar archivo"
              >
                <FiDownload />
              </button>

              <a
                href={`https://github.com/${repoName}/blob/main/${filePath}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-md transition-colors"
                title="Abrir en GitHub"
              >
                <FiExternalLink />
              </a>
            </div>
          </div>

          {/* Code Content */}
          <div className="flex-1 overflow-auto custom-scrollbar relative bg-[#282c34]">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                  <p className="text-gray-500 text-sm font-mono">Cargando contenido...</p>
                </div>
              </div>
            ) : (
              <SyntaxHighlighter
                language={getLanguage(fileExtension)}
                style={atomDark}
                showLineNumbers={true}
                customStyle={{
                  margin: 0,
                  padding: '1.5rem',
                  background: 'transparent',
                  fontSize: '0.9rem',
                  lineHeight: '1.6',
                  fontFamily: "'Fira Code', 'JetBrains Mono', monospace",
                }}
                lineNumberStyle={{
                  minWidth: '3rem',
                  paddingRight: '1.5rem',
                  color: '#4b5563',
                  textAlign: 'right'
                }}
                wrapLines={true}
              >
                {content}
              </SyntaxHighlighter>
            )}
          </div>

          {/* Status Bar */}
          <div className="bg-[#191d24] text-xs text-gray-500 p-2 px-4 flex justify-between items-center border-t border-gray-800 font-mono select-none">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Ready
              </span>
              <span>UTF-8</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="uppercase text-indigo-400">{getLanguage(fileExtension)}</span>
              <span>Read Only</span>
            </div>
          </div>

        </motion.div>

      </div>
    </motion.div>
  );
};

export default FileViewer;