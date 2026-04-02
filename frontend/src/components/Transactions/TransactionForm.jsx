import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import api from "@/lib/Api/ApiClient";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ErrorUtils from "@/utils/ErrorUtils";

import { toast, Toaster } from "sonner";
import { Loader } from "lucide-react";

import { calculateTransactionAmounts } from "./CalculateAmounts";

const TransactionForm = ( { transactions , task , open=true , onOpenChange}) => {
   const [validation , setValidation] = useState(null)
  const [success , setSuccess] = useState(null)
  const [form, setForm] = useState({
    title: "",
    amount: "",
    type: "",
    category: "",
    date: "",
  });
const  {totalIncome , totalExpense } = calculateTransactionAmounts(transactions)
  useEffect(()=>{
    if(task){
      setForm({
        title: task.title || '',
        amount: task.amount || "",
        type: task.type,
        category: task.category,
        date: task.date ? new Date(task.date).toISOString().split('T')[0] : ''

      })
    }else{
      setForm({
        title: "",
    amount: "",
    type: "",
    category: "",
    date: "",
      })
    }

    setSuccess(null)
    setValidation(null)

  }, [task , open])

  const handleChange = (e) => {
    const {name , value} = e.target
    setForm({
      ...form,
      [name] : value
    })
  }

   const handleSelect = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  // create transaction
const queryClient = useQueryClient()
  const createTransactionMutation = useMutation({
    mutationKey: ['transactions'],
    mutationFn: async (transactionData) => {
      const response = await api.post('/transactions',transactionData)
      return response.data
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries(['transactions'])
   setForm({
        title: "",
    amount: "",
    type: "",
    category: "",
    date: "",
      })
      onOpenChange?.(false)
      toast.success('created transaction was successfully.')
    },
    onError: (error) => {
      setValidation(ErrorUtils(error.message))
         toast.error(ErrorUtils(error.message) , {description: 'please try again .'})
         console.log(error.message)
      setSuccess(null)
    }

    

  })
 
  // update mutate
  const updateMutation = useMutation({
    mutationFn: async(transactionData)=>{
  const response = await api.put(`/transactions/${task._id}` ,transactionData )
  return response.data
    },
    onSuccess: (data)=> {
      queryClient.invalidateQueries(['transactions'])
       setForm({
        title: "",
    amount: "",
    type: "",
    category: "",
    date: "",
      })
      onOpenChange?.(false)
      toast.success('updated transaction successfully.')
    },
    onError: (error) => {
     toast.error(`error ${error.message}`)
     console.log('err', error.message)
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
  if(!form.title){
    setValidation('title is required.')
    return
  }
    
  const transactionData =  {
    title: form.title,
    amount:  Number(form.amount),
    type: form.type,
    category: form.category,
    date: form.date || ""
  }
  if (Number(form.amount) <= 0) {
  toast.error("Amount must be greater than 0");
  return;
}


  if(transactionData.type === 'expense'){
     const balance = totalIncome - totalExpense;
     console.log('balance', balance)
     if(transactionData.amount >  balance){
       toast.error("Not enough balance");
       return
     }
  }

if(task){
  updateMutation.mutate(transactionData)
}else{
    createTransactionMutation.mutate(transactionData)
}

  }

  const displayError = validation || ErrorUtils(createTransactionMutation.error)
  const isLoading =  createTransactionMutation.isPending
  return (
 <Dialog open={open} onOpenChange={onOpenChange}>
   <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{task ? 'Update Transaction' : 'Add Transaction'}</DialogTitle>
        </DialogHeader>
        {displayError && (
         <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md">
                     {displayError}
               </div>
             )}
        <form onSubmit={handleSubmit} className="space-y-4">
              
          {/* Title */}
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              name="title"
              placeholder="Salary, Food..."
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <Label>Amount</Label>
            <Input
              name="amount"
              type="number"
              placeholder="Enter amount"
              value={form.amount}
              onChange={handleChange}
              required
            />
          </div>

          {/* Type */}
          <div className="space-y-2">
            <Label>Type</Label>
            <Select 
            value={form.type} 
            onValueChange={(value) => handleSelect("type", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label>Category</Label>
            <Input
              name="category"
              placeholder="Food, Transport..."
              value={form.category}
              onChange={handleChange}
              required
            />
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label>Date</Label>
            <Input
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
            />
          </div>

          {/* Submit */}
          <Button type="submit" className="w-full cursor-pointer">
            {
              isLoading ? 
               <div className='flex items-center gap-2'>
       <Loader/>
       {task ? ' updating Transaction...' : ' Saving Transaction...'}
       </div> : ( task ? 'Update Transaction' : ' Save Transaction')

            } 
      
          </Button>

        </form>
      </DialogContent>
    </Dialog>
  )
}

export default TransactionForm
