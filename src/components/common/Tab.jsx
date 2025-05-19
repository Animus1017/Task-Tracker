import React from "react";

const Tab = ({ tabData, field, setField }) => {
  return (
    <div className="flex border-b border-gray-200">
      {tabData.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setField(tab.type)}
          className={`px-4 py-2 text-sm font-medium ${
            field === tab.type
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {tab.tabName}
        </button>
      ))}
    </div>
  );
};

export default Tab;
