const path = require('path');
const MakeOptionalPlugin = require('./.webpack/make-optional-plugin');
module.exports = (defaultOptions, webpack) => {
    return {
        externals: {},
        resolve: {
            ...defaultOptions.resolve,
            extensions: [...defaultOptions.resolve.extensions, '.json'],
            alias: {
                '@rollup/plugin-json': '/app/node_modules/@rollup/plugin-json/dist/index.js',
                '@rollup/plugin-replace':
                    '/app/node_modules/@rollup/plugin-replace/dist/rollup-plugin-replace.cjs.js',
                '@rollup/plugin-commonjs': '/app/node_modules/@rollup/plugin-commonjs/dist/index.js',
            },
        },
        module: {
            ...defaultOptions.module,
            rules: [
                ...defaultOptions.module.rules,
                {
                    test: path.resolve(
                        'node_modules/sequelize-typescript/dist/sequelize/sequelize/sequelize-service.js',
                    ),
                    use: [
                        {
                            loader: path.resolve('.webpack/rewrite-require-loader.js'),
                            options: {
                                search: 'fullPath',
                                context: {
                                    directory: path.resolve('src'),
                                    useSubdirectories: true,
                                    regExp: '/\\.entity\\.ts$/',
                                    transform: ".replace('/app/src', '.').replace(/$/, '.ts')",
                                },
                            },
                        },
                    ],
                },
                {
                    test: path.resolve(
                        'node_modules/@adminjs/upload/build/features/upload-file/upload-file.feature.js',
                    ),
                    use: [
                        {
                            loader: path.resolve('.webpack/rewrite-code-loader.js'),
                            options: {
                                replacements: [
                                    {
                                        search: /adminjs_1\.default\.bundle\('\.\.\/\.\.\/\.\.\/src\/features\/upload-file\/components\/edit'\)/,
                                        replace:
                                            "adminjs_1.default.bundle('/app/node_modules/@adminjs/upload/src/features/upload-file/components/edit')",
                                    },

                                    {
                                        search: /adminjs_1\.default\.bundle\('\.\.\/\.\.\/\.\.\/src\/features\/upload-file\/components\/list'\)/,
                                        replace:
                                            "adminjs_1.default.bundle('/app/node_modules/@adminjs/upload/src/features/upload-file/components/list')",
                                    },

                                    {
                                        search: /adminjs_1\.default\.bundle\('\.\.\/\.\.\/\.\.\/src\/features\/upload-file\/components\/show'\)/,
                                        replace:
                                            "adminjs_1.default.bundle('/app/node_modules/@adminjs/upload/src/features/upload-file/components/show')",
                                    },
                                ],
                            },
                        },
                    ],
                },
                {
                    test: path.resolve('node_modules/@babel/core/lib/config/files/plugins.js'),
                    use: [
                        {
                            loader: path.resolve('.webpack/rewrite-code-loader.js'),
                            options: {
                                replacements: [
                                    {
                                        search: /const standardizedName = [^;]+;/,
                                        replace: (match) => `${match} return standardizedName;`,
                                    },
                                ],
                            },
                        },
                    ],
                },
                {
                    test: path.resolve('node_modules/@babel/core/lib/config/files/module-types.js'),
                    use: [
                        {
                            loader: path.resolve('.webpack/rewrite-require-loader.js'),
                            options: {
                                search: 'filepath',
                                context: {
                                    directory: path.resolve('node_modules/@babel'),
                                    useSubdirectories: true,
                                    regExp: '/(preset-env\\/lib\\/index\\.js|preset-react\\/lib\\/index\\.js|preset-typescript\\/lib\\/index\\.js)$/',
                                    transform: ".replace('./node_modules/@babel', '.')",
                                },
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [
            ...defaultOptions.plugins,
            new MakeOptionalPlugin([
                '@nestjs/websockets/socket-module',
                '@nestjs/microservices/microservices-module',
                'class-transformer/storage',
                'fastify-swagger',
                'pg-native',
            ]),
        ],
        optimization: {
            minimize: false,
            moduleIds: 'named',
        },
    };
};
