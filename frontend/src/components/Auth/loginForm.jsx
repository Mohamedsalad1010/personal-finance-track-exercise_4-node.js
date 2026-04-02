import React, { useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Navigate, replace, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/Api/ApiClient";
import ErrorUtils from "@/utils/ErrorUtils";
import useAuthStore from "@/lib/store/AuthStore";

const LoginForm = () => {
  const [error, setError] = useState(null);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const Navigate = useNavigate();
 const {setAuth} = useAuthStore()
  const handleFormValues = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // create signup muatation

  const signInMutation = useMutation({
    mutationFn: async (credential) => {
      const response = await api.post("/users/login",
       credential 
        );
        console.log('response', response)
      return response.data;
     
    },
    onSuccess: (data) => {
       if(data.token) {
         
          const token = data.token
          const user = data.user
         setAuth(user , token)
         Navigate('/dashboard')
          console.log("Saving user + token"); // ✅ DEBUG
      }
      console.log("data", data.user);
    },
    onError: (error) => {
      console.log("errors", error);
      setError(ErrorUtils(error) || 'invalid email or password ');
    },
  });

  // forn submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValues.email.trim() || !formValues.password.trim()) {
      setError("invalid credentails please try Again.");
      return;
    }

    //    todo signup

    const credential = {
      email: formValues.email,
      password: formValues.password,
    };

    signInMutation.mutate(credential);
  };

  return (
    <Card>
      <CardHeader className={"space-y-1 pb-4"}>
        <CardTitle className="text-xl text-center">
        Signin
        </CardTitle>
        <CardDescription> Enter your crendials to access your account.</CardDescription>

        {/* form */}
        <CardContent>
          {error && (
            <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md w-full">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
          

            {/* email */}
            <div className="space-y-2">
              <Label className={"text-sm font-medium text-left mt-2"}>
                Email
              </Label>
              <Input
                name="email"
                type={"text"}
                value={formValues.email}
                onChange={handleFormValues}
                placeholder="Enter your Email"
                required
              />
            </div>

            {/* password */}
            <div className="space-y-2">
              <Label className={"text-sm font-medium text-left mt-2"}>
                Password
              </Label>
              <Input
                name="password"
                type={"password"}
                value={formValues.password}
                onChange={handleFormValues}
                placeholder="Enter your password"
                required
              />
            </div>

            {/* confirm password */}

            {/* submit button */}

            <div className="mt-10">
              <Button type="submit" className={"w-full  cursor-pointer"}>
                <span>Submit</span>
              </Button>
            </div>
          </form>

          <CardFooter className={"flex justify-center mt-4"}>
            <div className="text-sm text-center">
              i do not have an account{" "}
              <a
                className=" text-primary hover:underline cursor-pointer"
                onClick={() => Navigate("/signup")}
              >
                {" "}
                sign up
              </a>
            </div>
          </CardFooter>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default LoginForm;
