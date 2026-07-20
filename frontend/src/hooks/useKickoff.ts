import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export function useKickoff <T>(url: string, autofetch = true){
  const [kickoff, setKickoff] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchKickoff = useCallback(async (customUrl?: string) => {
    try {
      setIsLoading(true);
      const response = await axios.get<T>(customUrl ?? url);
      setKickoff(response.data);
    } catch (error) {
      console.log("Could not fetch the Kickoff", error);
    } finally{
      setIsLoading(false);
    }
  }, [url]);
  
  useEffect(() => {
    if(autofetch){
      fetchKickoff();
    }
  }, [fetchKickoff, autofetch]);

  return { kickoff, setKickoff, fetchKickoff, isLoading }
}; 