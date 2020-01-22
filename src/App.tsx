import React from 'react';

import { TodoListContainer } from './containers/TodoList';
import { AddTodo } from './containers/AddTodo';
import { FavoritesContainer } from './containers/Favorites';

function App() {
  return (
    <div>
      <TodoListContainer />
      <AddTodo />
      <FavoritesContainer />
    </div>
  );
}

export { App };
