import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import DogListContainer from '../src/containers/DogListContainer';

import axios from "axios"

jest.mock("axios", () => ({
    create: jest.fn()
}))

const mockDispatch = jest.fn();

(axios.create as jest.Mock).mockReturnValue(mockDispatch);

describe('DogListContainer', () => {
  it('renders correctly and fetches dog data', async () => {
    (axios.create as jest.Mock).mockReturnValue({
      items: ['https://dog.ceo/api/breed/husky/images/random'],
      loading: false,
      error: null,
    });

    const { getByText } = render(<DogListContainer />);
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalled();
      expect(getByText('husky')).toBeTruthy();
    });
  });

  it('shows loading indicator when loading', () => {
    (axios.create as jest.Mock).mockReturnValue({
      items: [],
      loading: true,
      error: null,
    });

    const { getByTestId } = render(<DogListContainer />);
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('shows an error message if there is an error', () => {
    (axios.create as jest.Mock).mockReturnValue({
      items: [],
      loading: false,
      error: 'Failed to fetch dogs',
    });

    const { getByText } = render(<DogListContainer />);
    expect(getByText('Failed to fetch dogs')).toBeTruthy();
  });
});
