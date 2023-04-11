import { Text } from 'react-native';

const MealDetailScreen = ({ route }) => {
  // On that params object I have mealId property, because when navigating to this MealDetail screen,
  // I set the mealId on that params object
  const mealId = route.params.mealId;

  return <Text>This is the Meal Detail screen ({mealId})</Text>;
};
export default MealDetailScreen;
