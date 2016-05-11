webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/*
	 * @Author: d12mnit
	 * @Date:   2016-05-11 14:00:32
	 * @Last Modified by:   d12mnit
	 * @Last Modified time: 2016-05-11 20:40:35
	 */
	'use strict';

	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(33);
	var TodoModel = __webpack_require__(168);

	var ENTER_KEY = 13;

	var todos = new TodoModel('todo-react');
	var TodoApp = React.createClass({
	    displayName: 'TodoApp',

	    getInitialState: function () {
	        return {
	            newTodo: ''
	        };
	    },
	    handleChange: function (event) {
	        this.setState({ newTodo: event.target.value });
	    },
	    handleSubmit: function (event) {
	        if (event.keyCode !== ENTER_KEY) return;
	        event.preventDefault();
	        var todoName = this.state.newTodo.trim();
	        if (todoName) {
	            this.props.model.addTodo(todoName);
	            this.setState({ newTodo: '' });
	        }
	    },
	    render: function () {
	        var main;
	        var footer;
	        var todos = this.props.model.todos;

	        main = React.createElement(TodoItem, { list: todos });
	        return React.createElement(
	            'div',
	            null,
	            React.createElement(
	                'header',
	                { className: 'header' },
	                React.createElement(
	                    'h1',
	                    null,
	                    'Todos'
	                ),
	                React.createElement('input', {
	                    className: 'new-todo',
	                    placeholder: 'What needs to be done?',
	                    value: this.state.newTodo,
	                    onChange: this.handleChange,
	                    onKeyDown: this.handleSubmit,
	                    autoFocus: true
	                })
	            ),
	            main,
	            footer
	        );
	    }
	});
	function render() {
	    ReactDOM.render(React.createElement(TodoApp, { model: todos }), document.querySelector('#app-wrap'));
	}
	todos.subscribe(render);
	render();

/***/ },

/***/ 168:
/***/ function(module, exports, __webpack_require__) {

	/*
	 * @Author: d12mnit
	 * @Date:   2016-05-11 16:10:48
	 * @Last Modified by:   d12mnit
	 * @Last Modified time: 2016-05-11 20:16:08
	 */
	(function () {
	    'use strict';

	    var Utils = __webpack_require__(169);

	    var TodoModel = function (key) {
	        this.key = key;
	        this.todos = Utils.store(key);
	        this.onChange = [];
	    };
	    TodoModel.prototype.subscribe = function (f) {
	        this.onChange.push(f);
	    };
	    TodoModel.prototype.save = function () {
	        Utils.store(this.key, this.todos);
	        this.onChange.forEach(function (f) {
	            f();
	        });
	    };
	    TodoModel.prototype.addTodo = function (title) {
	        this.todos = this.todos.concat({
	            id: Utils.randomId(),
	            title: title,
	            isComplete: false
	        });
	        this.save();
	    };

	    module.exports = TodoModel;
	})();

/***/ },

/***/ 169:
/***/ function(module, exports) {

	/*
	 * @Author: d12mnit
	 * @Date:   2016-05-11 15:37:27
	 * @Last Modified by:   d12mnit
	 * @Last Modified time: 2016-05-11 19:56:43
	 */
	(function () {
	    'use strict';

	    var Utils = {
	        randomId: function () {
	            var random;
	            var id = '';

	            for (var i = 0; i < 32; i++) {
	                random = Math.random() * 16 | 0;
	                if (i === 8 || i === 12 || i === 16 || i === 20) {
	                    id += '-';
	                }
	                id += (i === 12 ? 4 : i === 16 ? random & 3 | 8 : random).toString(16);
	            }
	            return id;
	        },
	        pluralize: function (count, word) {
	            return count === 1 ? word : word + 's';
	        },
	        store: function (key, value) {
	            if (value) {
	                return localStorage.setItem(key, JSON.stringify(value));
	            }
	            var store = localStorage.getItem(key);
	            return store && JSON.parse(store) || [];
	        },
	        extends: function () {
	            var newObj = {};
	            for (var i = 0; i < arguments.length; i++) {
	                var obj = arguments[i];
	                for (var key in obj) {
	                    if (obj.hasOwnProperty(key)) {
	                        newObj[key] = obj[key];
	                    }
	                }
	            }
	            return newObj;
	        }
	    };
	    module.exports = Utils;
	})();

/***/ }

});