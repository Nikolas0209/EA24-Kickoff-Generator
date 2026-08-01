import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export function useKickoff <T>(url: string, autofetch = true){
  const [kickoff, setKickoff] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  
  const fetchKickoff = useCallback(async (customUrl?: string) => {
    try {
      setHasError(false);
      setIsLoading(true);
      const response = await axios.get<T>(customUrl ?? url);
      setKickoff(response.data);
    } catch (error) {
      console.log("Could not fetch the Kickoff", error);
      setHasError(true);
    } finally{
      setIsLoading(false);
    }
  }, [url]);

  const retryFetch = async (): Promise<void> => {
    setKickoff(null)
    await fetchKickoff();
  }
  
  useEffect(() => {
    if(autofetch){
      fetchKickoff();
    }
  }, [fetchKickoff, autofetch]);

  return { kickoff, setKickoff, fetchKickoff, isLoading, hasError, retryFetch };
}; 