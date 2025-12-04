import React, { createContext, useContext, useEffect, useRef } from "react";

const DropdownContext = createContext();

export function Dropdown(props) {
  const { children, direction = "left" } = props;
  const ref = useRef(null);
  const [open, toggle] = React.useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        toggle(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={ref}
      className={`absolute top-1.5 ${direction === "left" ? "left-1.5" : "right-1.5"}`}
    >
      <DropdownContext.Provider value={{ open, toggle, direction }}>
        {children}
      </DropdownContext.Provider>
    </div>
  );
}

function Trigger(props) {
  const { children } = props;
  const { open, toggle } = useContext(DropdownContext);

  return <div onClick={() => toggle(!open)}>{children}</div>;
}

function List(props) {
  const { children, className = "" } = props;
  const { open, direction } = useContext(DropdownContext);

  return (
    open && (
      <ul
        className={`bg-base-grey absolute top-7 w-40 p-0 ${direction === "left" ? "left-1.5" : "right-1.5"} z-1 ${className} `}
      >
        {children}
      </ul>
    )
  );
}

function Item(props) {
  const { children } = props;

  return <li className="cursor-pointer list-none p-4">{children}</li>;
}

Dropdown.Trigger = Trigger;
Dropdown.List = List;
Dropdown.Item = Item;
