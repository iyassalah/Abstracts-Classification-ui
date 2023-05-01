import React, { useState } from "react";
import "./interactive.scss";
import { Button, Input, Tag } from "antd";


const Interactive = () => {
  const [abstract, setAbstract] = useState("");
  const [tagList, setTagList] = useState([]);

  const handleClassify = async () => {
    const response = await fetch("http://localhost:8000/interactive", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        abstract,
      }),
    });

    const data = await response.json();
    console.log(data.categories);

    // Update tagList state with response data
    setTagList(data.categories);
  };

  return (
    <>
      <div className="container">
        <div className="text">Enter the abstract you want to classify:</div>

        <div className="input-container">
          <Input.TextArea
            className="input"
            placeholder="Type your abstract here"
            value={abstract}
            onChange={(e) => setAbstract(e.target.value)}
          />
          <div className="underline"></div>
        </div>

        <div className="bottom-row">
          <Button size="large" className="" type="primary" onClick={handleClassify}>
            Classify
          </Button>
          <div className="tags-column">
            <div className="tags-label">Predicted Tags:</div>
            {tagList.map((tag) => (
              <Tag className="tag" key={tag}>{tag}</Tag>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Interactive;
