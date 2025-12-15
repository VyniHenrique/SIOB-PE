import { Card, Col, Container, Row } from "react-bootstrap";
import logo from '../../assets/logo.svg';

import './AuthCardLayout.css';

type Title= {
	title: string;
  children?: React.ReactNode;
}


export function AuthCardLayout({title, children}: Title) {
  return (
    <Container className="container-style">
      <Row className="w-100">
        <Col className="d-flex align-items-center justify-content-center p-0" xs={6}>
          <Card className="card-img-style w-100">
            <Card.Img src={logo} className="img-style" />
          </Card>
        </Col>
        <Col className="d-flex align-items-center justify-content-center p-0" xs={6}>
          <Card className="card-form-style w-100">
            <Card.Body className="">
              <Card.Title className="card-title-style">
                {title}
              </Card.Title>
              {children}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
