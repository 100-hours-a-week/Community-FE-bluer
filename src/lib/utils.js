export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength);
};

export const showToast = (message, duration = 3000) => {
  const container = document.getElementById("toast-container");

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, duration);
};

export const showModal = ({
  modalTitle,
  modalDescription,
  onPositive,
  onNegative,
  positiveText,
  negativeText,
}) => {
  const $modal = document.getElementById("modal");

  $modal.innerHTML = "";

  $modal.innerHTML = `
  <div class="overlay"></div>
    <div class="modal-wrapper">
      <div class="modal-content">
        <h2 class="modal-title bold">${modalTitle}</h2>
        <p class="modal-description">${modalDescription}</p>
        <div class="modal-actions">
          <button class="negative-button">${negativeText}</button>
          <button class="positive-button">${positiveText}</button>
        </div>
      </div>
    </div>
  </div>`;

  const $overlay = $modal.querySelector(".overlay");
  const $positiveButton = $modal.querySelector(".positive-button");
  const $negativeButton = $modal.querySelector(".negative-button");

  $modal.classList.remove("hidden");

  const close = () => {
    $modal.classList.add("hidden");
    $modal.innerHTML = ""; // 내부 완전히 비워서 다음 호출 시 새로 생성되도록
  };

  const handlePositive = () => {
    onPositive && onPositive();
    close();
  };

  const handleNegative = () => {
    onNegative && onNegative();
    close();
  };

  $positiveButton.addEventListener("click", handlePositive);
  $negativeButton.addEventListener("click", handleNegative);
  $overlay.addEventListener("click", handleNegative);
};
