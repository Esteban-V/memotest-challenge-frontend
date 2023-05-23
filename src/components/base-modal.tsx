interface ModalProps {
  onClose?: () => void;
  children: React.ReactNode;
}

const BaseModal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose} // Close modal when background is clicked
    >
      <div
        className="bg-white p-12 rounded-2xl relative" // relative position for absolute positioning of close button
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
      >
        <button
          className="absolute right-2 top-1 text-sm font-bold text-black p-2 rounded"
          onClick={onClose}
        >
          x
        </button>
        <div className="flex flex-col items-center">
            {children}
        </div>
      </div>
    </div>
  );
};

export default BaseModal;
