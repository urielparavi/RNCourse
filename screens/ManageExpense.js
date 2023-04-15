import { useLayoutEffect } from 'react';
import { Text } from 'react-native';

const ManageExpense = ({ route, navigation }) => {
  // ? => In case that we load this screen without any params - in that case the params will be undefined
  // and trying to access to expenseId property would cause an error.
  const editedExpenseId = route.params?.expenseId;
  // !! => Convert editedExpenseId into a boolean (true or false)
  const isEditing = !!editedExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  return <Text>ManageExpenses Screen</Text>;
};
export default ManageExpense;
