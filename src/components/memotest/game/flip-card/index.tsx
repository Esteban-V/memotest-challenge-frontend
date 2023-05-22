import Image from "next/image";
import React, { useState } from "react";
import { FlipCardProps } from "./types";

function FlipCard({ backImage, frontText, isFlipped, onClick }: FlipCardProps) {
  return (
    <div
      onClick={onClick}
      className={`relative w-36 h-64 cursor-pointer perspective`}
    >
      <div
        className={`relative preserve-3d w-full h-full duration-700 ease-in-out ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        <div
          className={`absolute flex items-center justify-center w-full h-full bg-purple-500 hover:bg-purple-600 border-white border-4
        text-white font-bold text-5xl rounded-2xl shadow-md backface-hidden hover:scale-105 transition-all`}
        >
          <h1>{frontText}</h1>
        </div>
        <div
          className={`absolute w-full h-full bg-green-600 rounded-2xl shadow-md rotate-y-180 border-white border-4 backface-hidden overflow-hidden`}
        >
          <Image
            width={100}
            height={100}
            alt={frontText}
            content="fill"
            style={{ objectFit: "cover", height: "100%", width: "100%" }}
            src={backImage}
          />
        </div>
      </div>
    </div>
  );
}

export default FlipCard;
