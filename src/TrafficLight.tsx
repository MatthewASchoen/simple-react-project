import { memo } from 'react';

const lightSize = '8rem';
const lightGap = '0.5rem';

/** Returns the background color for the light at
 * the given index, fully opaque if it is active */
const getLightBackground = (index: number, active: boolean): string =>
  `hsla(${index * 60}, 100%, 50%, ${active ? 100 : 20}%)`;

/** Styles for a light container, a square grid
 * of 4 divs that create the rounded corners */
const lightStyles: React.CSSProperties = {
  position: 'relative',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',

  height: lightSize,
  width: lightSize,
};

const thickBorder = '5px solid black';
const thinBorder = '3px solid black';

/** Styles for the top-left, top-right, bottom-left, and bottom-right
 * corners of a light, respectively (top corners have thicker borders).
 * Note: If I wasn't using inline styling, I probably done this with
 * child selectors in the parent light styling. */
const cornerStyles: React.CSSProperties[] = [
  {
    borderRadius: '100% 0 0 0',
    borderLeft: thickBorder,
    borderTop: thickBorder,
  },
  {
    borderRadius: '0 100% 0 0',
    borderTop: thickBorder,
    borderRight: thickBorder,
  },
  {
    borderRadius: '0 0 0 100%',
    borderLeft: thinBorder,
    borderBottom: thinBorder,
  },
  {
    borderRadius: '0 0 100% 0',
    borderBottom: thinBorder,
    borderRight: thinBorder,
  },
];

const lightLabelStyles: React.CSSProperties = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  fontWeight: 'bold',
};

type LightProps = {
  index: number;
  active: boolean;
};

/** An individual light */
const Light = ({
  index,
  active,
  children,
}: React.PropsWithChildren<LightProps>) => {
  const background = getLightBackground(index, active);
  return (
    <div style={lightStyles}>
      {cornerStyles.map(cornerStyle => (
        <div style={{ ...cornerStyle, background }} />
      ))}
      <span style={lightLabelStyles}>{active && children}</span>
    </div>
  );
};

const trafficLightStyles: React.CSSProperties = {
  background: 'hsl(0, 0%, 40%)',
  display: 'grid',
  // Note: Swap to gridTemplateRows (or just remove)
  // for vertical orientation (could be future prop)
  gridTemplateColumns: '1fr 1fr 1fr',
  gap: lightGap,

  border: thickBorder,
  borderRadius: 5,

  width: 'fit-content',
  padding: lightGap,
  margin: 'auto',
};

export type TrafficLightProps = {
  state: { value: number; label: string };
};

/** A traffic light display with red, yellow, and green lights.
 * Note: In retrospect, the readme says "some element that changes
 * color". This component contains 3 elements that have fixed colors
 * (which become translucent when inactive). If a single element that
 * changes to multiple colors is desired, I can change this as needed. */
const TrafficLight = ({ state: { value, label } }: TrafficLightProps) => (
  <div className="traffic-light" style={trafficLightStyles}>
    {Array.from({ length: 3 }, (_, index) => index).map(index => (
      <Light key={`light-${index}`} index={index} active={index === value % 3}>
        {label}
      </Light>
    ))}
  </div>
);

export default memo(TrafficLight);
