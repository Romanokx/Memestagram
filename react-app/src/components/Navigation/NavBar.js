import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../Authorization/LogoutButton';
import PostFormPage from '../PostFormPage/PostFormPage';
import './Navbar.css'
import { useHistory } from 'react-router-dom';

const NavBar = () => {
  const [modalOn, setModalOn] = useState(false)
  const history = useHistory();
  const userId = useSelector((state) => state.session.user.id)

  // useEffect(() => {
  //   document.addEventListener("click", () => {
  //     setModalOn(false)
  //   })
  //   return () => document.removeEventListener("click", () => {setModalOn(false)})
  // }, [])
  //.

  const handleModal = (e) => {
    e.preventDefault();
    setModalOn((open) => !open);
  }

  return (
    <div>
      <nav className='navbar'>
        <div className='narbar-inside-main-div'>
          <div className='everything-inside'>

            <div className='navbar-h2'>
              <NavLink to='/' exact={true} activeClassName='active'>
                <h2 className='memestagram'>
                  Memestagram
                </h2>
              </NavLink>
            </div>

            <div className='navbar-search'>
              <input className='search-navbar'
                type='search'
                placeholder='Search'
              />
              <i className="fa-solid fa-magnifying-glass fa-sm icon-search-glass"></i>

            </div>

            <div className='navbar-things'>
              <i className="fa-solid fa-house" onClick={() => history.push('/')}></i>
              <i className="fa-regular fa-paper-plane"></i>
              <i className="fa-regular fa-square-plus" onClick={handleModal}></i>
              <i className="fa-regular fa-compass" onClick={() => history.push(`/explore`)}></i>
              <i className="fa-regular fa-heart"></i>
              <i className="fa-solid fa-circle-question" onClick={() => history.push(`/users/${userId}`)}></i>
            </div>

          </div>
        </div>
        {/* <ul>
          <li>
            <NavLink to='/' exact={true} activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/users' exact={true} activeClassName='active'>
              Users
            </NavLink>
          </li>
          <li>
          </li>
        </ul> */}
        <LogoutButton />
      </nav>


        {modalOn && <PostFormPage closeModal={setModalOn} />}
    </div>
  );
}

export default NavBar;
