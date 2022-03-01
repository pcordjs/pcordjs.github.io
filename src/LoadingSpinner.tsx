import styles from './LoadingSpinner.module.css';

export interface LoadingSpinnerProps {
  class?: string;
}

export default function LoadingSpinner(props: LoadingSpinnerProps) {
  return (
    <div
      class={`w-5 h-5 rounded-full border-2 border-transparent will-change-transform ${
        styles.spinner ?? ''
      } ${props.class?.concat(' ') ?? ''}`}
    >
      <span class="sr-only">Loading</span>
    </div>
  );
}
