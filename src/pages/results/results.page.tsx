import React, { useContext, useState } from 'react';
import ResultsTable from './results-table.component';
import { ResultsContext } from '../../state/results';
import { IAbstract } from '../../types/shared';
import { useClasses } from '../../api/classes';
import { Probabilities } from '../../types/responses';
import { Input, InputNumber, Space, Typography } from 'antd';

const Results = () => {
  const { state, dispatch } = useContext(ResultsContext);
  const { classes } = useClasses();
  const [Threshhold, setThreshhold] = useState(0.9);
  const [ClassCount, setClassCount] = useState(3);

  const predAlgo = (prob: Probabilities) => {
    return Object.entries(prob)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([name, prob]) => prob[0] > Threshhold)
      .map(([internalName]) => classes[internalName])
  }

  const data: IAbstract[] = state.fileList
    .map(file => ({
      abstract: file.response.inferred_abstract,
      labels: predAlgo(file.response.pred),
      author: 'Not available',
      title: file.name,
    }))

  return (
    <div className="container">
      <h1 className="header">Here are the results</h1>

      <Space>
        <Typography.Text>
          Threshold:
        </Typography.Text>
        <Input
          name='thresh'
          onBlur={e => setThreshhold(+e.target.value)}
          type='number'
          placeholder='0.9'
        />
        <Typography.Text>
          Max class count:
        </Typography.Text>
        <InputNumber
          name='count'
          onBlur={e => setClassCount(+e.target.value)}
          placeholder='5'
          step={1}
        />
      </Space>

      <ResultsTable
        data={data}
        filters={state?.resultsPage}
        onFilter={filters => dispatch({ type: 'SET_UPDATE_FILTERS', filters })}
      />
    </div>
  );
};

export default Results;
