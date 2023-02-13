import React from 'react'
import Nav from 'react-bootstrap/Nav';
import { Navbar as NavContainer, Container as Con, Button } from 'react-bootstrap';
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC<any> = ({ favCount = 0 }) => {
    const navigate = useNavigate()
    return (
        <NavContainer bg="light" variant="light">
            <Container>
                <NavContainer.Brand href="/home">Collections</NavContainer.Brand>
                <Nav className="me-auto">
                    <Nav.Link onClick={() => navigate('/home')}>Home</Nav.Link>
                    <Nav.Link onClick={() => navigate('/favourites')} >Favourites{`(${favCount})`}</Nav.Link>
                </Nav>
            </Container>
            <LogoutBtn variant="outline-secondary">Logout</LogoutBtn>
        </NavContainer>
    )
}
const Container = styled(Con)<any>(({ theme }) => ({
    marginLeft: 0
}))

const LogoutBtn = styled(Button)<any>(({ theme }) => ({
    marginRight: '16px'
}))

export default Navbar