import { ComponentChildren } from 'preact';

export interface PageContentProps {
  children: ComponentChildren;
}

export default function PageContent(props: PageContentProps) {
  return (
    <div class="mx-4 sm:mx-8">
      <main class="m-auto pt-14 max-w-prose text-lg text-center space-y-4">
        {props.children}
      </main>
    </div>
  );
}
