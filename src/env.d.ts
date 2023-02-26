/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_PORT: number;
  readonly VITE_MONGOURL: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}