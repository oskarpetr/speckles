import { IPayment } from "@/types/dtos/Payment.types";
import { postPayout } from "@/utils/fetchers";
import { AMOUNT_TO_STUDIO } from "@/utils/price";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const payments: IPayment[] = await req.json();

    for (const payment of payments) {
      await sendPayout(payment);
    }

    return NextResponse.json({ status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

async function sendPayout(payment: IPayment) {
  const payout = {
    sender_batch_header: { email_subject: payment.assetName },
    items: [
      {
        recipient_type: "EMAIL",
        amount: {
          value: payment.amount * AMOUNT_TO_STUDIO,
          currency: payment.currencyName,
        },
        receiver: payment.paymentEmail,
        note: payment.assetName,
        sender_item_id: `item_${Date.now()}`,
      },
    ],
  };

  try {
    await postPayout(payout);
  } catch (error) {
    throw error;
  }
}
