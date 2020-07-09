import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
import LoginState from './LoginState'

const Menu = () => {
  return (
    <div>
      <Navbar collapseOnSelect expand='lg' bg='light' variant='light'>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link href='#' as='span'>
              <Link to='/'>Blogs</Link>
            </Nav.Link>
            <Nav.Link href='#' as='span'>
              <Link to='/users'>Users</Link>
            </Nav.Link>
            <Nav.Link href='#' as='span'>
              <LoginState />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default Menu