/*
 * @Author: d12mnit
 * @Date:   2016-05-11 14:00:32
 * @Last Modified by:   d12mnit
 * @Last Modified time: 2016-05-11 20:40:35
 */
'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var TodoModel = require('./todoModel.js');

var ENTER_KEY = 13;

var todos = new TodoModel('todo-react');
var TodoApp = React.createClass({
    getInitialState: function () {
        return {
            newTodo: ''
        }
    },
    handleChange: function (event) {
        this.setState({newTodo: event.target.value});
    },
    handleSubmit: function (event) {
        if(event.keyCode !== ENTER_KEY)
            return;
        event.preventDefault();
        var todoName = this.state.newTodo.trim();
        if (todoName){
            this.props.model.addTodo(todoName);
            this.setState({newTodo: ''})
        }
    },
    render: function() {
        var main;
        var footer;
        var todos = this.props.model.todos;

        main = (
            <TodoItem list={todos}/>
        );
        return (
            <div>
                <header className="header">
                    <h1>Todos</h1>
                    <input
                        className="new-todo"
                        placeholder="What needs to be done?"
                        value={this.state.newTodo}
                        onChange={this.handleChange}
                        onKeyDown={this.handleSubmit}
                        autoFocus={true}
                    />
                </header>
                {main}
                {footer}
            </div>
        );
    }
});
function render () {
    ReactDOM.render(
        <TodoApp model={todos}/>,
        document.querySelector('#app-wrap')
    );
}
todos.subscribe(render);
render();