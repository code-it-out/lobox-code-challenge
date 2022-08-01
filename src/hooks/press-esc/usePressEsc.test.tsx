import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { usePressEsc } from './usePressEsc';

const callbackMock = jest.fn();

function Component() {
  usePressEsc(callbackMock);

  return null;
}

describe('userResize', () => {
  test('should not call event listener initially', () => {
    render(<Component />);

    expect(callbackMock).toBeCalledTimes(0);
  });

  test('should not call event listener on press Enter', () => {
    const { container } = render(<Component />);

    fireEvent.keyDown(container, { key: 'Enter' });

    expect(callbackMock).toBeCalledTimes(0);
  });

  test('should not call event listener on press Escape', () => {
    const { container } = render(<Component />);

    fireEvent.keyDown(container, { key: 'Escape' });

    expect(callbackMock).toBeCalledTimes(1);
  });
});
