import { Formik, FormikProps, FormikValues } from "formik";
import Input from "./Input";
import { useParams } from "next/navigation";
import FormButtons, { goForward } from "./FormButtons";
import {
  projectSchemaStep1,
  projectSchemaStep2,
} from "@/utils/forms/validationSchemas";
import {
  initialValuesProjectStep1,
  initialValuesProjectStep2,
} from "@/utils/forms/initialValues";
import { useEffect, useRef, useState } from "react";
import ImageSelector from "./ImageSelector";
import { IImage } from "@/types/dtos/Image.types";
import { v4 as uuidv4 } from "uuid";
import {
  getBase64FileSize,
  uploadProjectImages,
} from "@/utils/firebase/firebase-fns";
import FormError from "./FormError";
import UploadProgress from "../asset/UploadProgress";
import { IProjectPostBody } from "@/types/dtos/Project.types";
import { useProjectMutation } from "@/hooks/useApi";

interface Props {
  onSuccess: () => void;
}

export default function AddProjectForm({ onSuccess }: Props) {
  // slug param
  const { slug } = useParams();

  // step state
  const [step, setStep] = useState(1);
  const maxSteps = 3;

  // project mutation
  const projectMutation = useProjectMutation(slug as string);

  // validation schemas
  const validationSchemas = [projectSchemaStep1, projectSchemaStep2];

  // initial values
  const initialValues = [initialValuesProjectStep1, initialValuesProjectStep2];

  // images
  const [images, setImages] = useState<IImage[]>([]);
  const [thumbnailId, setThumbnailId] = useState<string | null>(null);

  // uploads
  const [percentageImage, setPercentageImage] = useState(0);

  // formik ref
  const formikRef = useRef<FormikProps<FormikValues>>(null);

  // on submit handler
  const onSubmit = async (values: any) => {
    goForward(step, setStep, maxSteps);

    if (step === maxSteps - 1) {
      const projectId = uuidv4();

      const imagesWithoutBase64 = images.map((image) => ({
        ...image,
        base64: undefined,
      }));

      const project: IProjectPostBody = {
        ...values,
        slug: slug as string,
        projectId,
        images: imagesWithoutBase64,
        thumbnailId,
      };

      await projectMutation.mutateAsync(project);
      await uploadProjectImages(projectId, images, setPercentageImage);

      onSuccess();
    }
  };

  const uploadPromises = [
    {
      name: "Images",
      progress: percentageImage,
      bytes: images.reduce(
        (acc, curr) => acc + getBase64FileSize(curr.base64!),
        0
      ),
    },
  ];

  useEffect(() => {
    formikRef.current?.setFieldValue("images", images);
  }, [images]);

  useEffect(() => {
    formikRef.current?.setFieldValue("thumbnailId", thumbnailId);
  }, [thumbnailId]);

  return (
    <Formik
      initialValues={initialValues[step - 1]}
      validationSchema={validationSchemas[step - 1]}
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
      }: any) => {
        useEffect(() => {
          if (formikRef.current?.values.personal) {
            formikRef.current?.setFieldValue("client", "client");
          } else {
            formikRef.current?.setFieldValue("client", "");
          }
        }, [formikRef.current?.values.personal]);

        return (
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

                <Input
                  title="Personal project"
                  name="personal"
                  type="toggle"
                  onChange={handleChange}
                  value={values.personal}
                />

                {!values.personal && (
                  <Input
                    title="Client"
                    name="client"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.client}
                    placeholder="Enter client"
                    error={errors.client}
                    touched={touched.client}
                  />
                )}
              </div>
            )}

            {step === 2 && (
              <div>
                <ImageSelector
                  images={images}
                  setImages={setImages}
                  thumbnailId={thumbnailId}
                  setThumbnailId={setThumbnailId}
                />
                <FormError error={errors.images} touched={touched.images} />
                <FormError
                  error={errors.thumbnailId}
                  touched={touched.thumbnailId}
                />
              </div>
            )}

            {step === 3 && <UploadProgress items={uploadPromises} />}

            {step !== maxSteps && (
              <FormButtons
                // loading={projectMutation.isPending}
                loading={false}
                buttonText="Create project"
                maxSteps={maxSteps - 1}
                step={step}
                setStep={setStep}
              />
            )}
          </form>
        );
      }}
    </Formik>
  );
}
