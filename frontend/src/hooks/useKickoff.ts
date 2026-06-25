import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import type { CountryKickoff } from "../types/countryKickoff.type";

export function useKickoff (url: string){
  const [kickoff, setKickoff] = useState<CountryKickoff | null>(null);

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