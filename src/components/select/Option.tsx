import React from 'react';
import classNames from 'classnames';

import styles from './option.module.scss';

import { Components } from '../../types';

export const onKeyDownPlaceHolder = () => null;
export const onClickPlaceHolder = () => null;

export function Option({
  selected,
  children,
  itemRef,
  onKeyDown = onKeyDownPlaceHolder,
  onClick = onClickPlaceHolder,
}: Components.Select.Option.Props) {
  return (
    <li
      className={classNames(styles.option, { [styles.selected]: selected })}
      onKeyDown={onKeyDown}
      onClick={onClick}
      tabIndex={0}
      ref={itemRef}
      data-testid="item"
    >
      {children}
    </li>
  );
}

export default React.forwardRef(
  (props: Components.Select.Option.Props, ref: React.ForwardedRef<HTMLLIElement>) => <Option itemRef={ref} {...props} />,
);
