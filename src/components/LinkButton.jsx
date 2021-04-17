import { Link } from 'react-router-dom';

const Button = () => {
  return (
    <div className='button button--home'>
      <Link to='/accommodations'>
        <div className='button__inner'>Find Places</div>
      </Link>
    </div>
  );
};

export default Button;
