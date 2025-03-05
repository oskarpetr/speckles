import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import Button from "../shared/Button";
import { useOrderMutation, usePaymentMutation } from "@/hooks/useApi";
import toastMessages from "@/utils/toastMessages";
import { toastError, toastSuccess } from "../shared/Toast";
import { IOrderPostBody } from "@/types/dtos/Order.types";
import { useSession } from "next-auth/react";
import { IAssetShort } from "@/types/dtos/Asset.types";
import { formatPayments } from "@/utils/formatters";
import { useRouter } from "next/navigation";

interface Props {
  currencyName: string;
  totalPrice: number;
  basket: IAssetShort[];
}

export default function PaymentButton({
  currencyName,
  totalPrice,
  basket,
}: Props) {
  // router
  const router = useRouter();

  // session
  const { data: session, status } = useSession();

  // client id
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "";

  // payments
  const payments = formatPayments(basket);

  // total price formatted
  const totalPriceFormatted = totalPrice.toFixed(2);

  // payment mutation
  const paymentMutation = usePaymentMutation();

  // order mutation
  const orderMutation = useOrderMutation(session?.user.userId ?? "");

  // create order
  const createOrder = (_: any, actions: any) => {
    const unit = {
      amount: {
        value: totalPriceFormatted,
        currency_code: currencyName,
      },
    };

    return actions.order.create({
      intent: "CAPTURE",
      purchase_units: [unit],
    });
  };

  // on approve
  const onApprove = async () => {
    toastSuccess(toastMessages.user.orderSuccess);
    paymentMutation.mutate(payments);

    const order: IOrderPostBody = {
      assetIds: basket.map((payment) => payment.assetId),
      paymentMethod: "PayPal",
      userId: session?.user.userId ?? "",
    };

    orderMutation.mutate(order);

    router.push("/orders");
  };

  // on error
  const onError = () => {
    toastError(toastMessages.user.orderFailed);
  };

  //   const auth = Buffer.from(`${clientId}:${secretKey}`).toString("base64");
  //   const data = querystring.stringify({ grant_type: "client_credentials" });

  //   const a = async () => {
  //     const url = "https://api-m.sandbox.paypal.com/v1/oauth2/token";

  //     const response = await fetch(url, {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Basic ${auth}`,
  //         "Content-Type": "application/x-www-form-urlencoded",
  //       },
  //       body: data,
  //     });

  //     const json = await response.json();
  //     const accessToken = json.access_token;
  //     console.log(accessToken);
  //   };

  //   useEffect(() => {
  //     a();
  //   }, []);

  return (
    <PayPalScriptProvider
      options={{
        clientId,
        currency: currencyName,
      }}
    >
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
        disabled={status !== "authenticated"}
      />
    </PayPalScriptProvider>
  );
}
