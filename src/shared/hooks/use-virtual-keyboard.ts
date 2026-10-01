import { useEffect, useState } from 'react';

const MINIMUM_KEYBOARD_HEIGHT = 120;
const KEYBOARD_HEIGHT_RATIO = 0.15;
const ORIENTATION_CHANGE_WIDTH_THRESHOLD = 50;

const isEditableElement = (element: Element | null) => {
  if (element instanceof HTMLTextAreaElement) return true;

  if (element instanceof HTMLInputElement) {
    return ![
      'button',
      'checkbox',
      'color',
      'file',
      'hidden',
      'image',
      'radio',
      'range',
      'reset',
      'submit',
    ].includes(element.type);
  }

  return element instanceof HTMLElement && element.isContentEditable;
};

export const useVirtualKeyboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const visualViewport = window.visualViewport;
    let viewportHeight = visualViewport?.height ?? window.innerHeight;
    let viewportWidth = window.innerWidth;
    let animationFrameId: number | undefined;

    const updateKeyboardState = () => {
      const currentHeight = visualViewport?.height ?? window.innerHeight;
      const currentWidth = window.innerWidth;
      const hasOrientationChanged =
        Math.abs(currentWidth - viewportWidth) >
        ORIENTATION_CHANGE_WIDTH_THRESHOLD;

      if (hasOrientationChanged) {
        viewportHeight = currentHeight;
        viewportWidth = currentWidth;
        setIsOpen(false);
        return;
      }

      if (!isEditableElement(document.activeElement)) {
        viewportHeight = currentHeight;
        setIsOpen(false);
        return;
      }

      if (visualViewport && Math.abs(visualViewport.scale - 1) > 0.01) return;

      const keyboardHeightThreshold = Math.max(
        MINIMUM_KEYBOARD_HEIGHT,
        viewportHeight * KEYBOARD_HEIGHT_RATIO,
      );

      setIsOpen(viewportHeight - currentHeight > keyboardHeightThreshold);
    };

    const scheduleKeyboardStateUpdate = () => {
      if (animationFrameId !== undefined) {
        window.cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = window.requestAnimationFrame(updateKeyboardState);
    };

    document.addEventListener('focusin', scheduleKeyboardStateUpdate);
    document.addEventListener('focusout', scheduleKeyboardStateUpdate);
    window.addEventListener('resize', scheduleKeyboardStateUpdate);
    visualViewport?.addEventListener('resize', scheduleKeyboardStateUpdate);

    return () => {
      if (animationFrameId !== undefined) {
        window.cancelAnimationFrame(animationFrameId);
      }

      document.removeEventListener('focusin', scheduleKeyboardStateUpdate);
      document.removeEventListener('focusout', scheduleKeyboardStateUpdate);
      window.removeEventListener('resize', scheduleKeyboardStateUpdate);
      visualViewport?.removeEventListener(
        'resize',
        scheduleKeyboardStateUpdate,
      );
    };
  }, []);

  return isOpen;
};
