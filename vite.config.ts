import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'facile',
            formats: [ 'es', 'cjs', 'umd' ],
            fileName: (format) => `facile.${format}.js`,
        },
        sourcemap: true,
    },
    plugins: [
        dts({
            insertTypesEntry: true,
            rollupTypes: true
        })
    ]
});