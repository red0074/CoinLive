const BASE_URL = import.meta.env.VITE_COINGECKO_API_URL || "/api";

export async function fetchCoins(page = 1, perPage = 100) {
  try {
    const res = await fetch(
      `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=false`
    );
    if (!res.ok) throw new Error("Invalid API response");
    return await res.json();
  } catch (error) {
    console.error("Error fetching coins:", error);
    throw error;
  }
}

export async function fetchTrendingCoins() {
  try {
    const res = await fetch(`${BASE_URL}/search/trending`);
    if (!res.ok) throw new Error("Invalid trending API response");
    const data = await res.json();
    return data.coins || [];
  } catch (error) {
    console.error("Error fetching trending coins:", error);
    throw error;
  }
}
