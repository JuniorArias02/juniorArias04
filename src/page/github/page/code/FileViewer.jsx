import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FiChevronLeft,
  FiExternalLink,
  FiCopy,
  FiDownload
} from "react-icons/fi";
import { getFileContent } from "../../../../services/githubApi/githubService";
import Editor from "@monaco-editor/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";


import { CopyToClipboard } from 'react-copy-to-clipboard';

const FileViewer = () => {
  const { repoName } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const filePath = decodeURIComponent(location.pathname.split(`/view/`)[1]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gray-900 text-white min-h-screen"
    >
      {/* Barra superior del editor */}
      <div className="bg-gray-800 border-b border-gray-700 p-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ x: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <FiChevronLeft size={20} />
            <span>Volver</span>
          </motion.button>

          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-400">Repositorio:</span>
            <span className="font-mono text-emerald-400">{repoName}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={`https://github.com/${repoName}/blob/main/${filePath}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-300 hover:text-indigo-400 transition-colors"
          >
            <FiExternalLink size={18} />
            <span>Abrir en GitHub</span>
          </a>

          <CopyToClipboard
            text={content}
            onCopy={() => setCopied(true)}
          >
            <button className="flex items-center gap-2 text-gray-300 hover:text-amber-400 transition-colors">
              <FiCopy size={18} />
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
            className="flex items-center gap-2 text-gray-300 hover:text-emerald-400 transition-colors"
          >
            <FiDownload size={18} />
            <span>Descargar</span>
          </button>
        </div>
      </div>

      {/* Ruta del archivo */}
      <div className="bg-gray-800/50 px-6 py-3 border-b border-gray-700">
        <div className="font-mono text-sm text-gray-300 flex items-center gap-1">
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
        <div className="p-8 flex justify-center">
          <div className="animate-pulse text-gray-400">Cargando archivo...</div>
        </div>
      ) : (
        <div className="relative">
          {/* Usando Monaco Editor (simulación) */}
          <div className="h-[calc(100vh-110px)] overflow-hidden">
            {/* <Editor
              height="100%"
              defaultLanguage={getLanguage(fileExtension)}
              value={content}
              theme={dracula}
              options={{
                readOnly: true,
                minimap: { enabled: true },
                fontSize: 14,
                wordWrap: 'on',
                renderWhitespace: 'boundary',
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                automaticLayout: true
              }}
            /> */}

            <SyntaxHighlighter
              language={getLanguage(fileExtension)}
              style={dracula}
              showLineNumbers
              wrapLines
              lineNumberStyle={{ color: '#6B7280', minWidth: '2.5em' }}
              customStyle={{
                margin: 0,
                padding: '1.5rem',
                background: '#111827',
                height: 'calc(100vh - 110px)',
                overflow: 'auto',
                fontSize: '0.9rem'
              }}
            >
              {content}
            </SyntaxHighlighter>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default FileViewer;