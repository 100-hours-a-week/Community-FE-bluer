export default function Divider({ $target }) {
  const $divider = document.createElement("div");

  $divider.classList.add("divider");

  $target.appendChild($divider);
  this.render = () => {
    // console.log("divider");
  };
}
