import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import Abstract from "../../components/abstract/abstract";


const { Option } = Select;


//TODO: once the back-end is ready this comment code can be used to fetch the whole tages from the database.
// const Results = () => {
//   const [options, setOptions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchArray, setSearchArray] = useState([]);

//   useEffect(() => {
//     fetch('/tags')
//       .then(response => response.json())
//       .then(data => {
//         setOptions(data);
//         setLoading(false);
//       });
//   }, []);


const Results = () => {
  const [options] = useState([
    { value: 'Ai', label: 'Ai' },
    { value: 'Math', label: 'Math' },
    { value: 'Chem', label: 'Chem' },
  ]);

  const [loading] = useState(false);

  const [searchArray, setSearchArray] = useState([
    { abstract: 'the first abstract', tag: 'Ai' },
    { abstract: 'the second abstract', tag: 'Chem' },
  ]);

  const handleSearch = (value: string) => {
    if (value === 'None') {
      setSearchArray([
        { abstract: 'the first abstract', tag: 'Ai' },
        { abstract: 'the second abstract', tag: 'Chem' },
      ]);
    } else {
      const filteredArray = searchArray.filter(instance => instance.tag === value);
      setSearchArray(filteredArray);
    }
  };

  return (
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
        loading={loading}
      >
        <Option value="None">None</Option>
        {options.map(option => (
          <Option key={option.value} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>
      {searchArray.map((instance, index) => {
        return <Abstract value={instance} key={index} />;
      })}
    </div>
  );
};

export default Results;
