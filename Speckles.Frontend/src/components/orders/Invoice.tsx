import { IOrder } from "@/types/dtos/Order.types";
import { SpecklesLogoPDF } from "../layout/Logo";
import { formatDate, formatPrice } from "@/utils/formatters";
import { getAssetImage, getStudioLogo } from "@/utils/images";
import Image from "next/image";
import { getStudioLogoAlt } from "@/utils/alts";
import { AMOUNT_TO_SPECKLES, AMOUNT_TO_STUDIO } from "@/utils/price";
import { forwardRef } from "react";

interface Props {
  order: IOrder;
}

const Invoice = forwardRef<HTMLDivElement, Props>(({ order }, ref) => {
  // addresses
  const userAddress = order.user.address;
  const studioAddress = order.asset.studio.address;

  // prices
  const assetPrice = formatPrice(
    order.asset.currency.locale,
    order.asset.currency.name,
    order.asset.price
  );
  const studioPrice = formatPrice(
    order.asset.currency.locale,
    order.asset.currency.name,
    order.asset.price * AMOUNT_TO_STUDIO
  );
  const specklesPrice = formatPrice(
    order.asset.currency.locale,
    order.asset.currency.name,
    order.asset.price * AMOUNT_TO_SPECKLES
  );

  return (
    <div className="w-1/2 border border-neutral-200 rounded-lg overflow-hidden hidden">
      <div ref={ref} className="w-full aspect-w-1 aspect-h-[1.41]">
        <div className="bg-green-primary px-16 py-6 h-fit">
          <SpecklesLogoPDF />
        </div>

        <div className="flex flex-col gap-8 px-16 py-8 mt-[92px]">
          <div className="flex flex-col gap-1">
            <div className="heading text-2xl">Invoice</div>
            <div className="text-xs opacity-50">{order.orderId}</div>
          </div>

          <div className="grid grid-cols-3 text-xs">
            <div className="border-r border-t border-b border-neutral-100 py-4">
              <div className="font-bold">Issued</div>
              <div className="mt-2 opacity-50">
                <div>{formatDate(order.date, true)}</div>
              </div>
            </div>

            <div className="border-r border-t border-b border-neutral-100 px-6 py-4">
              <div className="font-bold">Billed to</div>
              <div className="mt-2 flex flex-col gap-1 opacity-50">
                <div className="font-bold">{order.user.fullName}</div>
                <div>{userAddress.street}</div>
                <div>
                  {userAddress.zip} {userAddress.city}
                </div>
                <div>{userAddress.country}</div>
              </div>
            </div>

            <div className="border-t border-b border-neutral-100 pl-6 py-4">
              <div className="font-bold">From</div>
              <div className="mt-2 flex flex-col gap-1 opacity-50">
                <div className="font-bold">{order.asset.studio.name}</div>
                <div>{studioAddress.street}</div>
                <div>
                  {studioAddress.zip} {studioAddress.city}
                </div>
                <div>{studioAddress.country}</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 text-xs">
            <div className="font-bold">Asset ordered</div>

            <div className="flex items-center gap-8">
              <Image
                alt={order.asset.thumbnail.alt}
                src={getAssetImage(
                  order.asset.assetId,
                  order.asset.thumbnail.imageId
                )}
                width={400}
                height={0}
                className="w-48 rounded-lg"
              />

              <div className="flex flex-col gap-2">
                <div className="font-bold">{order.asset.name}</div>
                <div className="opacity-50 w-3/4">
                  {order.asset.description}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 text-xs">
            <div className="font-bold">From studio</div>

            <div className="flex items-center gap-4">
              <Image
                alt={getStudioLogoAlt(order.asset.studio.name)}
                src={getStudioLogo(order.asset.studio.studioId)}
                width={200}
                height={0}
                className="w-12 h-12 object-cover rounded-full"
              />

              <div>
                <div className="font-bold">{order.asset.studio.name}</div>
                <div className="opacity-50">
                  {order.asset.studio.contactEmail}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 text-xs">
            <div className="font-bold">Payment</div>

            <div className="grid grid-cols-3 text-xs">
              <div className="border-r border-t border-b border-neutral-100 py-4">
                <div className="font-bold">Asset price</div>
                <div className="opacity-50">You paid</div>
                <div className="mt-2 opacity-50">{assetPrice}</div>
              </div>

              <div className="border-r border-t border-b border-neutral-100 px-6 py-4">
                <div className="font-bold">Goes to studio</div>
                <div className="opacity-50">From this amount</div>
                <div className="mt-2 opacity-50">{studioPrice}</div>
              </div>

              <div className="border-t border-b border-neutral-100 pl-6 py-4">
                <div className="font-bold">Goes to Speckles</div>
                <div className="opacity-50">From this amount</div>
                <div className="mt-2 opacity-50">{specklesPrice}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

Invoice.displayName = "Invoice";

export default Invoice;
