import HeaderLink from './HeaderLink';
import HeaderLogo from './HeaderLogo';

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
      <div>
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
