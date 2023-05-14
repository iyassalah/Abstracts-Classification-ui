import { Button } from "antd";
import { useContext } from "react";
import { ResultsContext } from "../../state/results";
import "./batch.scss";
import MultiUpload from "./multi-upload.component";
import { useNavigate } from "react-router-dom";
import useBlock from "../../hooks/block.hook";


const Batch = () => {
  const { state: { busy, fileList } } = useContext(ResultsContext);
  useBlock(busy, 'Your files are still uploading, sure you want to leave?');
  const navigate = useNavigate();
  const disableBtn = busy || fileList.length === 0;
  return (
    <div className="container">
      <Button className="results-btn" size="large" disabled={disableBtn} onClick={() => navigate('/results')}>
        See Results
      </Button>
      <MultiUpload />
    </div>
  );
};

export default Batch;
