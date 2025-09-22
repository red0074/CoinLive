import { NavLink } from "react-router-dom";
import { Coins, TrendingUp } from "lucide-react";
import "./index.css";

const menuItems = [
  {
    id: "coins",
    label: "Coins",
    icon: Coins,
    description: "All Cryptocurrencies",
  },
  {
    id: "highlights",
    label: "Highlights",
    icon: TrendingUp,
    description: "Market Highlights",
  },
];

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <span>₿</span>
        </div>
        <div>
          <h1>Crypto Tracker</h1>
          <p>Market Dashboard</p>
        </div>
      </div>
      <nav>
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.id}
              to={item.id === "coins" ? "/coins" : "/highlights"}
              className={({ isActive }) =>
                `menu-item ${isActive ? "active" : ""}`
              }
            >
              <Icon size={30} />
              <div>
                <p>{item.label}</p>
                <p className="description">{item.description}</p>
              </div>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
