import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginContainer from '../src/containers/LoginContainer';


jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

declare var global: {
    fetch: jest.Mock;
  };

// Mock global fetch
global.fetch = jest.fn() as jest.Mock;

describe('LoginContainer', () => {
  it('renders login form correctly', () => {
    const { getByPlaceholderText } = render(<LoginContainer />);
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
  });

  it('shows an error when credentials are missing', () => {
    const { getByText } = render(<LoginContainer />);
    fireEvent.press(getByText('Login'));
    expect(getByText('Please fill in both email and password')).toBeTruthy();
  });

  it('handles successful login', async () => {
    // Mock the fetch call for success
    global.fetch.mockResolvedValueOnce(
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ firstName: 'John' }),
      })
    );

    const { getByText, getByPlaceholderText } = render(<LoginContainer />);
    fireEvent.changeText(getByPlaceholderText('Email'), 'testuser');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password');
    fireEvent.press(getByText('Login'));

    await waitFor(() => {
      expect(getByText('Login Successful')).toBeTruthy();
    });
  });

  it('handles failed login', async () => {
    // Mock the fetch call for failure
    global.fetch.mockResolvedValueOnce(
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: 'Invalid credentials' }),
      })
    );

    const { getByText, getByPlaceholderText } = render(<LoginContainer />);
    fireEvent.changeText(getByPlaceholderText('Email'), 'wronguser');
    fireEvent.changeText(getByPlaceholderText('Password'), 'wrongpassword');
    fireEvent.press(getByText('Login'));

    await waitFor(() => {
      expect(getByText('Invalid credentials')).toBeTruthy();
    });
  });
});
