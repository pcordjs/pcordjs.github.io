import Header from './Header';
import Hero from './Hero';
import PageContent from './PageContent';
import { Project, ProjectList } from './Projects';
import tsLogo from './ts-logo-128.svg';

export default function App() {
  return (
    <>
      <Header />
      <Hero />
      <PageContent>
        <p>
          Pcordjs is an open-source framework for the Discord API, targeting{' '}
          <img src={tsLogo} class="inline h-4 w-4 select-none" /> TypeScript and{' '}
          <i class="fa-brands fa-node-js text-green-600" /> Node.js.
        </p>
        <p>
          Most modules have not started development, or are in the pre-release
          stage. Expect lacking documentation and somewhat unreliable code.
        </p>
        <ProjectList>
          <Project
            name="FooBar"
            description="A really really really long foo bar baz library."
            repoUrl="#"
          />
          <Project
            name="FooBar"
            description="A foo bar baz library."
            repoUrl="#"
          />
          <Project
            name="FooBar"
            description="A foo bar baz library."
            repoUrl="#"
          />
          <Project
            name="FooBar"
            description="A foo bar baz library."
            repoUrl="#"
          />
          <Project
            name="FooBar"
            description="A foo bar baz library."
            repoUrl="#"
          />
        </ProjectList>
      </PageContent>
    </>
  );
}
