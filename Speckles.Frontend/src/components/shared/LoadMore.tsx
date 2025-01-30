import { Dispatch, ReactNode, SetStateAction, useEffect } from "react";
import Button from "./Button";
import { QueryObserverResult } from "@tanstack/react-query";

// pagination limit
export const PAGINATION_LIMIT = 9;

interface Props {
  children: ReactNode;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  totalCount: number;
  query: QueryObserverResult<any>;
  limit?: number;
}

export default function LoadMore({
  children,
  page,
  setPage,
  totalCount,
  query,
  limit = PAGINATION_LIMIT,
}: Props) {
  const maxPage = Math.ceil(totalCount / limit);

  useEffect(() => {
    console.log("PAGE", page);
    query.refetch();
  }, [page]);

  return (
    <div>
      {children}

      <div className="w-full flex justify-center">
        {page !== maxPage && (
          <Button
            onClick={() => {
              // console.log(page < maxPage ? prev + 1 : prev);
              if (page < maxPage) {
                setPage((prev) => prev + 1);
              }
            }}
            text="Load more"
            marginTop
          />
        )}
      </div>
    </div>
  );
}
