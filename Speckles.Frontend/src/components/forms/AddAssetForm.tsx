import { Formik } from "formik";
import Button from "../shared/Button";
import { array, number, object, string } from "yup";
import Input, { SelectOption } from "./Input";
import { useAssetMutation } from "@/hooks/useApi";
import { useParams } from "next/navigation";
import { IAssetPostBody } from "@/types/dtos/Asset.types";

interface Props {
  currencies: SelectOption[];
  licenses: SelectOption[];
}

export default function AddAssetForm({ currencies, licenses }: Props) {
  // slug param
  const { slug } = useParams();

  // asset mutation
  const postAssetMutation = useAssetMutation();

  // validation schema for fields
  const validationSchema = object({
    name: string().required("Asset name is required"),
    description: string().required("Asset description is required"),
    price: number().required("Asset price is required"),
    currencyId: string().required("Asset currency is required"),
    licenseId: string().required("Asset license are required"),
    images: array()
      .of(object().shape({ imageId: string(), alt: string() }))
      .required("Asset files are required"),
    files: array()
      .of(
        object().shape({
          fileId: string(),
          name: string(),
          fileName: string(),
          size: number(),
        })
      )
      .required("Asset files are required"),
    tags: array().of(string()),
    customTags: array().of(string()),
    thumbnail: object()
      .shape({ imageId: string(), alt: string() })
      .required("Asset thumbnail is required"),
  });

  // initial values for fields
  const initialValues: IAssetPostBody = {
    name: "",
    description: "",
    price: 0,
    currencyId: "",
    licenseId: "",
    images: [
      { imageId: "6536be55-ede5-48f9-aeb1-3a1d21bce94b", alt: "Poster 2" },
    ],
    files: [
      {
        fileId: "25c6566f-9576-4706-9d06-72fd65d23dd4",
        name: "Poster mockup",
        fileName: "poster_1.psd",
        size: 80835420,
      },
    ],
    tags: ["2571a29b-e07e-404a-bee3-9c65fc00fb95"],
    customTags: ["Amazing poster", "Cool design"],
    thumbnail: {
      imageId: "9d394e55-42c2-4e31-9a85-bc91fbf29402",
      alt: "Poster 1",
    },
  };

  // on submit handler
  const onSubmit = async (values: IAssetPostBody) => {
    console.log(values);
    postAssetMutation.mutate({ slug: slug as string, ...values });
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

            {/* <FormError error={formError} touched /> */}
            <Button
              icon={{ name: "ArrowRight", iconDirection: "right" }}
              text="Create asset"
              loading={postAssetMutation.isPending}
            />
          </div>
        </form>
      )}
    </Formik>
  );
}
