import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../logo-melonn.png'
import '../Menu.css'

function Menu (props) {
  return(
    <div className="container-menu">
      <div className="subcontainer">
        <div className="logo">
          <img src={logo} alt="Melonn" />
        </div>
        <div className="actions">
          {props.externalPage
            ? <Link className="btn btn-purple" to={'/'}>&lt; Back to list Order</Link>
            : <button onClick={props.toggleContent} className="btn btn-purple">{props.backButton ? '< Back to list Order' : 'Create Order'}</button>
          }
        </div>
      </div>
    </div>
  )
}

export default Menu