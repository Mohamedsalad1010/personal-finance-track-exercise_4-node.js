import {z} from 'zod'

export const createuserSchemas = z.object({
    name: z.string().min(3 , 'name is required'),
    email: z.string().email('email is required'),
    password: z.string().min(4, 'password must be at least 4  charector').max(15 , ' passwordmust be 5 charector'),
    
})