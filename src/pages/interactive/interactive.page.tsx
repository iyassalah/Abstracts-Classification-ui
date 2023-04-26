import React from "react";
import "./interactive.scss";

interface IProps {}

const Interactive = (props: IProps) => {
  return (
    <>
      <div className="container">
        <div className="text">Enter the abstract you want to classify:</div>

        <div className="input-container">
          <textarea
            className="input"
            placeholder="Type your abstract here"
          ></textarea>
          <div className="underline"></div>
        </div>

        <button className="button">Classify</button>
      </div>
    </>
  );
};

export default Interactive;
