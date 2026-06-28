const lintStagedConfig = {
  '*.{js,jsx,mjs,cjs,ts,tsx}': ['eslint --fix', 'prettier --write'],
  '*.{json,css,md,yml,yaml}': 'prettier --write',
};

export default lintStagedConfig;
