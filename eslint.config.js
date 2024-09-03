module.exports = {
  // Outras configurações globais

  overrides: [
    {
      files: ['**/*.{js,ts,tsx}'],
      parser: '@typescript-eslint/parser',
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      rules: {
        // Suas regras específicas para arquivos .js, .ts e .tsx
      },
    },
  ],
  
  // Outros plugins, rules, etc.
};
