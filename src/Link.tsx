import { ComponentChildren } from 'preact';

export interface LinkProps {
  href: string;
  icon: string;
  hoverBox?: boolean;
  children: ComponentChildren;
}

export default function Link(props: LinkProps) {
  const linkClasses = ['group inline-flex gap-2 items-baseline'];
  if (props.hoverBox) {
    linkClasses.push(
      'hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg px-3 py-2.5'
    );
  }

  return (
    <a href={props.href} class={linkClasses.join(' ')}>
      <i class={props.icon}></i>
      <span class="group-focus:underline group-hover:underline">
        {props.children}
      </span>
    </a>
  );
}
