export default {
  '*.{ts,js,json}': () => ['tsc', 'vite build'],
  '*.ts': (files) => [`eslint ${files.join(' ')}`]
};
