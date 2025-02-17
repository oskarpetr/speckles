import { Formik } from "formik";
import Input, { SelectOption } from "./Input";
import { useAssetMutation } from "@/hooks/useApi";
import { useParams } from "next/navigation";
import FormButtons from "./FormButtons";
import {
  assetSchemaStep1,
  assetSchemaStep2,
} from "@/utils/forms/validationSchemas";
import {
  initialValuesAssetStep1,
  initialValuesAssetStep2,
} from "@/utils/forms/initialValues";
import { useState } from "react";
import FileSelector from "./FileSelector";

interface Props {
  currencies: SelectOption[];
  licenses: SelectOption[];
}

export default function AddAssetForm({ currencies, licenses }: Props) {
  // slug param
  const { slug } = useParams();

  // step state
  const [step, setStep] = useState(1);
  const maxSteps = 2;

  // asset mutation
  const assetMutation = useAssetMutation();

  // validation schema
  const validationSchemas = [assetSchemaStep1, assetSchemaStep2];

  // initial values
  const initialValues = [initialValuesAssetStep1, initialValuesAssetStep2];

  // on submit handler
  const onSubmit = (values: any) => {
    if (step === maxSteps) {
      assetMutation.mutate({ slug: slug as string, ...values });
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
                title="Description"
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                placeholder="Enter description"
                error={errors.description}
                touched={touched.description}
              />

              <div className="flex gap-6">
                <Input
                  title="Price"
                  name="price"
                  type="number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.price}
                  placeholder="Enter price"
                  error={errors.price}
                  touched={touched.price}
                />

                <Input
                  title="Currency"
                  type="select"
                  options={currencies}
                  name="currencyId"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.currencyId}
                  placeholder="Select currency"
                  error={errors.currencyId}
                  touched={touched.currencyId}
                />
              </div>

              <Input
                title="License"
                type="select"
                options={licenses}
                name="licenseId"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.licenseId}
                placeholder="Select license"
                error={errors.licenseId}
                touched={touched.licenseId}
              />
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-8">
              <FileSelector title="Images" />
              <FileSelector title="Files" />
            </div>
          )}

          <FormButtons
            loading={assetMutation.isPending}
            buttonText="Create asset"
            maxSteps={2}
            step={step}
            setStep={setStep}
          />
        </form>
      )}
    </Formik>
  );
}
