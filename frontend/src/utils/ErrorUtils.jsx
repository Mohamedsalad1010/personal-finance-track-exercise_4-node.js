const ErrorUtils = (error) => {
    if(!error) return null


    if(error.response?.data){
  const data = error.response.data
//  zod error
  if(data?.errors && Array.isArray(data.errors)){
    return  data.errors.map(err => err.message)[1]
  }
    // singlie error
    if(data){
        return data
    }
     

    // field err
    if(data.error){
        return data.error
    }

    // networ error

    if(error.request && !error.response){
        return 'network error accured please check your network.'
    }

    // general errror

    if(error.message){
        return error.message
    }
    }
    return  'somthing want  wrong try again'
}

export default ErrorUtils