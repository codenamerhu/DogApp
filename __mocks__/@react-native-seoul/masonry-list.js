// Mock the MasonryList component with a simple flat list structure for testing
import React from 'react';
import { View, Text } from 'react-native';

const MasonryList = ({ data, renderItem }) => {
  return (
    <View>
      {data.map((item, index) => (
        <View key={index}>
          {renderItem({ item, index })}
        </View>
      ))}
    </View>
  );
};

export default MasonryList;
