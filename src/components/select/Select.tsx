import React from 'react';
import classNames from 'classnames';

import styles from './select.module.scss';

import { Components } from '../../types';
import { useClickOutside, usePressEsc } from '../../hooks';

import Options from './Options';

export const onChangePlaceHolder = () => null;

export function Select({
  options = [],
  placeholder = '',
  duplicateOptionErrorHandler,
  onChange = onChangePlaceHolder,
}: Components.Select.Props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [items, setItems] = React.useState(options);
  const [value, setValue] = React.useState('');

  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const menuRef = React.useRef<HTMLUListElement>(null);
  const focusedItemRef = React.useRef(-1);

  const closeMenu = React.useCallback(() => {
    if (isOpen) {
      setIsOpen(false);
      inputRef.current?.focus();
    }
  }, [isOpen, inputRef]);

  useClickOutside(wrapperRef, closeMenu);
  usePressEsc(closeMenu);

  const onClickOnWrapper = () => {
    setIsOpen((open) => !open);
    inputRef.current?.focus();
  }

  const handleKeyDownOnWrapper = (evt: React.KeyboardEvent<HTMLDivElement>) => {
    const isArrowUp = 'ArrowUp' === evt.key;
    const isArrowDown = 'ArrowDown' === evt.key;
    const isArrow = isArrowUp || isArrowDown;
    
    if (!isOpen && isArrow) {
      setIsOpen(true);
      return;
    }

    if (isArrowUp && focusedItemRef.current > 0) {
      focusedItemRef.current -= 1;
    }
    if (isArrowDown && focusedItemRef.current < items.length - 1) {
      focusedItemRef.current += 1;
    }

    if (focusedItemRef.current > -1 && isArrow) {
      const items = menuRef.current?.querySelectorAll('li') || [];
      items[focusedItemRef.current]?.focus();
    }
  };

  const handleChangeInput = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
  }

  const handleKeyDownOnInput = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key !== 'Enter' || !value) { return; }
    if (duplicateOptionErrorHandler && items.includes(value)) {
      duplicateOptionErrorHandler(value);
      return;
    };

    setItems([...items, value]);
    setValue('');
    setIsOpen(true);
  }

  const handleChangeOption: Components.Select.Options.Props['onChange'] = (option, index, evt, reason) => {
    onChange(option, index, evt, reason);
    setValue(option || '');
    inputRef.current?.focus();
    if (reason !== 'click') { setIsOpen(false); }
  }

  return (
    <div
      className={classNames(styles.wrapper, { [styles.active]: isOpen })}
      onClick={onClickOnWrapper}
      onKeyDown={handleKeyDownOnWrapper}
      ref={wrapperRef}
      aria-haspopup="true"
      data-testid="wrapper"
    >
      <input
        className={styles.input}
        placeholder={placeholder}
        value={value}
        ref={inputRef}
        onChange={handleChangeInput}
        onKeyDown={handleKeyDownOnInput}
        data-testid="input"
      />
      <span className={classNames(styles.indicator, { [styles.up]: isOpen })} />
      <Options
        isOpen={isOpen && Boolean(items.length)}
        options={items}
        ref={menuRef}
        onChange={handleChangeOption}
      />
    </div>
  );
}

export default Select;
