// testing basic functionalities.

import { fireEvent, render, screen } from '@testing-library/react';
import { Options } from './Options';

describe('Options', () => {
  test('should not have list by default', () => {
    render(<Options />);

    expect(screen.queryByRole('list')).toBeFalsy();
  });

  test('should not have list even if it has options', () => {
    render(<Options options={['item one']} />);

    expect(screen.queryByRole('list')).toBeFalsy();
  });

  test('should have list even if it has `isOpen`', () => {
    render(<Options options={['item one']} isOpen />);

    expect(screen.getByRole('list')).toBeTruthy();
  });

  test('should have list items', () => {
    const options = [
      'item one',
      'item two',
      'item three',
    ];
    render(<Options options={options} isOpen />);

    expect(screen.getAllByRole('listitem').map((option) => option.textContent)).toEqual(options);
  });

  test('should fire `onChange` on `click` on item', () => {
    const onChangeMock = jest.fn();
    const options = [
      'item one',
      'item two',
      'item three',
    ];
    render(
      <Options
        onChange={onChangeMock}
        options={options}
        isOpen
      />,
    );

    const secondItem = screen.getAllByRole('listitem')[1];
    fireEvent.click(secondItem);

    expect(onChangeMock).toBeCalledTimes(1);
    expect(onChangeMock.mock.calls[0][0]).toEqual(options[1]);
    expect(onChangeMock.mock.calls[0][1]).toEqual(1);
    expect(typeof onChangeMock.mock.calls[0][2]).toEqual('object');
    expect(onChangeMock.mock.calls[0][3]).toEqual('click');
  });

  test('should fire `onChange` on `keyDown (Enter)` on item', () => {
    const onChangeMock = jest.fn();
    const options = [
      'item one',
      'item two',
      'item three',
    ];
    render(
      <Options
        onChange={onChangeMock}
        options={options}
        isOpen
      />,
    );

    const thirdItem = screen.getAllByRole('listitem')[2];
    fireEvent.keyDown(thirdItem, { key: 'Enter' });

    expect(onChangeMock).toBeCalledTimes(1);
    expect(onChangeMock.mock.calls[0][0]).toEqual(options[2]);
    expect(onChangeMock.mock.calls[0][1]).toEqual(2);
    expect(typeof onChangeMock.mock.calls[0][2]).toEqual('object');
    expect(onChangeMock.mock.calls[0][3]).toEqual('enter');
  });
});
