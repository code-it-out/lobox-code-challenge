// testing basic functionalities.

import { fireEvent, render, screen } from '@testing-library/react';
import { Option } from './Option';

describe('Option', () => {
  test('should have children as text', () => {
    const children = 'this is an option'
    render(<Option>{children}</Option>);

    expect(screen.getByTestId('item').textContent).toEqual(children);
  });

  test('should not have `selected` class by default', () => {
    render(<Option>option</Option>);

    expect(screen.getByTestId('item').className).toEqual('option');
  });

  test('should have `selected` class if has selected prop', () => {
    render(<Option selected>option</Option>);

    expect(screen.getByTestId('item').className).toEqual('option selected');
  });

  test('should have `tabIndex` of `0`', () => {
    render(<Option>option</Option>);

    expect(screen.getByTestId('item').getAttribute('tabindex')).toEqual('0');
  });

  test('should fire `onKeyDown` function', () => {
    const onKeyDownMock = jest.fn();
    render(<Option onKeyDown={onKeyDownMock}>option</Option>);

    fireEvent.keyDown(screen.getByTestId('item'));

    expect(onKeyDownMock).toBeCalledTimes(1);
  });

  test('should fire `onClick` function', () => {
    const onClickMock = jest.fn();
    render(<Option onClick={onClickMock}>option</Option>);

    fireEvent.click(screen.getByTestId('item'));

    expect(onClickMock).toBeCalledTimes(1);
  });
});
