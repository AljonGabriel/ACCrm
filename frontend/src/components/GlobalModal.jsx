import React from "react";

const GlobalModal = ({ id = "my_modal", title, children }) => {
  return (
    <dialog id={id} className="modal">
      <div className="modal-box">
        {/* Close button */}
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>

        {/* Title */}
        {title && <h3 className="font-bold text-lg">{title}</h3>}

        {/* Content */}
        <div>{children}</div>
      </div>
    </dialog>
  );
};

export default GlobalModal;
