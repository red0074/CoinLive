import "./index.css";
const PerPageSelector = ({ value, onChange, options = [10, 25, 50, 100] }) => {
  return (
    <div className="per-page-selector">
      <span>Show</span>
      <select
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <span>per page</span>
    </div>
  );
};

export default PerPageSelector;
