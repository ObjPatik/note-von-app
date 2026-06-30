import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';

describe('App note actions', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('shows an inline error when saving a note fails', async () => {
    global.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      })
      .mockResolvedValueOnce({
        ok: false,
        json: async () => ({}),
      });

    render(<App />);

    fireEvent.change(screen.getByPlaceholderText(/take a note/i), {
      target: { value: 'A failing note' },
    });
    fireEvent.click(screen.getByRole('button', { name: /save note/i }));

    await waitFor(() => {
      expect(screen.getByText(/failed to save note/i)).toBeInTheDocument();
    });
  });
});
