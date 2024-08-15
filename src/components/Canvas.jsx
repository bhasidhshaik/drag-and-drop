import React, { useState } from "react";
import { Stage, Layer } from "react-konva";
import Card from "./Card";

const Canvas = ({ cardList }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleReadMore = (card) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const handleDeselect = (e) => {
    console.log("Stage clicked", e.target);
    if (e.target === e.target.getStage()) {
      setSelectedCard(null);
    }
  };

  return (
    <div>
      {isModalOpen && selectedCard && (
        <div
          id="popup-modal"
          tabIndex="-1"
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                onClick={toggleModal}
                type="button"
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  {selectedCard.name}
                </h3>
                <p>{selectedCard.fullDescription}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleDeselect}
        onTouchStart={handleDeselect}
      >
        <Layer>
          {cardList.map((card, index) => (
            <Card
              key={index}
              card={card}
              readMore={handleReadMore}
              isSelected={selectedCard?.id === card.id}
              onSelect={() => setSelectedCard(card)}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas;
