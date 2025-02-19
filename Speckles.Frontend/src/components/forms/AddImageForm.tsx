import { Formik } from "formik";
import Button from "../shared/Button";
import { imageSchema } from "@/utils/forms/validationSchemas";
import { initialValuesImage } from "@/utils/forms/initialValues";
import Input from "./Input";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { v4 as uuidv4 } from "uuid";
import { IImage } from "@/types/dtos/Image.types";

interface Props {
  setImages: Dispatch<SetStateAction<IImage[]>>;
  onSuccess: () => void;
}

export default function AddImageForm({ setImages, onSuccess }: Props) {
  // validation schema
  const validationSchema = imageSchema;

  // initial values
  const initialValues = initialValuesImage;

  // on submit handler
  const onSubmit = (values: any) => {
    var reader = new FileReader();

    reader.readAsDataURL(values.image);
    reader.onload = () => {
      const image: IImage = {
        imageId: uuidv4(),
        alt: values.alt,
        base64: reader.result as string,
      };

      setImages((prev) => [...prev, image]);
    };

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
        setFieldValue,
      }: any) => (
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-col gap-8">
            <Input
              title="Image"
              type="file"
              name="image"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const image = e.target.files?.[0];
                if (image) setFieldValue("image", image);
              }}
              onBlur={handleBlur}
              value={values.image}
              placeholder="Upload image"
              error={errors.image}
              touched={touched.image}
              accept="image/*"
              acceptText="All images"
              chooseText="Choose an image"
              uploadedText="Image uploaded"
            />

            <Input
              title="Alt"
              name="alt"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.alt}
              placeholder="Enter alt"
              error={errors.alt}
              touched={touched.alt}
            />

            <Button
              text="Upload image"
              icon={{ name: "ArrowRight", iconDirection: "right" }}
            />
          </div>
        </form>
      )}
    </Formik>
  );
}
