import { Button, Card, Col, Container, Dropdown, Row } from "react-bootstrap";
import { CustomNavBar } from "../../Components/CustomNavBar/CustomNavbar";
import "./LogsPage.css";
import DatePicker, { registerLocale } from "react-datepicker";
import { useState } from "react";
import { ptBR } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("pt-BR", ptBR);
export function LogsPage() {
  const [dataInicial, setDataInicial] = useState<Date | null>(new Date());
  const [dataFinal, setDataFinal] = useState<Date | null>(new Date());

  const [regiaoSelecionada, setRegiaoSelecionada] =
    useState("Todas as regiões");
  const regioes = ["RMR"];
  const handleSelecaoRegiao = (regiao: string) => {
    setRegiaoSelecionada(regiao);
  };

  const [turnoSelecionado, setTurnoSelecionado] = useState("Todos os turnos");
  const turnos = ["Manhã", "Tarde", "Noite", "Madrugada"];
  const handleSelecaoTurno = (turno: string) => {
    setTurnoSelecionado(turno);
  };

	const handleLimparFiltros = () => {
    // Redefine cada estado para o seu valor inicial
    setDataInicial(new Date());
    setDataFinal(new Date());
    setRegiaoSelecionada("Todas as regiões");
    setTurnoSelecionado("Todos os turnos");
  };
  return (
    <>
      <CustomNavBar nameMilitary="Major Silva" />

      <Container fluid className="mt-3">
        <Row>
          <Col md={12}>
            <Card className="log-page-card">
              <Card.Body>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center justify-content-center flex-column">
                    <p className="mb-1">Região</p>
                    <Dropdown>
                      <Dropdown.Toggle variant="secondary">
                        {regiaoSelecionada}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() =>
                            handleSelecaoRegiao("Todas as regiões")
                          }
                        >
                          Todas as regiões
                        </Dropdown.Item>
                        {regioes.map((regiao, index) => (
                          <Dropdown.Item
                            key={index}
                            onClick={() => handleSelecaoRegiao(regiao)}
                          >
                            {regiao}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>

                  <div className="d-flex align-items-center justify-content-center flex-column">
                    <p className="mb-1">Turno</p>
                    <Dropdown>
                      <Dropdown.Toggle variant="secondary">
                        {turnoSelecionado}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() =>
                            handleSelecaoTurno("Todos os turnos")
                          }
                        >
                          Todos os turnos
                        </Dropdown.Item>
                        {turnos.map((turno, index) => (
                          <Dropdown.Item
                            key={index}
                            onClick={() => handleSelecaoTurno(turno)}
                          >
                            {turno}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>

                  <div className="d-flex align-items-center justify-content-center flex-column">
                    <p className="mb-0">Data inicial</p>
                    <DatePicker
                      locale={"pt-BR"}
                      selected={dataInicial}
                      onChange={(date) => setDataInicial(date)}
                      selectsStart
                      startDate={dataInicial}
                      placeholderText="Selecione a data inicial"
                      autoComplete="off"
                      className="logs-filter-date-style"
                    />
                  </div>

                  <div className="d-flex align-items-center justify-content-center flex-column">
                    <p className="mb-0">Data final</p>
                    <DatePicker
                      locale={"pt-BR"}
                      selected={dataFinal}
                      onChange={(date) => setDataFinal(date)}
                      selectsStart
                      startDate={dataFinal}
                      placeholderText="Selecione a data inicial"
                      autoComplete="off"
                      className="logs-filter-date-style"
                    />
                  </div>
                </div>
                <div className="w-100 d-flex align-items-center justify-content-center mt-5">
                  <Button
                    as="input"
                    type="submit"
                    value={"Aplicar filtros"}
                    className="logs-filter-apply-button-style me-3"
                  />
                  <Button
                    as="input"
                    type="submit"
                    value={"Limpar filtros"}
                    className="logs-filter-clear-button-style"
					onClick={handleLimparFiltros}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col className="mt-5">
            <Card className="log-page-card">
              <Card.Title className="mt-3 ms-3 mb-0">
                Registros de auditoria
              </Card.Title>
              <Card.Body className="flex-column pt-0">
                <div className="d-flex justify-content-between my-4 list-log-div-card-body-content">
                  <div className="d-flex align-items-start justify-content-center flex-column ms-5">
                    <h5>Joao Silva</h5>
                    <p>Comandante</p>
                    <p className="list-log-type-create p-1">Criação</p>
                    <p>Criou uma nova ocorrência de incêndio</p>
                    <p>
                      Ocorrência #2024-001 criada com localização na Rua das
                      Flores, 123 - Boa Viagem
                    </p>
                  </div>
                  <div className="d-flex align-items-start justify-content-center flex-column h-100">
                    <p>22/11/2004 | 14:20</p>
                  </div>
                </div>

                <div className="d-flex justify-content-between my-4 list-log-div-card-body-content">
                  <div className="d-flex align-items-start justify-content-center flex-column ms-5">
                    <h5>Maria Santos</h5>
                    <p>Sargento</p>
                    <p className="list-log-type-update p-1">Atualização</p>
                    <p>Atualizou o status de uma ocorrência</p>
                    <p>
                      Status alterado de “Em Andamento” para “Finalizada” na
                      ocorrência #2024-001
                    </p>
                  </div>
                  <div className="d-flex align-items-start justify-content-center flex-column h-100">
                    <p>22/11/2004 | 14:20</p>
                  </div>
                </div>

                <div className="d-flex justify-content-between my-4 list-log-div-card-body-content">
                  <div className="d-flex align-items-start justify-content-center flex-column ms-5">
                    <h5>Ana Costa</h5>
                    <p>Tenente</p>
                    <p className="list-log-type-view p-1">Visualização</p>
                    <p>Visualizou relatório de ocorrências</p>
                    <p>
                      Acessou relatório do seguinte período: 15/10/2024 -
                      20/11/2024
                    </p>
                  </div>
                  <div className="d-flex align-items-start justify-content-center flex-column h-100">
                    <p>22/11/2004 | 14:20</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
