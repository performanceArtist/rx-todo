import { BehaviorSubject } from 'rxjs';

import { Todo } from '../../shared/types/models';

import { actions as favoritesActions } from './favorites$';

export const todo$ = new BehaviorSubject<Todo[]>([]);

export const actions = {
  addTodo: (todo: Todo) => todo$.next(todo$.getValue().concat(todo)),
  editTodo: (changed: Todo) => todo$.next(todo$.getValue().map(
    todo => todo.id === changed.id
      ? changed
      : todo
    )
  ),
  removeTodo: (id: number) => {
    todo$.next(todo$.getValue().filter(todo => todo.id !== id));
    favoritesActions.removeFavorite(id);
  }
}
