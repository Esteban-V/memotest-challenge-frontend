import { useState } from "react";
import BaseModal from "@/components/base-modal";
import { CreationModalProps } from "./types";
import useFieldArray from "@/utils/hooks/useFieldArray";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai"

const CreationModal: React.FC<CreationModalProps> = ({ onClose, onCreate }) => {
  const { fields, append, remove } = useFieldArray<string>([]);

  const [imageUrlError, setImageUrlError] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [name, setName] = useState<string>("");

  const handleAppend = () => {
    //Check imageUrl is valid url
    if (!imageUrl) return;

    try {
      new URL(imageUrl);
    } catch (_) {
      setImageUrlError("Invalid image url");
      return;
    }

    append(imageUrl);
    setImageUrl("");
    setImageUrlError("");
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setNameError("");
  }

  const handleImageUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(event.target.value);
    setImageUrlError("");
  }

  const handleCreation = () => {
    if (!name){ 
      setNameError("Name is required");
      return;
    }

    if(name.length > 20){
      setNameError("Name must be less than 20 characters");
      return;
    }
    
    if (fields.length < 2) {
      setImageUrlError("At least 2 images are required");
      return;
    }

    onCreate(name, fields);
  }

  return (
    <BaseModal onClose={onClose}>
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col w-full gap-2">
          <label className="w-full mb-1 text-sm font-medium">Name</label>
          <input type="text"
            value={name}
            onChange={handleNameChange}
            className={`h-10 w-full rounded-md bg-gray-100 px-4 drop-shadow-sm
            focus:bg-white outline-none ${nameError ? "ring ring-red-500" : "focus:outline-black"}`}
          />
          <label className="text-red-500 text-sm">{nameError}</label>
        </div>

        <div className="flex flex-col w-full gap-2">
          <label className="w-72 text-sm font-medium">Image URLs</label>
          <div className="flex flex-col gap-2">
            {fields.map((field, index) => (
              <div className="flex gap-5 items-center w-full" key={index}>
                <span className="flex items-center h-10 w-72 whitespace-nowrap text-ellipsis overflow-hidden rounded-md bg-gray-300 text-gray-700 px-4 drop-shadow-sm">{field}</span>
                <AiOutlineDelete onClick={() => remove(index)} size={30} />
              </div>
            ))}
          </div>

          <div className="flex items-center gap-5">
            <input type="text"
              value={imageUrl}
              onChange={handleImageUrlChange}
              className={`h-10 w-72 rounded-md bg-gray-100 px-4 drop-shadow-sm
              focus:bg-white outline-none ${imageUrlError ? "ring ring-red-500" : "focus:outline-black"}`}
            />
            <AiOutlinePlusCircle size={30} onClick={handleAppend} />
          </div>
          <label className="text-red-500 text-sm">{imageUrlError}</label>
        </div>

        <button
          className="mt-4 p-2 w-[100%] bg-purple-500 hover:bg-purple-600 text-white rounded-2xl"
          onClick={handleCreation}
        >
          Create
        </button>
      </div>
    </BaseModal>
  );
};

export default CreationModal;
