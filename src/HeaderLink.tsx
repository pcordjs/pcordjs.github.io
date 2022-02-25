import { ComponentChildren } from 'preact';

export interface HeaderLinkProps {
  href: string;
  icon: string;
  children: ComponentChildren;
}

export default function HeaderLink(props: HeaderLinkProps) {
  return (
    <a
      href={props.href}
      class="text-xl align-middle h-3/4 inline-flex items-center px-3 py-2.5 mr-2 last:mr-0 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
    >
      <i class={`${props.icon} text-2xl sm:text-xl`}></i>
      <span class="ml-2 font-light hidden sm:inline">{props.children}</span>
    </a>
  );
}
