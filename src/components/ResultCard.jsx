import React from "react";

const ResultCard = ({ rate, amount, from, to, result }) => {
  if (rate === undefined || result === undefined) {
    return null;
  }

  return (
    <div className="result-card fade-in fade-in-4">
      <div className="result-header">
        <h2>
          1 {from} = {rate.toFixed(4)} {to}
        </h2>
        <p className="rate-info">Exchange rate</p>
      </div>
      <div className="result-value">
        {amount} {from} = {result.toFixed(2)} {to}
      </div>
    </div>
  );
};

export default ResultCard;
