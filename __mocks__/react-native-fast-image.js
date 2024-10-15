// Mock FastImage as a simple View for testing purposes
import React from 'react';
import { View } from 'react-native';

const FastImage = ({ children, ...props }) => (
  <View {...props}>{children}</View>
);

export default FastImage;
