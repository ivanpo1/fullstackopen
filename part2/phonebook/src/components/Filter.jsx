const Filter = ({ filterNames, OnFilterChange }) => (
  <div>
    filter shown with <input value={filterNames} onChange={OnFilterChange} />
  </div>
)

export default Filter