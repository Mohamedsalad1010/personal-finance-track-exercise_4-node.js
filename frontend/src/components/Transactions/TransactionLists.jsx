import React from "react";
import { Card, CardContent } from "../ui/card";
import TransactionTable from "./TransactionTable";

const TransactionLists = ({ transactions, onEdit, isLoading }) => {
  const calculateTrnasactionAmounts = () => {
    const totalIncome = transactions
      .filter((tr) => tr.type === "income")
      .reduce((acc, t) => acc + t.amount, 0)
      .toFixed(2);
    const totalExpense = transactions
      .filter((tr) => tr.type === "expense")
      .reduce((acc, t) => acc + t.amount, 0)
      .toFixed(2);

    const totalBalance = (totalIncome - totalExpense).toFixed(2);

    return {
      totalIncome,
      totalBalance,
      totalExpense,
      totalTransactions: transactions.length,
    };
  };

  const stats = calculateTrnasactionAmounts()

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground"> Total balance</p>
            <h2 className="text-xl font-bold text-blue-600">
              ${stats.totalBalance}
            </h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground"> Total income</p>
            <h2 className="text-xl font-bold text-green-600">
              ${stats.totalIncome}
            </h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground"> Total expense</p>
            <h2 className="text-xl font-bold text-red-600">
              ${stats.totalExpense}
            </h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground"> Totaltransactions</p>
            <h2 className="text-xl font-bold">{stats.totalTransactions}</h2>
          </CardContent>
        </Card>
      </div>

      {/* Transaction */}
      <TransactionTable
        transactions={transactions}
        onEdit={onEdit}
        calculateTrnasactionAmounts={calculateTrnasactionAmounts}
      />
    </>
  );
};

export default TransactionLists;
