import "./index.css";
const CoinRow = ({ coin, onClick }) => {
  const priceChangeClass =
    coin.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500";

  return (
    <tr className="hover:bg-gray-100 cursor-pointer" onClick={onClick}>
      <td>{coin.market_cap_rank}</td>
      <td className="flex items-center gap-2">
        {coin.image && (
          <img
            src={coin.image}
            alt={coin.name}
            className="w-6 h-6 rounded-full"
          />
        )}
        <div>
          <p>{coin.name}</p>
          <p className="text-gray-500 text-xs uppercase">{coin.symbol}</p>
        </div>
      </td>
      <td>${coin.current_price?.toLocaleString()}</td>
      <td className={priceChangeClass}>
        {coin.price_change_24h?.toFixed(2)} ($
        {coin.price_change_percentage_24h?.toFixed(2)}%)
      </td>
      <td>${coin.market_cap?.toLocaleString()}</td>
      <td>${coin.total_volume?.toLocaleString()}</td>
    </tr>
  );
};

export default CoinRow;
