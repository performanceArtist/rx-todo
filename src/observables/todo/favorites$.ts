import { BehaviorSubject } from 'rxjs';

export const favorites$ = new BehaviorSubject<number[]>([]);

export const actions = {
  addFavorite: (todoID: number) =>
    favorites$.next(favorites$.getValue().concat(todoID)),
  removeFavorite: (todoID: number) =>
    favorites$.next(favorites$.getValue().filter(id => id !== todoID))
}
