import React, { useState } from 'react';
import { View, Text, Button, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDogs } from '../redux/dogSlice';
import { RootState, AppDispatch } from '../redux/store';

// Component for quiz where users guess the breed of a random dog image
const QuizScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootState) => state.dogs);
  const [currentDog, setCurrentDog] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const startQuiz = () => {
    if (items.length === 0) dispatch(fetchDogs());
    setCurrentDog(items[Math.floor(Math.random() * items.length)]);
    setShowAnswer(false);
  };

  return (
    <View>
      {currentDog ? (
        <>
          <Image source={{ uri: currentDog }} style={{ width: 200, height: 200 }} />
          <Button title="Show Breed" onPress={() => setShowAnswer(true)} />
          {showAnswer && <Text>{currentDog.split('/')[4]}</Text>}
        </>
      ) : (
        <Button title="Start Quiz" onPress={startQuiz} />
      )}
    </View>
  );
};

export default QuizScreen;
