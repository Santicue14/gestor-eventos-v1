import { useEffect, useRef } from "react";

// eslint-disable-next-line react/prop-types
export const CargarEventoModal = ({ isOpen, onClose, onCreate }) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const tipo = e.target.elements.tipo.value;
    onCreate(tipo);
    onClose();
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
      <div ref={modalRef} className={`modal-container bg-white p-4 rounded shadow-lg transition-transform duration-300 ease-in-out transform ${isOpen ? "translate-y-0" : "-translate-y-10"}`}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="tipo">
            Ingrese un tipo de evento:
            <input type="text" id="tipo" name="tipo" required />
          </label>
          <button type="submit">Guardar</button>
          <button type="button" onClick={onClose} className="absolute top-2 right-2">X</button>
        </form>
      </div>
    </div>
  );
};
