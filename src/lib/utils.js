export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength);
};

export const formatToK = num => {
  if (num < 1000) return num.toString();
  return Math.floor(num / 1000) + "k";
};

export const formatToLocalDateTime = dateString => {
  const date = new Date(dateString);

  const dateOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  return new Intl.DateTimeFormat("sv-SE", dateOptions)
    .format(date)
    .replace(",", "");
};

export const formatTime = () => {};

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
  positiveStyle = "",
  negativeStyle = "",
}) => {
  const $modal = document.getElementById("modal");

  document.body.style.overflow = "hidden";
  $modal.classList.remove("hidden");

  $modal.innerHTML = "";
  $modal.innerHTML = `
  <div class="overlay"></div>
    <div class="modal-wrapper">
      <div class="modal-content">
        <h2 class="modal-title bold">${modalTitle}</h2>
        <p class="modal-description">${modalDescription}</p>
        <div class="modal-actions">
          <button class="negative-button" style=${negativeStyle}>${negativeText}</button>
          <button class="positive-button" style=${positiveStyle}>${positiveText}</button>
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
    $modal.innerHTML = "";
    document.body.style.overflow = "";
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
