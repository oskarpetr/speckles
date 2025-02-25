import { Formik, FormikProps, FormikValues } from "formik";
import { useRouter } from "next/navigation";
import AvatarSelector from "./AvatarSelector";
import { useEffect, useRef, useState } from "react";
import FormButtons, { goForward } from "./FormButtons";
import Input from "./Input";
import { useStudioMutation } from "@/hooks/useApi";
import { useSession } from "next-auth/react";
import { uploadStudioLogo } from "@/utils/firebase/firebase-fns";
import {
  studioSchemaStep1,
  studioSchemaStep2,
  studioSchemaStep3,
} from "@/utils/forms/validationSchemas";
import {
  initialValuesStudioStep1,
  initialValuesStudioStep2,
  initialValuesStudioStep3,
} from "@/utils/forms/initialValues";
import { object } from "yup";

interface Props {
  onSuccess: () => void;
}

export default function AddStudioForm({ onSuccess }: Props) {
  // session
  const { data: session } = useSession();

  // router
  const router = useRouter();

  // step state
  const [step, setStep] = useState(1);
  const maxSteps = 3;

  // formik ref
  const formikRef = useRef<FormikProps<FormikValues>>(null);

  // studio mutation
  const studioMutation = useStudioMutation();

  // logo
  const [logo, setLogo] = useState("");

  // validation schema for fields
  const validationSchema = [
    object(studioSchemaStep1),
    object(studioSchemaStep2),
    object(studioSchemaStep3),
  ];

  // initial values for fields
  const initialValues = [
    initialValuesStudioStep1,
    initialValuesStudioStep2,
    initialValuesStudioStep3,
  ];

  // on submit handler
  const onSubmit = async (values: any) => {
    goForward(step, setStep, maxSteps);

    if (step === maxSteps) {
      const { logo, ...rest } = values;

      const res = await studioMutation.mutateAsync({
        ...rest,
        defaultMember: session?.user.userId,
      });
      const studioId = res.data.studioId;

      // logo update
      uploadStudioLogo(studioId, logo);

      router.push("/studios/" + values.slug);

      onSuccess();
    }
  };

  useEffect(() => {
    formikRef.current?.setFieldValue("logo", logo);
  }, [logo]);

  return (
    <Formik
      initialValues={initialValues[step - 1]}
      validationSchema={validationSchema[step - 1]}
      onSubmit={onSubmit}
      innerRef={formikRef}
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
                onChange={(e) =>
                  setFieldValue(
                    "slug",
                    e.target.value.toLowerCase().replaceAll(" ", "-")
                  )
                }
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
            loading={studioMutation.isPending}
            buttonText="Create studio"
            step={step}
            setStep={setStep}
            maxSteps={maxSteps}
          />
        </form>
      )}
    </Formik>
  );
}
