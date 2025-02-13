import { Formik } from "formik";
import Button from "../shared/Button";
import { object, string } from "yup";
import Input from "./Input";
import { useParams } from "next/navigation";
import { IStudioMemberPostBody } from "@/types/dtos/Studio.types";
import { useStudioMemberMutation } from "@/hooks/useApi";

interface Props {
  onSuccess: () => void;
}

export default function AddMemberForm({ onSuccess }: Props) {
  // slug param
  const { slug } = useParams();

  // studio member mutation
  const studioMemberMutation = useStudioMemberMutation(slug as string);

  // validation schema for fields
  const validationSchema = object({
    email: string().email().required("Member's email is required"),
  });

  // initial values for fields
  const initialValues: IStudioMemberPostBody = {
    email: "",
  };

  // on submit handler
  const onSubmit = async (values: IStudioMemberPostBody) => {
    studioMemberMutation.mutate(values.email);
    onSuccess();
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
              title="Email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              placeholder="Enter email"
              error={errors.email}
              touched={touched.email}
            />

            <Button
              icon={{ name: "ArrowRight", iconDirection: "right" }}
              text="Add member"
              loading={studioMemberMutation.isPending}
            />
          </div>
        </form>
      )}
    </Formik>
  );
}
