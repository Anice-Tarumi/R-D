import React from 'react';

const ChestOpenButton = ({ chestRefs, chestId }) => {
  const handleClick = () => {
    const chestRef = chestRefs.current[chestId];
    console.log("chestRefs",chestId)
    if (chestRef?.current?.openChest) {
      chestRef.current.openChest(); // 宝箱のアニメーションをトリガー
    } else {
      console.warn(`No openChest method found for chest ${chestId}`);
    }
  };

  return (
    <button className="chest-open-button" onClick={handleClick}>
      Open {chestId}
    </button>
  );
};

export default ChestOpenButton;
