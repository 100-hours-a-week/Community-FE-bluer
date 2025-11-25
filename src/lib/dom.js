export const $ = (target, scope = document) => scope.querySelector(target);

// cf) https://react.dev/reference/react/createElement#creating-an-element-without-jsx
export const createElement = (type, props = null, children = []) => {
  const element = document.createElement(type);

  Object.entries(props).forEach(([key, value]) => {
    if (key === "text") {
      element.innerText = value;
    } else if (key === "event") {
      value.forEach(({ eventName, handler }) => {
        element.addEventListener(eventName, handler);
      });
    } else {
      element.setAttribute(key, value);
    }
  });

  if (Array.isArray(children)) {
    children.forEach(child => {
      let childElement;
      if (typeof child === "string") {
        childElement = document.createTextNode(child);
        element.appendChild(childElement);
      } else {
        element.appendChild(child);
      }
    });
  }

  return element;
};
