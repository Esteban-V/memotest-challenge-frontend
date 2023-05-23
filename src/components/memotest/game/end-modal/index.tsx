import BaseModal from "@/components/base-modal";
import { EndModalProps } from "./types";

const EndModal: React.FC<EndModalProps> = ({ score, onClose, onClick }) => {
  return (
    <BaseModal onClose={onClose}>
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-xl mb-4">You did it!</h1>
        <span className="mb-5">Your final score is <strong>{score}</strong></span>
        <button onClick={onClick} className="p-2 bg-purple-500 hover:bg-purple-600 h-fit self-center
        text-white rounded-2xl hover:font-bold hover:scale-105 transition-all">Go Back</button>
      </div>
    </BaseModal>
  );
};

export default EndModal;
