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
    console.log("refetch");
    console.log("page", page);
    query.refetch();
  }, [page]);

  return (
    <div>
      {children}

      <div className="w-full flex justify-center">
        {page !== maxPage && (
          <Button
            onClick={() => {
              setPage((prev) => {
                console.log(page < maxPage ? prev + 1 : prev);
                return page < maxPage ? prev + 1 : prev;
              });
              console.log("here");
            }}
            text="Load more"
            marginTop
          />
        )}
      </div>
    </div>
  );
}
