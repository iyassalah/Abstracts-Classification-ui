import React from 'react';
import './interactive.scss';

interface IProps { }

const Interactive = (props: IProps) => {
    return (

        <>

            <div className="container">

                <div className="text">Enter the abstract you want to classify:</div>

                <div>  <textarea className="input"></textarea> </div>



                <input type="button" className="button" value="Classify"></input>




            </div>
        
        </>
    )
}

export default Interactive;
