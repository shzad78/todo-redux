import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { 
  addListItemAction, 
  removeListItemAction, 
  inputValueAction, 
  completeListItemAction,
  shiftUpItemAction,
  shiftDownItemAction
} from '../actions'
import ListItem from './ListItem';

class App extends Component {

  constructor() {
    super();
    this.changeHandler = this.changeHandler.bind(this);
    this.addListItem = this.addListItem.bind(this);
    this.removeListItem = this.removeListItem.bind(this);
    this.completeListItem = this.completeListItem.bind(this);
    this.shiftUpItem = this.shiftUpItem.bind(this);
    this.shiftDownItem = this.shiftDownItem.bind(this);
  }

  changeHandler(e) {
    let { inputValue, inputValueAction } = this.props;
    inputValue = e.target.value;
    inputValueAction(inputValue);
  }

  addListItem(e) {
    e.preventDefault();
    let { listItems, inputValue, addListItemAction, inputValueAction } = this.props;
    var item = {
      id: Math.random(),
      itemValue: inputValue,
      completed: false
    };
    listItems = listItems.concat(item);
    addListItemAction(listItems);
    inputValueAction('');
  }

  removeListItem(id) {
    let { listItems, removeListItemAction } = this.props;
    listItems = listItems.filter((item) => {
      return item.id !== id;
    });
    removeListItemAction(listItems);
  }

  completeListItem(index) {
    let { listItems, completeListItemAction } = this.props;
    listItems[index].completed = !listItems[index].completed;
    listItems = [...listItems];
    completeListItemAction(listItems);
  }

  shiftUpItem(index) {
    let { listItems, shiftUpItemAction } = this.props;
    if(!index) {
      return null;
    } else {
      listItems = [...listItems];
      var temp = listItems.splice(index, 1);
      listItems.splice(index-1, 0, temp[0]);
    }
    shiftUpItemAction(listItems);
  }

  shiftDownItem(index) {
    let { listItems, shiftDownItemAction } = this.props;
    if(!index) {
      return null;
    } else {
      listItems = [...listItems];
      var temp = listItems.splice(index, 1);
      listItems.splice(index-1, 0, temp[0]);
    }
    shiftDownItemAction(listItems);
  }

  render() {
    let { listItems, inputValue } = this.props;
    const listItemComponents = listItems.map((item, index) => {
      return (
        <ListItem
          completeListItem={this.completeListItem}
          removeListItem={this.removeListItem}
          shiftUpItem={this.shiftUpItem}
          shiftDownItem={this.shiftDownItem}
          listItem={item}
          key={index}
          index={index}
        />
      );
    });

    return (
      <div className="container app">
        <h1>ToDo List with React-Redux framework</h1>
        <hr />
        <form>
          <div className="form-group">
            <label htmlFor="list-item-input">New ToDo Item</label>
            <input
              type="text"
              className="form-control"
              id="list-item-input"
              placeholder="Type your item"
              onChange={this.changeHandler}
              value={inputValue}
            />
          </div>
          <button
            type="submit"
            className="btn btn-default"
            onClick={this.addListItem}
          >
            Submit
          </button>
        </form>
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Items</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {listItemComponents}
          </tbody>
        </table>
      </div>
    );
  }
}

App.propTypes = {
  addListItemAction: PropTypes.func.isRequired,
  removeListItemAction: PropTypes.func.isRequired,
  inputValueAction: PropTypes.func.isRequired,
  completeListItemAction: PropTypes.func.isRequired,
  shiftUpItemAction: PropTypes.func.isRequired,
  shiftDownItemAction: PropTypes.func.isRequired,
  listItems: PropTypes.array.isRequired,
  inputValue: PropTypes.string.isRequired,
}

function mapStateToProps(state) {
  return {
    listItems: state.list.listItems,
    inputValue: state.list.inputValue
  };
};

export default connect(mapStateToProps, { 
  addListItemAction, 
  removeListItemAction, 
  inputValueAction, 
  completeListItemAction,
  shiftUpItemAction,
  shiftDownItemAction 
})(App);