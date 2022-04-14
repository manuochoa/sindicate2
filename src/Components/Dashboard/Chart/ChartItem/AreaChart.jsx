import React from 'react';
import { Group } from '@visx/group';
import { AreaClosed } from '@visx/shape';
import { AxisLeft, AxisBottom, AxisScale } from '@visx/axis';
import { LinearGradient, RadialGradient } from '@visx/gradient';
import { curveMonotoneX } from '@visx/curve';
import { AppleStock } from '@visx/mock-data/lib/mocks/appleStock';

// Initialize some variables
const axisColor = '#fff';
const axisBottomTickLabelProps = {
  textAnchor: 'middle',
  fontFamily: 'Arial',
  fontSize: 10,
  fill: axisColor,
};
const axisLeftTickLabelProps = {
  dx: '-0.25em',
  dy: '0.25em',
  fontFamily: 'Arial',
  fontSize: 10,
  textAnchor: 'end',
  fill: axisColor,
};

// accessors
const getDate = (d) => new Date(d.date);
const getStockValue = (d) => d.close;

export default function AreaChart({
  data,
  gradientColor,
  width,
  yMax,
  margin,
  xScale,
  yScale,
  hideBottomAxis = false,
  hideLeftAxis = false,
  top,
  left,
  children,
}) {
  if (width < 10) return null;
  return (
    <Group left={24} top={60}>
      <LinearGradient
        id="gradient"
        from={gradientColor}
        fromOpacity={.6}
        to={gradientColor}
        toOpacity={0}
        height={"100%"}
      />
      <AreaClosed
        data={data}
        x={(d) => xScale(getDate(d)) || 0}
        y={(d) => yScale(getStockValue(d)) || 0}
        yScale={yScale}
        strokeWidth={1}
        stroke="url(#gradient)"
        fill="url(#gradient)"
        curve={curveMonotoneX}
      />
      {/* {!hideBottomAxis && (
        <AxisBottom
          top={yMax}
          scale={xScale}
          numTicks={width > 520 ? 10 : 5}
          stroke={axisColor}
          tickStroke={axisColor}
          tickLabelProps={() => axisBottomTickLabelProps}
        />
      )}
      {!hideLeftAxis && (
        <AxisLeft
          scale={yScale}
          numTicks={5}
          stroke={axisColor}
          tickStroke={axisColor}
          tickLabelProps={() => axisLeftTickLabelProps}
        />
      )} */}
      {children}
    </Group>
  );
}
