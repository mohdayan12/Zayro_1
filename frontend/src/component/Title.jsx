import React from 'react';

const Title = ({ text1, text2 }) => {
  return (
    <div className="flex items-center gap-4 mb-4">
      <h2 className="text-2xl font-semibold text-sky-700">
        {text1} <span className="text-sky-500">{text2}</span>
      </h2>
      <div className="w-16 h-[2px] bg-sky-200 rounded-md"></div>
    </div>
  );
};

export default Title;
