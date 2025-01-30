import { useState } from "react";
import Modal from "../shared/Modal";
import { IGeo } from "@/types/dtos/Geo.types";
import Button from "../shared/Button";
import { setLocalCurrency } from "@/utils/local";
import { countryCodeEmoji } from "country-code-emoji";
import { useGeoQuery } from "@/hooks/useApi";

export default function CurrencyDialog() {
  const [open, setOpen] = useState(true);

  // fetch geo
  const geoQuery = useGeoQuery();
  const geo = geoQuery.data as IGeo;

  const handleContinue = () => {
    if (geo.currency) {
      setLocalCurrency(geo.currency);
    }

    setOpen(false);
  };

  return (
    <Modal title="Local currency" open={open} setOpen={setOpen}>
      {geoQuery.isSuccess && (
        <div className="flex flex-col gap-6">
          <p className="leading-relaxed">
            We've detected that you're currently in{" "}
            <span className="font-bold">{geo.country}</span>{" "}
            {countryCodeEmoji(geo?.countryCode)}. Would you prefer to proceed
            with <span className="font-bold">{geo.currency}</span> as your
            shopping currency?
          </p>
          <Button
            text={`Continue with ${geo.currency}`}
            onClick={handleContinue}
          />
        </div>
      )}
    </Modal>
  );
}
