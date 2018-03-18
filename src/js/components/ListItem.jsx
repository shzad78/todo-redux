import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ListItem extends Component {

  constructor() {
    super();
  }

  render() {
    let { listItem, index, id, removeListItem, completeListItem, shiftUpItem, shiftDownItem } = this.props;
    return (
      <tr>
        <td>{index}</td>
        <td className={listItem.completed ? "completed" : ""}>{listItem.itemValue}</td>
        <td>
          <button 
            className="btn btn-success"
            onClick={()=>completeListItem(index)}
          >
            Completed
          </button>
          <button 
            type="button" 
            className="btn btn-primary"
            onClick={()=>shiftUpItem(index)}
          >
            Shift <span className="glypicon glyphicon-menu-up"></span>
          </button>
          <button 
            type="button" 
            className="btn btn-primary"
            onClick={()=>shiftDownItem(index)}
          >
            Shift <span className="glypicon glyphicon-menu-down"></span>
          </button>
          <button
            className="btn btn-danger"
            onClick={()=>removeListItem(listItem.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

ListItem.propTypes = {
  listItem: PropTypes.element.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  removeListItem: PropTypes.func.isRequired,
  completeListItem: PropTypes.func.isRequired,
  shiftUpItem: PropTypes.func.isRequired,
  shiftDownItem: PropTypes.func.isRequired
}

export default ListItem;