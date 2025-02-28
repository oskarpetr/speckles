import { Formik, FormikProps, FormikValues } from "formik";
import Input from "./Input";
import FormButtons, { goForward } from "./FormButtons";
import {
  projectSchemaStep1,
  projectSchemaStep2,
} from "@/utils/forms/validationSchemas";
import { use, useEffect, useRef, useState } from "react";
import ImageSelector from "./ImageSelector";
import { IImage } from "@/types/dtos/Image.types";
import {
  deleteProject,
  getBase64FileSize,
  uploadProjectImages,
} from "@/utils/firebase/firebase-fns";
import FormError from "./FormError";
import UploadProgress from "../asset/UploadProgress";
import { IProject, IProjectPutBody } from "@/types/dtos/Project.types";
import { useProjectUpdate } from "@/hooks/useApi";
import { formatProjectImages } from "@/utils/formatters";
import { useParams } from "next/navigation";

interface Props {
  project: IProject;
  onSuccess: () => void;
}

export default function EditProjectForm({ project, onSuccess }: Props) {
  // slug param
  const { slug } = useParams();

  // step state
  const [step, setStep] = useState(1);
  const maxSteps = 3;

  // project update
  const projectUpdate = useProjectUpdate(slug as string, project.projectId);

  // validation schemas
  const validationSchemas = [projectSchemaStep1, projectSchemaStep2];

  // initial values
  const initialValues = [
    {
      name: project.name,
      description: project.description,
      personal: project.personal,
      client: project.client,
    },
    {
      images: project.images,
    },
  ];

  useEffect(() => {
    formatProjectImages(project.projectId, project.images, setImages);
  }, []);

  // images
  const [images, setImages] = useState<IImage[]>([]);
  const [thumbnailId, setThumbnailId] = useState<string | null>(
    project.thumbnail.imageId
  );

  // uploads
  const [percentageImage, setPercentageImage] = useState(0);

  // formik ref
  const formikRef = useRef<FormikProps<FormikValues>>(null);

  // on submit handler
  const onSubmit = async (values: any) => {
    goForward(step, setStep, maxSteps);

    if (step === maxSteps - 1) {
      const imagesWithoutBase64 = images.map((image) => ({
        ...image,
        base64: undefined,
      }));

      const projectObj: IProjectPutBody = {
        ...values,
        images: imagesWithoutBase64,
        thumbnailId,
      };

      await projectUpdate.mutateAsync(projectObj);
      await deleteProject(project.projectId);
      await uploadProjectImages(project.projectId, images, setPercentageImage);

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
            if (formikRef.current?.values.client === "client") {
              formikRef.current.setFieldValue("client", "");
            }
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
                loading={projectUpdate.isPending}
                buttonText="Update project"
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
