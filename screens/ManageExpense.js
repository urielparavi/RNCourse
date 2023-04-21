import { useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/style';
import { useContext } from 'react';
import { ExpensesContext } from '../store/expenses-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { deleteExpense, storeExpense, updateExpense } from '../util/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

const ManageExpense = ({ route, navigation }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();

  const expensesCtx = useContext(ExpensesContext);
  // ? => In case that we load this screen without any params - in that case the params will be undefined
  // and trying to access to expenseId property would cause an error.
  const editedExpenseId = route.params?.expenseId;
  // !! => Convert editedExpenseId into a boolean (true or false)
  const isEditing = !!editedExpenseId;

  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  const deleteExpenseHandler = async () => {
    setIsSubmitting(true);
    try {
      await deleteExpense(editedExpenseId);

      expensesCtx.deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (error) {
      setError('Could not delete expense - please try again later!');
      // If we clicked the okay button on the ErrorOverlay, I don't wanna show the LoadingOverlay instead
      setIsSubmitting(false);
    }
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = async (expenseData) => {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        // Update first locally and after that we send the update data to backend
        expensesCtx.updateExpense(editedExpenseId, expenseData);
        // update
        await updateExpense(editedExpenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        expensesCtx.addExpense({ ...expenseData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError('Could not save data - please try again later!');
      setIsSubmitting(false);
    }
  };

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} />;
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};
export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});
