import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

export function useGetTransactions(filters) {
  const URL = filters ? [endpoints.transactions.list, { params:  filters  }] : '';

  const { data, isLoading, error, isValidating , mutate } = useSWR(URL, fetcher, {
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      transactionsResults: data?.data || [],
      transactionsLoading: isLoading,
      transactionsError: error,
      transactionsValidating: isValidating,
      transactionsEmpty: !isLoading && !data?.data.length,
      refetch: () => mutate(),
    }),
    [data?.data, error, isLoading, isValidating , mutate]
  );

  return memoizedValue;
}
