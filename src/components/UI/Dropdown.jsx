import React, { useState, useEffect, useRef } from "react";

const Dropdown = ({ trigger, items = [], align = "right", className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const alignmentClass = align === "right" ? "right-0" : "left-0";

  return (
    <div
      className={`relative inline-block text-left ${className}`}
      ref={dropdownRef}
    >
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>
      {isOpen && (
        <div
          className={`absolute ${alignmentClass} mt-2 w-48 rounded-xl bg-white shadow-lg focus:outline-none z-50 animate-in fade-in zoom-in duration-75`}
        >
          <div role="menu">
            {items.map((item, index) => (
              <React.Fragment key={index}>
                {item.divider ? (
                  <hr className=" border-slate-100" />
                ) : (
                  <button
                    onClick={() => {
                      item.onClick?.();
                      setIsOpen(false);
                    }}
                    className={`flex w-full items-center px-4 py-2 text-sm transition-colors ${
                      item.variant === "danger"
                        ? "text-red-600 hover:bg-red-50"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {item.icon && (
                      <span className="mr-3 text-lg">{item.icon}</span>
                    )}
                    {item.label}
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
