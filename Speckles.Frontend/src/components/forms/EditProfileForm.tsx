import { Formik, FormikProps, FormikValues } from "formik";
import { useRouter } from "next/navigation";
import AvatarSelector from "./AvatarSelector";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import FormButtons, { goForward } from "./FormButtons";
import Input from "./Input";
import { useUserUpdate } from "@/hooks/useApi";
import { uploadAvatar } from "@/utils/firebase/firebase-fns";
import { userSchema } from "@/utils/forms/validationSchemas";
import { getAvatar } from "@/utils/images";
import { IUser } from "@/types/dtos/User.types";

interface Props {
  user: IUser;
  onSuccess: () => void;
  setAvatarChangeDate: Dispatch<SetStateAction<Date>>;
}

export default function EditProfileForm({
  user,
  onSuccess,
  setAvatarChangeDate,
}: Props) {
  // router
  const router = useRouter();

  // step state
  const [step, setStep] = useState(1);
  const maxSteps = 2;

  // formik ref
  const formikRef = useRef<FormikProps<FormikValues>>(null);

  // user update
  const userUpdate = useUserUpdate(user.username);

  // avatar
  const [avatar, setAvatar] = useState(getAvatar(user.userId));

  // validation schema for fields
  const validationSchema = userSchema;

  // initial values for fields
  const initialValues = {
    avatar: {},
    fullName: user.fullName,
    username: user.username,
    email: user.email,
    ...user.address,
  };

  // on submit handler
  const onSubmit = async (values: any) => {
    goForward(step, setStep, maxSteps);

    if (step === maxSteps) {
      const { avatar, ...rest } = values;

      await userUpdate.mutateAsync(rest);

      // avatar update
      uploadAvatar(user.userId, avatar);

      if (values.username !== user.username) {
        router.push("/profiles/" + values.username);
      }

      setAvatarChangeDate(new Date());

      onSuccess();
    }
  };

  useEffect(() => {
    formikRef.current?.setFieldValue("avatar", avatar);
  }, [avatar]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
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
      }: any) => (
        <form onSubmit={handleSubmit} className="w-full">
          {step === 1 && (
            <div className="flex flex-col gap-8">
              <AvatarSelector
                title="Avatar"
                avatarTitle={values.fullName ? values.fullName : "Full name"}
                avatarSubtitle={
                  values.username ? `@${values.username}` : "@username"
                }
                avatar={avatar}
                setAvatar={setAvatar}
                error={errors.avatar}
                touched={touched.avatar}
              />

              <Input
                title="Full name"
                name="fullName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.fullName}
                placeholder="Enter full name"
                error={errors.fullName}
                touched={touched.fullName}
              />

              <Input
                title="Username"
                name="username"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
                placeholder="Enter username"
                error={errors.username}
                touched={touched.username}
              />

              <Input
                title="Email"
                name="email"
                type="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="Enter email"
                error={errors.email}
                touched={touched.email}
              />
            </div>
          )}

          {step === 2 && (
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
            loading={userUpdate.isPending}
            buttonText="Update profile"
            step={step}
            setStep={setStep}
            maxSteps={maxSteps}
          />
        </form>
      )}
    </Formik>
  );
}
