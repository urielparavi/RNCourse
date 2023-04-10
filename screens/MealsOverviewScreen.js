import { StyleSheet, FlatList, View, Text } from 'react-native';
import { MEALS } from '../data/dummy-data';
import MealItem from '../components/MealItem';

const MealsOverviewScreen = ({ route }) => {
  // We extract the params object from navigate
  const catId = route.params.categoryId;

  const displayedMeals = MEALS.filter((mealItem) => {
    // If we have a index greater or equal than zero, a category is part of that meal, because if not find a given
    // category id in that array, indexOf would return minus one
    return mealItem.categoryIds.indexOf(catId) >= 0;
  });

  const renderMealItem = (itemData) => {
    return <MealItem title={itemData.item.title} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={displayedMeals}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
      />
    </View>
  );
};
export default MealsOverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
