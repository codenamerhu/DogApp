import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CustomButton from '../src/components/CustomButton';

describe('CustomButton', () => {
  it('renders correctly and handles press event', () => {
    const mockPress = jest.fn();
    const { getByText } = render(<CustomButton title="Submit" onPress={mockPress} />);
    fireEvent.press(getByText('Submit'));
    expect(mockPress).toHaveBeenCalled();
  });
});
