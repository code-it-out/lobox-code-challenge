import React from 'react';
import classNames from 'classnames';

import styles from './options.module.scss';

import { Components } from '../../types';
import Option from './Option';

export const onChangePlaceHolder = () => null;

export function Options({
  isOpen,
  options = [],
  menuRef,
  onChange = onChangePlaceHolder,
}: Components.Select.Options.Props) {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(-1);

  const handleSelect = (
    evt: Components.Select.Options.SelectEvent,
    reason: Components.Select.Options.SelectReason,
    index: number,
  ) => {
    setSelectedItemIndex(index);
    onChange(options[index], index, evt, reason);
  }

  const handleClickOnItem = (evt: React.MouseEvent<HTMLLIElement>, index: number) => {
    handleSelect(evt, 'click', index);
  };

  const handleKeyDownOnItem = (evt: React.KeyboardEvent<HTMLLIElement>, index: number) => {
    if (evt.key === 'Enter') { handleSelect(evt, 'enter', index); }
  };

  return isOpen ? (
    <ul
      className={classNames(styles.options, { [styles.close]: !isOpen })}
      data-testid="menu"
      ref={menuRef}
    >
      {options.map((option, ii) => (
        <Option
          key={ii}
          selected={ii === selectedItemIndex}
          onKeyDown={(evt) => handleKeyDownOnItem(evt, ii)}
          onClick={(evt) => handleClickOnItem(evt, ii)}
        >
          {option}
        </Option>
      ))}
    </ul>
  ) : <></>;
}

export default React.forwardRef(
  (
    props: Components.Select.Options.Props,
    ref: React.ForwardedRef<HTMLUListElement>,
  ) => <Options menuRef={ref} {...props} />,
);
