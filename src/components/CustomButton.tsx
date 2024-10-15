import React from 'react';
import { Button } from 'react-native-elements';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, onPress, loading = false }) => {
  return (
    <Button
      title={title}
      onPress={onPress}
      loading={loading}
      buttonStyle={{ backgroundColor: '#4CAF50', paddingVertical: 12 }}
      containerStyle={{ marginTop: 10 }}
    />
  );
};

export default CustomButton;
