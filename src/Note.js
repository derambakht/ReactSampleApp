import React, { Component } from 'react'
import { Button, Card } from 'semantic-ui-react'
export default class Note extends Component {
    constructor() {
        super();
        this.state = { editing: false };

        //bind
        this.changeEditMode = this.changeEditMode.bind(this);
    }

    changeEditMode() {
        //window.alert('click me');
        //this.setState({ editing: true });
        this.setState({ editing: !this.state.editing });
    }

    displayMode() {
        return (
                <Card>
                    <Card.Content>
                        <Card.Header>{this.props.title}</Card.Header>
                        <Card.Description>
                        {this.props.body}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <div className='ui two buttons' >
                            <Button basic color='green' onClick={this.changeEditMode} >
                                Edit
          </Button>
                            <Button basic color='red'>
                                Remove
          </Button>
                        </div>
                    </Card.Content>
                </Card>

            // <div className="note">
            //     <h3>{this.props.title}</h3>
            //     <p>{this.props.body}</p>
            //     <div className="toolbar">
            //         <button className="btn btn-primary btn-sm" onClick={this.changeEditMode} >
            //             <i className="fa fa-edit"></i>
            //         </button> |
            //   <button className="btn btn-danger btn-sm">
            //             <i className="fa fa-remove"></i>
            //         </button>
            //     </div>
            // </div>
        )
    }

    editMode() {
        return (
            <div className="note">
                Title :
          <input className="form-control" defaultValue={this.props.title} />
                Body :
          <textarea className="form-control">{this.props.body}</textarea>
                <div>
                    <button className="btn btn-success btn-sm"  >
                        <i className="fa fa-save"></i>
                    </button> |
              <button className="btn btn-warning btn-sm" onClick={this.changeEditMode}>
                        <i className="fa fa-times"></i>
                    </button>
                </div>
            </div>
        )
    }

    render() {
        if (this.state.editing) {
            return (this.editMode());
        } else {
            return (this.displayMode());
        }
    }
}
