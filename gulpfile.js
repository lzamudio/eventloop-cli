const { src, dest } = require('gulp');

function copy() {
  let path = require('./tsconfig.json').compilerOptions.outDir;
  return src(['src/**/*.json', 'src/**/files/**', 'src/**/files/**/.gitkeep']).pipe(dest(path))
}

exports.default = copy;
