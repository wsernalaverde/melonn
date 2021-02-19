import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import Menu from './components/Menu'
import Orders from './components/Orders'
import CreateOrder from './components/CreateOrder'
import OrderDetail from './components/OrderDetail'

class App extends Component {

  constructor(props){
    super(props)
    this.state = { showCreate: false }
  }

  toggleContent = () => {
    this.setState({
      showCreate: !this.state.showCreate
    })
  }

  render () {
    return (
      <Router>
        <Switch>
          <Route path="/order-datail/:id">
              <Menu externalPage = {true} />    
              <OrderDetail />
          </Route>
          <Route>
            <div className="App">
              <Menu toggleContent = {this.toggleContent} backButton = {this.state.showCreate} />    
              {
                (this.state.showCreate)?
                  <CreateOrder goList = {this.toggleContent} />
                :
                  <Orders />
              }
            </div>
          </Route>
        </Switch>

      </Router>
    )
  }
}

export default App;
