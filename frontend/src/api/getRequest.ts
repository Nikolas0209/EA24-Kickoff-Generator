import axios from "axios";

export const getRequest = async <T>(url: string): Promise<T> => {
  try{
    const response = await axios.get<T>(url);
    return response.data
  }catch(error){
    console.log('Could not fetch a new team', error);
    throw error
  }
}