export const getCoins = async (page = 1, perPage = 25) => {
  try {
    const res = await fetch(`/api/coins?page=${page}&per_page=${perPage}`);
    if (!res.ok) throw new Error("Failed to fetch coins");
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};
