import React, { useContext } from 'react';
import ResultsTable from './results-table.component';
import { ResultsContext } from '../../state/results';
import { IAbstract } from '../../types/shared';

const Results = () => {
  const { state } = useContext(ResultsContext);
  const data: IAbstract[] = state.fileList.map(file => ({
    abstract: file.response.inferred_abstract,
    labels: Object.keys(file.response.pred).filter(label => file.response.pred[label][0] > 0.9),
    author: 'Not available',
    title: file.name,
  }))
  return (
    <div className="container">
      <h1 className="header">Here are the results</h1>
      <ResultsTable data={data} />
    </div>
  );
};

export default Results;
