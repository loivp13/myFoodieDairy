import React from "react";

export default function GenerateLines({ num }) {
  const CreateLines = () => {
    let lines = [];
    for (let i = 0; i < num; i++) {
      lines.push(
        <div
          key={i}
          className="NotebookPage_line"
          style={{ top: `${30 * i + 60 - 1 * i}px` }}
        ></div>
      );
    }
    return lines;
  };
  return <>{CreateLines()}</>;
}
