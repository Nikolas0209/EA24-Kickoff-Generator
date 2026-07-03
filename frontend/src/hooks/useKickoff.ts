import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export function useKickoff <T>(url: string){
  const [kickoff, setKickoff] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchKickoff = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get<T>(url);
      setKickoff(response.data);
    } catch (error) {
      console.log("Could not fetch the Kickoff", error);
    } finally{
      setIsLoading(false);
    }
  }, [url]);
  
  useEffect(() => {
    fetchKickoff();
  }, [fetchKickoff]);

  return { kickoff, setKickoff, fetchKickoff, isLoading }
}; 