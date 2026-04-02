import React, { useState } from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Navigate, replace, useNavigate } from 'react-router'
import { useMutation } from '@tanstack/react-query'
import api from '@/lib/Api/ApiClient'
import ErrorUtils from '@/utils/ErrorUtils'
const SignUpForm = () => {
    const [error , setError] = useState(null)
    const [formValues , setFormValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
 const Navigate = useNavigate()

    const handleFormValues = (e) => {
        const {name , value}  = e.target
        setFormValues({
            ...formValues,
            [name]: value
        })
    }
   
    // create signup muatation

    const signUpMutation = useMutation({
        mutationFn: async (userData)=> {
           const response = await api.post('/users' , userData)
           return response.data
        },
        onSuccess: (data) =>{
           if(data){
            Navigate('/login')
           }
            setError(null)
                setFormValues({
                     name: '',
        email: '',
        password: '',
        confirmPassword: ''
                })
                console.log('data', data)
        },
        onError: (error) => {
            console.log("errors" ,error.response.data)
            setError(ErrorUtils(error))
        }
    })

    // forn submit
    const handleSubmit = (e) => {
        e.preventDefault()
       if(!formValues.name || !formValues.email || !formValues.password){
        setError('fill all field to register')
        return
       }

       if(formValues.password !== formValues.confirmPassword){
        setError('do not match password')
        return
       }


    //    todo signup

    const userData = {
        name: formValues.name,
        email: formValues.email,
        password: formValues.password,
        confirmPassword: formValues.confirmPassword
    }

    signUpMutation.mutate(userData)
    }

  return (
    <Card>
        <CardHeader className={'space-y-1 pb-4'}>
             <CardTitle className="text-xl text-center">
   Create an acoount just few steps
   </CardTitle>
     <CardDescription>
    Enter your details to register
   </CardDescription>

   {/* form */}
        <CardContent>
                {
                    error &&(
                        <div className='text-sm text-destructive bg-destructive/10 p-3 rounded-md w-full'>
                          {error}
                        </div>
                    )
                }
           
<form  onSubmit={handleSubmit}>
    {/* name */}
    <div className='space-y-2'>
        <Label
        className={'text-sm font-medium text-left mt-2'}
        >name</Label>
        <Input
        name='name'
        type={'text'}
        value={formValues.name}
        onChange={handleFormValues}
           placeholder="Enter Your Name"
            required
        />
    </div>

    {/* email */}
     <div className='space-y-2'>
        <Label
        className={'text-sm font-medium text-left mt-2'}
        >Email</Label>
        <Input
        name='email'
        type={'text'}
        value={formValues.email}
        onChange={handleFormValues}
           placeholder="Enter your Email"
           required
        />
    </div>

    {/* password */}
     <div className='space-y-2'>
        <Label
        className={'text-sm font-medium text-left mt-2'}
        >Password</Label>
        <Input
        name='password'
        type={'password'}
        value={formValues.password}
         onChange={handleFormValues}
           placeholder="Enter your password"
            required
        />
    </div>

    {/* confirm password */}
     <div className='space-y-2'>
        <Label
        className={'text-sm font-medium text-left mt-2'}
        >confirmPassword</Label>
        <Input
        name='confirmPassword'
        type={'password'}
        value={formValues.confirmPassword}
        onChange={handleFormValues}
        placeholder="Enter confirmPassword"
         required
        />
    </div>

{/* submit button */}

<div className='mt-10'>
    <Button type="submit" className={'w-full  cursor-pointer'}>
        <span>Submit</span>
    </Button>
</div>

</form>

<CardFooter className={'flex justify-center mt-4'}>
    <div className='text-sm text-center'>
        Alread i have an account <a className=' text-primary hover:underline cursor-pointer' onClick={()=> Navigate('/login') }> sign in</a>
    </div>
</CardFooter>
        </CardContent>
        </CardHeader>

    </Card>
  )
}

export default SignUpForm
