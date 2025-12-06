import React, { createContext, useContext, useEffect, useRef } from "react";

const DropdownContext = createContext();

export function Dropdown(props) {
  const { children, direction = "left", className = "" } = props;
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
      className={`absolute top-1.5 ${direction === "left" ? "left-1.5" : "right-1.5"} ${className}`}
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
        className={`bg-base-white border-base-grey absolute top-7 w-40 border-2 p-0 ${direction === "left" ? "left-1.5" : "right-1.5"} z-1 ${className} `}
      >
        {children}
      </ul>
    )
  );
}

function Item(props) {
  const { children, onClick } = props;

  return (
    <li className="hover:bg-base-grey cursor-pointer list-none p-4" onClick={onClick}>
      {children}
    </li>
  );
}

Dropdown.Trigger = Trigger;
Dropdown.List = List;
Dropdown.Item = Item;
