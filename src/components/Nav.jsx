import { Link, useLocation } from 'react-router-dom';

const Nav = () => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <nav className='nav'>
      <div className='nav__logo'>
        <Link to='/'> Holidaze</Link>
      </div>
      <ul className='nav__list'>
        <li className='nav__listitem'>
          <Link to='/'>
            {pathname === '/' ? (
              <span className='nav__link nav__link--active'>Home</span>
            ) : (
              <span className='nav__link'>Home</span>
            )}
          </Link>
        </li>
        <li className='nav__listitem'>
          <Link to='/accommodations'>
            {pathname === '/accommodations' ? (
              <span className='nav__link nav__link--active'>
                Accommodations
              </span>
            ) : (
              <span className='nav__link '>Accommodations</span>
            )}
          </Link>
        </li>
        <li className='nav__listitem'>
          <Link to='/contact'>
            {pathname === '/contact' ? (
              <span className='nav__link nav__link--active'>Contact</span>
            ) : (
              <span className='nav__link '>Contact</span>
            )}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
