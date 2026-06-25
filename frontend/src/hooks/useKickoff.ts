import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export function useKickoff <T>(url: string){
  const [kickoff, setKickoff] = useState<T | null>(null);

  const fetchKickoff = useCallback(async () => {
    try {
      const response = await axios.get(url);
      setKickoff(response.data);
    } catch (error) {
      console.log("Could not fetch the Kickoff", error);
    }
  }, [url]);
  
  useEffect(() => {
    fetchKickoff();
  }, [fetchKickoff]);

  return { kickoff, setKickoff, fetchKickoff }
}; 