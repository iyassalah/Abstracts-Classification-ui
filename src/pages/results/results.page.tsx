import { InputNumber, Space, Typography } from 'antd';
import { useContext, useMemo } from 'react';
import { useClasses } from '../../api/classes';
import { ResultsContext } from '../../state/results';
import { IAbstract } from '../../types/shared';
import ResultsTable from './results-table.component';

const Results = () => {
  const { state, dispatch } = useContext(ResultsContext);
  const { thresh = 0.9, classCnt = 5 } = state.resultsPage;
  const { classes } = useClasses();

  const data: IAbstract[] = useMemo(() => {
    return state.fileList
      .map(file => ({
        abstract: file.response.inferred_abstract,
        author: 'Not available',
        title: file.name,

        labels: Object.entries(file.response.pred)
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .filter(([name, prob]) => prob > thresh)
          .sort((a, b) => b[1] - a[1])
          .slice(0, classCnt)
          .map(([internalName, prob]) => ({ label: classes[internalName], prob })),
      }))
  }, [state.fileList, thresh, classCnt])

  const updateThresh = (newThresh: number) => {
    if (newThresh < 0 || newThresh > 1 || isNaN(newThresh))
      return;
    dispatch({
      type: 'SET_UPDATE_FILTERS', filters: { thresh: newThresh }
    });
  }

  return (
    <div className="container">
      <h1 className="header">Here are the results</h1>
      <Space style={{ paddingBottom: '12px' }}>
        <Typography.Text>
          Threshold:
        </Typography.Text>
        <InputNumber
          name='thresh'
          onBlur={e => updateThresh(+e.target.value)}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onPressEnter={e => updateThresh(+(e.target as any)?.value ?? NaN)}
          type='number'
          defaultValue={thresh}
          placeholder='0.9'
          step={0.1}
          min={0}
          max={1}
        />
        <Typography.Text>
          Max class count:
        </Typography.Text>
        <InputNumber
          name='count'
          onBlur={e => dispatch({ type: 'SET_UPDATE_FILTERS', filters: { classCnt: +e.target.value } })}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onPressEnter={e => dispatch({ type: 'SET_UPDATE_FILTERS', filters: { classCnt: (e.target as any)?.value ?? 0 } })}
          placeholder='5'
          defaultValue={classCnt}
          min={0}
          max={Object.keys(state.classMapping ?? {}).length}
          parser={value => parseInt(value ?? '3')}
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
