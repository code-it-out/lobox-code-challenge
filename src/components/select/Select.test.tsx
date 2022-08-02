// testing basic functionalities.

import { fireEvent, render, screen } from '@testing-library/react';

import Select from './Select';

const options = [
  'Education 🎓',
  'Yeeeah, science! 🚀',
  'Art 🎭',
  'Sport ⚽',
  'Game 🎮',
  'Health 👨‍⚕️',
];

describe('Select', () => {
  test('should not have menu by default', () => {
    render(<Select options={options} />);

    expect(screen.queryByTestId('menu')).toBeFalsy();
  });

  test('should not have `placeholder` by default', () => {
    render(<Select options={options} />);

    expect(screen.getByTestId('input').getAttribute('placeholder')).toEqual('');
  });

  test('should have `placeholder`', () => {
    const placeholder = 'select something!'
    
    render(
      <Select
        options={options}
        placeholder={placeholder}
      />
    );

    expect(screen.getByTestId('input').getAttribute('placeholder')).toEqual(placeholder);
  });

  test('should open menu on click on `wrapper` and close it on next click', () => {
    render(<Select options={options} />);

    const wrapper = screen.getByTestId('wrapper');
    fireEvent.click(wrapper);
    expect(screen.getByTestId('menu')).toBeTruthy();

    fireEvent.click(wrapper);
    expect(screen.queryByTestId('menu')).toBeFalsy();
  });

  test('should open menu on `ArrowDown`', () => {
    render(<Select options={options} />);

    const wrapper = screen.getByTestId('wrapper');
    fireEvent.keyDown(wrapper, { key: 'ArrowDown' });
    expect(screen.getByTestId('menu')).toBeTruthy();
  });

  test('should open menu on `ArrowUp`', () => {
    render(<Select options={options} />);

    const wrapper = screen.getByTestId('wrapper');
    fireEvent.keyDown(wrapper, { key: 'ArrowUp' });
    expect(screen.getByTestId('menu')).toBeTruthy();
  });

  test('should close menu on `Escape`', () => {
    render(<Select options={options} />);

    const wrapper = screen.getByTestId('wrapper');
    fireEvent.keyDown(wrapper, { key: 'ArrowDown' });
    expect(screen.getByTestId('menu')).toBeTruthy();

    fireEvent.keyDown(wrapper, { key: 'Escape' });
    expect(screen.queryByTestId('menu')).toBeFalsy();
  });

  test('should have `options` onto menu', () => {
    render(<Select options={options} />);

    const wrapper = screen.getByTestId('wrapper');
    fireEvent.click(wrapper);

    const items = screen.getAllByRole('listitem');
    expect(items.map((item) => item.textContent)).toEqual(options);
  });

  test('should select third option on `click` on it', () => {
    const onChangeMock = jest.fn();

    render(
      <Select
        options={options}
        onChange={onChangeMock}
      />
    );

    const wrapper = screen.getByTestId('wrapper');
    fireEvent.click(wrapper);

    expect(screen.getByTestId('menu')).toBeTruthy();

    const item = screen.getByText(options[2]);
    fireEvent.click(item);

    expect(screen.queryByTestId('menu')).toBeFalsy();
    expect(screen.getByTestId('input').getAttribute('value')).toEqual(options[2]);
    expect(onChangeMock).toBeCalledTimes(1);
    expect(onChangeMock.mock.calls[0][0]).toEqual(options[2]);
    expect(onChangeMock.mock.calls[0][1]).toEqual(2);
    expect(typeof onChangeMock.mock.calls[0][2]).toEqual('object');
    expect(onChangeMock.mock.calls[0][3]).toEqual('click');
  });

  test('should select second option on `keyDown` (Enter) on it', () => {
    const onChangeMock = jest.fn();

    render(
      <Select
        options={options}
        onChange={onChangeMock}
      />
    );

    const wrapper = screen.getByTestId('wrapper');
    fireEvent.click(wrapper);

    expect(screen.getByTestId('menu')).toBeTruthy();

    const item = screen.getByText(options[1]);
    fireEvent.keyDown(item, { key: 'Enter' });

    expect(screen.queryByTestId('menu')).toBeFalsy();
    expect(screen.getByTestId('input').getAttribute('value')).toEqual(options[1]);
    expect(onChangeMock).toBeCalledTimes(1);
    expect(onChangeMock.mock.calls[0][0]).toEqual(options[1]);
    expect(onChangeMock.mock.calls[0][1]).toEqual(1);
    expect(typeof onChangeMock.mock.calls[0][2]).toEqual('object');
    expect(onChangeMock.mock.calls[0][3]).toEqual('enter');
  });

  test('should add to options on `keyDown` (Enter) on input', () => {
    render(<Select options={options} />);

    const value = 'Something new!';
    const input = screen.getByTestId('input');
    fireEvent.change(input, { target: { value }});
    fireEvent.keyDown(input, { key: 'Enter' });

    const items = screen.getAllByRole('listitem');
    expect(items.map((item) => item.textContent)).toEqual([...options, value]);
  });

  test('should add to options on `keyDown` (Enter) on input if options exists', () => {
    render(<Select options={options} />);

    const value = 'Art 🎭';
    const input = screen.getByTestId('input');
    fireEvent.change(input, { target: { value }});
    fireEvent.keyDown(input, { key: 'Enter' });

    const items = screen.getAllByRole('listitem');
    expect(items.map((item) => item.textContent)).toEqual([...options, value]);
  });

  test('should not add to options on `keyDown` (Enter) on input if options exists and `uniqueNewItem` is `true`', () => {
    render(
      <Select
        options={options}
        uniqueNewItem
      />,
    );

    const value = 'Art 🎭';
    const input = screen.getByTestId('input');
    fireEvent.change(input, { target: { value }});
    fireEvent.keyDown(input, { key: 'Enter' });
    fireEvent.keyDown(input, { key: 'ArrowUp' });

    const items = screen.getAllByRole('listitem');
    expect(items.map((item) => item.textContent)).toEqual(options);
  });
});
