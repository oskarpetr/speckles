import { Formik, FormikProps, FormikValues } from "formik";
import Input, { SelectOption } from "./Input";
import { useAssetUpdate } from "@/hooks/useApi";
import { useParams } from "next/navigation";
import FormButtons, { goForward } from "./FormButtons";
import {
  assetSchemaStep1,
  assetSchemaStep2,
  assetSchemaStep3,
} from "@/utils/forms/validationSchemas";
import { useEffect, useRef, useState } from "react";
import FileSelector from "./FileSelector";
import ImageSelector from "./ImageSelector";
import { IImage } from "@/types/dtos/Image.types";
import { IFile } from "@/types/dtos/File.types";
import { IAsset, IAssetPostBody } from "@/types/dtos/Asset.types";
import {
  deleteAsset,
  getBase64FileSize,
  uploadAssetFiles,
  uploadAssetImages,
} from "@/utils/firebase/firebase-fns";
import FormError from "./FormError";
import TagSelector from "./TagSelector";
import { ITagShort } from "@/types/dtos/Tag.types";
import UploadProgress from "../asset/UploadProgress";
import { formatAssetImages, formatFiles } from "@/utils/formatters";

interface Props {
  asset: IAsset;
  onSuccess: () => void;
  currencies: SelectOption[];
  licenses: SelectOption[];
}

export default function EditAssetForm({
  asset,
  onSuccess,
  currencies,
  licenses,
}: Props) {
  // slug param
  const { slug } = useParams();

  // step state
  const [step, setStep] = useState(1);
  const maxSteps = 4;

  // asset update
  const assetUpdate = useAssetUpdate(slug as string, asset.assetId);

  // validation schemas
  const validationSchemas = [
    assetSchemaStep1,
    assetSchemaStep2,
    assetSchemaStep3,
    {},
  ];

  // initial values
  const initialValues = [
    {
      name: asset.name,
      description: asset.description,
      price: asset.price,
      currencyId: asset.currency.currencyId,
      licenseId: asset.license.licenseId,
    },
    {
      images: asset.images,
      files: asset.files,
      thumbnail: asset.thumbnail,
    },
    {
      tags: asset.tags,
    },
    {},
  ];

  useEffect(() => {
    formatAssetImages(asset.assetId, asset.images, setImages);
    formatFiles(asset.assetId, asset.files, setFiles);
  }, []);

  // images, files & tags
  const [images, setImages] = useState<IImage[]>([]);
  const [thumbnailId, setThumbnailId] = useState<string | null>(
    asset.thumbnail.imageId
  );
  const [files, setFiles] = useState<IFile[]>([]);
  const [tags, setTags] = useState<ITagShort[]>(asset.tags);

  // uploads
  const [percentageImage, setPercentageImage] = useState(0);
  const [percentageFiles, setPercentageFiles] = useState(0);

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
      const filesWithoutBase64 = files.map((file) => ({
        ...file,
        base64: undefined,
      }));

      const assetObj: IAssetPostBody = {
        ...values,
        images: imagesWithoutBase64,
        files: filesWithoutBase64,
        thumbnailId,
        tags,
      };

      await assetUpdate.mutateAsync(assetObj);
      await deleteAsset(asset.assetId);
      await uploadAssetImages(asset.assetId, images, setPercentageImage);
      await uploadAssetFiles(asset.assetId, files, setPercentageFiles);

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
    {
      name: "Files",
      progress: percentageFiles,
      bytes: files.reduce(
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
                type="textarea"
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

          {step === 4 && <UploadProgress items={uploadPromises} />}

          {step !== maxSteps && (
            <FormButtons
              loading={assetUpdate.isPending}
              buttonText="Update asset"
              maxSteps={maxSteps - 1}
              step={step}
              setStep={setStep}
            />
          )}
        </form>
      )}
    </Formik>
  );
}
