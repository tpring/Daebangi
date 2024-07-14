import React from "react";

const SkeletonMap = () => (
  <div className="w-full h-96 md:h-500 lg:h-600">
    <div className="w-full h-full bg-gray-100 animate-pulse">
      <div className="w-full h-full bg-gray-300"></div>
    </div>
  </div>
);

export default SkeletonMap;
