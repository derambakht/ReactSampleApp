import React, { Component } from 'react'
import Select from 'react-select';
import { Redirect } from 'react-router-dom';

export default class ProductList extends Component {
    constructor() {
        super();
        this.state = {
            error:null,
            loadingData: true,
            products: [
                // { id: 1, productName: 'nokia 1200', categoryId: 1, categoryName: 'mobile', price: 15000 },
                // { id: 2, productName: 'lg 1200', categoryId: 2, categoryName: 'monitor', price: 55000 },
                // { id: 3, productName: 'samsung 1200', categoryId: 2, categoryName: 'monotir', price: 65000 },
            ],
            categories:[
                {value:1, label:'Mobile'},
                {value:2, label:'Tablet'},
                {value:3, label:'Keyboard'},
            ]
        };
        this.removeItem = this.removeItem.bind(this);
        this.addNewRow = this.addNewRow.bind(this);
        this.changeEditMode = this.changeEditMode.bind(this);
        this.saveItem = this.saveItem.bind(this);
        this.loadDataFromServer = this.loadDataFromServer.bind(this);

        this.serviceUrl = 'http://localhost:4373/api/product';
    }
    loadDataFromServer(){
        this.setState({loadingData: true });
        const token = window.localStorage.getItem('token');

        fetch(this.serviceUrl,{
            headers: {
                "Authorization": "Bearer " + token,
            }
        })
         .then(response => response.json() 
         //{
        //      if(response.status == 401){
        //          window.localStorage.removeItem('token');
        //      }
        //      if(response.status < 400) {(response.json())} else {
        //          this.setState({error:response.statusText});
        //      }
        //         }    
                )
        .then(data => {
            window.console.log('data');
            window.console.log(data);
            if(!this.state.error) {
                window.console.log('data');
                window.console.log(data);
            this.setState({ products: data, loadingData: false }) } }
        ).catch((err) => {  window.console.log('my exception message'); window.console.log(err);})
    }
    componentWillMount() {
       this.loadDataFromServer();
    }
    saveItem(id, index) {
        //window.console.log(this.refs.categoryId);
        //window.console.log(this.refs.categoryId.state.value.value);
        //window.console.log(this.refs.categoryId.state.value.label);
        //return;

        let item = {};
        item.id = id;
        item.productName = this.refs.productName.value;
        item.categoryId = this.refs.categoryId.state.value.value;
        item.categoryName = this.refs.categoryId.state.value.label;
        item.price = this.refs.price.value;

        if(id)
        {
            //edit data
            this.updateItem(item);
        } else{
            //insert data
            this.insertItem(item);
        }
        //let temp = this.state.products;
        // temp[index].productName = this.refs.productName.value;
        // temp[index].categoryId = this.refs.categoryId.value;
        // temp[index].price = this.refs.price.value;
        // temp[index].editMode = false;
        // this.setState({ products: temp });
    }
    insertItem(item){
        fetch(this.serviceUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(item), 
        })
        .then(response => response.json())
        .then(data => this.loadDataFromServer());
    }
    updateItem(item){
        fetch(this.serviceUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(item), 
        })
        .then(response => response.json())
        .then(data => this.loadDataFromServer());
    }
    changeEditMode(index) {
        let temp = this.state.products;
        temp[index].editMode = !temp[index].editMode;
        this.setState({ products: temp });
    }
    addNewRow() {
        let temp = this.state.products;
        let newItem = { productName: 'new item', editMode: true };
        temp.push(newItem);
        this.setState({ products: temp });
    }
    removeItem(id, index) {
        if (!window.confirm('are you sure remove item?')) {
            return;
        }
        //delete from server
        fetch(this.serviceUrl + '/' + id, {
            method: "DELETE", // *GET, POST, PUT, DELETE, etc.
            //mode: "cors", // no-cors, cors, *same-origin
            //cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            //credentials: "same-origin", // include, same-origin, *omit
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                // "Content-Type": "application/x-www-form-urlencoded",
            },
            //redirect: "follow", // manual, *follow, error
            //referrer: "no-referrer", // no-referrer, *client
            //body: JSON.stringify(note), // body data type must match "Content-Type" header
        })
        .then(response => response.json())
        .then(data => this.loadDataFromServer());

        // let temp = this.state.products;
        // temp.splice(index, 1);
        // this.setState({ products: temp });
    }
    generateDisplayRow(item, index) {
        return (
            <tr>
                <td>{item.id}</td>
                <td>{item.productName}</td>
                <td>{item.categoryName}</td>
                <td>{item.price}</td>
                <td>
                    <div className="btn-group">
                        <button className="btn btn-primary btn-sm" onClick={() => this.changeEditMode(index)}>
                            <i className="fa fa-edit"></i>
                        </button>
                        <button className="btn btn-danger btn-sm" onClick={() => this.removeItem(item.id, index)}>
                            <i className="fa fa-remove"></i>
                        </button>
                    </div>
                </td>
            </tr>
        );
    }
    generateEditableRow(item, index) {
        return (
            <tr>
                <td>{item.id}</td>
                <td>
                    <input defaultValue={item.productName} className="form-control" ref="productName" />
                </td>
                <td>
                <Select ref="categoryId" defaultValue={this.state.categories.find(cat =>cat.value == item.categoryId)}
                        options={this.state.categories}
                    />                    
                </td>
                <td>
                    <input defaultValue={item.price} className="form-control" ref="price" />
                </td>
                <td>
                    <div className="btn-group">
                        <button className="btn btn-success btn-sm" onClick={() => this.saveItem(item.id, index)}>
                            <i className="fa fa-save"></i>
                        </button>
                        <button className="btn btn-warning btn-sm" onClick={() => this.changeEditMode(index)}>
                            <i className="fa fa-times"></i>
                        </button>
                    </div>
                </td>
            </tr>
        );
    }
    render() {
        if(this.state.error){
            // return (<Router ><Link to="/asdf" /></Router>);
            return(
                <Redirect to='/login' />
            )
        }
        return (
            <div className="container">
                <div className="text-left">
                    <button className="btn btn-dark" onClick={this.addNewRow}>
                        <i className="fa fa-plus"></i>
                        Add New Row
                     </button>
                    <hr />
                </div>
                <table className="table table-striped table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Manage</th>
                        </tr>
                    </thead>
                  
                    {this.state.loadingData ?
                        <tfoot>
                            <tr>
                                <th colSpan="5">
                            <div>
                                <i className="fa fa-spin fa-spinner fa-2x"></i>
                                loading data...
                              
                        </div>
                        </th>
                                </tr>
                      </tfoot>
                        :
                        <tbody>
                            {/* {this.state.products.map(this.generateDisplayRow)} */}
                            {this.state.products.map((product, index) =>
                                product.editMode ?
                                    this.generateEditableRow(product, index) :
                                    this.generateDisplayRow(product, index))}
                                    </tbody>
                    }
                  
                </table>
            </div>
                );
            }
}