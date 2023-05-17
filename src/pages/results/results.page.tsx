import React, { useContext } from 'react';
import ResultsTable from './results-table.component';
import { ResultsContext } from '../../state/results';
import { IAbstract } from '../../types/shared';
import { useClasses } from '../../api/classes';
import { Probabilities } from '../../types/responses';

const Results = () => {
  const { state, dispatch } = useContext(ResultsContext);
  const { classes } = useClasses();

  const predAlgo = (prob: Probabilities) => {
    return Object.entries(prob)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([name, prob]) => prob[0] > 0.9)
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
      <ResultsTable
        data={data}
        filters={state?.resultsPage}
        onFilter={filters => dispatch({ type: 'SET_UPDATE_FILTERS', filters })}
      />
    </div>
  );
};

export default Results;
