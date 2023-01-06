class MakeOptionalPlugin {
    constructor(deps) {
        this.deps = deps;
    }

    apply(compiler) {
        compiler.hooks.compilation.tap('HelloCompilationPlugin', (compilation) => {
            compilation.hooks.succeedModule.tap('MakeOptionalPlugin', (module) => {
                module.dependencies.forEach((d) => {
                    this.deps.forEach((d2) => {
                        if (d.request == d2) d.optional = true;
                    });
                });
            });
        });
    }
}

module.exports = MakeOptionalPlugin;
