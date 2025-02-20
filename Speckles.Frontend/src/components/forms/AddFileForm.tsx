import { Formik } from "formik";
import Button from "../shared/Button";
import { fileSchema } from "@/utils/forms/validationSchemas";
import { initialValuesFile } from "@/utils/forms/initialValues";
import Input from "./Input";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { IFile } from "@/types/dtos/File.types";
import { v4 as uuidv4 } from "uuid";

interface Props {
  setFiles: Dispatch<SetStateAction<IFile[]>>;
  onSuccess: () => void;
}

export default function AddFileForm({ setFiles, onSuccess }: Props) {
  // validation schema
  const validationSchema = fileSchema;

  // initial values
  const initialValues = initialValuesFile;

  // on submit handler
  const onSubmit = (values: any) => {
    var reader = new FileReader();

    reader.readAsDataURL(values.file);
    reader.onload = () => {
      const file: IFile = {
        fileId: uuidv4(),
        fileName: values.fileName,
        name: values.name,
        size: values.file.size,
        base64: reader.result as string,
      };

      setFiles((prev) => [...prev, file]);
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
              title="File"
              type="file"
              name="file"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const file = e.target.files?.[0];
                if (file) {
                  setFieldValue("file", file);
                  setFieldValue("fileName", file.name);
                }
              }}
              onBlur={handleBlur}
              value={values.file}
              placeholder="Upload file"
              error={errors.file}
              touched={touched.file}
              accept="*/*"
              acceptText="All files"
              chooseText="Choose a file"
              uploadedText="File uploaded"
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
              title="File name"
              name="fileName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.fileName}
              placeholder="Enter file name"
              error={errors.fileName}
              touched={touched.fileName}
            />

            <Button
              text="Upload file"
              icon={{ name: "ArrowRight", iconDirection: "right" }}
            />
          </div>
        </form>
      )}
    </Formik>
  );
}
