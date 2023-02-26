import React from 'react';
import './navbar.scss';
import {Link} from 'react-router-dom';
interface IProps { }

const Navbar = (props: IProps) => {
    return (
        <>
       
        <div className="navbar">

          <div className="batch">

            <Link className="link" to="/batch">Batch</Link>

          </div>

          <div className="interactive">

          <Link className="link" to="/interactive">Interactive</Link>

          </div>

          <div className="results">

          <Link className="link" to="/results">Results</Link>

          </div>

        </div>
    
        </>
    )
}

export default Navbar;
