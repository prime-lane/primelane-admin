/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PRIMELANE_API_BASE_URL: string;
  VITE_USE_MOCK_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
