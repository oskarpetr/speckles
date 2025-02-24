import { useParams } from "next/navigation";
import { useCommentUpdate } from "@/hooks/useApi";
import { commentSchema } from "@/utils/forms/validationSchemas";
import { useSession } from "next-auth/react";
import { ICommentPutBody } from "@/types/dtos/Comment.types";
import { Formik, FormikProps, FormikValues } from "formik";
import Input from "./Input";
import Button from "../shared/Button";
import Avatar from "../shared/Avatar";
import { useRef } from "react";

interface Props {
  commentId: string;
  text: string;
  onSuccess: () => void;
}

export default function EditCommentForm({ commentId, text, onSuccess }: Props) {
  // slug param
  const { assetId } = useParams();

  // formik ref
  const formikRef = useRef<FormikProps<FormikValues>>(null);

  // session
  const { data: session, status } = useSession();

  // comment update
  const commentUpdate = useCommentUpdate(assetId as string, commentId);

  // validation schema for fields
  const validationSchema = commentSchema;

  // initial values for fields
  const initialValues = { text };

  // on submit handler
  const onSubmit = async (values: any) => {
    if (status !== "authenticated") return;

    const body: ICommentPutBody = {
      text: values.text as string,
    };

    await commentUpdate.mutateAsync(body);
    formikRef.current?.resetForm();

    onSuccess();
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

          <Button text="Add" size="small" loading={commentUpdate.isPending} />
        </form>
      )}
    </Formik>
  );
}
