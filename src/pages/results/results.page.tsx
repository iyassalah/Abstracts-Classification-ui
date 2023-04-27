import React, { useState } from "react";
import "./results.scss";
import { Select } from "antd";
import Abstract from "../../components/abstract/abstract";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IProps {}

const { Option } = Select;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Results = (props: IProps) => {
  const [array] = useState([
    { abstract: "the first abstract", tag: "Ai" },
    { abstract: "the second abstract", tag: "Chem" },
  ]);

  const [searchArray, setSearchArray] = useState(array);

  const handleSearch = (value) => {
    if (value === "None") {
      setSearchArray(array);
    } else {
      const filteredArray = array.filter((instance) => instance.tag === value);
      setSearchArray(filteredArray);
    }
  };

  return (
    <>
      <div className="container">
        <h1 className="header">Here are the results</h1>
        <Select
          showSearch
          placeholder="Select a tag"
          optionFilterProp="children"
          onChange={handleSearch}
          filterOption={(input, option) =>
            (option?.children as unknown as string)?.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Option value="None">None</Option>
          <Option value="Ai">Ai</Option>
          <Option value="Math">Math</Option>
          <Option value="Chem">Chem</Option>
        </Select>

        {searchArray.map((instance, index) => {
          return <Abstract value={instance} key={index} />;
        })}
      </div>
    </>
  );
};

export default Results;
