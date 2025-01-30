import { useEffect, useState } from "react";
import Modal from "../shared/Modal";
import { IGeo } from "@/types/dtos/Geo.types";
import Button from "../shared/Button";
import { getCurrencySet, setLocalCurrency } from "@/utils/local";
import { countryCodeEmoji } from "country-code-emoji";
import { useGeoQuery } from "@/hooks/useApi";
import FadeIn from "../animation/FadeIn";

export default function CurrencyDialog() {
  const [open, setOpen] = useState(false);

  // fetch geo
  const geoQuery = useGeoQuery();
  const geo = geoQuery.data as IGeo;

  // handle continue
  const handleContinue = () => {
    if (geo.currency) {
      setLocalCurrency(geo.currency);
    }

    setOpen(false);
  };

  // determine if dialog should be open
  const determineOpen = () => {
    const currencySet = getCurrencySet();
    return !currencySet;
  };

  useEffect(() => {
    const dialogTimeout = setTimeout(() => {
      setOpen(determineOpen());
    }, 1000);

    return () => clearTimeout(dialogTimeout);
  }, []);

  return (
    <Modal title="Local currency" open={open} setOpen={setOpen}>
      {geoQuery.isSuccess && (
        <FadeIn delay={0.1} className="flex flex-col gap-6">
          <p className="leading-relaxed">
            We&apos;ve detected that you&apos;re currently in{" "}
            <span className="font-bold">{geo.country}</span>{" "}
            {countryCodeEmoji(geo?.countryCode)}. Would you prefer to proceed
            with <span className="font-bold">{geo.currency}</span> as your
            shopping currency?
          </p>
          <Button
            text={`Continue with ${geo.currency}`}
            onClick={handleContinue}
          />
        </FadeIn>
      )}
    </Modal>
  );
}
