import { FunctionComponent } from 'preact';
import { useState, useEffect } from 'preact/hooks';

const modals = new Map<number, FunctionComponent>();
const updateSubscribers = new Set<() => void>();
let modalKey = 0;

function renderModals() {
  return [...modals.entries()].map(([key, Modal]) => <Modal key={key} />);
}

/** Renders all registered modals */
export default function ModalRoot() {
  const [renderedModals, setRenderedModals] = useState(renderModals());

  useEffect(() => {
    function onUpdate() {
      setRenderedModals(renderModals());
    }

    updateSubscribers.add(onUpdate);
    return () => updateSubscribers.delete(onUpdate);
  });

  return <>{renderedModals}</>;
}

/**
 * Registers a modal render function which can be shown and hidden.
 *
 * @returns An array containing whether the modal is shown, and a function to
 * set if it is shown.
 *
 * @example
 * ```tsx
 * export default function Modal() {
 *   const [modalShown, setModalShown] = useModal(() => (
 *     <div class="fixed h-screen w-screen bg-black/75 flex justify-center items-center">
 *       <button class="bg-white p-4" onClick={() => setModalShown(false)}>Close</button>
 *     </div>
 *   ));
 *
 *  return <button onClick={() => setModalShown(true)}>Show Modal</button>
 * }
 * ```
 */
export function useModal(render: FunctionComponent, shown = false) {
  const [isShown, setShown] = useState(shown);

  useEffect(() => {
    if (isShown) {
      const key = modalKey++;

      modals.set(key, render);

      setTimeout(() => {
        for (const subscriber of updateSubscribers) subscriber();
      });

      return () => {
        modals.delete(key);
        for (const subscriber of updateSubscribers) subscriber();
      };
    }
  });

  return [isShown, setShown] as const;
}
