import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import classnames from 'classnames';
import * as todoActions from '../actions/Todos';

import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentSave from 'material-ui/lib/svg-icons/content/save';
import ActionDelete from 'material-ui/lib/svg-icons/action/delete';
import ActionDone from 'material-ui/lib/svg-icons/action/done';
import EditorModeEdit from 'material-ui/lib/svg-icons/editor/mode-edit';
import Paper from 'material-ui/lib/paper';
import { colors } from '../constants/colors';

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
    this.changeRowColor = this.changeRowColor.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleEdit(e) {
    e.stopPropagation();
    const value = this.refs.todo.textContent;
    const index = this.props.index;
    this.props.actions.editToDo(value, index);
  }

  handleSave(e) {
    e.stopPropagation();
    const value = this.refs.edit.value;
    const index = this.props.index;
    if (value !== '') {
      if (e.type === 'keydown' && e.keyCode === 13) {
        this.props.actions.saveToDo(value, index);
      }
      if (e.type === 'mousedown') {
        this.props.actions.saveToDo(value, index);
      }
    }
  }

  handleDelete(e) {
    e.stopPropagation();
    const index = this.props.index;
    this.props.actions.deleteToDo(index);
  }

  handleComplete(e) {
    e.stopPropagation();
    const index = this.props.index;
    const value = this.refs.todo.textContent;
    this.props.actions.completeToDo(value, index);
  }

  handleClick(e) {
    e.stopPropagation();
  }

  changeRowColor() {
    const color = colors[Math.floor(Math.random() * colors.length)];
    this.props.actions.changeColor(color, this.props.index);
  }

  render() {
    const color = this.props.todo.color;
    const style = {
      width: 580,
      height: 70,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: color,
    };
    return (
      <li
        id={this.props.index}
        key={this.props.index}
        className="row"
        onMouseDown={this.changeRowColor}
      >
        <Paper className="paper" ref="rowPaper" style={style} zDepth={1} >
        { this.props.todo.isEditting ?
          <input
            ref="edit"
            className="edit"
            maxLength="55"
            defaultValue={this.props.todo.todo}
            onKeyDown={this.handleSave}
            onMouseDown={this.handleClick}
          />
          :
          <div
            ref="todo"
            className={classnames({
              todo: true,
              complete: this.props.todo.isComplete,
            })}
          >{this.props.todo.todo}</div>
          }
          <div className="buttons">
          { this.props.todo.isEditting ?
            <FloatingActionButton
              className="saveButton"
              backgroundColor="steelblue"
              onMouseDown={this.handleSave}
            >
              <ContentSave />
            </FloatingActionButton>
            :
            <FloatingActionButton
              className="editButton"
              backgroundColor="#3c763d"
              onMouseDown={this.handleEdit}
            >
              <EditorModeEdit />
            </FloatingActionButton>
            }
            {' '}
            <FloatingActionButton
              className="deleteButton"
              backgroundColor="#d81e05"
              onMouseDown={this.handleDelete}
              disabled={this.props.todo.isEditting}
            >
              <ActionDelete />
            </FloatingActionButton>
            <FloatingActionButton
              className="completeButton"
              backgroundColor="steelblue"
              onMouseDown={this.handleComplete}
              disabled={this.props.todo.isEditting}
            >
              <ActionDone />
            </FloatingActionButton>
          </div>
        </Paper>

      </li>
    );
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    actions: bindActionCreators(todoActions, dispatch),
  }
);

TodoItem.propTypes = {
  actions: PropTypes.object.isRequired,
  todo: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default connect(null, mapDispatchToProps)(TodoItem);
