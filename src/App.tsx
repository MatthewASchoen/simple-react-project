import { useCallback, useMemo, useReducer } from 'react';
import Counter from './Counter';
import TrafficLight, { TrafficLightProps } from './TrafficLight';

const minCounterCount = 2;
const maxCounterCount = 5;
const trafficLabels = ['Ready...', 'Set...', 'Go!!'];

// Note: Prefer a framework like styled components over inline styling
// (Would put in separate files but instructions say not to)
const appStyles: React.CSSProperties = {
  display: 'grid',
  font: '2rem Calibri, Helvetica, sans-serif',
  placeContent: 'center',
  height: '100dvh',
};

const centeredBoxStyles: React.CSSProperties = {
  background: 'ghostwhite',
  display: 'flex',
  flexDirection: 'column',
  rowGap: '1rem',
  padding: '2rem',
  border: '1px solid black',
};

const counterContainerStyles: React.CSSProperties = {
  display: 'flex',
  gap: '1rem',
  justifyContent: 'center',
};

const clicksLabelStyles: React.CSSProperties = {
  textAlign: 'center',
};

type CountersState = {
  // The number of clicks so far total
  clicks: number;
  // The counter currently controlling the traffic light
  controllerIndex: number;
  // The counter values
  counters: number[];
};

const defaultCountersState = {
  clicks: 0,
  controllerIndex: 0,
  counters: Array.from({ length: minCounterCount }, () => 0),
};

type SetCounterAction = { type: 'set-counter'; index: number; value: number };
type SetControllerAction = { type: 'set-controller'; index: number };
type SetCounterCountAction = { type: 'set-counter-count'; count: number };
type StateAction =
  | SetCounterAction
  | SetControllerAction
  | SetCounterCountAction;

/** A reducer to maintain the app state */
const counterStateReducer = (
  { clicks, controllerIndex, counters }: CountersState,
  action: StateAction
): CountersState => {
  switch (action.type) {
    case 'set-counter':
      // Set value of counter at action.index to action.value
      return {
        clicks: clicks + 1,
        controllerIndex,
        // Replace only counter we're changing (alt: counters.with(index, value))
        counters: counters.map((n, i) =>
          i === action.index ? action.value : n
        ),
      };
    case 'set-controller':
      // Set the counter that is controlling the traffic light to action.index
      return { clicks, controllerIndex: action.index, counters };
    case 'set-counter-count':
      // Set the number of counters (adding to or removing from the end)
      return {
        clicks,
        controllerIndex:
          controllerIndex < action.count ? controllerIndex : action.count - 1,
        counters: Array.from(
          { length: action.count },
          (_, index) => counters[index] ?? 0
        ),
      };
  }
};

const App = () => {
  const [{ clicks, controllerIndex, counters }, dispatch] = useReducer(
    counterStateReducer,
    defaultCountersState
  );
  const counterCount = counters.length;

  // Memoized counter setters to avoid re-rendering untouched counters
  const counterSetters = useMemo(
    () =>
      Array.from(
        { length: counterCount },
        (_, index) => (value: number) =>
          dispatch({ type: 'set-counter', index, value })
      ),
    [counterCount]
  );

  const trafficValue = counters[controllerIndex];
  const trafficState: TrafficLightProps['state'] = useMemo(
    () => ({ value: trafficValue, label: trafficLabels[trafficValue % 3] }),
    [trafficValue]
  );

  const setControllingCounter = useCallback(
    (counter: number): void =>
      dispatch({ type: 'set-controller', index: counter - 1 }),
    []
  );

  const setCounterCount = useCallback(
    (count: number): void => dispatch({ type: 'set-counter-count', count }),
    []
  );

  return (
    <div className="App" style={appStyles}>
      <div style={centeredBoxStyles}>
        <TrafficLight state={trafficState} />
        <div style={counterContainerStyles}>
          {counters.map((value, index) => (
            <Counter
              key={`counter-${index}`}
              label={`Counter ${index + 1}`}
              value={value}
              setValue={counterSetters[index]}
              active={index === controllerIndex}
            />
          ))}
        </div>
        <span style={clicksLabelStyles}>Total clicks: {clicks}</span>
        <div style={counterContainerStyles}>
          <Counter
            label="Controlling Traffic:"
            value={controllerIndex + 1}
            setValue={setControllingCounter}
            minimum={1}
            maximum={counters.length}
          />
          <Counter
            label="Counter Count:"
            value={counters.length}
            setValue={setCounterCount}
            minimum={minCounterCount}
            maximum={maxCounterCount}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
