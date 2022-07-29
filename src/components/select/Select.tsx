import React from 'react';
import classNames from 'classnames';

import styles from './select.module.scss';

import { Components } from '../../types';

export const handleChange = () => null;

export function Select({
  options,
  placeholder = '',
  onChange = handleChange,
}: Components.Select.Props) {
  const [isOpen, setIsOpen] = React.useState(false);

  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const menuRef = React.useRef<HTMLUListElement>(null);
  const focusedItemRef = React.useRef(-1);
  const selectedItemRef = React.useRef(-1);

  const handleClickOnButton = () => {
    setIsOpen((open) => !open);
    buttonRef?.current?.focus();
  };

  const handleKeyDownOnButton = (evt: React.KeyboardEvent<HTMLButtonElement>) => {
    if (!isOpen && ['ArrowUp', 'ArrowDown'].includes(evt.key)) {
      setIsOpen(true);
      return;
    }

    if (evt.key === 'ArrowUp' && focusedItemRef.current > 0) {
      focusedItemRef.current -= 1;
    }
    if (evt.key === 'ArrowDown' && focusedItemRef.current < options.length - 1) {
      focusedItemRef.current += 1;
    }

    if (focusedItemRef.current > -1) {
      const items = menuRef?.current?.querySelectorAll('li') || [];
      items[focusedItemRef.current]?.focus();
    }
  };

  const doChange = () => {
    selectedItemRef.current = focusedItemRef.current;
    onChange(options[selectedItemRef.current]);
    buttonRef?.current?.focus();
  };

  const handleClickOnItem = (evt: React.MouseEvent<HTMLLIElement>) => {
    const target = evt.target as HTMLLIElement;
    focusedItemRef.current = Array.from(target?.parentElement?.children || []).indexOf(target);
    doChange();
  };

  const handleKeyDownOnItem = (evt: React.KeyboardEvent<HTMLLIElement>) => {
    if (evt.key === 'Enter') { doChange(); }
  };

  React.useEffect(() => {
    const handleClickOutside = (evt: MouseEvent) => {
      if (buttonRef.current && !buttonRef.current.contains(evt.target as HTMLElement)) {
        setIsOpen(false);
      }
    };
    const handlePressEsc = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape' && isOpen) {
        setIsOpen(false);
        buttonRef?.current?.focus();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handlePressEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handlePressEsc);
    };
  }, [buttonRef, isOpen]);

  return (
    <button
      className={classNames(styles.button, { [styles.active]: isOpen })}
      aria-haspopup="true"
      onClick={handleClickOnButton}
      onKeyDown={handleKeyDownOnButton}
      ref={buttonRef}
      data-testid="button"
    >
      <span
        className={classNames(styles.text, {
          [styles.placeholder]: selectedItemRef.current === -1,
        })}
        data-testid="text"
      >
        {options[selectedItemRef.current]?.text || placeholder}
      </span>
      <span className={classNames(styles.indicator, { [styles.up]: isOpen })} />
      {
        isOpen && (
          <ul
            className={classNames(styles.menu, { [styles.close]: !isOpen })}
            ref={menuRef}
            data-testid="menu"
          >
            {options.map((option, ii) => (
              <li
                key={option.uid || ii}
                className={classNames({
                  [styles.selected]: ii === selectedItemRef.current,
                })}
                onKeyDown={handleKeyDownOnItem}
                onClick={handleClickOnItem}
                tabIndex={0}
              >
                {option.label || option.text}
              </li>
            ))}
          </ul>
        )
      }
    </button>
  );
}

export default Select;
