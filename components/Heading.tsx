import React, { FC } from "react";

type props = {
  heading: string;
};

const Heading: FC<props> = ({ heading }) => {
  return (
    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
      {heading}
    </h1>
  );
};

export default Heading;
