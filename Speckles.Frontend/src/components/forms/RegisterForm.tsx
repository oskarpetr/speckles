import { Formik } from "formik";
import Button from "../shared/Button";
import { object, ref, string } from "yup";
import Input from "./Input";
import { Dispatch, SetStateAction, useEffect } from "react";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { BEZIER_CURVE } from "@/utils/animation";
import { passwordSchema } from "@/utils/validationSchemas";
import { useRegisterMutation } from "@/hooks/useApi";
import { useRouter } from "next/navigation";

interface Props {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}

export default function RegisterForm({ step, setStep }: Props) {
  // router
  const router = useRouter();

  // register mutation
  const postRegisterMutation = useRegisterMutation();

  const validationSchemaStep1 = object({
    fullName: string().required("Full name is required"),
    email: string()
      .email("Email address must be in a valid format")
      .required("Email address is required"),
  });

  const validationSchemaStep2 = object({
    username: string().required("Username is required"),
    password: passwordSchema.required("Password is required"),
    confirmPassword: string()
      .oneOf([ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });

  const validationSchemaStep3 = object({
    country: string().required("Country is required"),
    state: string().required("State is required"),
    street: string().required("Street is required"),
    city: string().required("City is required"),
    zip: string().required("ZIP is required"),
  });

  const initialValuesStep1 = {
    fullName: "",
    email: "",
  };

  const initialValuesStep2 = {
    username: "",
    password: "",
    confirmPassword: "",
  };

  const initialValuesStep3 = {
    country: "",
    state: "",
    street: "",
    city: "",
    zip: "",
  };

  const goBack = () => {
    setStep((prev) => {
      decrementAnimation(prev);
      return Math.max(prev - 1, 1);
    });
  };

  const onSubmit = (values: any) => {
    if (step !== 3) {
      setStep((prev) => {
        incrementAnimation(prev);
        return prev + 1;
      });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...data } = values;

      postRegisterMutation.mutate(data);
      router.push("/login");
    }
  };

  useEffect(() => {
    step1Controls.start({ x: 0, opacity: 1 });
  }, []);

  const slidingAnimation = { duration: 0.3, ease: BEZIER_CURVE };
  const incrementAnimation = async (prev: number) => {
    if (prev === 1) {
      await step1Controls.start({
        x: -100,
        opacity: 0,
        transition: slidingAnimation,
      });
      await step2Controls.start({
        x: 0,
        opacity: 1,
        transition: slidingAnimation,
      });
    } else if (prev === 2) {
      await step2Controls.start({
        x: -100,
        opacity: 0,
        transition: slidingAnimation,
      });
      await step3Controls.start({
        x: 0,
        opacity: 1,
        transition: slidingAnimation,
      });
    }
  };

  const decrementAnimation = async (prev: number) => {
    if (prev === 3) {
      await step3Controls.start({
        x: 100,
        opacity: 0,
        transition: slidingAnimation,
      });
      await step2Controls.start({
        x: 0,
        opacity: 1,
        transition: slidingAnimation,
      });
    } else if (prev === 2) {
      await step2Controls.start({
        x: 100,
        opacity: 0,
        transition: slidingAnimation,
      });
      await step1Controls.start({
        x: 0,
        opacity: 1,
        transition: slidingAnimation,
      });
    }
  };

  const initialValues = [
    initialValuesStep1,
    initialValuesStep2,
    initialValuesStep3,
  ];
  const validationSchemas = [
    validationSchemaStep1,
    validationSchemaStep2,
    validationSchemaStep3,
  ];

  const step1Controls = useAnimationControls();
  const step2Controls = useAnimationControls();
  const step3Controls = useAnimationControls();

  function FormButtons({ step, goBack }: { step: number; goBack: () => void }) {
    return (
      <div className="flex gap-6">
        {step !== 1 && (
          <Button
            icon={{ name: "ArrowLeft" }}
            text="Go back"
            type="cancel"
            onClick={goBack}
          />
        )}
        <Button
          icon={{ name: "ArrowRight", iconDirection: "right" }}
          text={step === 3 ? "Register" : "Continue"}
          loading={postRegisterMutation.isPending}
          fullWidth
        />
      </div>
    );
  }

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
          <AnimatePresence>
            {step === 1 && (
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={step1Controls}
                transition={{ duration: 0.3, ease: BEZIER_CURVE }}
                className="flex flex-col gap-8"
              >
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

                <FormButtons step={step} goBack={goBack} />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {step === 2 && (
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={step2Controls}
                transition={{ duration: 0.3, ease: BEZIER_CURVE }}
                className="flex flex-col gap-8"
              >
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

                <FormButtons step={step} goBack={goBack} />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {step === 3 && (
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={step3Controls}
                transition={{ duration: 0.3, ease: BEZIER_CURVE }}
                className="flex flex-col gap-8"
              >
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

                <FormButtons step={step} goBack={goBack} />
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      )}
    </Formik>
  );
}
