import { ComponentChildren } from 'preact';
import Heading from './Heading';

export interface ProjectListProps {
  children: ComponentChildren;
}

export function ProjectList(props: ProjectListProps) {
  return (
    <div>
      <div class="p-4 mb-3 bg-gray-100 dark:bg-gray-900 rounded-lg">
        <Heading>Projects</Heading>
        <div class="flex p-4 gap-8 flex-wrap">{props.children}</div>
      </div>
    </div>
  );
}

export interface ProjectProps {
  name: string;
  description: string;
  repoUrl: string;
}

export function Project(props: ProjectProps) {
  return (
    <article class="text-left bg-white dark:bg-gray-700 rounded-lg flex-auto shadow basis-0 min-w-[14rem] flex flex-col justify-between">
      <div class="p-4">
        <h3 class="font-semibold text-lg font-title">{props.name}</h3>
        <p class="text-gray-400 antialiased">{props.description}</p>
      </div>
      <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-b-lg flex items-center gap-4">
        {/* TODO(@doinkythederp): make this a button that shows a modal */}
        <a
          href={props.repoUrl}
          class="bg-rose-500 text-white px-4 py-1 rounded-xl outline-none outline-offset-0 focus:outline-rose-300"
        >
          Install
        </a>
        <a href={props.repoUrl} class="space-x-2 group">
          <i class="fa-brands fa-github" />
          <span class="text-gray-400 group-focus:underline group-hover:underline">
            Source
          </span>
        </a>
      </div>
    </article>
  );
}
