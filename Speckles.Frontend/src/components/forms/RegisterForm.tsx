import { Formik } from "formik";
import Input from "./Input";
import { Dispatch, SetStateAction } from "react";
import {
  registerSchemaStep1,
  registerSchemaStep2,
  registerSchemaStep3,
} from "@/utils/forms/validationSchemas";
import { useRegisterMutation } from "@/hooks/useApi";
import { useRouter } from "next/navigation";
import FormButtons, { goForward } from "./FormButtons";
import {
  initialValuesRegisterStep1,
  initialValuesRegisterStep2,
  initialValuesRegisterStep3,
} from "@/utils/forms/initialValues";
import bcrypt from "bcryptjs-react";

interface Props {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}

export default function RegisterForm({ step, setStep }: Props) {
  // router
  const router = useRouter();

  // step state
  const maxSteps = 3;

  // register mutation
  const registerMutation = useRegisterMutation();

  // validation schemas
  const validationSchemas = [
    registerSchemaStep1,
    registerSchemaStep2,
    registerSchemaStep3,
  ];

  // initial values
  const initialValues = [
    initialValuesRegisterStep1,
    initialValuesRegisterStep2,
    initialValuesRegisterStep3,
  ];

  // on submit handler
  const onSubmit = async (values: any) => {
    if (step < maxSteps) {
      goForward(step, setStep, maxSteps);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, password, ...data } = values;

      const encryptedPassword = await bcrypt.hashSync(
        password,
        bcrypt.genSaltSync(10)
      );

      await registerMutation.mutateAsync({
        ...data,
        password: encryptedPassword,
      });
      router.push("/login");
    }
  };

  return (
    <Formik
      initialValues={initialValues[step - 1]}
      validationSchema={validationSchemas[step - 1]}
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
          {step === 1 && (
            <div className="flex flex-col gap-8">
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
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-8">
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
                title="Password"
                name="password"
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                placeholder="Enter password"
                error={errors.password}
                touched={touched.password}
              />

              <Input
                title="Confirm password"
                name="confirmPassword"
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
                placeholder="Enter password again"
                error={errors.confirmPassword}
                touched={touched.confirmPassword}
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
            loading={registerMutation.isPending}
            buttonText="Register"
            step={step}
            setStep={setStep}
            maxSteps={maxSteps}
          />
        </form>
      )}
    </Formik>
  );
}
