import { ComponentChildren } from 'preact';

export interface HeadingProps {
  children: ComponentChildren;
}

export default function Heading(props: HeadingProps) {
  return <h1 class="text-2xl font-bold">{props.children}</h1>;
}
