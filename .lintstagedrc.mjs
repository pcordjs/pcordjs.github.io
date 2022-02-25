export default {
  '*.{ts{x,},{c,m,}js,json}': () => ['tsc', 'vite build'],
  '*.ts{x,}': (files) => [`eslint ${files.join(' ')}`]
};
