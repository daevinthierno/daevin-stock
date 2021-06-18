import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

// import Chart from "react-google-charts";

import "./main.css";
// import { Line } from "react-chartjs-2";
import axios from "axios";
import Loader from "react-loader-spinner";
import { Lines } from "react-preloaders";
import { useParams } from "react-router";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

// import { timeParse } from "d3-time-format";
// import { scaleTime } from "d3-scale";
// import { format } from "d3-format";

// import { curveMonotoneX } from "d3-shape";

// import { ChartCanvas, Chart } from "react-stockcharts";
// import { AreaSeries } from "react-stockcharts/lib/series";
// import { XAxis, YAxis } from "react-stockcharts/lib/axes";
// import { fitWidth } from "react-stockcharts/lib/helper";
// import {
//   createVerticalLinearGradient,
//   hexToRGBA,
// } from "react-stockcharts/lib/utils";

// var parseDate = timeParse("%Y/%m/%d");
// const canvasGradient = createVerticalLinearGradient([
//   { stop: 0, color: hexToRGBA("#b5d0ff", 0.2) },
//   { stop: 0.7, color: hexToRGBA("#6fa4fc", 0.4) },
//   { stop: 1, color: hexToRGBA("#4286f4", 0.8) },
// ]);

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

function Main() {
  const classes = useStyles();
  const [chartDate, setchartDate] = useState(null);
  const [stocks, setStocks] = useState([]);
  const [dates, setDates] = useState([]);
  const [data, setData] = useState([]);
  const [plot, setplot] = useState(null);
  const [plotComponent, setplotComponent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tickers, setTickers] = useState([]);
  const [companyName, setCompanyName] = useState("GOOGLE LLC.");
   const [selectedDate, setSelectedDate] = React.useState(
     new Date().toLocaleDateString()
   );
  const [days, setDays] = useState(180);

  let { ticker } = useParams();

  useEffect(() => {
    setLoading(true);
    getTickerList();
    if (ticker) {
      getPrediction(ticker);
    } else {
      getPrediction();
    }
    if (tickers.lenght > 0) {
      let company = tickers.find((item) => item.Ticker === ticker);
      setCompanyName(company.Name);
    }
  }, [ticker]);

  const getTickerList = () => {
    axios
      .get(`https://stock-forecast-thierno.herokuapp.com/tickers`)
      .then((response) => setTickers(response.data))
      .catch((error) => console.log(error));
  };

  const getPrediction = (ticker = "GOOGL") => {
    axios
      .get(
        `https://stock-forecast-thierno.herokuapp.com/predictStock?ticker=${ticker}&days=${days}`
      )
      .then(({ data }) => {
        console.log(data);

        data.forecast.forEach((d) => {
          d.date = new Date(d.date).getTime();
          d.stock = +d.stock;
        });
        setData(data);
        let stocksArray = [];
        let datesArray = [];
        data.forecast.forEach((element) => {
          stocksArray.push(element.stock);
          datesArray.push(new Date(element.date));
        });
        setStocks(stocksArray);
        setDates(datesArray);
        setplot(data.figures.plot);
        setplotComponent(data.figures.plot_component);
        setLoading(false);
      });
  };

  const arrangeData = () => {
    var newData = [];
    for (let item in data) {
      var subArr = [new Date(item.date).getDate(), item.stock];
      newData.push(subArr);
    }
    console.log(newData);
    return newData;
  };

  // const data = {
  //   labels: dates,
  //   datasets: [
  //     {
  //       label: "Stock Prediction for the next 7 days",
  //       data: stocks,
  //       fill: false,
  //       backgroundColor: "rgb(255, 99, 132)",
  //       borderColor: "rgba(255, 99, 132, 0.2)",
  //     },
  //   ],
  // };

  // if (data.length > 0) setLoading(false);
  // return (
  //   <div
  //     style={{
  //       display: "flex",
  //       justifyContent: "center",
  //       alignItems: "center",
  //       width: "400px",
  //     }}
  //   >
  //     Loading ....
  //   </div>
  // );

  return (
    <div className="main">
      <div className="stock_Info">
        <div className="stock_name">
          <h1> {companyName} </h1>
        </div>
        <div className="stock_date">
          <form className={classes.container} noValidate>
            {/* <TextField
              id="date"
              label="Prediction"
              type="date"
              defaultValue="2017-05-24"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            /> */}
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Date picker inline"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </form>
        </div>
      </div>
      <img src={plot} />
      <img src={plotComponent} />
      {/* <Lines customLoading={loading} time={0} />; */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loader
          type="Audio"
          color="#00BFFF"
          height={100}
          width={100}
          visible={loading}
        />
      </div>
    </div>
  );
}

export default Main;
