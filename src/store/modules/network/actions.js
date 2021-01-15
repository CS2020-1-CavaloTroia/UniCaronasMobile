export function setNetworkInfo(networkInfo) {
  return {
    type: "@network/SET_NETWORK_INFO",
    payload: { networkInfo },
  };
}
