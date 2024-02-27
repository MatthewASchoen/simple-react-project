import { memo } from 'react';

const counterGap = '0.5rem';

const counterContainerStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  rowGap: counterGap,
};

/** Returns styling for the counter box, highlighted if active */
const getBoxStyles = (active: boolean): React.CSSProperties => ({
  background: 'white',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: counterGap,
  padding: counterGap,
  border: active ? '2px solid dodgerblue' : '1px solid black',
  margin: active ? 0 : '1px',
});

const textStyles: React.CSSProperties = {
  fontWeight: 'bold',
  textAlign: 'center',
};

const labelStyles: React.CSSProperties = {
  ...textStyles,
  fontSize: '1.5rem',
};

const valueStyles: React.CSSProperties = {
  ...textStyles,
  gridColumn: '1 / span 2',
};

/** Returns styling for the increment/decrement buttons */
const getButtonStyles = (enabled: boolean): React.CSSProperties => ({
  fontSize: 'inherit',
  userSelect: 'none',
  cursor: enabled ? 'pointer' : 'not-allowed',
});

type CounterProps = {
  // A label above the counter box
  label: string;
  // The counter value, setter, min, and max
  value: number;
  setValue: (value: number) => void;
  minimum?: number;
  maximum?: number;
  // If true, the box is highlighted
  active?: boolean;
};

/** A controller counter with a label, value display, and +1/-1 buttons */
const Counter = ({
  label,
  value,
  setValue,
  minimum = 0,
  maximum = Number.MAX_SAFE_INTEGER,
  active,
}: CounterProps) => {
  const canDecrement = value > minimum;
  const canIncrement = value < maximum;
  return (
    <div className="counter" style={counterContainerStyles}>
      <span style={labelStyles}>{label}</span>
      <div style={getBoxStyles(!!active)}>
        <span style={valueStyles}>{value}</span>
        <button
          style={getButtonStyles(canDecrement)}
          onClick={() => setValue(value - 1)}
          disabled={!canDecrement}
        >
          -1
        </button>
        <button
          style={getButtonStyles(canIncrement)}
          onClick={() => setValue(value + 1)}
          disabled={!canIncrement}
        >
          +1
        </button>
      </div>
    </div>
  );
};

export default memo(Counter);
