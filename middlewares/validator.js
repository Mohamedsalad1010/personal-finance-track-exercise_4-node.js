export const valitorUserSchemas = (schemas)  => (req , res , next) => {
      const result = schemas.safeParse(req.body)

      if(!result.success) {
         const formatted = result.error.format()
       return  res.status(400).json({
               success: false,
               errors: Object.keys(formatted).map(field => ({
                field,
                message: formatted[field]._errors?.[0] || 'invalid error accured'
               }))
         })
      }

      next()
} 