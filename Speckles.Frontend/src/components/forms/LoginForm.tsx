import { Formik } from "formik";
import Button from "../shared/Button";
import { object, string } from "yup";
import Input from "./Input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toastSuccess } from "../shared/Toast";
import toastMessages from "@/utils/toastMessages";

export default function LoginForm() {
  // router
  const router = useRouter();

  // error response
  const [formError, setFormError] = useState<string | undefined>();

  // loading
  const [loading, setLoading] = useState(false);

  // validation schema for fields
  const validationSchema = object({
    email: string()
      .email("Email address must be in a valid format")
      .required("Email address is required"),
    password: string().required("Password is required"),
  });

  // initial values for fields
  const initialValues = {
    email: "",
    password: "",
  };

  // on submit handler
  const onSubmit = async (values: any) => {
    if (!values.email || !values.password) {
      return;
    }

    setLoading(true);

    const signInRes = await signIn("credentials", {
      email: values.email,
      password: values.password,
      callbackUrl: "/",
      redirect: false,
    });

    setLoading(false);

    if (signInRes?.ok) {
      router.push(signInRes.url!);
      toastSuccess(toastMessages.user.login);
    } else if (signInRes?.error) {
      setFormError("Invalid email or password");
    }
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
            <Input
              title="Email address"
              name="email"
              type="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              placeholder="Enter email address"
              error={errors.email}
              touched={touched.email}
            />

            <Input
              title="Password"
              name="password"
              type="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              placeholder="Enter password"
              error={errors.password || formError}
              touched={touched.password}
            />

            {/* <FormError error={formError} touched /> */}
            <Button
              icon={{ name: "ArrowRight", iconDirection: "right" }}
              text="Login"
              loading={loading}
              fullWidth
            />
          </div>
        </form>
      )}
    </Formik>
  );
}
