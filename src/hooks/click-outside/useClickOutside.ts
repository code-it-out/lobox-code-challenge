import React from 'react';

import { Hooks } from '../../types';

export function useClickOutside(ref: React.RefObject<HTMLElement>, callback: Hooks.UseClickOutside.VoidCallback) {
  React.useEffect(() => {
    const handleClickOutside = (evt: MouseEvent) => {
      if (ref.current && !ref.current.contains(evt.target as HTMLElement)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
}
