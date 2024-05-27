/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header Component', () => {
  it('renders the component', () => {
    render(<Header progress={50} />);
    const headingElement = screen.getByText(/grouped tasks/i);
    expect(headingElement).toBeDefined();
  });

  it('displays the progress percentage and correct width on the progress bar', () => {
    const progress = 75;
    render(<Header progress={progress} />);
    const progressBar = screen.getByText(`${progress}%`);
    expect(progressBar).toBeDefined();
    expect(progressBar.style.width).toBe(`${progress}%`);
  });

  it('displays the progress element with opacity 0 when progress is 0', () => {
    render(<Header progress={0} />);
    const progressBar = screen.getByText('0%');
    expect(progressBar).toBeDefined();
    expect(progressBar.style.opacity).toBe('0');
  });
});
