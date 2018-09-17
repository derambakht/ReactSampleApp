import React, { Component } from 'react'
import Note from './Note'
import { Card } from 'semantic-ui-react'

export default class NoteContainer extends Component {
    constructor() {
        super();
        this.state = {
            Notes: [
                { title: 'My Note 1', body: 'aaaaaa' },
                { title: 'My Note 2', body: 'bbbbbb' },
                { title: 'My Note 3', body: 'cccccc' },
                { title: 'My Note 4', body: 'dddddd' }
            ]
        };

        //this.generateNote = this.generateNote.bind(this);
        this.addItem = this.addItem.bind(this);
    }
    generateNote(item, i) {
        return (
            <Note title={item.title} body={item.body} />
        );
    }

    addItem() {
        let newNote = { title: 'new note', body: 'new note body' };

        let temp = this.state.Notes;
        temp.push(newNote);

        this.setState({ Notes: temp });
    }

    render() {
        return (
            <Card.Group>
              {this.state.Notes.map(this.generateNote)}
                
              
            </Card.Group>
            // <div>
            //     <div>
            //         {this.state.Notes.map(this.generateNote)}
            //         {/* <p></p> */}
            //     </div>
            //     <div>
            //         <button className="btn btn-dark btn-lg" onClick={this.addItem}>
            //             <i className="fa fa-plus fa-2x"></i>
            //         </button>
            //     </div>
            // </div>
        )
    }
}
