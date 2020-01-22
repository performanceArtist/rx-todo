import React from 'react';

import { Todo } from '../shared/types/models';

type Props = {
  todo: Todo;
};

const TodoContent: React.FC<Props> = props => {
  const {
    todo: { title, content },
  } = props;

  return (
    <div>
      <h2>{title}</h2>
      <div>{content}</div>
    </div>
  );
};

export { TodoContent };
