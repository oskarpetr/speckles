import { Formik, FormikProps, FormikValues } from "formik";
import Input, { SelectOption } from "./Input";
import { useAssetMutation } from "@/hooks/useApi";
import { useParams } from "next/navigation";
import FormButtons, { goForward } from "./FormButtons";
import {
  assetSchemaStep1,
  assetSchemaStep2,
  assetSchemaStep3,
} from "@/utils/forms/validationSchemas";
import {
  initialValuesAssetStep1,
  initialValuesAssetStep2,
  initialValuesAssetStep3,
} from "@/utils/forms/initialValues";
import { useEffect, useRef, useState } from "react";
import FileSelector from "./FileSelector";
import ImageSelector from "./ImageSelector";
import { IImage } from "@/types/dtos/Image.types";
import { IFile } from "@/types/dtos/File.types";
import { IAssetPostBody } from "@/types/dtos/Asset.types";
import { v4 as uuidv4 } from "uuid";
import {
  uploadAssetFiles,
  uploadAssetImages,
} from "@/utils/firebase/firebase-fns";
import FormError from "./FormError";
import TagSelector from "./TagSelector";
import { ITagShort } from "@/types/dtos/Tag.types";

interface Props {
  onSuccess: () => void;
  currencies: SelectOption[];
  licenses: SelectOption[];
}

export default function AddAssetForm({
  onSuccess,
  currencies,
  licenses,
}: Props) {
  // slug param
  const { slug } = useParams();

  // step state
  const [step, setStep] = useState(1);
  const maxSteps = 3;

  // asset mutation
  const assetMutation = useAssetMutation(slug as string);

  // validation schemas
  const validationSchemas = [
    assetSchemaStep1,
    assetSchemaStep2,
    assetSchemaStep3,
  ];

  // initial values
  const initialValues = [
    initialValuesAssetStep1,
    initialValuesAssetStep2,
    initialValuesAssetStep3,
  ];

  // images, files & tags
  const [images, setImages] = useState<IImage[]>([]);
  const [thumbnailId, setThumbnailId] = useState<string | null>(null);
  const [files, setFiles] = useState<IFile[]>([]);
  const [tags, setTags] = useState<ITagShort[]>([]);

  // formik ref
  const formikRef = useRef<FormikProps<FormikValues>>(null);

  // on submit handler
  const onSubmit = (values: any) => {
    if (step === maxSteps) {
      const assetId = uuidv4();

      const imagesWithoutBsase64 = images.map((image) => ({
        ...image,
        base64: undefined,
      }));
      const filesWithoutBase64 = files.map((file) => ({
        ...file,
        base64: undefined,
      }));

      const asset: IAssetPostBody = {
        ...values,
        assetId,
        images: imagesWithoutBsase64,
        files: filesWithoutBase64,
        thumbnailId,
        tags,
      };

      assetMutation.mutateAsync({ slug: slug as string, ...asset });
      uploadAssetImages(assetId, images);
      uploadAssetFiles(assetId, files);

      onSuccess();
    } else {
      goForward(step, setStep, maxSteps);
    }
  };

  useEffect(() => {
    formikRef.current?.setFieldValue("images", images);
  }, [images]);

  useEffect(() => {
    formikRef.current?.setFieldValue("thumbnailId", thumbnailId);
  }, [thumbnailId]);

  useEffect(() => {
    formikRef.current?.setFieldValue("files", files);
  }, [files]);

  useEffect(() => {
    formikRef.current?.setFieldValue("tags", tags);
  }, [tags]);

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

              <div>
                <FileSelector files={files} setFiles={setFiles} />
                <FormError error={errors.files} touched={touched.files} />
              </div>
            </div>
          )}

          {step === 3 && <TagSelector tags={tags} setTags={setTags} />}

          <FormButtons
            loading={assetMutation.isPending}
            buttonText="Create asset"
            maxSteps={maxSteps}
            step={step}
            setStep={setStep}
          />
        </form>
      )}
    </Formik>
  );
}
