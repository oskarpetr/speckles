import { Formik } from "formik";
import Button from "../shared/Button";
import Input from "./Input";
import { useParams } from "next/navigation";
import { IStudioPutBody } from "@/types/dtos/Studio.types";
import { useStudioUpdate } from "@/hooks/useApi";
import { studioAboutSchema } from "@/utils/forms/validationSchemas";

interface Props {
  about?: string;
  contactEmail?: string;
  onSuccess: () => void;
}

export default function EditAboutStudioForm({
  about,
  contactEmail,
  onSuccess,
}: Props) {
  // slug param
  const { slug } = useParams();

  // studio update
  const studioUpdate = useStudioUpdate(slug as string);

  // validation schema for fields
  const validationSchema = studioAboutSchema;

  // initial values for fields
  const initialValues: IStudioPutBody = {
    about: about ?? "",
    contactEmail: contactEmail ?? "",
  };

  // on submit handler
  const onSubmit = async (values: IStudioPutBody) => {
    studioUpdate.mutate(values);
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
              title="About"
              name="about"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.about}
              placeholder="Enter about"
              error={errors.about}
              touched={touched.about}
            />

            <Input
              title="Contact Email"
              name="contactEmail"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.contactEmail}
              placeholder="Enter contact email"
              error={errors.contactEmail}
              touched={touched.contactEmail}
            />

            <Button
              icon={{ name: "ArrowRight", iconDirection: "right" }}
              text="Update studio"
              loading={studioUpdate.isPending}
            />
          </div>
        </form>
      )}
    </Formik>
  );
}
