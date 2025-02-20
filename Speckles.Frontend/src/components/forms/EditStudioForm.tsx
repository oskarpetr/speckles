import { Formik } from "formik";
import Button from "../shared/Button";
import Input from "./Input";
import { useParams, useRouter } from "next/navigation";
import { useStudioUpdate } from "@/hooks/useApi";
import { studioSchema } from "@/utils/forms/validationSchemas";
import AvatarSelector from "./AvatarSelector";
import { Dispatch, SetStateAction, useState } from "react";
import { getStudioLogo } from "@/utils/images";
import { uploadStudioLogo } from "@/utils/firebase/firebase-fns";

interface Props {
  studioId: string;
  name: string;
  onSuccess: () => void;
  setAvatarChangeDate: Dispatch<SetStateAction<Date>>;
}

export default function EditStudioForm({
  studioId,
  name,
  onSuccess,
  setAvatarChangeDate,
}: Props) {
  // slug param
  const { slug } = useParams();

  // router
  const router = useRouter();

  // studio update
  const studioUpdate = useStudioUpdate(slug as string);

  // logo
  const [logo, setLogo] = useState(getStudioLogo(studioId));

  // validation schema for fields
  const validationSchema = studioSchema;

  // initial values for fields
  const initialValues = {
    logo,
    name: name ?? "",
    slug: slug ?? "",
  };

  // on submit handler
  const onSubmit = async (values: any) => {
    const { _, ...rest } = values;

    await studioUpdate.mutateAsync(rest);

    // logo update
    uploadStudioLogo(studioId, logo);
    setAvatarChangeDate(new Date());

    // redirect to new slug, if changed
    if (values.slug !== slug) {
      router.push("/studios/" + values.slug);
    }

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
            <AvatarSelector
              title="Logo"
              avatarTitle={values.name}
              avatarSubtitle={values.slug}
              avatar={logo}
              setAvatar={setLogo}
            />

            <Input
              title="Name"
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              placeholder="Enter name"
              error={errors.name}
              touched={touched.name}
            />

            <Input
              title="Slug"
              name="slug"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.slug}
              placeholder="Enter slug"
              error={errors.slug}
              touched={touched.slug}
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
