import { Formik } from "formik";
import Section from "../common/Section";
import Button from "../common/Button";
import { object, ref, string } from "yup";
import Input from "./Input";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { BEZIER_CURVE } from "@/utils/animation";
import { useQuery } from "@tanstack/react-query";
import { postRegister } from "@/utils/fetchers";
import { IAuthRegister } from "@/types/Auth.types";
import { passwordSchema } from "@/utils/validationSchemas";

interface Props {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}

export default function RegisterForm({ step, setStep }: Props) {
  const [registerBody, setRegisterBody] = useState<IAuthRegister>();

  const postRegisterQuery = useQuery({
    queryKey: ["register"],
    queryFn: () => postRegister(registerBody!),
    enabled: false,
  });

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
    const { confirmPassword, ...data } = values;
    setRegisterBody((prev) => ({ ...prev, ...data }));

    if (step < 3) {
      setStep((prev) => {
        incrementAnimation(prev);
        return prev + 1;
      });
    }

    if (step === 3) {
      console.log("now");
      postRegisterQuery.refetch();
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
                <div>
                  <Section title="Full name" />
                  <Input
                    name="fullName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.fullName}
                    placeholder="Enter full name"
                    error={errors.fullName}
                    touched={touched.fullName}
                  />
                </div>
                <div>
                  <Section title="Email address" />
                  <Input
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
                <div>
                  <Section title="Username" />
                  <Input
                    name="username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                    placeholder="Enter username"
                    error={errors.username}
                    touched={touched.username}
                  />
                </div>
                <div>
                  <Section title="Password" />
                  <Input
                    name="password"
                    type="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    placeholder="Enter password"
                    error={errors.password}
                    touched={touched.password}
                  />
                </div>
                <div>
                  <Section title="Confirm password" />
                  <Input
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
                <div>
                  <Section title="Country" />
                  <Input
                    name="country"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.country}
                    placeholder="Enter country"
                    error={errors.country}
                    touched={touched.country}
                  />
                </div>
                <div>
                  <Section title="State" />
                  <Input
                    name="state"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.state}
                    placeholder="Enter state"
                    error={errors.state}
                    touched={touched.state}
                  />
                </div>
                <div className="flex gap-6">
                  <div className="w-full">
                    <Section title="City" />
                    <Input
                      name="city"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.city}
                      placeholder="Enter city"
                      error={errors.city}
                      touched={touched.city}
                    />
                  </div>
                  <div className="w-full">
                    <Section title="ZIP" />
                    <Input
                      name="zip"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.zip}
                      placeholder="Enter zip"
                      error={errors.zip}
                      touched={touched.zip}
                    />
                  </div>
                </div>
                <div>
                  <Section title="Street" />
                  <Input
                    name="street"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.street}
                    placeholder="Enter street"
                    error={errors.street}
                    touched={touched.street}
                  />
                </div>

                <FormButtons step={step} goBack={goBack} />
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      )}
    </Formik>
  );
}

function FormButtons({ step, goBack }: { step: number; goBack: () => void }) {
  return (
    <div className="flex gap-6">
      {step !== 1 && (
        <Button
          icon="ArrowLeft"
          text="Go back"
          type="cancel"
          onClick={goBack}
          fullWidth={false}
        />
      )}
      <Button
        icon="ArrowRight"
        text={step === 3 ? "Register" : "Continue"}
        iconDirection="right"
      />
    </div>
  );
}
