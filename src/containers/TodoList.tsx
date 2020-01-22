import React from 'react';

import {
  todoActions,
  withTodoStreams,
  RXState,
  RXActions,
} from '../observables/todo';
import { TodoContent } from '../components/TodoContent';

type Props = RXState & RXActions;

const actions = todoActions;

class TodoList extends React.Component<Props> {
  render() {
    const { todos, editTodo, removeTodo } = this.props;

    return (
      <div>
        {todos.map(todo => {
          const { id } = todo;

          return (
            <div key={id}>
              <TodoContent todo={todo} />
              <div>
                <button onClick={() => removeTodo(id)}>Remove</button>
                <button
                  onClick={() =>
                    editTodo({
                      id,
                      title: 'Edit',
                      content: String(Math.random()),
                    })
                  }
                >
                  Edit
                </button>
                {this.renderFavoriteButton(id)}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  renderFavoriteButton(taskID: number) {
    const { favorites, addFavorite, removeFavorite } = this.props;

    return favorites.includes(taskID) ? (
      <button onClick={() => removeFavorite(taskID)}>Remove favorite</button>
    ) : (
      <button onClick={() => addFavorite(taskID)}>Add favorite</button>
    );
  }
}

export const TodoListContainer = withTodoStreams(null, actions)(TodoList);
