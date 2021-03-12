import axios from 'axios';

const getData = async <T>(url: string): Promise<T> => {
  const { data } = await axios.get(url);

  return data;
};

export default getData;
