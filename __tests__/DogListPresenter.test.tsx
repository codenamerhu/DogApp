import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import DogListPresenter from '../src/presenters/DogListPresenter';

const mockProps = {
  filteredDogData: [{ breed: 'husky', imageUrl: 'https://example.com/husky.jpg', height: 250 }],
  search: '',
  setSearch: jest.fn(),
  loading: false,
  error: null,
};

describe('DogListPresenter', () => {
  it('renders dog list correctly', () => {
    const { getByText } = render(<DogListPresenter {...mockProps} />);
    expect(getByText('husky')).toBeTruthy();
  });

  it('calls setSearch on text input change', () => {
    const { getByPlaceholderText } = render(<DogListPresenter {...mockProps} />);
    fireEvent.changeText(getByPlaceholderText('Search by breed...'), 'golden');
    expect(mockProps.setSearch).toHaveBeenCalledWith('golden');
  });

  it('shows loading indicator when loading is true', () => {
    const { getByTestId } = render(<DogListPresenter {...mockProps} loading={true} />);
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('shows error message when there is an error', () => {
    const { getByText } = render(<DogListPresenter {...mockProps} error="Network error" />);
    expect(getByText('Network error')).toBeTruthy();
  });
});
