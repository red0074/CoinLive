import React from "react";
import "./index.css";

const CoinDetailModal = ({ coin, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <div className="flex items-center gap-4 mb-4">
          <img
            src={coin.image}
            alt={coin.name}
            className="w-12 h-12 rounded-full"
          />
          <h2 className="text-xl font-bold">{coin.name}</h2>
          <span className="text-gray-500 uppercase">{coin.symbol}</span>
        </div>
        <p>Rank: {coin.market_cap_rank}</p>
        <p>Price: ${coin.current_price?.toLocaleString()}</p>
        <p>24h Change: {coin.price_change_percentage_24h?.toFixed(2)}%</p>
        <p>Market Cap: ${coin.market_cap?.toLocaleString()}</p>
        <p>24h Volume: ${coin.total_volume?.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default CoinDetailModal;
