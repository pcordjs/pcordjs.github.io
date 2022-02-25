export interface HeaderLogoProps {
  src: string;
}

export default function HeaderLogo(props: HeaderLogoProps) {
  return (
    <img src={props.src} class="w-10 h-10 sm:w-14 sm:h-14 mr-5 inline-block" />
  );
}
