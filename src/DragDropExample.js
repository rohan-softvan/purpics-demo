import React, { useState } from "react";
import DragDropComponent from "./DragDropComponent";
let count = 0;
function DragDropExample(props) {
  const [selectedItems, setSelectedItems] = useState({ rows: [], columns: [] });

  const handleOnChange = event => {
    const type = count % 2 === 0 ? "rows" : "columns";
    let random = Math.floor(Math.random() * 100 + 1);
    let object = { id: `item-${random}`, content: event.target.value };
    selectedItems[type].push(object);
    count++;
    setSelectedItems({ ...selectedItems });
  };

  return (
    <div>
      <input
        type="checkbox"
        onChange={handleOnChange}
        value={"Q1: Some Question Q1"}
      />{" "}
      Q1: Some Question Q1 <br />
      <input
        type="checkbox"
        onChange={handleOnChange}
        value={"Q2: Some Question Q2"}
      />{" "}
      Q2: Some Question Q2 <br />
      <input
        type="checkbox"
        onChange={handleOnChange}
        value={"Q3: Some Question Q3"}
      />{" "}
      Q3: Some Question Q3 <br />
      <br />
      <DragDropComponent selectedItems={selectedItems} />
    </div>
  );
}

export default DragDropExample;
