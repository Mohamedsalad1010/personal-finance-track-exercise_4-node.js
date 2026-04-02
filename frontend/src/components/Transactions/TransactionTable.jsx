import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Select } from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Edit, MoreVertical, Trash } from "lucide-react";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/Api/ApiClient";
import { toast } from "sonner";

const TransactionTable = ({ transactions = [], onEdit }) => {
  const [filters, setFilters] = useState({
    type: "all",
    startDate: "",
    endDate: "",
  });
const [page , setPage ] = useState(1)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [visibleCount, setVisibleCount] = useState(10);

  const filteredTransactions = transactions.filter((tran) => {
    if (!tran) return false;

    const matchType = filters.type === "all" || tran.type === filters.type;

    const transactionDate = tran.date ? new Date(tran.date) : null;

    const matchStart =
      !filters.startDate ||
      (transactionDate && transactionDate >= new Date(filters.startDate));
    const matchEnd =
      !filters.endDate ||
      (transactionDate && transactionDate <= new Date(filters.endDate));

    return matchType && matchStart && matchEnd;
  });

  // panigation page
  const total = filteredTransactions.length;
  const currentPage = Math.ceil(visibleCount / 10);
  const totalPage = Math.ceil(total / 10);
  const showingTo = Math.min( page * visibleCount, total);

  // const startIndex = (page - 1) * TRANSACTIONS_PER_PAGE;
  const pageData = filteredTransactions.slice(0, visibleCount);

  //  handle filter reset

  const handleFilterChange = (newFilter) => {
    (setFilters(newFilter), setVisibleCount(10));
  };

  // make delete function
  const clientQuery = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const response = await api.delete(`/transactions/${id}`);
      return response.data;
    },
    onSuccess: (data) => {
     
      clientQuery.invalidateQueries(["transactions"]);
      toast.success("deleted task successfully.");
    },
    onError: (error) => {
      toast.error(`Error deleting task ${error.message}`);
      console.error("error deletin", error);
    },
  });

  const confirmDelete = async (id) => {
    try {
      await deleteMutation.mutateAsync(id);
    } catch (error) {
      toast.error(`Error delete task falied ${error.message}`);
      console.error(`Error delete task falied ${error.message}`);
    }
  };

  return (
    <div className="mt-6">
      {/* filters */}

      <Card>
        <CardContent className="p-4  grid md:grid-cols-3 gap-4 sm ">
          <select
            className="border  p-2  rounded "
            value={filters.type}
            onChange={(e) =>
              handleFilterChange({
                ...filters,
                type: e.target.value,
              })
            }
          >
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <Input
            type={"date"}
            value={filters.startDate}
            onChange={(e) =>
              handleFilterChange({
                ...filters,
                startDate: e.target.value,
              })
            }
          />

          <Input
            type={"date"}
            value={filters.endDate}
            onChange={(e) =>
              handleFilterChange({
                ...filters,
                endDate: e.target.value,
              })
            }
          />
          <Button
            className={"cursor-pointer  max-w-40"}
            onClick={() =>
              handleFilterChange({
                type: "all",
                startDate: "",
                endDate: "",
              })
            }
          >
            Reset
          </Button>
        </CardContent>
      </Card>

      {/* table data */}

      <Card className={"mt-6"}>
        <CardContent>
          <table className="w-full">
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageData.length === 0 && (
                <tr className="">
                  <td colSpan="5" className="text-center py-6">
                    {" "}
                    No transactions found
                  </td>
                </tr>
              )}

              {pageData.map((t) => (
                <tr key={t._id} className="border  ">
                  <td className="py-2 border-r px-2 ">{t.title}</td>

                  <td
                    className={`px-2 py-1 rounded text-sm  border-r ${
                      t.type === "income" ? " text-green-700" : " text-red-700"
                    }`}
                  >
                    {t.type}
                  </td>

                  <td className="px-2 py-1 border-r">{t.category}</td>

                  <td
                    className={` border-r px-2 py-2 ${t.type === "income" ? "text-green-600 font-semibold" : "text-red-700 font-semibold"}`}
                  >
                    {t.type === "income" ? "+" : "-"} ${t.amount}
                  </td>

                  <td className="px-2 border-2">
                    {t.date ? new Date(t.date).toLocaleDateString() : "-"}
                  </td>
                  <td className="text-center flex justify-center items-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant={"ghost"}
                          size={"sm"}
                          className="w-8 h-8 p-0"
                        >
                          <span className="sr-only"> open</span>
                          <MoreVertical />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => onEdit(t)}>
                          <Edit />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setShowDeleteDialog(true);
                            setSelectedId(t._id);
                          }}
                        >
                          <Trash />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
        {/* page */}


          <div className="flex justify-center items-center space-x-2 mt-4">
            <p className="text-sm text-muted-foreground">Rows per page</p>
            <select
            value={visibleCount}
              onChange={(e) => {
                setVisibleCount( Number(e.target.value));
                setPage(1)
              }
              
              }
              className=""
            >
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
              <option value={25}>25</option>
              <option value={30}>30</option>
            </select>
            <div className="text-muted-foreground">
               <div className="text-muted-foreground">
    {total === 0
      ? "0 of 0"
      : `${Math.min(page * visibleCount, total)} of ${total}`}
  </div>
            </div>
          </div>

       
      </Card>

      {/* alert dailog */}

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => confirmDelete(selectedId)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TransactionTable;
