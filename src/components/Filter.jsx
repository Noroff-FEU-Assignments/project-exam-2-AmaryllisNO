// import Magnifier from '../assets/icons/Magnifier';
import Magnifier from '../assets/icons/Magnifier.svg';

const Filter = ({ onChange }) => {
  return (
    <div className='filter'>
      <input
        className='filter__input'
        type='text'
        placeholder='Search for places to stay...'
        onChange={onChange}
      />
      <img className='filter__icon' src={Magnifier} alt='magnifier' />
    </div>
  );
};

export default Filter;
