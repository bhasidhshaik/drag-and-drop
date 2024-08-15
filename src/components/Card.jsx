import React, { useRef, useState, useEffect } from "react";
import { Rect, Text, Group, Transformer } from "react-konva";

const Card = ({ card, readMore, isSelected, onSelect }) => {
  const { name, smallDescription } = card;
  const shapeRef = useRef();
  const trRef = useRef();
  const [dimensions, setDimensions] = useState({
    width: card.width || 200,
    height: card.height || 200,
  });

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const handleClick = () => {
    console.log("Card clicked", card);
    readMore(card);
  };

  const handleTransformEnd = () => {
    const node = shapeRef.current;
    const { width, height } = node.getClientRect();

    node.scaleX(1);
    node.scaleY(1);

    const newWidth = Math.max(50, width);
    const newHeight = Math.max(50, height);

    console.log(`Transform end - width: ${newWidth}, height: ${newHeight}`);

    setDimensions({
      width: newWidth,
      height: newHeight,
    });

    card.width = newWidth;
    card.height = newHeight;
  };

  return (
    <>
      <Group
        draggable
        onClick={onSelect}
        ref={shapeRef}
        onDragEnd={(e) => {
          card.x = e.target.x();
          card.y = e.target.y();
        }}
        onTransformEnd={handleTransformEnd}
      >
        <Rect
          width={dimensions.width}
          height={dimensions.height}
          fill={"red"}
        />
        <Text
          text={name}
          fontSize={14}
          fontFamily="Arial"
          fill="white"
          x={10}
          y={10}
          width={dimensions.width - 20}
          wrap="word"
        />
        <Text
          text={smallDescription}
          fontSize={12}
          fontFamily="Arial"
          fill="white"
          x={10}
          y={40}
          width={dimensions.width - 20}
          wrap="word"
        />
        <Text
          text="Read More"
          fontSize={12}
          fontFamily="Arial"
          fill="blue"
          x={Math.max(10, dimensions.width - 80)}
          y={Math.max(40, dimensions.height - 20)}
          style={{ cursor: "pointer" }}
          onClick={handleClick}
        />
      </Group>
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 50 || newBox.height < 50) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

export default Card;
