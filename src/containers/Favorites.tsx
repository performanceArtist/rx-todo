import { withTodoStreams } from '../observables/todo';
import { Favorites } from '../components/Favorites';

export const FavoritesContainer = withTodoStreams(({ todos, favorites }) => ({
  todos: todos.filter(todo => favorites.includes(todo.id)),
}))(Favorites);
