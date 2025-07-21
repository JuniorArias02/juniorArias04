const vsViolet = {
  plain: {
    color: "#E4E7EB",
    backgroundColor: "#0F172A", // Fondo azul oscuro sofisticado
    fontSize: "0.95rem",
    fontFamily: "'JetBrains Mono', monospace"
  },
  styles: [
    {
      types: ["comment", "block-comment", "prolog", "doctype", "cdata"],
      style: {
        color: "#7FDBFF",
        fontStyle: "italic"
      }
    },
    {
      types: ["punctuation"],
      style: {
        color: "#B2F5EA"
      }
    },
    {
      types: ["property", "tag", "boolean", "number", "constant", "symbol", "deleted"],
      style: {
        color: "#81E6D9" // Turquesa brillante
      }
    },
    {
      types: ["selector", "attr-name", "string", "char", "builtin", "inserted"],
      style: {
        color: "#FEB2B2" // Rosa suave
      }
    },
    {
      types: ["operator", "entity", "url", "variable"],
      style: {
        color: "#90CDF4" // Azul cielo
      }
    },
    {
      types: ["atrule", "attr-value", "function"],
      style: {
        color: "#FAF089" // Amarillo brillante
      }
    },
    {
      types: ["keyword", "class-name"],
      style: {
        color: "#9F7AEA" // Morado luminoso
      }
    },
    {
      types: ["important", "bold"],
      style: {
        fontWeight: "bold"
      }
    },
    {
      types: ["italic"],
      style: {
        fontStyle: "italic"
      }
    },
    {
      types: ["namespace"],
      style: {
        opacity: 0.7
      }
    },
    {
      types: ["regex", "important"],
      style: {
        color: "#F687B3" // Rosa eléctrico
      }
    },
    {
      types: ["constant", "hexcode", "symbol"],
      style: {
        color: "#68D391" // Verde esmeralda
      }
    },
    {
      types: ["directive", "builtin", "boolean"],
      style: {
        color: "#63B3ED" // Azul profesional
      }
    },
    {
      types: ["decorator", "label"],
      style: {
        color: "#F6AD55" // Naranja cálido
      }
    }
  ]
};

export default vsViolet;