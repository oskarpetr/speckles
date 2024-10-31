import { Formik } from "formik";
import Section from "../common/Section";
import Button from "../common/Button";
import { object, string } from "yup";
import Input from "./Input";
import { useQuery } from "@tanstack/react-query";
import { postLogin } from "@/utils/fetchers";
import { useEffect, useState } from "react";
import { IAuthLogin } from "@/types/Auth.types";

export default function LoginForm() {
  const [loginBody, setLoginBody] = useState<IAuthLogin>();

  // on form submit
  useEffect(() => {
    if (loginBody) {
      postLoginQuery.refetch();
    }
  }, [loginBody]);

  // login request
  const postLoginQuery = useQuery({
    queryKey: ["login"],
    queryFn: () => postLogin(loginBody!),
    enabled: false,
    retryDelay: 0,
  });

  // error responses
  const emailError =
    postLoginQuery.error?.name === "404" ? "Email does not exist" : undefined;
  const passwordError =
    postLoginQuery.error?.name === "401" ? "Wrong password" : undefined;

  // validation schema for fields
  const validationSchema = object({
    email: string()
      .email("Email address must be in a valid email")
      .required("Email address is required"),
    password: string().required("Password is required"),
  });

  // initial values for fields
  const initialValues = {
    email: "",
    password: "",
  };

  // on submit handler
  const onSubmit = (values: any) => {
    setLoginBody(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
      }: any) => (
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-col gap-8">
            <div>
              <Section title="Email address" />
              <Input
                name="email"
                type="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="Enter email address"
                error={errors.email || emailError}
                touched={touched.email}
              />
            </div>
            <div>
              <Section title="Password" />
              <Input
                name="password"
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                placeholder="Enter password"
                error={errors.password || passwordError}
                touched={touched.password}
              />
            </div>

            <Button icon="ArrowRight" text="Login" iconDirection="right" />
          </div>
        </form>
      )}
    </Formik>
  );
}
