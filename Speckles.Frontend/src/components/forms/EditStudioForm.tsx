import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { useStudioUpdate } from "@/hooks/useApi";
import { studioSchema } from "@/utils/forms/validationSchemas";
import AvatarSelector from "./AvatarSelector";
import { Dispatch, SetStateAction, useState } from "react";
import { getStudioLogo } from "@/utils/images";
import { uploadStudioLogo } from "@/utils/firebase/firebase-fns";
import FormButtons, { goForward } from "./FormButtons";
import Input from "./Input";
import { IStudio } from "@/types/dtos/Studio.types";

interface Props {
  studio: IStudio;
  onSuccess: () => void;
  setAvatarChangeDate: Dispatch<SetStateAction<Date>>;
}

export default function EditStudioForm({
  studio,
  onSuccess,
  setAvatarChangeDate,
}: Props) {
  // router
  const router = useRouter();

  // steps
  const [step, setStep] = useState(1);
  const maxSteps = 3;

  // studio update
  const studioUpdate = useStudioUpdate(studio.slug);

  // logo
  const [logo, setLogo] = useState(getStudioLogo(studio.studioId));

  // validation schema for fields
  const validationSchema = studioSchema;

  // initial values for fields
  const initialValues = {
    logo,
    name: studio.name,
    slug: studio.slug,
    about: studio.about,
    contactEmail: studio.contactEmail,
    paymentEmail: studio.paymentEmail,
    street: studio.address.street,
    city: studio.address.city,
    state: studio.address.state,
    zip: studio.address.zip,
    country: studio.address.country,
  };

  // on submit handler
  const onSubmit = async (values: any) => {
    goForward(step, setStep, maxSteps);

    if (step === maxSteps) {
      const { logo, ...rest } = values;

      await studioUpdate.mutateAsync(rest);

      // logo update
      uploadStudioLogo(studio.studioId, logo);
      setAvatarChangeDate(new Date());

      // redirect to new slug, if changed
      if (values.slug !== studio.slug) {
        router.push("/studios/" + values.slug);
      }

      onSuccess();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
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
          {step === 1 && (
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
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-8">
              <Input
                title="About"
                name="about"
                type="textarea"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.about}
                placeholder="Enter about"
                error={errors.about}
                touched={touched.about}
              />

              <Input
                title="Contact email"
                name="contactEmail"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.contactEmail}
                placeholder="Enter contact email"
                error={errors.contactEmail}
                touched={touched.contactEmail}
              />

              <Input
                title="Payment email"
                name="paymentEmail"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.paymentEmail}
                placeholder="Enter payment email"
                error={errors.paymentEmail}
                touched={touched.paymentEmail}
              />
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-8">
              <Input
                title="Country"
                name="country"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.country}
                placeholder="Enter country"
                error={errors.country}
                touched={touched.country}
              />

              <Input
                title="State"
                name="state"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.state}
                placeholder="Enter state"
                error={errors.state}
                touched={touched.state}
              />

              <div className="flex gap-6">
                <Input
                  title="City"
                  name="city"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.city}
                  placeholder="Enter city"
                  error={errors.city}
                  touched={touched.city}
                />

                <Input
                  title="ZIP"
                  name="zip"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.zip}
                  placeholder="Enter zip"
                  error={errors.zip}
                  touched={touched.zip}
                />
              </div>

              <Input
                title="Street"
                name="street"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.street}
                placeholder="Enter street"
                error={errors.street}
                touched={touched.street}
              />
            </div>
          )}

          <FormButtons
            buttonText="Update studio"
            loading={studioUpdate.isPending}
            maxSteps={maxSteps}
            step={step}
            setStep={setStep}
          />
        </form>
      )}
    </Formik>
  );
}
