import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Star, Activity } from "lucide-react";
import "./index.css";

const FETCH_STATE = {
  INITIAL: "initial",
  LOADING: "loading",
  SUCCESS: "success",
  FAILURE: "failure",
};

const MarketHighlights = () => {
  const [coins, setCoins] = useState([]);
  const [trendingCoins, setTrendingCoins] = useState([]);
  const [fetchState, setFetchState] = useState(FETCH_STATE.INITIAL);

  useEffect(() => {
    const fetchData = async () => {
      setFetchState(FETCH_STATE.LOADING);
      try {
        const [coinsRes, trendingRes] = await Promise.all([
          fetch(
            "/api/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
          ),
          fetch("/api/api/v3/search/trending"),
        ]);

        const coinsData = await coinsRes.json();
        const trendingData = await trendingRes.json();

        if (!Array.isArray(coinsData))
          throw new Error("Invalid coins response");

        setCoins(coinsData);
        setTrendingCoins(trendingData.coins || []);
        setFetchState(FETCH_STATE.SUCCESS);
      } catch (err) {
        console.error("Error fetching highlights:", err);
        setFetchState(FETCH_STATE.FAILURE);
      }
    };
    fetchData();
  }, []);

  const renderLoading = () => (
    <div className="loading-view text-center py-20">
      <p>Loading market highlights...</p>
    </div>
  );

  const renderError = () => (
    <div className="error-view text-center py-20">
      <img
        src="/404-animation.gif"
        alt="Error"
        className="mx-auto mb-4 w-40 h-40"
      />
      <p>Failed to load market highlights.</p>
    </div>
  );

  const renderSuccess = () => {
    if (!coins || coins.length === 0) return null;

    const topGainer = coins.reduce(
      (prev, curr) =>
        (curr.price_change_percentage_24h || 0) >
        (prev.price_change_percentage_24h || 0)
          ? curr
          : prev,
      coins[0]
    );

    const topLoser = coins.reduce(
      (prev, curr) =>
        (curr.price_change_percentage_24h || 0) <
        (prev.price_change_percentage_24h || 0)
          ? curr
          : prev,
      coins[0]
    );

    const highestVolume = coins.reduce(
      (prev, curr) =>
        (curr.total_volume || 0) > (prev.total_volume || 0) ? curr : prev,
      coins[0]
    );

    const renderCard = (title, coin, icon, type) => {
      if (!coin) return null;

      const changeClass =
        type === "gainer" && coin.price_change_percentage_24h >= 0
          ? "text-green-500"
          : type === "loser" && coin.price_change_percentage_24h < 0
          ? "text-red-500"
          : "";

      return (
        <div className="highlight-card">
          <div className="flex items-center gap-2 mb-2">
            {icon}
            <span className="font-medium">{title}</span>
          </div>
          <div className="flex items-center gap-2">
            {coin.image ? (
              <img
                src={coin.image || coin.large}
                alt={coin.name}
                className="w-8 h-8 rounded-full"
              />
            ) : null}
            <span className="font-medium">{coin.name}</span>
            <span className="text-gray-400 uppercase text-xs">
              {coin.symbol}
            </span>
          </div>
          <div className="mt-2 font-mono text-lg font-bold">
            ${coin.current_price?.toLocaleString() || "-"}
          </div>
          {type !== "volume" && type !== "trending" && (
            <div className={`mt-1 text-sm font-medium ${changeClass}`}>
              {coin.price_change_percentage_24h?.toFixed(2)}%
            </div>
          )}
          {type === "volume" && (
            <div className="mt-1 text-sm text-gray-500 font-mono">
              Vol: ${coin.total_volume?.toLocaleString() || "-"}
            </div>
          )}
          {type === "trending" && coin.score && (
            <div className="mt-1 text-sm text-gray-500 font-mono">
              Trending Score: {coin.score}
            </div>
          )}
        </div>
      );
    };

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {renderCard(
          "Top Gainer",
          topGainer,
          <TrendingUp className="w-4 h-4 text-green-500" />,
          "gainer"
        )}
        {renderCard(
          "Top Loser",
          topLoser,
          <TrendingDown className="w-4 h-4 text-red-500" />,
          "loser"
        )}
        {renderCard(
          "Highest Volume",
          highestVolume,
          <Activity className="w-4 h-4 text-blue-500" />,
          "volume"
        )}
        {renderCard(
          "Trending",
          trendingCoins[0]?.item,
          <Star className="w-4 h-4 text-yellow-500" />,
          "trending"
        )}
      </div>
    );
  };

  const renderView = () => {
    switch (fetchState) {
      case FETCH_STATE.LOADING:
        return renderLoading();
      case FETCH_STATE.FAILURE:
        return renderError();
      case FETCH_STATE.SUCCESS:
        return renderSuccess();
      default:
        return null;
    }
  };

  return (
    <section className="market-highlights p-6">
      <h2 className="text-2xl font-bold mb-6">Market Highlights</h2>
      {renderView()}
    </section>
  );
};

export default MarketHighlights;
