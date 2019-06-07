import React from 'react';

const Contacts = ({ contacts , 
                    deleteContact , 
                    editContact , 
                    totalPage , 
                    pageSlected ,
                    orderAsc,
                    orderDesc, 
                    next , 
                    previous }) => {

  const style = { margin: '10px'};
  const plusButtonStyle = { marginRight: '5px'};
  const trashButtonStyle = { marginLeft: '10px' , color: '#dc3545' };
  const editButtonStyle = { color: '#007bff' , position: 'relative', top: '1px' };
  const tabStyle = { marginTop: '10px', marginBottom: '10px'};
  const buttonGrpStyle = { float: 'right' };

  const display = contacts.length === 0? { display: 'none' } : { display: 'block' };
  const pagination = { float: 'right' };
  const test = '<';
  const sortAscStyle = { fontSize: '20px' };
  const sortDescStyle = { fontSize: '20px' };

  const result =  contacts.map( (el,index) => {
    return (
        <div className="card" style={ style } key={ index } >
            <div className="card-body">
                <i className="fa fa-user"  style={ plusButtonStyle } ></i> { el.name }
                <div className="btnGrp" style={ buttonGrpStyle }>
                    <i className="fa fa-edit" onClick={ () => editContact(el.id) } style={ editButtonStyle }></i>
                    <i className="fa fa-trash"  
                    data-toggle="modal" data-target="#exampleModal"
                    onClick={ ()=> deleteContact(el.id) } style={ trashButtonStyle } ></i>
                </div>
                <p className="card-text">
                    <i className="fa fa-envelope"  style={ plusButtonStyle } ></i> { el.email }
                    <br/>
                    <i className="fa fa-phone"  style={ plusButtonStyle } ></i> { el.phone }
                </p>
            </div>
        </div>
    )
  });
  
  return (
    <div className="Message" style={ display }>
        <div className="card" style={ tabStyle }>
            <div className="card-header">
                Contact List   
                <div className="btnGrp" style={ buttonGrpStyle }>
                   Order: <a href="#"><i className="fas fa-sort-alpha-down" 
                                         onClick={ orderAsc } 
                                         style={ sortAscStyle }></i></a> - 
                          <a href="#"><i className="fas fa-sort-alpha-up" 
                                         onClick={ orderDesc } 
                                         style={ sortDescStyle } ></i></a>
                </div>
            </div>
            { result }
        </div>
        <nav aria-label="..." style={ pagination }>
            <ul className="pagination">
                <li className="page-item">
                <a className="page-link" href="#" onClick={ previous }  > { test }</a>
                </li>
                <li className="page-item active" aria-current="page">
                <a className="page-link" href="#">{ pageSlected }/{ totalPage }<span className="sr-only">(current)</span></a>
                </li>
                <li className="page-item">
                <a className="page-link" href="#" onClick={ next }> > </a>
                </li>
            </ul>
        </nav>
    </div>
  );
}

export default Contacts;
