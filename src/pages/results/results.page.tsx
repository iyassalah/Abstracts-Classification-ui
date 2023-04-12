import React, { useState } from 'react';
import './results.scss';
interface IProps { }
import Abstract from '../../components/abstract/abstract';
const Results = (props: IProps) => {
    const arr = ["asdfasdf", "asdf rewrefqerg erwg eg eg ew", "efwg etg tegwv tewgtrgt", "sd gdf sgf sdfg sdg dfg dssdg gd p", "adsf adsf sdadfsgdfgdsdgdssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssheiuokf hiupfgh rpiuokg hrp"]
    const [focus, setFocus] = useState(true);
    const isfocus = (e) => {
        setFocus(current => !current);
    };


    return (
        <>

            <div className="containeer">





                <h1 className="header">Here are the results</h1>
                {arr.map((instance, index) => {
                    console.log(instance, index);
                    return (
                        <Abstract value={instance} key={index} />
                    )
                }

                )};
            </div>

        </>
    )
}

export default Results;
