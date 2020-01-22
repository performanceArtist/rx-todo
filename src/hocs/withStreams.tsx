import React from 'react';
import { Subscription, BehaviorSubject } from 'rxjs';

type Triggers = {
  [key: string]: (...args: any) => void;
};

type Streams = {
  [key: string]: BehaviorSubject<any>;
};

export type GetStreamsState<S extends Streams> = {
  [key in keyof S]: S[key]['value'];
};

function equalityCheck(a: { [key: string]: any }, b: { [key: string]: any }) {
  return Object.keys(a).every(key => a[key] === b[key]);
}

function withStreams<S extends Streams>(streams?: S) {
  return function<StateProps = {}, ActionProps extends Triggers = {}>(
    mapState: ((state: GetStreamsState<S>) => StateProps) | null,
    mapDispatch?: ActionProps,
  ) {
    return function<P extends ActionProps & StateProps>(
      Component: React.ComponentClass<P>,
    ) {
      return class Wrapper extends React.Component<
        Omit<P, keyof S | keyof ActionProps>
      > {
        private subscriptions: Subscription[] = [];

        constructor(props: Omit<P, keyof S | keyof ActionProps>) {
          super(props);

          if (streams) {
            this.state = Object.keys(streams).reduce((acc, key) => {
              acc[key] = streams[key as keyof S].getValue();
              return acc;
            }, {} as any);
          }
        }

        shouldComponentUpdate(
          nextProps: Omit<P, keyof S | keyof ActionProps>,
          nextState: any,
        ) {
          if (mapState) {
            const oldProps = mapState(this.state as GetStreamsState<S>);
            const newProps = mapState(nextState);

            return (
              !equalityCheck(oldProps, newProps) ||
              !equalityCheck(this.props, nextProps)
            );
          } else {
            return (
              !equalityCheck(this.state, nextState) ||
              !equalityCheck(this.props, nextProps)
            );
          }
        }

        componentDidMount() {
          if (!streams) {
            return;
          }

          Object.keys(streams).forEach(key => {
            const subscription = streams[key].subscribe(stateField => {
              this.setState({ [key]: stateField });
            });

            this.subscriptions.push(subscription);
          });
        }

        componentWillUnmount() {
          this.subscriptions.forEach(subscription =>
            subscription.unsubscribe(),
          );
        }

        render() {
          const stateProps = mapState
            ? mapState(this.state as GetStreamsState<S>)
            : this.state;

          const props = {
            ...(this.props as any), // allow extra(own) props
            ...stateProps,
            ...mapDispatch,
          };

          return <Component {...props} />;
        }
      };
    };
  };
}

export { withStreams };
