import { useState } from "react";

const SelectNewNodeType = ({ isVisible, onClose, onCreateNewNode }) => {
  const [selectedOption, setSelectedOption] = useState("circle");

  if (!isVisible) return null;

  const handleSelectChange = () => {
    onCreateNewNode(selectedOption);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-100 ml-10 min-w-64 h-auto">
      <div className="p-4 rounded-lg shadow-lg relative bg-rose-700">
        <button className="absolute top-2 right-2" onClick={onClose}>
          X
        </button>
        <select
          className="w-full p-2 border border-gray-300 rounded-md bg-transparent text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedOption}
          onChange={(event) => setSelectedOption(event.target.value)}
        >
          <option value="circle">Circle Shape</option>
          <option value="diamond">Diamond Shape</option>
          <option value="parallelogram">Parallelogram Shape</option>
          <option value="rectangle">Rectangle Shape</option>
          <option value="roundRectangle">Round Rectangle Shape</option>
        </select>
        <button
          class="px-2 py-1 mt-5 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300 
        ease-in-out transform hover:-translate-y-1 hover:scale-105"
          onClick={handleSelectChange}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default SelectNewNodeType;
