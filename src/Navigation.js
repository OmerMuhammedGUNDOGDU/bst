import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';

const Navigation = () => {

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="./">Ana Sayfa </Navbar.Brand>
            <Nav className="mr-auto">
                <NavLink className="d-inline p-3 bg-dark text-white" to="./">Tablolar</NavLink>
                <NavLink className="d-inline p-3 bg-dark text-white" to="../Data Item">Veri Kalemleri</NavLink>
            </Nav>

            <Form inline>
                <FormControl type="text" placeholder="Birşeyler Ara.." className="mr-sm-2" />
                <Button variant="outline-info">Ara</Button>
            </Form>
        </Navbar>
    )
}
export default Navigation;