/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** The GitHub Organization to pull repositories from. */
  VITE_GITHUB_ORG: string;
  /** Optional GitHub token for larger rate limits during development */
  VITE_GITHUB_TOKEN?: string;
}
