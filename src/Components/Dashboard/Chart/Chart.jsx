import React, { useEffect, useRef, useState } from "react";
import classes from "./Chart.module.css";
import Baidge from "../../UI/Baidge/Baidge";

import coins_hand_2 from "../../../Assets/Icons/coins_hand_2.svg";
import hour24 from "../../../Assets/Icons/24.svg";
import BaidgesPanel from "../../UI/BaidgesPanel/BaidgesPanel";
import Card from "../../UI/Card/Card";
import ChartItem from "./ChartItem/ChartItem";
import useWindowDimensions from "../../../Hooks/useWindowDimension";
import { useSelector } from "react-redux";

const Chart = (props) => {
  const { balance, usdPrice } = useSelector((state) => state.common);
  const [chartSize, setChartSize] = useState([0, 0]);

  const { width, height } = useWindowDimensions();

  const ref = useRef(null);

  useEffect(() => {
    if (ref && ref.current) {
      let width = ref.current.offsetWidth;
      let height = ref.current.offsetHeight - 6;

      setChartSize([width, height]);
    }
  }, [width, height]);

  const thSeparator = new Intl.NumberFormat("en-US");

  return (
    <div
      className={classes.main}
      style={{ minHeight: width > 1170 ? height - (height / 100) * 70 : 386 }}
      ref={ref}
    >
      <Card className={classes.card}>
        <BaidgesPanel>
          <Baidge
            icon={coins_hand_2}
            text={"Holdings"}
            value={`$${thSeparator.format((balance * usdPrice).toFixed(2))}`}
            sinBalance={`${thSeparator.format(
              Number(balance).toFixed(2)
            )} $SIN`}
          />

          <Baidge
            icon={hour24}
            text={"Daily Earnings"}
            value={`$${thSeparator.format(
              (balance * 0.0191 * usdPrice).toFixed(2)
            )}`}
            sinBalance={`${thSeparator.format(
              Number(balance * 0.0191).toFixed(2)
            )} $SIN`}
          />
        </BaidgesPanel>
        <ChartItem
          width={chartSize[0]}
          height={width > 1170 ? chartSize[1] : 386}
        />
      </Card>
    </div>
  );
};

export default Chart;
