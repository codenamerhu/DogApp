import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CustomInput from '../src/components/CustomInput';

describe('CustomInput', () => {
  it('renders correctly and calls onChangeText on input change', () => {
    const mockChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <CustomInput placeholder="Enter text" value="" onChangeText={mockChangeText} />
    );

    fireEvent.changeText(getByPlaceholderText('Enter text'), 'test input');
    expect(mockChangeText).toHaveBeenCalledWith('test input');
  });
});
