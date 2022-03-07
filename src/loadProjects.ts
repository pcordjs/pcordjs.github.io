import { Octokit } from '@octokit/core';

const octokit = new Octokit({
  auth: import.meta.env.VITE_GITHUB_TOKEN
});

export interface Project {
  name: string;
  description: string;
  url: string;
  installable: boolean | null;
  id: number;
  hasDocs: boolean;
}

let cacheExpireTime: number | null = Number(
  import.meta.env.VITE_PROJECTS_CACHE_EXPIRY ?? 1000 * 60 * 60
);
if (cacheExpireTime === -1) cacheExpireTime = null;

function cacheProjects(projects: Project[]) {
  localStorage.setItem('projects', JSON.stringify(projects));
  localStorage.setItem('lastUpdated', JSON.stringify(Date.now()));
  return projects;
}

function getCachedProjects() {
  const projects = localStorage.getItem('projects');
  const lastUpdated = localStorage.getItem('lastUpdated');
  // cache is only valid for 1 hour in case a project changes
  return projects &&
    (!lastUpdated ||
      cacheExpireTime === null ||
      Date.now() - JSON.parse(lastUpdated) < cacheExpireTime)
    ? (JSON.parse(projects) as Project[])
    : null;
}

export const fetchProjects = () => {
  const request = Promise.resolve(
    getCachedProjects() ??
      octokit
        .request('GET /orgs/{org}/repos', {
          org: import.meta.env.VITE_GITHUB_ORG
        })
        .then((res) =>
          res.data.map<Project>((repo) => ({
            name: repo.name,
            description: repo.description ?? 'No description',
            url: repo.html_url,
            installable: null,
            id: repo.id,
            hasDocs: repo.has_pages ?? false
          }))
        )
        .then(cacheProjects)
  );

  // eslint-disable-next-line no-console
  request.catch(console.error);

  return request;
};

export const checkInstallable = async (projects: Project[]) => {
  if (projects[0]?.installable !== null) return;
  const requests = projects.map((project) =>
    octokit
      .request('GET /repos/{owner}/{repo}/releases/latest', {
        owner: import.meta.env.VITE_GITHUB_ORG,
        repo: project.name
      })
      .then(() => (project.installable = true))
      .catch(() => (project.installable = false))
  );

  await Promise.all(requests);

  cacheProjects(projects);
};
