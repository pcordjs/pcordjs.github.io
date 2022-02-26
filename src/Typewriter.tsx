import { Component } from 'preact';
import styles from './typewriter.module.css';

const SPEED = 150;
const START_DELAY = 1500;

export interface TypewriterProps {
  /**
   * The list of phrases used by the component.
   */
  phrases: string[];

  /**
   * Additional HTML classes added to the component. Useful for styling the
   * cursor.
   */
  class?: string;
}

interface TypewriterState {
  phrase: string;
  progress: number;
}

/**
 * The Typewriter component picks a phrase from an array and displays it as if
 * it is being typed out. A blinking cursor is displayed after the phrase.
 *
 * @remarks
 * Styles can be added to the component through the `class` prop. The cursor is implemented
 * as a rectangle `::after` element, so colors can be added through utility
 * classes such as `after:bg-rose-500`.
 *
 * @example
 * ```tsx
 * export default function() {
 *   return (
 *     <span class="text-orange-500">
 *       My favorite language is <Typewriter phrases={["JavaScript", "HTML", "CSS"]} />
 *     </span>
 *   );
 * }
 * ```
 */
export default class Typewriter extends Component<
  TypewriterProps,
  TypewriterState
> {
  public constructor(props: TypewriterProps) {
    super(props);
    this.state = {
      phrase:
        this.props.phrases[
          Math.floor(Math.random() * this.props.phrases.length)
        ] ?? '',
      progress: 0
    };
  }

  private timer: ReturnType<typeof setTimeout> | null = null;

  public override componentDidMount() {
    const tick = () => {
      this.setState((state) => ({
        progress: state.progress + 1
      }));

      if (this.state.phrase.length - 1 !== this.state.progress)
        this.timer = setTimeout(tick, SPEED);
    };

    this.timer = setTimeout(tick, START_DELAY);
  }

  public override componentWillUnmount() {
    if (this.timer !== null) clearInterval(this.timer);
  }

  public render() {
    return (
      <span
        class={`${
          styles.text ?? ''
        } after:inline-block after:h-8 sm:after:h-10 after:align-middle after:w-0.5 after:ml-1 ${
          this.props.class ?? ''
        }`}
      >
        {this.state.phrase.slice(0, this.state.progress)}
      </span>
    );
  }
}
