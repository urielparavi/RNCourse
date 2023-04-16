import { View } from 'react-native';
import Input from './Input';

const ExpenseForm = () => {
  const amountChangeHandler = () => {};

  return (
    <View>
      <Input
        label="Amount"
        textInputConfig={{
          keyboardType: 'decimal-pad', // open keyboard on numbers only
          onChangeText: amountChangeHandler,
        }}
      />
      <Input
        label="Date"
        textInputConfig={{
          placeholder: 'YYYY-MM-DD',
          maxLength: 10,
          onChangeText: () => {},
        }}
      />
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          // autoCapitalize: 'none'
          // autoCorrect: false, // default is true
        }}
      />
    </View>
  );
};

export default ExpenseForm;
