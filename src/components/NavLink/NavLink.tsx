import { FC } from 'react';
import classNames from 'classnames';
import { Link } from 'react-scroll';
import './NavLink.scss';

type NavLinkProps = {
  // String array or single string of classNames
  classList?: Array<string> | string,
  // NavLink destination
  to: string,
  // extra pixels to scroll
  offset?: number,
};

const NavLink: FC<NavLinkProps> = ({ 
  children, 
  classList, 
  to, 
  offset 
}) => (
  <Link
    to={to}
    smooth
    offset={offset}
    className={classNames('nav-link px-4 mx-3', classList)}
    spy
    data-testid="nav-link"
  >
    {children}
  </Link>
);

export default NavLink;
