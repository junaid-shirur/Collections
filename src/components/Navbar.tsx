import React from 'react'
import Nav from 'react-bootstrap/Nav';
import { Navbar as NavContainer, Container as Con, Button } from 'react-bootstrap';
import styled from '@emotion/styled'

const Navbar: React.FC<any> = ({ favCount = 0 }) => {

    return (
        <NavContainer bg="light" variant="light">
            <Container>
                <NavContainer.Brand href="/home">Collections</NavContainer.Brand>
                <Nav className="me-auto">
                    <Nav.Link active href="/home">Home</Nav.Link>
                    <Nav.Link href="/favourites">Favourites{favCount}</Nav.Link>
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