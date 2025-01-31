import { Formik } from "formik";
import Section from "../shared/Section";
import Button from "../shared/Button";
import { number, object, string } from "yup";
import Input, { SelectOption } from "./Input";
import { useState } from "react";

interface Props {
  currencies: SelectOption[];
  licenses: SelectOption[];
}

export default function AddAssetForm({ currencies, licenses }: Props) {
  // loading
  const [loading, setLoading] = useState(false);

  // validation schema for fields
  const validationSchema = object({
    name: string().required("Asset name is required"),
    description: string().required("Asset description is required"),
    price: number().required("Asset price is required"),
    currency: string().required("Asset currency is required"),
    license: string().required("Asset license are required"),
  });

  // initial values for fields
  const initialValues = {
    name: "",
    description: "",
    price: "",
    currency: "",
    license: "",
  };

  // on submit handler
  const onSubmit = async (values: any) => {
    setLoading(true);

    console.log(values);
    // api

    setLoading(false);
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
            <Section title="Name">
              <Input
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                placeholder="Enter name"
                error={errors.name}
                touched={touched.name}
              />
            </Section>
            <Section title="Description">
              <Input
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                placeholder="Enter description"
                error={errors.description}
                touched={touched.description}
              />
            </Section>
            <div className="flex gap-6">
              <Section title="Price">
                <Input
                  name="price"
                  type="number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.price}
                  placeholder="Enter price"
                  error={errors.price}
                  touched={touched.price}
                />
              </Section>
              <Section title="Currency">
                <Input
                  type="select"
                  options={currencies}
                  name="currency"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.currency}
                  placeholder="Select currency"
                  error={errors.currency}
                  touched={touched.currency}
                />
              </Section>
            </div>
            <Section title="License">
              <Input
                type="select"
                options={licenses}
                name="license"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.license}
                placeholder="Select license"
                error={errors.license}
                touched={touched.license}
              />
            </Section>

            {/* <FormError error={formError} touched /> */}
            <Button
              icon={{ name: "ArrowRight", iconDirection: "right" }}
              text="Create asset"
              loading={loading}
            />
          </div>
        </form>
      )}
    </Formik>
  );
}
