import React, { useState } from 'react';
import './results.scss';
interface IProps { }
import Abstract from '../../components/abstract/abstract';
const Results = (props: IProps) => {
  const [focus, setFocus] = useState(true);
  const [array, setarray] = useState([{ "abstract": "the first abstract", "tag": "Ai" }, { "abstract": "the second abstract", "tag": "Chem" }]);
  const isfocus = (e) => {
    setFocus(current => !current);
  };
  const [searcharray, setsearcharray] = useState(array);
  

  const search = (e) => {
    
    const mageseeker: any = [];
    if (e.target.value === "None") {
      setsearcharray(array);
      return;
    }
    array.map((instance, index) => {

      if (instance.tag === e.target.value) {
        mageseeker.push(instance);
      }

    }

    )
    setsearcharray(mageseeker);
    

  };
  return (
    <>
      <div className="containeer">
        <h1 className="header">Here are the results</h1>
        <select onChange={search} name="cars" id="cars">
          <option value="None">None</option>
          <option value="Ai">Ai</option>
          <option value="Math">Math</option>
          <option value="Chem">Chem</option>
        </select>
       
        {searcharray.map((instance, index) => {

          return (
            
            <Abstract value={instance} key={index} />
          )
        }
        )}
      </div>

    </>
  )
}

export default Results;