import { useEffect, useRef, useState } from 'react';

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
  const isOpenRef = useRef(false);

  useEffect(() => {
    const visualViewport = window.visualViewport;
    const orientationQuery = window.matchMedia('(orientation: portrait)');
    const getViewportHeight = () =>
      visualViewport
        ? visualViewport.height * visualViewport.scale
        : window.innerHeight;
    let viewportHeight = getViewportHeight();
    let viewportWidth = window.innerWidth;
    let isPortrait = orientationQuery.matches;
    let animationFrameId: number | undefined;

    const setKeyboardOpen = (nextIsOpen: boolean) => {
      isOpenRef.current = nextIsOpen;
      setIsOpen(nextIsOpen);
    };

    const updateKeyboardState = () => {
      const currentHeight = getViewportHeight();
      const currentWidth = window.innerWidth;
      const currentIsPortrait = orientationQuery.matches;
      const hasOrientationChanged = currentIsPortrait !== isPortrait;
      const hasViewportWidthChanged =
        Math.abs(currentWidth - viewportWidth) >
        ORIENTATION_CHANGE_WIDTH_THRESHOLD;

      if (hasOrientationChanged) {
        viewportHeight = isOpenRef.current ? viewportWidth : currentHeight;
        viewportWidth = currentWidth;
        isPortrait = currentIsPortrait;
      } else if (hasViewportWidthChanged) {
        viewportHeight = currentHeight;
        viewportWidth = currentWidth;
        setKeyboardOpen(false);
        return;
      }

      if (!isEditableElement(document.activeElement)) {
        if (!isOpenRef.current) {
          viewportHeight = currentHeight;
          return;
        }

        const keyboardHeightThreshold = Math.max(
          MINIMUM_KEYBOARD_HEIGHT,
          viewportHeight * KEYBOARD_HEIGHT_RATIO,
        );
        const isViewportStillReduced =
          viewportHeight - currentHeight > keyboardHeightThreshold;

        if (!isViewportStillReduced) {
          viewportHeight = currentHeight;
        }

        setKeyboardOpen(isViewportStillReduced);
        return;
      }

      const keyboardHeightThreshold = Math.max(
        MINIMUM_KEYBOARD_HEIGHT,
        viewportHeight * KEYBOARD_HEIGHT_RATIO,
      );

      setKeyboardOpen(viewportHeight - currentHeight > keyboardHeightThreshold);
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
