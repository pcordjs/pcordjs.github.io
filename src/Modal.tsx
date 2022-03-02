import { ComponentChildren } from 'preact';

export interface ModalProps {
  onClose?: () => void;
  noCloseButton?: boolean;
  children?: ComponentChildren;
}

export default function Modal(props: ModalProps) {
  return (
    <div>
      {/* Modal window */}
      <div
        class="fixed inset-0 z-10 overflow-y-auto bg-black/60"
        onClick={props.onClose}
      >
        <div class="flex items-center justify-center m-8 sm:m-12">
          <div
            class="bg-white dark:bg-gray-700 rounded-lg shadow-xl shadow-black/40 p-6 w-full max-w-prose"
            autoFocus
            onClick={(e) => e.stopPropagation()}
            aria-modal="true"
          >
            {/* Close Button */}
            {!props.noCloseButton && (
              <div class="flex justify-end -mb-2">
                <button
                  class="text-2xl leading-[0.5] w-6 h-6 text-gray-500 hover:text-gray-700"
                  aria-label="Close"
                  onClick={props.onClose}
                >
                  &times;
                </button>
              </div>
            )}
            {/* Content */}
            <div>{props.children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
