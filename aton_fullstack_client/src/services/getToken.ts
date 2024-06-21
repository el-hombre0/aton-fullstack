import Cookies from "universal-cookie";

const getToken = () => {
  const cookies = new Cookies();

  try {
    const token = cookies.get("token");
    return token;
  } catch (error) {
    console.warn(error);
    return -1;
  }
};
export default getToken;
