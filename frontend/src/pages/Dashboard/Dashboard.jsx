import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import DashboardWelcome from "@/components/Dashboard/DashboardWelcome";
import TransactionForm from "@/components/Transactions/TransactionForm";
import TransactionLists from "@/components/Transactions/TransactionLists";
import api from "@/lib/Api/ApiClient";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import React, { useState } from "react";

const Dashboard = () => {
  const [showTaskForm, setShowForm] = useState(false);
  const [isEditTask, setIsEditTask] = useState(null);

  const handleCreateTransaction = () => {
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setIsEditTask(null)
  };

  const transactionQuery = useQuery({
    queryKey: ["transaction"],
    queryFn: async () => {
      const response = await api.get("/transactions");
      return response.data;
    },
    retry: 1,
  });

  if (transactionQuery.isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-primary"> Error Tasks: {transactionQuery.error.message}</p>
      </div>
    );
  }

  if (transactionQuery.isLoading) {
    <div className="min-h-screen flex items-center justify-center">
      <Loader className="animate-spin text-primary" />
    </div>;
  }
   const handleEditTasks = (task) => {
    setIsEditTask(task);
    setShowForm(true)
  }
  return (
    <div className="min-h-screen bg-background">
      {/* header */}
      <DashboardHeader />

      {/* main content */}
      <main className="p-4">
        <DashboardWelcome
          showTaskForm={showTaskForm || !!isEditTask}
          onCreateTransaction={handleCreateTransaction}
        />

        {/* transaction list and stats */}

        <TransactionLists
        transactions={transactionQuery.data || []}
        isLoading={transactionQuery.isLoading}
        onEdit={handleEditTasks}
        />
      </main>

      {/* transaction form */}
      <TransactionForm
        task={isEditTask}
        open={showTaskForm || !!isEditTask}
        onOpenChange={handleFormClose}
        transactions={transactionQuery.data || []}
      />
    </div>
  );
};

export default Dashboard;
