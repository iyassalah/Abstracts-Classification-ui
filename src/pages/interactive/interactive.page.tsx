import { Button, Input, Space, Tag, Typography } from "antd";
import axios from "axios";
import { useState } from "react";
import { Probabilities } from "../../types/responses";
import "./interactive.scss";


const Interactive = () => {
  const [abstract, setAbstract] = useState("");
  const [tagList, setTagList] = useState<Probabilities | null>(null);

  const handleClassify = async () => {
    try {
      const response = await axios.post<Probabilities>("/active/proba", {
        abstract,
      });

      const { data } = response;
      setTagList(data);
    } catch (error) {
      console.error(error);
    }
  };

  const tags = Object
    .entries(tagList ?? {})
    .filter(label => label[1] > 0.7)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4).map(([label, prob]) => (
      <Tag className="tag" key={label}>{`${label} (%${(prob * 100).toFixed(2)})`}</Tag>
    ));

  const predictions = (
    <Space className="tags-column">
      <Typography className="tags-label">Predicted Tags:</Typography>
      {tags}
    </Space>
  )

  return (
    <div className="container">
      <Typography.Title className="text">Enter the abstract you want to classify:</Typography.Title>

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
        <Button size="large" type="primary" onClick={handleClassify}>
          Classify
        </Button>
        {(tags.length === 0 && tagList !== null) && <Typography color="red">Could not identify any possible categories</Typography>}
        {tags.length && predictions}
      </div>
    </div>
  );
};

export default Interactive;
