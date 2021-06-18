import React, { useEffect, useState } from "react";
import "./sidebar.css";
import StockItem from "./StockItem";
import axios from "axios";
import { Link } from "react-router-dom";

function SideBar() {
  const [searchVal, setsearchVal] = useState(null);
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    axios
      .get(`https://stock-forecast-thierno.herokuapp.com/tickers`)
      .then((response) => setStocks(response.data))
      .catch((error) => console.log(error));
  }, [searchVal]);

  const onKeySearch = (e) => {
    e.preventDefault();
    alert(searchVal);
  };
  const searchStock = () => {
    if (searchVal == null || searchVal.trim() === "") {
      setStocks(stocks);
    } else {
      setStocks(
        stocks.filter((stock) =>
          stock.name.trim().toLowerCase().startsWith(searchVal.toLowerCase())
        )
      );
    }
  };
  return (
    <div className="sideBar">
      <div className="side_search">
        <form onSubmit={onKeySearch}>
          <input
            type="text"
            placeholder={"Search for stocks here"}
            onChange={(e) => {
              setsearchVal(e.target.value);
              searchStock();
            }}
          ></input>
        </form>
      </div>
      <div className="stock_list">
        {stocks.map((stock, index) => (
          <Link
            to={`/${stock.Ticker}`}
            style={{ textDecoration: "none" }}
            key={index}
          >
            <StockItem stockName={stock.Name} key={index} />
          </Link>
        ))}
      </div>
      <div className="dev">
        <h3>
          by{" "}
          <a
            style={{ textDecoration: "none", color: "white" }}
            href="https://daevin-dev.web.app"
            target="blank"
          >
            Manfouo Thierno{" "}
          </a>
        </h3>
      </div>
    </div>
  );
}

export default SideBar;
