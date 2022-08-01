import React from 'react';

import { Hooks } from '../../types';

export function usePressEsc(callback: Hooks.UseClickOutside.VoidCallback) {
  React.useEffect(() => {
    const handlePressEsc = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        callback();
      }
    };

    document.addEventListener('keydown', handlePressEsc);
    return () => {
      document.removeEventListener('keydown', handlePressEsc);
    };
  }, [callback]);
}
