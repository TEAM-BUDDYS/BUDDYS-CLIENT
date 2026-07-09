/** @type {import('@svgr/core').Config} */
const config = {
  typescript: true,
  icon: true,
  jsxRuntime: 'automatic',

  prettier: false,

  replaceAttrValues: {
    '#2C3037': 'currentColor',
  },

  template: ({ imports, interfaces, componentName, jsx }, { tpl }) => {
    const stripped = componentName.replace(/^Svg/, '');
    const finalName = stripped.endsWith('Icon') ? stripped : `${stripped}Icon`;

    return tpl`
      ${imports};
      ${interfaces};
      export const ${finalName} = ({
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabelledBy,
        role,
        ...rest
      }: SVGProps<SVGSVGElement>) => {
        const hasLabel = Boolean(ariaLabel || ariaLabelledBy);
        const props = {
          ...rest,
          role: role ?? (hasLabel ? 'img' : undefined),
          'aria-hidden': hasLabel ? undefined : true,
          'aria-label': ariaLabel,
          'aria-labelledby': ariaLabelledBy,
        };
        return (${jsx});
      };
    `;
  },

  svgProps: {},

  svgoConfig: {
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            removeViewBox: false,
            cleanupIds: false,
          },
        },
      },
    ],
  },
};

export default config;
