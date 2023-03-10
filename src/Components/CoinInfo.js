import axios from "axios";
import React, { useEffect, useState } from "react";
import { CryptoState } from "../CryptoContext";
import { HistoricalChart } from "../config/api";
import { createTheme } from "@material-ui/core/styles";
import { CircularProgress, makeStyles, ThemeProvider } from "@material-ui/core";
import { Line } from "react-chartjs-2";
import { chartDays } from "../config/data";
import { Chart, registerables } from "chart.js";
import SelectButton from "./SelectButton";
Chart.register(...registerables);

// main export function
const CoinInfo = ({ coin }) => {
  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);
  //context api
  const { currency } = CryptoState();

  //fetching data by sending diff parameters in HistoricalChart callback function
  const fetchHistoricalData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setHistoricalData(data.prices);
  };

  //each time currency or day changes, re-render component
  useEffect(() => {
    fetchHistoricalData();
    // eslint-disable-next-line
  }, [currency, days]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
  const classes = useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {
          // if data is not loaded yet... show loading screen else Chart
          !historicalData ? (
            <CircularProgress
              style={{ color: "#40E0D0" }}
              size={250}
              thickness={1}
            />
          ) : (
            <>
              {/* for chart  */}
              <Line
                data={{
                  labels:
                    historicalData &&
                    historicalData.map((coin) => {
                      let date = new Date(coin[0]);
                      let time =
                        date.getHours() > 12
                          ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                          : `${date.getHours()}:${date.getMinutes()} AM`;
                      return days === 1 ? time : date.toLocaleDateString();
                    }),
                  datasets: [
                    {
                      data: historicalData.map((coin) => coin[1]),
                      label: `Price ( Past ${days} Days ) in ${currency}`,
                      borderColor: "#75E6DA",
                    },
                  ],
                }}
                options={{
                  elements: {
                    point: {
                      radius: 1,
                    },
                  },
                }}
              />

              {/* for selection button */}
              <div
                style={{
                  display: "flex",
                  marginTop: 20,
                  justifyContent: "space-around",
                  width: "100%",
                }}
              >
                {chartDays.map((day) => (
                  <SelectButton
                    key={day.value}
                    onClick={() => setDays(day.value)}
                    selected={day.value === days}
                  >
                    {day.label}
                  </SelectButton>
                ))}
              </div>
            </>
          )
        }
      </div>
    </ThemeProvider>
  );
};
export default CoinInfo;

// styles... ignore them
const useStyles = makeStyles((theme) => ({
  container: {
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    },
  },
}));
