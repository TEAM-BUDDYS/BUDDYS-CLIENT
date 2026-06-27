/** @type {import('@svgr/core').Config} */
export default {
  typescript: true,
  icon: true,

  replaceAttrValues: {
    '#000': 'currentColor',
    '#000000': 'currentColor',
    black: 'currentColor',
  },

  template: ({ imports, interfaces, componentName, props, jsx }, { tpl }) => {
    const stripped = componentName.replace(/^Svg/, '');
    const finalName = stripped.endsWith('Icon') ? stripped : `${stripped}Icon`;

    return tpl`
      ${imports};
      ${interfaces};
      export const ${finalName} = (${props}) => (
        ${jsx}
      );
    `;
  },

  svgProps: {
    'aria-hidden': 'true',
  },

  svgoConfig: {
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            removeViewBox: false,
          },
        },
      },
    ],
  },
};
