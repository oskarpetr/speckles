import { Formik } from "formik";
import Section from "../shared/Section";
import Button from "../shared/Button";
import { object, string } from "yup";
import Input from "./Input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function AddAssetForm() {
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
    assetName: string().required("Asset name is required"),
    assetDescription: string().required("Asset description is required"),
  });

  // initial values for fields
  const initialValues = {
    assetName: "",
    assetDescription: "",
  };

  // on submit handler
  const onSubmit = async (values: any) => {
    setLoading(true);

    // const signInRes = await signIn("credentials", {
    //   email: values.email,
    //   password: values.password,
    //   callbackUrl: "/",
    //   redirect: false,
    // });

    setLoading(false);

    // if (signInRes?.ok) {
    //   router.push(signInRes.url!);
    //   toastSuccess("You have been signed in.");
    // } else if (signInRes?.error) {
    //   setFormError("Invalid email or password");
    // }
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
            <Section title="Name">
              <Input
                name="assetName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.assetName}
                placeholder="Enter name"
                error={errors.assetName}
                touched={touched.assetName}
              />
            </Section>
            <Section title="Description">
              <Input
                name="assetDescription"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.assetDescription}
                placeholder="Enter description"
                error={errors.assetDescription}
                touched={touched.assetDescription}
              />
            </Section>

            {/* <FormError error={formError} touched /> */}
            <Button
              icon={{ name: "ArrowRight", iconDirection: "right" }}
              text="Create asset"
              loading={loading}
            />
          </div>
        </form>
      )}
    </Formik>
  );
}
