const Filter = ({ search, onChange }) => {
  return (
    <>
      <input type='text' placeholder='search' onChange={onChange} />
      {search}
    </>
  );
};

export default Filter;
