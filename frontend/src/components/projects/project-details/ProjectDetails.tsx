import React from "react";

export const ProjectDetails = ({ id }: { id: number }) => {
  return (
    <div className="flex flex-col gap-4 p-6 ">
      <h2>Project Details</h2>
      <p>Project ID: {id}</p>
    </div>
  );
};
