import { useContext } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';

const RecentExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    // If expense.date greater than that, it means that it's younger that that - it's more recent that that.
    // it's somewere within those last seven days. If it's not greater than that, it's means the expense.date
    // would be older than seven days
    return expense.date >= date7DaysAgo && expense.date <= today; // rule that out the dates in the future
  });

  return (
    <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 Days" />
  );
};
export default RecentExpenses;
