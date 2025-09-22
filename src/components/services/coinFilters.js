export const applyFilters = (coins, filters, searchQuery) => {
  return coins.filter((coin) => {
    // search
    if (
      !coin.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    // price filter
    if (filters.priceMin != null && coin.current_price < filters.priceMin)
      return false;
    if (filters.priceMax != null && coin.current_price > filters.priceMax)
      return false;
    // market cap filter
    if (filters.marketCapMin != null && coin.market_cap < filters.marketCapMin)
      return false;
    if (filters.marketCapMax != null && coin.market_cap > filters.marketCapMax)
      return false;
    // performance
    if (
      filters.performance === "gainers" &&
      coin.price_change_percentage_24h <= 0
    )
      return false;
    if (
      filters.performance === "losers" &&
      coin.price_change_percentage_24h >= 0
    )
      return false;
    // volume
    if (filters.volume === "high" && coin.total_volume < 1e9) return false;
    if (
      filters.volume === "medium" &&
      (coin.total_volume < 1e8 || coin.total_volume >= 1e9)
    )
      return false;
    if (filters.volume === "low" && coin.total_volume >= 1e8) return false;

    return true;
  });
};
