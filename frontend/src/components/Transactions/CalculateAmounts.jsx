export const calculateTransactionAmounts = (transactions = []) => {
  const result = transactions.reduce(
    (acc, t) => {
      const amount = Math.round(Number(t.amount) * 100) || 0; // ✅ safe

      if (t.type === "income") {
        acc.income += amount;
      } else if (t.type === "expense") {
        acc.expense += amount;
      }

      return acc;
    },
    { income: 0, expense: 0 }
  );

  // ✅ convert back from cents
  const totalIncome = result.income / 100;
  const totalExpense = result.expense / 100;
  const balance = totalIncome - totalExpense;

  return {
    totalIncome,
    totalExpense,
    balance,
  };
};