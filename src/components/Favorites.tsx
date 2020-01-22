import React from 'react';

import { TodoContent } from './TodoContent';
import { Todo } from '../shared/types/models';

type Props = {
  todos: Todo[];
};

class Favorites extends React.Component<Props> {
  render() {
    const { todos } = this.props;

    return (
      <div>
        <h2>Favorites</h2>
        {todos.map(todo => (
          <TodoContent todo={todo} />
        ))}
      </div>
    );
  }
}

export { Favorites };
