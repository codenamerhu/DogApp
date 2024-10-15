import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LoginPresenter from '../src/presenters/LoginPresenter';

describe('LoginPresenter', () => {
  const mockProps = {
    email: '',
    password: '',
    setEmail: jest.fn(),
    setPassword: jest.fn(),
    handleLogin: jest.fn(),
    loading: false,
  };

  it('renders input fields and login button', () => {
    const { getByPlaceholderText, getByText } = render(<LoginPresenter {...mockProps} />);
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('Login')).toBeTruthy();
  });

  it('calls setEmail and setPassword correctly', () => {
    const { getByPlaceholderText } = render(<LoginPresenter {...mockProps} />);
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password');

    expect(mockProps.setEmail).toHaveBeenCalledWith('test@example.com');
    expect(mockProps.setPassword).toHaveBeenCalledWith('password');
  });

  it('calls handleLogin on button press', () => {
    const { getByText } = render(<LoginPresenter {...mockProps} />);
    fireEvent.press(getByText('Login'));
    expect(mockProps.handleLogin).toHaveBeenCalled();
  });

  it('shows loading indicator when loading is true', () => {
    const { getByTestId } = render(<LoginPresenter {...mockProps} loading={true} />);
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });
});
