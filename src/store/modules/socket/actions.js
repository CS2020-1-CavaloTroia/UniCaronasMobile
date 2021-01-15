export function setWebSocketConnection(socket) {
  return {
    type: "@socket/SET_WEB_SOCKET_CONNECTION",
    payload: { socket },
  };
}
