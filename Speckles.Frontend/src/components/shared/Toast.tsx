import toast, { Toaster } from "react-hot-toast";

export function toastSuccess(message: string) {
  toast.success(message, { icon: "✅" });
}

export function toastError(message: string) {
  toast.error(message, { icon: "❌" });
}

export default function Toast() {
  return (
    <Toaster
      // containerStyle={{
      //   marginTop: "156px", // 112px
      //   marginRight: "16px",
      // }}
      position="bottom-left"
      toastOptions={{
        style: {
          borderRadius: "10px",
          background: "#525252",
          color: "#ffffff",
          padding: "8px 20px",
        },
      }}
    />
  );
}
