import { useCallback, useEffect, useState } from 'react';
import { PrevNFTWithTokenId, useChainData } from './Provider';

interface Value {
  loading: boolean;
  data?: PrevNFTWithTokenId[];
  error?: string;
  reload: () => void;
}

export default function usePreviousNFTs(numberOfNFTs: number, offset?: number): Value {
  const { getPreviousNFTs } = useChainData();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<PrevNFTWithTokenId[]>();
  const [error, setError] = useState<string>();

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const prev = await getPreviousNFTs(numberOfNFTs, offset);

      setData(prev);
      setLoading(false);
    } catch (e: any) {
      setError(e.message);
    }
  }, [getPreviousNFTs, numberOfNFTs, offset]);

  useEffect(() => {
    load();
  }, [load]);

  return {
    loading, error, data, reload: load,
  };
}
