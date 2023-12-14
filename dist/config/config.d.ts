interface ConfigInterface {
    NODE_ENV: string;
    PORT: string;
    DB_USER: string;
    DB_DATABASE: string;
    DB_PASSWORD: string;
    DB_PORT: string;
    DB_HOST: string;
    SECRET_KEY: string;
    ADMIN_EMAIL: string;
    ADMIN_PASSWORD: string;
    PAYME_ENDPOINT: string;
    PAYME_KEY: string;
    PAYME_ID: string;
    PAYME_PASSWORD: string;
    ESKIZ_ENDPOINT: string;
    ESKIZ_EMAIL: string;
    ESKIZ_PASSWORD: string;
}
declare const _default: ConfigInterface;
export default _default;
