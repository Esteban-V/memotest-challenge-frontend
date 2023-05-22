import BaseModal from "@/components/base-modal";
import { useState } from "react";

interface CreateModalProps {
  onClose: () => void;
}

const CreateModal: React.FC<CreateModalProps> = ({ onClose }) => {
  const [pairCount, setPairCount] = useState(1);

  const incrementPairCount = () => setPairCount(pairCount + 1);
  const decrementPairCount = () => setPairCount(Math.max(1, pairCount - 1));

  return (
    <BaseModal onClose={onClose}>
      <h2 className="font-bold text-lg mb-4">Select number of pairs</h2>
      <div className="flex items-center justify-center w-full mb-4">
        <button className="p-2 hover:bg-gray-100" onClick={decrementPairCount}>-</button>
        <div className="mx-10">{pairCount}</div>
        <button className="p-2 hover:bg-gray-100" onClick={incrementPairCount}>+</button>
      </div>
      <button
        className="mt-4 bg-purple-500 hover:bg-purple-600 text-white p-2 rounded-2xl"
        onClick={onClose}
      >
        Start Game
      </button>
    </BaseModal>
  );
};

export default CreateModal;
