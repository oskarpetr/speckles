import { useParams } from "next/navigation";
import { useCommentMutation } from "@/hooks/useApi";
import { commentSchema } from "@/utils/forms/validationSchemas";
import { initialValuesComment } from "@/utils/forms/initialValues";
import { useSession } from "next-auth/react";
import { ICommentPostBody } from "@/types/dtos/Comment.types";
import { Formik, FormikProps, FormikValues } from "formik";
import Input from "./Input";
import Button from "../shared/Button";
import Avatar from "../shared/Avatar";
import { useRef } from "react";

export default function AddCommentForm() {
  // slug param
  const { assetId } = useParams();

  // formik ref
  const formikRef = useRef<FormikProps<FormikValues>>(null);

  // session
  const { data: session, status } = useSession();

  // comment mutation
  const commentMutation = useCommentMutation(assetId as string);

  // validation schema for fields
  const validationSchema = commentSchema;

  // initial values for fields
  const initialValues = initialValuesComment;

  // on submit handler
  const onSubmit = async (values: any) => {
    if (status !== "authenticated") return;

    const body: ICommentPostBody = {
      text: values.text as string,
      userId: session?.user.userId,
      assetId: assetId as string,
    };

    await commentMutation.mutateAsync(body);
    formikRef.current?.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      innerRef={formikRef}
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
        <form
          onSubmit={handleSubmit}
          className="flex gap-6 items-center w-full"
        >
          {status === "authenticated" && (
            <Avatar user={session.user} size={60} />
          )}

          <div className="w-full">
            <Input
              name="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.text}
              placeholder="Enter comment"
              error={errors.text}
              touched={touched.text}
            />
          </div>

          <Button text="Add" size="small" loading={commentMutation.isPending} />
        </form>
      )}
    </Formik>
  );
}
