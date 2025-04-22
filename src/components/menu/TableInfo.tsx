
import React from "react";

interface TableInfoProps {
  tableNumber?: string;
}

const TableInfo: React.FC<TableInfoProps> = ({ tableNumber }) => {
  if (!tableNumber) return null;

  return (
    <div className="bg-kicardapio-beige text-kicardapio-brown px-4 py-3 rounded-lg mb-6">
      <div className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm4.707 3.707a1 1 0 00-1.414 0L7 7.414V13a1 1 0 102 0V7.414l1.293-1.293a1 1 0 00-1.414-1.414z"
            clipRule="evenodd"
          />
        </svg>
        <span className="font-medium">Mesa {tableNumber}</span>
      </div>
    </div>
  );
};

export default TableInfo;
