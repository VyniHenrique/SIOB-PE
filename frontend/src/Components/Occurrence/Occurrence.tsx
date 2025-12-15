import { Button, Card, Col, Container, Row } from "react-bootstrap";
import "./Occurrence.css";
import { ArrowUpRightIcon, TrashIcon } from "@phosphor-icons/react";
import { apiRenderLink } from "../../routes/routes";

interface Props {
  id: string;
  municipio: string;
  logradouro: string;
  bairro: string;
  dataHoraAcionamento: string;
  onDeleteSucess: () => void;
}

export function Occurrence({
  municipio,
  logradouro,
  bairro,
  dataHoraAcionamento,
  id,
  onDeleteSucess
}: Props) {


  const formatTime = (dateString: string) => {
    if (!dateString) return "--:--";

    const date = new Date(dateString);

    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };


  const handleDeleteIncident = async (id: string) => {
  try{
    const response = await fetch(`${apiRenderLink}/ocorrencia/${id}`, {
      method: "DELETE"
    });
    if (response.ok){
      console.log("Deletado");
      onDeleteSucess();
    }
  } catch(error){
    console.error(error);
  }
}
  return (
    <Container fluid className="mb-3">
      <Row>
        <Col>
          <Card className="card-occurrence w-100">
            <Card.Body className="card-body-occurrence">
              <div className="div-card-body-occurrence">
                <h4>Incendio Residencia</h4>
                <div className="d-flex align-items-center justify-content-start">
                  <p>Local:</p>
                  <p>
                    {logradouro} - {municipio} | {bairro}
                  </p>
                  <p>Hora:</p>
                  <p>{formatTime(dataHoraAcionamento)}</p>
                </div>
              </div>
              <div>
                <Button onClick={() => handleDeleteIncident(id)} className="button-modal-occurrence">
                  <TrashIcon size={37} weight="bold" />
                </Button>
                <Button className="button-modal-occurrence">
                  <ArrowUpRightIcon size={37} weight="bold" />
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
