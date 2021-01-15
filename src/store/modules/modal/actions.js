export function openModal(title, message, icon, animation, leftAction = null) {
  return {
    type: "@modal/OPEN_MODAL",
    payload: { title, message, icon, animation, leftAction },
  };
}

export function closeModal() {
  return {
    type: "@modal/CLOSE_MODAL",
  };
}
