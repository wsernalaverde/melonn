import React, { Component, Fragment } from 'react'
import Alert from '@material-ui/lab/Alert'

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      store: '',
      externalOrderNumber: '',
      buyerName: '',
	    buyerPhone: '',
	    buyerEmail: '',
	    shippingAddress: '',
	    shippingCity: '',
	    shippingRegion: '',
	    shippingCountry: '',
	    shippingMethod: {},
      showSuccess: false,
      shippingMethods: [],
      lineItems: [{
        productName: '',
        productQty: '',
        productWeight: ''
      }]
    }
  }

  componentDidMount () {
    this.getShippingMethods()
  }

  getShippingMethods = () => {
    const url = `${process.env.REACT_APP_URL_SERVICE}/getShippingMethods`

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({ 
          shippingMethods: res.data,
          shippingMethod: { id: res.data[0].id, name: res.data[0].name }
        }) 
      })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const data = {...this.state}

    delete data.showSuccess
    delete data.shippingMethods

    const url = `${process.env.REACT_APP_URL_SERVICE}/addSellOrder`

    try {

      let res = await fetch(url, {
        method: 'post',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (res.ok) {
        res = await res.json()

        this.setState({
          showSuccess: 'success',
          store: '',
          externalOrderNumber: '',
          buyerName: '',
          buyerPhone: '',
          buyerEmail: '',
          shippingAddress: '',
          shippingCity: '',
          shippingRegion: '',
          shippingCountry: '',
          lineItems: [{
            productName: '',
            productQty: '',
            productWeight: ''
          }]  
        })

        setTimeout(() => { 
          this.setState({
            showSuccess: false
          })
          this.props.goList()
        }, 1000)

      } else {
        let err = new Error()
        err.data = await res.json()
        throw err
      }

    } catch (e) {
      console.log(e.data)
      this.setState({
        showSuccess: 'error'
      })
      setTimeout(() => { this.setState({
        showSuccess: false
      })}, 2000)
    }
  }

  handleInputChange = (e) => {
    e.preventDefault()
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSelect = (e) => {
    e.preventDefault()
    this.setState({
      shippingMethod: {
        id: e.target.value,
        name: e.target[e.target.value - 1].innerHTML
      }
    })
  }

  handleInputProduct = (e, index) => {
    const list = [...this.state.lineItems]
    list[index][e.target.name] = e.target.value

    this.setState({
      lineItems: list
    })
  }

  handleAddInputProduct = () => {
    const list = [...this.state.lineItems, { productName: '', productQty: '', productWeight: ''}]
    this.setState({
      lineItems: list
    })
  }

  render () {
    return(
      <Fragment>
        {this.state.showSuccess === 'success' &&
            <Alert variant="filled" severity="success">
              Order created
            </Alert>
        }
        {this.state.showSuccess === 'error' &&
            <Alert variant="filled" severity="error">
              Error to create Order, validate all fields and try again
            </Alert>
        }
       
        <form className="custom-form" onSubmit={this.handleSubmit}>
          <div className="row-form">
            <div className="form-group">
              <input type="text" value={this.state.store} className="form-control" placeholder="Seller store" name="store" onChange={this.handleInputChange} required />
            </div>
            <div className="form-group">
              <input type="text" value={this.state.externalOrderNumber} className="form-control" placeholder="External order number" name="externalOrderNumber" onChange={this.handleInputChange} required />
            </div>
          </div>
          <div className="row-form">
            <div className="form-group">
              <input type="text" value={this.state.buyerName} className="form-control" placeholder="Buyer full name" name="buyerName" onChange={this.handleInputChange} required />
            </div>
            <div className="form-group">
              <input type="number" value={this.state.buyerPhone} className="form-control" placeholder="Buyer phone" name="buyerPhone" onChange={this.handleInputChange} required />
            </div>
          </div>
          <div className="row-form">
            <div className="form-group">
              <input type="email" value={this.state.buyerEmail} className="form-control" placeholder="Buyer email" name="buyerEmail" onChange={this.handleInputChange} required />
            </div>
          </div>
          <div className="row-form">
            <div className="form-group">
              <input type="text" value={this.state.shippingAddress} className="form-control" placeholder="Shipping address" name="shippingAddress" onChange={this.handleInputChange} required />
            </div>
            <div className="form-group">
              <input type="text" value={this.state.shippingCity} className="form-control" placeholder="Shipping city" name="shippingCity" onChange={this.handleInputChange} required />
            </div>
          </div>
          <div className="row-form">
            <div className="form-group">
              <input type="text" value={this.state.shippingRegion} className="form-control" placeholder="Shipping region" name="shippingRegion" onChange={this.handleInputChange} required />
            </div>
            <div className="form-group">
              <input type="text" value={this.state.shippingCountry} className="form-control" placeholder="Shipping country" name="shippingCountry" onChange={this.handleInputChange} required />
            </div>
          </div>
          <div className="row-form">
            <div className="form-group">
              <label>Shipping Method</label>
            </div>
          </div>
          <div className="row-form">
            <div className="form-group">
              <div className="cont-select"> 
                <select onChange={this.handleSelect}>
                  {
                    this.state.shippingMethods.map(item =>
                      <option key={item.id} value={item.id}>{item.name}</option>
                    )
                  }
                </select>
              </div>  
            </div>
          </div>
          <div className="row-form">
            <div className="form-group">
              <label>Line items</label>
            </div>
          </div>
          {
            this.state.lineItems.map((item, index) => 
              <div key={index} className="row-form">
                <div className="form-group">
                  <input type="text" value={this.state.lineItems[index].productName} className="form-control" placeholder="Product name" name="productName" onChange={e => this.handleInputProduct(e, index)} required />
                </div>
                <div className="form-group">
                  <input type="number" value={this.state.lineItems[index].productQty} className="form-control" placeholder="Product qty" name="productQty" onChange={e => this.handleInputProduct(e, index)} required />
                </div>
                <div className="form-group">
                  <input type="number" value={this.state.lineItems[index].productWeight} className="form-control" placeholder="Product weight" name="productWeight" onChange={e => this.handleInputProduct(e, index)} required />
                </div> 
              </div>
            )
          }
          <div className="btn-add-input"><input type="button" onClick={this.handleAddInputProduct} value="Add another product" /></div>
          <div className="row-form">
            <div className="form-group">
              <input type="submit" className="btn btn-lg btn-purple" value="Create Order"/>
            </div>
          </div>
        </form>
      </Fragment>
    )
  }
}

export default Form