import { InputNumber, Space, Typography } from 'antd';
import { useContext, useMemo, useState } from 'react';
import { useClasses } from '../../api/classes';
import { ResultsContext } from '../../state/results';
import { IAbstract } from '../../types/shared';
import ResultsTable from './results-table.component';

const Results = () => {
  const { state, dispatch } = useContext(ResultsContext);
  const { classes } = useClasses();
  const [Threshhold, setThreshhold] = useState(0.9);
  const [ClassCount, setClassCount] = useState(3);

  const data: IAbstract[] = useMemo(() => state.fileList
    .map(file => ({
      abstract: file.response.inferred_abstract,
      author: 'Not available',
      title: file.name,

      labels: Object.entries(file.response.pred)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([name, prob]) => prob[0] > Threshhold)
        .map(([internalName]) => classes[internalName])
        .slice(0, ClassCount),
    })
    ), [state.fileList, Threshhold, ClassCount])

  return (
    <div className="container">
      <h1 className="header">Here are the results</h1>
      <Space style={{ paddingBottom: '12px' }}>
        <Typography.Text>
          Threshold:
        </Typography.Text>
        <InputNumber
          name='thresh'
          onBlur={e => setThreshhold(+e.target.value)}
          onPressEnter={e => setThreshhold(+e.currentTarget.value)}
          type='number'
          defaultValue={0.9}
          placeholder='0.9'
          min={0}
          max={1}
        />
        <Typography.Text>
          Max class count:
        </Typography.Text>
        <InputNumber
          name='count'
          onBlur={e => setClassCount(+e.target.value)}
          onPressEnter={e => setClassCount(+e.currentTarget.value)}
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
