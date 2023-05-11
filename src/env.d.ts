/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_PORT: number;
  readonly VITE_MONGOURL: string;
  readonly VITE_API_ENDPOINT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}