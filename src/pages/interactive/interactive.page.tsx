import React from "react";
import "./interactive.scss";
import { Button, Input, Tag } from "antd";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IProps {}

const tagList = ["Math", "AI", "Chem"];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Interactive = (props: IProps) => {
  return (
    <>
      <div className="container">
        <div className="text">Enter the abstract you want to classify:</div>

        <div className="input-container">
          <Input.TextArea
            className="input"
            placeholder="Type your abstract here"
          />
          <div className="underline"></div>
        </div>

        <div className="bottom-row">
          <Button className="" type="primary">
            Classify
          </Button>
          <div className="tags-column">
            <div className="tags-label">Tags</div>
            {tagList.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Interactive;
