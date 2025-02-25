import { Formik } from "formik";
import Button from "../shared/Button";
import Input from "./Input";
import { useParams, useRouter } from "next/navigation";
import { useStudioDelete, useStudioUpdate } from "@/hooks/useApi";
import { studioSettingsSchema } from "@/utils/forms/validationSchemas";
import AvatarSelector from "./AvatarSelector";
import { Dispatch, SetStateAction, useState } from "react";
import { getStudioLogo } from "@/utils/images";
import { deleteStudio, uploadStudioLogo } from "@/utils/firebase/firebase-fns";
import DeleteModal from "../modals/DeleteModal";

interface Props {
  studioId: string;
  assetIds: string[];
  name: string;
  onSuccess: () => void;
  setAvatarChangeDate: Dispatch<SetStateAction<Date>>;
}

export default function EditStudioForm({
  studioId,
  assetIds,
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

  // studio delete
  const studioDelete = useStudioDelete(slug as string);

  // logo
  const [logo, setLogo] = useState(getStudioLogo(studioId));

  // delete modal
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  // validation schema for fields
  const validationSchema = studioSettingsSchema;

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

  // on delete handler
  const onDelete = async () => {
    await studioDelete.mutateAsync();
    await deleteStudio(studioId, assetIds);

    onSuccess();

    router.push("/studios");
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
        setFieldValue,
      }: any) => (
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-col gap-8">
            <AvatarSelector
              title="Logo"
              avatarTitle={values.name ? values.name : "Studio name"}
              avatarSubtitle={values.slug ? `/${values.slug}` : "/slug"}
              avatar={logo}
              setAvatar={setLogo}
              error={errors.logo}
              touched={touched.logo}
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
              onChange={(e) => {
                setFieldValue(
                  "slug",
                  e.target.value.toLowerCase().replaceAll(" ", "-")
                );
              }}
              onBlur={handleBlur}
              value={values.slug}
              placeholder="Enter slug"
              error={errors.slug}
              touched={touched.slug}
            />

            <DeleteModal
              name={name}
              phrase="Delete studio"
              open={openDeleteModal}
              setOpen={setOpenDeleteModal}
              onDelete={onDelete}
            />

            <div className="flex justify-between gap-6">
              <Button
                icon={{ name: "Trash", iconDirection: "right" }}
                text="Delete studio"
                type="danger"
                onClick={() => setOpenDeleteModal(true)}
                loading={studioDelete.isPending}
                fullWidth
              />
              <Button
                icon={{ name: "ArrowRight", iconDirection: "right" }}
                text="Update studio"
                loading={studioUpdate.isPending}
                fullWidth
              />
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
}
