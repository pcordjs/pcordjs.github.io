/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** The GitHub Organization to pull repositories from. */
  VITE_GITHUB_ORG: string;
  /** Optional GitHub token for larger rate limits during development */
  VITE_GITHUB_TOKEN?: string;
  /**
   * The time in milliseconds after which the home page projects expire, and the
   * new data is fetched from GitHub. Set to `-1` to completely disable.
   * @default 3600000
   */
  VITE_PROJECTS_CACHE_EXPIRY?: string;
}
