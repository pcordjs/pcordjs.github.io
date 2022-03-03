import { ComponentChildren } from 'preact';

export interface InlineCodeProps {
  children: ComponentChildren;
}

export default function InlineCode(props: InlineCodeProps) {
  return (
    <code class="px-[0.25em] bg-gray-200 dark:bg-gray-800 rounded-[0.3em]">
      {props.children}
    </code>
  );
}
