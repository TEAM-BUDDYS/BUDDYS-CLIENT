/** @type {import('@svgr/core').Config} */
export default {
  typescript: true,
  icon: true, // width/height -> 1em, scales with font-size, overridable via className

  // Only true black (#000, #000000, black) becomes currentColor.
  // Other colors (teal, white, etc.) stay as-is, so logos keep their original colors automatically.
  // Matches by value, regardless of attribute name (fill or stroke).
  replaceAttrValues: {
    "#000": "currentColor",
    "#000000": "currentColor",
    black: "currentColor",
  },

  template: ({ imports, interfaces, componentName, props, jsx }, { tpl }) => {
    const stripped = componentName.replace(/^Svg/, "");
    const finalName = stripped.endsWith("Icon") ? stripped : `${stripped}Icon`;

    return tpl`
      ${imports};
      ${interfaces};
      export const ${finalName} = (${props}) => (
        ${jsx}
      );
    `;
  },

  svgProps: {
    "aria-hidden": "true",
  },

  svgoConfig: {
    plugins: [
      {
        name: "preset-default",
        params: {
          overrides: {
            removeViewBox: false,
          },
        },
      },
    ],
  },
};