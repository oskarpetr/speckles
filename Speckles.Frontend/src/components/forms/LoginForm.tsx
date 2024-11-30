import { Formik } from "formik";
import Section from "../common/Section";
import Button from "../common/Button";
import { object, string } from "yup";
import Input from "./Input";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { toastSuccess } from "../common/Toast";

export default function LoginForm() {
  // router
  const router = useRouter();

  // session
  const { status } = useSession();

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
      toastSuccess("You have been signed in.");
    } else if (signInRes?.error) {
      setFormError("Invalid email or password");
    }
  };

  useEffect(() => {
    console.log(status);
  }, [status]);

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
                error={errors.email}
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
                error={errors.password || formError}
                touched={touched.password}
              />
            </div>

            {/* <FormError error={formError} touched /> */}
            <Button
              icon="ArrowRight"
              text="Login"
              iconDirection="right"
              loading={loading}
            />
          </div>
        </form>
      )}
    </Formik>
  );
}
