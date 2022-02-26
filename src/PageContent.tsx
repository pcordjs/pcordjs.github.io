import { ComponentChildren } from 'preact';

export interface PageContentProps {
  children: ComponentChildren;
}

export default function PageContent(props: PageContentProps) {
  return (
    <main class="m-auto pt-14 max-w-prose text-lg text-center space-y-4">
      {props.children}
    </main>
  );
}
