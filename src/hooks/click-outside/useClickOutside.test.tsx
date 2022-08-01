import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { useClickOutside } from './useClickOutside';

const callbackMock = jest.fn();

function Component() {
  const targetRef = React.useRef(null);

  useClickOutside(targetRef, callbackMock);

  return (
    <div data-testid="wrapper">
      <div
        data-testid="target"
        ref={targetRef}
      />
    </div>
  );
}

describe('userResize', () => {
  test('should not call callback initially', () => {
    render(<Component />);

    expect(callbackMock).toBeCalledTimes(0);
  });

  test('should not call callback on click on target', () => {
    render(<Component />);

    const target = screen.getByTestId('target');
    fireEvent.mouseDown(target);

    expect(callbackMock).toBeCalledTimes(0);
  });

  test('should call callback on click on wrapper', () => {
    render(<Component />);

    const wrapper = screen.getByTestId('wrapper');
    fireEvent.mouseDown(wrapper);
    expect(callbackMock).toBeCalledTimes(1);
  });
});
