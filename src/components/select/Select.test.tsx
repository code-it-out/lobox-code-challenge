// testing initial functionalities.

import { fireEvent, render, screen } from '@testing-library/react';

import Select from './Select';

const options = [
  { label: 'Education 🎓', text: 'Education' },
  { label: 'Yeeeah, science! 🚀', text: 'Science' },
  { label: 'Art 🎭', text: 'Art' },
  { label: 'Sport ⚽', text: 'Sport' },
  { label: 'Game 🎮', text: 'Game' },
  { label: 'Health 👨‍⚕️', text: 'Health' },
];

describe('Select', () => {
  test('should not have menu by default', () => {
    render(<Select options={options} />);

    expect(screen.queryByTestId('menu')).toBeFalsy();
  });

  test('should not have text by default', () => {
    render(<Select options={options} />);

    const text = screen.getByTestId('text');

    expect(text.textContent).toEqual('');
  });

  test('should not have text by if there is `placeholder`', () => {
    const placeholder = "Select a field";
    render(<Select options={options} placeholder={placeholder} />);

    const text = screen.getByTestId('text');

    expect(text.textContent).toEqual(placeholder);
  });

  test('should open menu on click on button and close it on next click', () => {
    render(<Select options={options} />);

    const btn = screen.getByTestId('button');
    fireEvent.click(btn);
    expect(screen.getByTestId('menu')).toBeTruthy();

    fireEvent.click(btn);
    expect(screen.queryByTestId('menu')).toBeFalsy();
  });

  test('should open menu on `ArrowDown`', () => {
    render(<Select options={options} />);

    const btn = screen.getByTestId('button');
    fireEvent.keyDown(btn, { key: 'ArrowDown' });
    expect(screen.getByTestId('menu')).toBeTruthy();
  });

  test('should open menu on `ArrowUp`', () => {
    render(<Select options={options} />);

    const btn = screen.getByTestId('button');
    fireEvent.keyDown(btn, { key: 'ArrowUp' });
    expect(screen.getByTestId('menu')).toBeTruthy();
  });

  test('should close menu on `Escape`', () => {
    render(<Select options={options} />);

    const btn = screen.getByTestId('button');
    fireEvent.keyDown(btn, { key: 'Enter' });

    fireEvent.keyDown(btn, { key: 'Escape' });
    expect(screen.queryByTestId('menu')).toBeFalsy();
  });

  test('should have `options` onto menu', () => {
    render(<Select options={options} />);

    const btn = screen.getByTestId('button');
    fireEvent.click(btn);

    const items = screen.getAllByRole('listitem');
    expect(items.map((item) => item.textContent)).toEqual(options.map(({ label }) => label));
  });

  test('should select third option on click on it', () => {
    render(<Select options={options} />);

    const btn = screen.getByTestId('button');
    fireEvent.click(btn);
    expect(screen.getByTestId('menu')).toBeTruthy();

    const item = screen.getByText(options[2].label);
    fireEvent.click(item);
    expect(screen.queryByTestId('menu')).toBeFalsy();
    expect(screen.getByTestId('text').textContent).toEqual(options[2].text);
  });
});
