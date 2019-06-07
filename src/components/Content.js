import React , { Component }  from 'react';
import Contacts from './Contacts';
import Message from './Message'

var emailvalidator = require("email-validator");
var phone = require('phone-regex');

class Content extends Component  {

    constructor () {
        super();
        this.state = {
            isEmailValid: { rep: false, style: {border: ''} },
            isNameValid:  { rep: false, style: {border: ''} },
            isPhoneValid: { rep: false, style: {border: ''} },
            name : '',
            email: '',
            phone: '',
            message : {
                type : -1,
                desc : ''
            },
            editMode: { rep: false , id: '' },
            data : [],
            dataToDisplay: [],
            show: false,
            totalPage: '',
            pageSlected: '',
            uri: 'https://guarded-springs-66217.herokuapp.com/'
        };
        this.deleteContactId = '';
        this.initialState = { ...this.state };
    }
    
    componentDidMount() {
        this.getContactData();
    }

    // Get contactData
    getContactData = async () => {
        const res = await fetch(this.state.uri+'getContacts');
        const contacts = await res.json();
        // Prepare initial data to display
        let tmp = [];
        contacts.forEach( (el , index) => {
            if (index < 4 ) { tmp.push(el) }
        });
        this.setState({ data : contacts ,
            totalPage: this.page(contacts) ,
            dataToDisplay: tmp ,
            pageSlected: 1
        }); 
    }

    page = (data) => {
        if ( (data.length % 4) === 0) {
            return (parseInt(data.length / 4));
        } else {
            return (parseInt(data.length / 4) + 1);
        }
    }

    next = () => {
        let reqPage = (parseInt(this.state.pageSlected) + 1) < this.state.totalPage ? 
                      (parseInt(this.state.pageSlected) + 1): this.state.totalPage;
            this.dataToDisplayByPage(reqPage);
    }

    previous = () => {
        let reqPage = (parseInt(this.state.pageSlected) - 1) > 1 ? 
        (parseInt(this.state.pageSlected) - 1): 1;
        this.dataToDisplayByPage(reqPage);
    }

    dataToDisplayByPage = (page) => {
        let min = (page*4) - 4;
        let max = (page*4);
        let result = [];
        this.state.data.forEach( (el,index) => {
            if (index >= min && index < max) {
                result.push(el);
            }
        });
        this.setState({
            dataToDisplay: result,
            pageSlected: page
        });
    }

    orderAsc = () => {
        let result = [];
        result = this.state.dataToDisplay;
        result.sort( (a , b ) => {
            let nameA= a.name.toUpperCase();
            let nameB= b.name.toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
        });
        this.setState({
            dataToDisplay: result
        });
    }

    orderDesc = () => {
        let result = [];
        result = this.state.dataToDisplay;
        result.sort( (a , b ) => {
            let nameA= a.name.toUpperCase();
            let nameB= b.name.toUpperCase();
            if (nameA > nameB) {
                return -1;
            }
        });
        this.setState({
            dataToDisplay: result
        });
    }

    // Create new contact
    createNewContact = ( name , email , phone ) => {
        let url = this.state.uri+'addContact';
        let data = { name: name, 
                     email: email,
                     phone: phone };
        fetch( url, {
            method: 'POST', // or 'PUT' or 'PATCH' or 'DELETE'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then( response => {
            if ( response.status === 200 ) {
                this.setState( this.initialState );
                this.setState({
                    message : { type: 1  , desc: 'Your contact have been successfully added' }
                });
                this.getContactData();
            }
        })
        .catch(error => console.error('Error:', error));
    }

    // Edit a contact
    confirmEditContact = ( name , email , phone , id ) => {
        let url = this.state.uri+'editContact';
        let data = { name: name, 
                     email: email,
                     phone: phone ,
                     id : id };
        fetch( url, {
            method: 'PUT', // or 'PUT' or 'PATCH' or 'DELETE'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then( response => {
            if ( response.status === 200 ) {
                this.setState( this.initialState );
                this.setState({
                    message : { type: 1  , desc: 'Your contact have been successfully edited' }
                });
                this.getContactData();
            }
        })
        .catch(error => console.error('Error:', error));
    }

    // Handle input changes in the form. 
    handleInputEvent = (event) => {
        const target  = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
           [name] : value,
           message : { type: -1  , desc: '' }
        });
    }
    
    // Cancel action 
    cancel = (e) => {
        e.preventDefault();
        this.setState({
            isEmailValid: { rep: false, style: {border: ''} },
            isNameValid:  { rep: false, style: {border: ''} },
            isPhoneValid: { rep: false, style: {border: ''} },
            name : '',
            email: '',
            phone: '',
            message : {
                type : -1,
                desc : ''
            },
            editMode: { rep: false , id: '' }
        });
        this.getContactData();
    }
    
    validate = (e) => {
        e.preventDefault();
        // Validate all the form data and set input box error style if any
        const nameValid = ( this.state.name.length >= 3 && this.state.name.length <= 30 ) ? true : false; 

        if (nameValid) {
            this.setState({ isNameValid: { rep: nameValid , style: { border: ''} } });
        } else {
            this.setState({ isNameValid: { rep: nameValid , style: { border: '1px solid #ba2629'} } });
        }

        const emailValid = emailvalidator.validate(this.state.email) ? true: false;

        if (emailValid) {
            this.setState({ isEmailValid: { rep: emailValid , style: { border: ''} } });
        } else {
            this.setState({ isEmailValid: { rep: emailValid , style: { border: '1px solid #ba2629'} } });
        }

        const phoneValid = phone().test(this.state.phone) ? true: false;

        if (phoneValid) {
            this.setState({ isPhoneValid: { rep: phoneValid , style: { border: ''} } });
        } else {
            this.setState({ isPhoneValid: { rep: phoneValid , style: { border: '1px solid #ba2629'} } });
        }
        
        if (nameValid && emailValid && phoneValid) {
            // On edit mode
            if (this.state.editMode.rep) {
                this.confirmEditContact( this.state.name , this.state.email , this.state.phone , this.state.editMode.id );
            } else { // Adding new contact to the existing list
                this.createNewContact(this.state.name , this.state.email , this.state.phone );
            }
        } else {
            this.setState({
                message : { type: 0  , desc: 'Your form is invalid , please check field(s) for error(s)' }
            });
        }
    }

    // Delete contact action 
    deleteContact = ( id ) => {
        this.deleteContactId = id;
    }

    // Delete contact action 
    confirmDeleteContact = () => {
        this.setState({
            message : { type: -1  , desc: '' }
        });
        let url = this.state.uri+'deleteContact';
        let data = { id : this.deleteContactId };
        fetch( url, {
            method: 'DELETE', // or 'PUT' or 'PATCH' or 'DELETE'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then( response => {
            if ( response.status === 200 ) {
                this.setState( this.initialState );
                this.setState({
                    message : { type: 1  , desc: 'Your contact have been deleted successfully' }
                });
                this.getContactData();
            }
        })
        .catch(error => console.error('Error:', error));
    }

    // Edit contact action
    editContact = ( id ) => {
        this.setState({
            message : { type: -1  , desc: '' },
            isEmailValid: { rep: false, style: { border: '' } },
            isNameValid:  { rep: false, style: { border: '' } },
            isPhoneValid: { rep: false, style: { border: '' } }
        });

        this.state.data.map( el => {
            if ( el.id === id ) { 
                 this.setState({
                     name : el.name,
                     email: el.email,
                     phone: el.phone,
                     editMode: { rep: true , id: id }
                 });
            }
        });
    }


    render() {

        const tabStyle = { marginTop: '10px', marginBottom: '10px'};
        const buttonSubmitStyle = { marginLeft: '10px'};
        const buttonGrpStyle = { float: 'right' };
        const submitButttontextValue = (this.state.editMode.rep === false)? 'Add Contact' : 'Edit Contact';
        const modelDelButStyle = { width: '120px' }; 
        const modelCancelButStyle = { width: '120px' , backgroundColor: '#dc3545', borderColor: '#dc3545' };

        return  ( 
            <div className="Content">
               <Message message = { this.state.message } ></Message>
                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Confirm</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete this contact?
                        </div>
                        <div className="modal-footer">
                            <button type="button" 
                                    style={ modelCancelButStyle }
                                    className="btn btn-secondary" 
                                    data-dismiss="modal">Cancel</button>
                            <button type="button" 
                                    data-dismiss="modal"
                                    style={ modelDelButStyle }
                                    onClick={ this.confirmDeleteContact }
                                    className="btn btn-primary">Delete</button>
                        </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row" style={ tabStyle } >
                        <div className="col-sm-6" style={ tabStyle } >
                            <form onSubmit={ this.validate }>
                                <div className="card">
                                    <div className="card-header">
                                        Add Contact
                                    </div>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="name"><span className="required">*</span>Name</label>
                                            <input type="text" 
                                                className="form-control" 
                                                style = { this.state.isNameValid.style }
                                                value={ this.state.name }
                                                onChange={ this.handleInputEvent }
                                                name="name"
                                                placeholder="Name"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email"><span className="required">*</span>Email Address</label>
                                            <input type="text" 
                                                className="form-control" 
                                                style = { this.state.isEmailValid.style }
                                                value={ this.state.email }
                                                onChange={ this.handleInputEvent }
                                                name="email" 
                                                placeholder="Email Address"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="phone"><span className="required">*</span>Phone</label>
                                            <input type="text" 
                                                className="form-control"
                                                style = { this.state.isPhoneValid.style }
                                                value={ this.state.phone } 
                                                onChange={ this.handleInputEvent }
                                                name="phone" 
                                                placeholder="Phone"/>
                                        </div>
                                        <div className="buttonGrp" style={ buttonGrpStyle }>
                                            <button type="submit" 
                                                    onClick={ this.cancel } 
                                                    className="btn btn-danger">Cancel</button>
                                            <button type="submit" 
                                                    onClick={ this.validate }
                                                    className="btn btn-primary" 
                                                    style={ buttonSubmitStyle }>{ submitButttontextValue  }</button>
                                        </div>
                                    </div>
                                </div>
                            </form>  
                        </div>
                        <div className="col-sm-6">
                            <Contacts   contacts={ this.state.dataToDisplay } 
                                        totalPage={ this.state.totalPage }
                                        pageSlected={ this.state.pageSlected }
                                        editContact={ this.editContact } 
                                        next = { this.next }
                                        previous={ this.previous }
                                        orderAsc= { this.orderAsc }
                                        orderDesc= {this.orderDesc }
                                        deleteContact= { this.deleteContact }></Contacts>
                        </div>
                    </div> 
                    
                    </div>
            </div>
        );
    }
}

export default Content;

