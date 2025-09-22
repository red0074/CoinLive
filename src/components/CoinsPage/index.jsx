import { useState, useEffect } from "react";
import CoinsTable from "../CoinsTable";
import Pagination from "../Pagination";
import PerPageSelector from "../PerPageSelector";
import { applyFilters } from "../services/coinFilters";
import CoinDetailModal from "../CoinDetailModal";
import "./index.css";

const FETCH_STATE = {
  INITIAL: "initial",
  LOADING: "loading",
  SUCCESS: "success",
  FAILURE: "failure",
};

const CoinsPage = () => {
  const [coins, setCoins] = useState([]);
  const [fetchState, setFetchState] = useState(FETCH_STATE.INITIAL);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    priceMin: null,
    priceMax: null,
    marketCapMin: null,
    marketCapMax: null,
    performance: null,
    volume: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(25);
  const [selectedCoin, setSelectedCoin] = useState(null);

  useEffect(() => {
    const fetchCoins = async () => {
      setFetchState(FETCH_STATE.LOADING);
      try {
        const res = await fetch(
          `/api/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false`
        );
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error("Invalid API response");
        setCoins(data);
        setFetchState(FETCH_STATE.SUCCESS);
      } catch (err) {
        console.error("Error fetching coins:", err);
        setFetchState(FETCH_STATE.FAILURE);
      }
    };

    fetchCoins();
  }, []);

  const filteredCoins = applyFilters(coins, filters, searchQuery);

  const start = (currentPage - 1) * perPage;
  const paginatedCoins = filteredCoins.slice(start, start + perPage);
  const totalPages = Math.ceil(filteredCoins.length / perPage);

  const renderLoading = () => (
    <div className="loading-view text-center py-20">
      <p>Loading coins...</p>
    </div>
  );

  const renderError = () => (
    <div className="error-view text-center py-20">
      <img
        src="/404-animation.gif"
        alt="Error"
        className="mx-auto mb-4 w-40 h-40"
      />
      <p>Failed to load coins. Please try again later.</p>
    </div>
  );

  const renderSuccess = () => (
    <>
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-4 gap-4">
        <input
          type="text"
          placeholder="Search coins..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded px-3 py-2 w-full md:w-80"
        />
        <PerPageSelector value={perPage} onChange={setPerPage} />
      </div>

      <CoinsTable
        coins={paginatedCoins}
        loading={false}
        onRowClick={setSelectedCoin}
      />

      <div className="mt-4 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {selectedCoin && (
        <CoinDetailModal
          coin={selectedCoin}
          onClose={() => setSelectedCoin(null)}
        />
      )}
    </>
  );

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
    <div className="coins-page p-6">
      <h2 className="text-2xl font-bold mb-4">All Coins</h2>
      {renderView()}
    </div>
  );
};

export default CoinsPage;
