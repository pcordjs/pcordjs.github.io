import Typewriter from './Typewriter';

const taglinePhrases = [
  'modular',
  'work-in-progress',
  'flexible',
  'fully typed',
  'engineerable'
];

export default function Hero() {
  return (
    <div class="h-[40vh] sm:h-[60vh] bg-gray-200 dark:bg-gray-800 bg-gradient-to-tr from-indigo-300 dark:from-indigo-900 flex justify-center items-center">
      <h1 class="text-3xl sm:text-4xl w-1/2 text-center">
        The{' '}
        <span class="text-rose-500 underline">
          <Typewriter class="after:bg-rose-500" phrases={taglinePhrases} />
        </span>{' '}
        Discord API framework.
      </h1>
    </div>
  );
}
