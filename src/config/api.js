import axios from "axios";
import urls from "~/config/urls";

export const { CancelToken, isCancel } = axios;

const api = axios.create({
  baseURL: urls.baseURL,
});
export default api;
