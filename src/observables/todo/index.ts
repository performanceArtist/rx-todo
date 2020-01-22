import { withStreams, GetStreamsState } from '../../hocs/withStreams';
import { todo$, actions } from './todo$';
import { favorites$, actions as favoritesActions } from './favorites$';

export const todoStreams = {
  todos: todo$,
  favorites: favorites$
}

export const todoActions = { ...actions, ...favoritesActions };

export const withTodoStreams = withStreams(todoStreams);

export type RXState = GetStreamsState<typeof todoStreams>;
export type RXActions = typeof todoActions;
