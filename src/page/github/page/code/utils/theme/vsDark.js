const vsDark = {
  plain: {
    color: "#d4d4d4",
    backgroundColor: "#1e1e1e"
  },
  styles: [
    {
      types: ["comment", "prolog", "doctype", "cdata"],
      style: {
        color: "#6A9955"
      }
    },
    {
      types: ["punctuation"],
      style: {
        color: "#d4d4d4"
      }
    },
    {
      types: ["property", "tag", "boolean", "number", "constant", "symbol"],
      style: {
        color: "#b5cea8"
      }
    },
    {
      types: ["selector", "attr-name", "string", "char", "builtin"],
      style: {
        color: "#ce9178"
      }
    },
    {
      types: ["operator", "entity", "url", "language-css"],
      style: {
        color: "#d4d4d4"
      }
    },
    {
      types: ["keyword"],
      style: {
        color: "#569cd6"
      }
    },
    {
      types: ["function"],
      style: {
        color: "#dcdcaa"
      }
    },
    {
      types: ["deleted"],
      style: {
        color: "red"
      }
    }
  ]
};

export default vsDark;
