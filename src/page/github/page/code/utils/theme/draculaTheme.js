const dracula = {
  plain: {
    color: "#f8f8f2",
    backgroundColor: "#282a36",
  },
  styles: [
    {
      types: ["comment", "prolog", "doctype", "cdata"],
      style: {
        color: "#6272a4",
        fontStyle: "italic",
      },
    },
    {
      types: ["namespace"],
      style: {
        opacity: 0.7,
      },
    },
    {
      types: ["string", "attr-value"],
      style: {
        color: "#f1fa8c",
      },
    },
    {
      types: ["punctuation", "operator"],
      style: {
        color: "#f8f8f2",
      },
    },
    {
      types: ["entity", "url", "symbol", "number", "boolean", "variable", "constant", "property", "regex", "inserted"],
      style: {
        color: "#bd93f9",
      },
    },
    {
      types: ["atrule", "keyword", "attr-name", "selector"],
      style: {
        color: "#ff79c6",
      },
    },
    {
      types: ["function", "deleted", "tag"],
      style: {
        color: "#ff5555",
      },
    },
    {
      types: ["function-variable"],
      style: {
        color: "#50fa7b",
      },
    },
    {
      types: ["tag", "selector", "keyword"],
      style: {
        color: "#8be9fd",
      },
    },
  ],
};

export default dracula;
