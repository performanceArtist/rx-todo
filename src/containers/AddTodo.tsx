import React from 'react';

import { todoActions, withTodoStreams } from '../observables/todo';

const { addTodo } = todoActions;
const mapDispatch = { addTodo };

type Props = typeof mapDispatch;

class TodoPanel extends React.Component<Props> {
  render() {
    const { addTodo } = this.props;

    return (
      <div>
        <button
          type="button"
          onClick={() => {
            addTodo({ id: Math.random(), title: 'T', content: 'Test' });
          }}
        >
          Add
        </button>
      </div>
    );
  }
}

const container = withTodoStreams(null, mapDispatch)(TodoPanel);

export { container as AddTodo };
