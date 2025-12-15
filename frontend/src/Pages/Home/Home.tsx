import {
  Button,
  Card,
  Col,
  Container,
  FormControl,
  InputGroup,
  Pagination,
  Row,
} from "react-bootstrap";
import { CustomNavBar } from "../../Components/CustomNavBar/CustomNavbar";
import "./Home.css";
import {
  FunnelIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@phosphor-icons/react";
import { Occurrence } from "../../Components/Occurrence/Occurrence";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import type { LatLngTuple } from "leaflet";
import "../../../node_modules/leaflet/dist/leaflet.css";
import { apiRenderLink } from "../../routes/routes";
import { useEffect, useState } from "react";


interface Incident {
  id: string;
  municipio: string;
  logradouro: string;
  bairro: string;
  dataHoraAcionamento: string;
  situacaoOcorrencia: 'ATENDIDA' | 'EM_ANDAMENTO' | 'NAO_ATENDIDA' | 'DELETADA';
}
export function Home() {
  const position: LatLngTuple = [-8.05428, -34.8813];
  const [occurrences, setOccurrences] = useState<Incident[]>([]);

  const findAllIncidents = async () => {

    try{
      const response = await fetch(`${apiRenderLink}/ocorrencia`);
      const data = await response.json();
      const activeIncidents = data.filter( (item: Incident) => item.situacaoOcorrencia !== "DELETADA");
      setOccurrences(activeIncidents);
    } catch (error){
      console.error(error);
    }
  };


  useEffect( () => {
    findAllIncidents();
  }, [])

  return (
    <>
      <CustomNavBar nameMilitary="Major Silva" />

      <Container fluid>
        <Row className="d-flex justify-content-center">
          <Col md={10}>
            <Card className="card-top-style">
              <Card.Body className="d-flex align-items-center justify-content-between w-100">
                <a href="/NewOccurrence" className="text-decoration-none">
                  <Button className="ms-3 home-button-style">
                    <PlusIcon size={25} weight="bold" className="me-2" />
                    Nova ocorrência
                  </Button>
                </a>

                <div className="home-header-content">
                  <h4>Ocorências ativas</h4>
                  <h2>21</h2>
                </div>
                <div className="home-header-content">
                  <h4>Finalizadas hoje</h4>
                  <h2>12</h2>
                </div>
                <div className="home-header-content">
                  <h4>Aguardando</h4>
                  <h2>8</h2>
                </div>
                <div className="home-header-content">
                  <h4>Equipes ativas</h4>
                  <h2>20</h2>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Container fluid className="mt-5">
        <Row className="d-flex justify-content-center">
          <Col md={7}>
            <Card className="card-list-style">
              <Card.Body className="d-flex align-items-center justify-conten-center flex-column w-100">
                <Row className="w-100">
                  <Col md={6}>
                    <InputGroup>
                      <Button className="list-occurrence-button-style">
                        <MagnifyingGlassIcon size={24} />
                      </Button>
                      <FormControl className="list-occurrence-form-control-style" />
                      <Button className="list-occurrence-button-style">
                        <FunnelIcon size={24} className="" />
                      </Button>
                    </InputGroup>
                  </Col>
                  <Col
                    md={6}
                    className="d-flex align-items-center justify-content-center"
                  >
                    <h3>Lista de ocorrencias</h3>
                  </Col>
                </Row>

                <hr className="w-100" />

                <Row className="w-100">
                  <Col md={12}>
                    <ul className="occurrence-list">
                      {occurrences.length > 0 ? (
                        occurrences.map((item) => (
                          <li key={item.id}> 
                            <Occurrence id={item.id} municipio={item.municipio} dataHoraAcionamento={item.dataHoraAcionamento} logradouro={item.logradouro} bairro={item.bairro} onDeleteSucess={findAllIncidents}/> 
                          </li>
                        ))
                      ) : (
                        <p className="text-center mt-3">Nenhuma ocorrência encontrada.</p>
                      )}
                    </ul>

                    <div className="d-flex align-items-center justify-content-center">
                      <Pagination>
                        <Pagination.First />
                        <Pagination.Prev />
                        <Pagination.Item>{1}</Pagination.Item>
                        <Pagination.Ellipsis />

                        <Pagination.Item>{10}</Pagination.Item>
                        <Pagination.Item>{11}</Pagination.Item>
                        <Pagination.Item>{12}</Pagination.Item>
                        <Pagination.Item>{13}</Pagination.Item>
                        <Pagination.Item>{14}</Pagination.Item>

                        <Pagination.Ellipsis />
                        <Pagination.Item>{20}</Pagination.Item>
                        <Pagination.Next />
                        <Pagination.Last />
                      </Pagination>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 home-card-map">
              <Card.Title className="d-flex align-items-bottom justify-content-center mt-2">
                Mapa de ocorrencias
              </Card.Title>
              <Card.Body className="p-1">
                <MapContainer
                  center={position}
                  zoom={10}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={position}>
                    <Popup>Test</Popup>
                  </Marker>
                </MapContainer>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
