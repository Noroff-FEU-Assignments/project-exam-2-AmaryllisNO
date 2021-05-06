import { Link, useLocation, useHistory } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { useContext, useState } from 'react';
import Hamburger from '../assets/icons/Hamburger.svg';
import Cross from '../assets/icons/Cross.svg';

const Nav = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const history = useHistory();

  const [open, setOpen] = useState(false);
  const [auth, setAuth] = useContext(AuthContext);

  const logout = () => {
    setAuth(null);
    history.push('/');
  };
  return (
    <nav className={open ? 'nav nav--open' : 'nav'}>
      <div className='nav__logo'>
        <Link to='/'>Holidaze</Link>
      </div>
      <div className='nav__hamburger'>
        <button
          className='nav__hamburgerbutton'
          onClick={() => {
            setOpen(!open);
          }}
        >
          <img
            src={!open ? Hamburger : Cross}
            alt='Hamburger Button'
            className={
              !open
                ? 'nav__hamburgerimage'
                : 'nav__hamburgerimage nav__hamburgerimage--fade'
            }
          />
        </button>
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

        {auth ? (
          <>
            <li className='nav__listitem'>
              <Link to='/admin'>
                {pathname === '/admin' ? (
                  <span className='nav__link nav__link--active'>Admin</span>
                ) : (
                  <span className='nav__link'>Admin</span>
                )}
              </Link>
            </li>
            <li className='nav__listitem'>
              <button onClick={logout} className='button button--form'>
                Log Out
              </button>
            </li>
          </>
        ) : (
          <li className='nav__listitem'>
            <Link to='/login'>
              {pathname === '/login' ? (
                <span className='nav__link nav__link--active'>login</span>
              ) : (
                <span className='nav__link '>login</span>
              )}
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
