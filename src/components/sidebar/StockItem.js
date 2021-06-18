import React from 'react'
import './sidebar.css'

function StockItem({stockName, stockId}) {
    return (
        <div className="stockItem" >
            <h4> {stockName} </h4>
        </div>
    )
}

export default StockItem
