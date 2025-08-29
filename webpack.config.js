// import path from 'path';
// import { fileURLToPath } from 'url';

// // __dirname workaround (not defined in ESM)
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// export default {
//   mode: 'development',
//   entry: './src/app.ts',
//   output: {
//     filename: 'bundle.js',
//     path: path.resolve(__dirname, 'dist'),
//     clean: true,
//   },
//   resolve: {
//     extensions: ['.ts', '.js'],
//   },
//   module: {
//     rules: [
//       {
//         test: /\.ts$/,
//         use: 'ts-loader',
//         exclude: /node_modules/, // (fixed: removed extra quote)
//       },
//     ],
//   },
// };
