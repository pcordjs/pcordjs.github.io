import Link from './Link';
import HeaderLogo from './HeaderLogo';
import { ComponentChildren } from 'preact';

interface HeaderLinkProps {
  href: string;
  icon: string;
  children: ComponentChildren;
}

function HeaderLink(props: HeaderLinkProps) {
  return (
    <Link
      href={props.href}
      icon={`${props.icon} text-2xl sm:text-xl -mr-2 sm:mr-0`}
      hoverBox
    >
      <span class="font-light hidden sm:inline">{props.children}</span>
    </Link>
  );
}

export default function Header() {
  return (
    <div class="p-2 px-4 shadow-md -mb-1 flex justify-between items-center">
      {/* Start of header - logo and title */}
      <a href="/">
        <HeaderLogo src="/pcord.png" />
        <span class="text-3xl font-title align-middle dark:text-white-100">
          pcordjs
        </span>
      </a>
      {/* End of header - links and buttons */}
      <div class="text-xl space-x-1">
        <HeaderLink
          href="https://github.com/pcordjs"
          icon="fa-brands fa-github"
        >
          GitHub
        </HeaderLink>
        <HeaderLink href="#" icon="fa-solid fa-file-lines">
          Documentation
        </HeaderLink>
      </div>
    </div>
  );
}
