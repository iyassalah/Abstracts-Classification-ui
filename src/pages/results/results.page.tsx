import React, { useContext } from 'react';
import ResultsTable from './results-table.component';
import { ResultsContext } from '../../state/results';

const Results = () => {
  const { state: { labelledPDFs } } = useContext(ResultsContext)

  return (
    <div className="container">
      <h1 className="header">Here are the results</h1>
      <ResultsTable />
    </div>
  );
};

export default Results;
