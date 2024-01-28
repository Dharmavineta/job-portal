import React, { FC } from "react";
import ReactMarkdown from "react-markdown";

type props = {
  children: string;
};

const MarkdownComponent: FC<props> = ({ children }) => {
  return (
    <ReactMarkdown
      className={"space-y-3"}
      components={{
        ul: (props) => <ul className="list-inside  list-disc" {...props} />,
        a: (props) => (
          <a
            className="text-green-500 hover:underline"
            target="_blank"
            {...props}
          />
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
};

export default MarkdownComponent;
