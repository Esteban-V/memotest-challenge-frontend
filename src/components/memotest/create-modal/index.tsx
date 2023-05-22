import BaseModal from "@/components/base-modal";
import { useState } from "react";
import { CreateModalProps } from "./types";

const CreateModal: React.FC<CreateModalProps> = ({ memoTest, onClose, onStart }) => {
	const minPairs = memoTest?.image_urls.length / 2 || 1;
	const maxPairs = memoTest?.image_urls.length;
	
	const [pairCount, setPairCount] = useState(minPairs);

	const incrementPairCount = () => {
		if (pairCount < maxPairs) {
			setPairCount(pairCount + 1);
		}
	}

	const decrementPairCount = () => {
		if (pairCount > minPairs) {
			setPairCount(pairCount - 1);
		}
	}

	return (
		<BaseModal onClose={onClose}>
			<h2 className="font-bold text-lg mb-4">Select number of pairs</h2>
			<div className="flex items-center justify-center w-full mb-2">
				<button className="p-2 hover:bg-gray-100" onClick={decrementPairCount} disabled={pairCount <= minPairs}>
					-
				</button>
				<div className="mx-10">{pairCount}</div>
				<button className="p-2 hover:bg-gray-100" onClick={incrementPairCount} disabled={pairCount >= maxPairs}>
					+
				</button>
			</div>
			<span className="cursor-pointer text-gray-400 text-sm underline" onClick={() => { setPairCount(maxPairs) }}>{`Max: ${maxPairs}`}</span>
			<button
				className="mt-4 p-2 w-[100%] bg-purple-500 hover:bg-purple-600 text-white  rounded-2xl"
				onClick={() => onStart(memoTest, pairCount)}
			>
				Start Game
			</button>
		</BaseModal>
	);
};

export default CreateModal;
