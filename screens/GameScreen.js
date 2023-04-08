import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import Title from '../components/ui/Title';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';

const generateRandomBetween = (min, max, exclude) => {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({ userNumber }) => {
  const initialGuess = generateRandomBetween(
    minBoundary,
    maxBoundary,
    userNumber
  );
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  // direction => 'lower', 'greater'
  const nextGuessHandler = (direction) => {
    if (
      // because if the currentGuess is smaller and we're sayng that you need to guess lower, then we're lying
      // and the same for the greater
      (direction === 'lower' && currentGuess < userNumber) ||
      (direction === 'greater' && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [
        { text: 'Sorry!', style: 'Cancel' },
      ]);
      return;
    }
    if (direction === 'lower') {
      // maxBoundary = currentGuess => because the currentGuess was to high, so it make no sense to guess a number
      // even bigger, because if we have to guess lower, we know that the currentGuess was too big
      maxBoundary = currentGuess;
    } else {
      // currentGuess + 1 => the minBoundary unlike the maxBoundary is included in the set of possible results,
      // and therefore we have to add plus one, so that we don't guess the same minBoundary again
      minBoundary = currentGuess + 1;
    }
    console.log(minBoundary, maxBoundary);
    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRndNumber);
  };

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View>
        <Text>Higher or lower?</Text>
        <View>
          <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
            -
          </PrimaryButton>
          <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
            +
          </PrimaryButton>
        </View>
      </View>
      {/* <View>LOG ROUNDS</View> */}
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
});
