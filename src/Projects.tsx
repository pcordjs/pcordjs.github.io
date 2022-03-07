import { ComponentChildren } from 'preact';
import Heading from './Heading';
import Link from './Link';
import { useEffect, useState } from 'preact/hooks';
import LoadingSpinner from './LoadingSpinner';
import { Project, fetchProjects, checkInstallable } from './loadProjects';
import { useModal } from './ModalRoot';
import Modal from './Modal';
import InlineCode from './InlineCode';

let reposResolved: ReturnType<typeof fetchProjects> | null = null;
let checkInstallableResolved: ReturnType<typeof checkInstallable> | null = null;

export interface ProjectProps {
  project?: Project;
}

enum InstallTab {
  NPM,
  PNPM,
  YARN
}

function setPreferredPackageManager(tab: InstallTab) {
  localStorage.setItem('preferredPackageManager', JSON.stringify(tab));
}

function getPreferredPackageManager() {
  const manager = localStorage.getItem('preferredPackageManager');
  if (!manager) return InstallTab.NPM;
  return JSON.parse(manager) as InstallTab;
}
export function ProjectCard(props: ProjectProps) {
  const [, setInstallOpen] = useModal(() => {
    const [selectedTab, setTab] = useState<InstallTab>(
      getPreferredPackageManager()
    );
    const [copied, setCopied] = useState(false);

    useEffect(() => {
      if (!copied) return;
      const resetCopied = setTimeout(() => setCopied(false), 2000);
      return () => {
        clearTimeout(resetCopied);
        setCopied(false);
      };
    });

    const displayName = (tab: InstallTab) =>
      tab === InstallTab.NPM
        ? 'npm'
        : tab === InstallTab.PNPM
        ? 'pnpm'
        : 'Yarn';

    const installCommand = (tab: InstallTab) =>
      `${displayName(tab).toLowerCase()} ${
        selectedTab === InstallTab.NPM ? 'install' : 'add'
      } @pcordjs/${props.project?.name ?? '<project>'}`;

    return (
      <Modal onClose={() => setInstallOpen(false)}>
        <h1 class="text-4xl font-bold text-center mb-8">
          Install <InlineCode>{props.project?.name ?? '<project>'}</InlineCode>
        </h1>
        <div class="text-lg space-y-4">
          <p>
            All pcordjs projects are distributed on the npm registry. You may
            use any compatible package manager to install one.
          </p>
          <div>
            <div>
              {[InstallTab.NPM, InstallTab.PNPM, InstallTab.YARN].map((tab) => {
                return (
                  <button
                    class={`bg-gray-100 dark:bg-gray-800 font-bold py-2 px-4 first:rounded-tl-lg last:rounded-tr-lg border-b-2 ${
                      tab === selectedTab
                        ? 'border-rose-500'
                        : 'border-gray-100 dark:border-gray-800'
                    }`}
                    onClick={() => {
                      setTab(tab);
                      setPreferredPackageManager(tab);
                    }}
                  >
                    {displayName(tab)}
                  </button>
                );
              })}
            </div>
            <div class="bg-gray-100 dark:bg-gray-800 px-4 py-2 sm:px-8 sm:py-4 flex items-center justify-between rounded rounded-tl-none">
              <code>{installCommand(selectedTab)}</code>
              <button
                class="px-2 py-1 -my-1"
                onClick={() => {
                  navigator.clipboard
                    .writeText(installCommand(selectedTab))
                    .then(() => setCopied(true))
                    .catch(console.error);
                }}
              >
                <i
                  class={`fa-solid ${
                    copied
                      ? 'fa-check text-green-600 dark:text-green-500'
                      : 'fa-copy text-gray-500 dark:text-gray-300'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </Modal>
    );
  });

  let articleClass =
    'text-left bg-white dark:bg-gray-700 rounded-lg flex-auto shadow basis-0 min-w-[14rem] flex flex-col justify-between';
  if (!props.project) articleClass += ' animate-pulse';

  function renderButton() {
    let installButtonClasses =
      'px-4 py-1 rounded-xl outline-none outline-offset-0';

    if (props.project?.installable)
      installButtonClasses += ' text-white bg-rose-500';
    else if (props.project?.installable === false) {
      installButtonClasses +=
        ' text-gray-300 bg-gray-400 cursor-not-allowed focus:outline-rose-300';
    } else installButtonClasses += ' bg-gray-300 dark:bg-gray-500 cursor-wait';

    return !props.project || props.project.installable !== false ? (
      <button class={installButtonClasses} onClick={() => setInstallOpen(true)}>
        <div class={props.project ? 'py-0.5' : 'invisible'}>
          {typeof props.project?.installable === 'boolean' ? (
            'Install'
          ) : (
            <LoadingSpinner class="border-b-white" />
          )}
        </div>
      </button>
    ) : null;
  }

  const HeadingComponent = props.project?.hasDocs ? 'a' : 'p';

  return (
    <article class={articleClass}>
      <div class="p-4">
        {props.project ? (
          <>
            <HeadingComponent
              class={`font-semibold text-lg font-title ${
                props.project?.hasDocs ? 'hover:underline focus:underline' : ''
              }`}
              href={
                props.project?.hasDocs ? `/${props.project.name}` : undefined
              }
            >
              {props.project.name}
              {props.project?.hasDocs ? (
                <i class="fa-solid fa-arrow-up-right-from-square ml-2 text-gray-500 text-sm" />
              ) : null}
            </HeadingComponent>
            <p class="text-gray-400 antialiased">{props.project.description}</p>
          </>
        ) : (
          <div class="space-y-4">
            <div class="rounded-lg h-3 w-1/4 bg-gray-300 dark:bg-gray-500" />
            <div class="flex space-x-3 w-1/2">
              <div class="rounded h-2 bg-gray-200 dark:bg-gray-600 flex-1" />
              <div class="rounded h-2 bg-gray-200 dark:bg-gray-600 w-1/3" />
            </div>
          </div>
        )}
      </div>
      <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-b-lg flex items-center gap-4">
        {props.project ? (
          <>
            {/* TODO(@doinkythederp): make this a button that shows a modal */}
            {renderButton()}
            <Link href={props.project.url} icon="fa-brands fa-github">
              <span class="text-gray-400">Source</span>
            </Link>
          </>
        ) : (
          <>
            {renderButton()}
            <div class="rounded h-2 bg-gray-200 dark:bg-gray-600 w-[6ch]" />
          </>
        )}
      </div>
    </article>
  );
}

enum LoadingState {
  CARDS_LOADING,
  INSTALL_BUTTON_LOADING,
  DONE,
  ERROR
}

type ProjectListState =
  | {
      loading: LoadingState.CARDS_LOADING | LoadingState.ERROR;
      cardData: null;
    }
  | {
      loading: LoadingState.INSTALL_BUTTON_LOADING | LoadingState.DONE;
      cardData: Project[];
    };

export function ProjectList() {
  const [state, setState] = useState<ProjectListState>({
    loading: LoadingState.CARDS_LOADING,
    cardData: null
  });

  if (state.loading === LoadingState.CARDS_LOADING) {
    useEffect(() => {
      if (!reposResolved) reposResolved = fetchProjects();

      reposResolved
        .then((cardData) => {
          setState({
            loading: LoadingState.INSTALL_BUTTON_LOADING,
            cardData
          });

          if (!checkInstallableResolved)
            checkInstallableResolved = checkInstallable(cardData);

          checkInstallableResolved.finally(() =>
            setState({
              loading: LoadingState.DONE,
              cardData
            })
          );
        })
        .catch(() =>
          setState({
            loading: LoadingState.ERROR,
            cardData: null
          })
        );
    });
  }

  function* placeholders() {
    for (let i = 0; i < 3; i++) yield <ProjectCard key={i} />;
  }

  function renderProjects(): ComponentChildren {
    if (state.loading === LoadingState.ERROR) return 'Unavailable';
    else if (state.loading === LoadingState.CARDS_LOADING) {
      return (
        <>
          <span class="sr-only">Loading</span>
          {[...placeholders()]}
        </>
      );
    } else if (state.cardData) {
      return state.cardData.map((project) => (
        <ProjectCard project={project} key={project.id} />
      ));
    } else throw new Error('unreachable');
  }

  return (
    <div>
      <div class="p-4 mb-3 bg-gray-100 dark:bg-gray-900 rounded-lg">
        <Heading>Projects</Heading>
        <div class="flex p-4 gap-8 flex-wrap">{renderProjects()}</div>
      </div>
    </div>
  );
}
