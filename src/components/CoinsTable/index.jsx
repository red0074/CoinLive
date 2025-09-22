import React, { useState } from "react";
import CoinRow from "../CoinsRow";
import "./index.css";

const CoinsTable = ({ coins, loading, onRowClick }) => {
  const [sortConfig, setSortConfig] = useState({
    key: "market_cap_rank",
    direction: "asc",
  });

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedCoins = React.useMemo(() => {
    if (!coins) return [];
    const sorted = [...coins];
    const { key, direction } = sortConfig || {};
    sorted.sort((a, b) => {
      if (!key) return 0;
      const aValue = a[key] ?? 0;
      const bValue = b[key] ?? 0;
      return direction === "asc" ? aValue - bValue : bValue - aValue;
    });
    return sorted;
  }, [coins, sortConfig]);

  const renderSortIcon = (columnKey) => {
    if (!sortConfig) return null;
    if (sortConfig.key !== columnKey) return "⇅";
    return sortConfig.direction === "asc" ? "↑" : "↓";
  };

  if (loading) {
    return <p>Loading coins...</p>;
  }

  return (
    <table className="coins-table w-full text-left border-collapse">
      <thead>
        <tr>
          <th onClick={() => handleSort("market_cap_rank")}>
            Rank {renderSortIcon("market_cap_rank")}
          </th>
          <th onClick={() => handleSort("name")}>
            Name {renderSortIcon("name")}
          </th>
          <th onClick={() => handleSort("current_price")}>
            Price {renderSortIcon("current_price")}
          </th>
          <th onClick={() => handleSort("price_change_percentage_24h")}>
            24h Change {renderSortIcon("price_change_percentage_24h")}
          </th>
          <th onClick={() => handleSort("market_cap")}>
            Market Cap {renderSortIcon("market_cap")}
          </th>
          <th onClick={() => handleSort("total_volume")}>
            Volume {renderSortIcon("total_volume")}
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedCoins.map((coin) => (
          <CoinRow
            key={coin.id}
            coin={coin}
            onClick={() => onRowClick && onRowClick(coin)}
          />
        ))}
      </tbody>
    </table>
  );
};

export default CoinsTable;
