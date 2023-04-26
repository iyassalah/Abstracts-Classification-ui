import React from "react";
import "./batch.scss";

interface IProps {}

const Batch = (props: IProps) => {
  return (
    <>
      <div className="container">
        <div className="text">
          Enter the file that contains the abstracts you want to classify:
        </div>

        <div className="buttons">
          <input type="button" className="button" value="Upload file"></input>
          <input type="button" className="button" value="Classify"></input>
        </div>
      </div>
    </>
  );
};

export default Batch;
