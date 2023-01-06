export interface IConfig {
    port: number;
    dbUrl: string;
    apiPrefix: string;
    swaggerUiPrefix: string;
}

export default (): IConfig => ({
    port: +process.env.PORT || 7000,
    dbUrl: process.env.DB_URL,
    apiPrefix: process.env.API_PREFIX,
    swaggerUiPrefix: process.env.SWAGGER_UI_PREFIX,
});
