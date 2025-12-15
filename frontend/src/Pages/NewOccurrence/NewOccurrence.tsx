import {
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  Form,
  FormControl,
  Row,
} from "react-bootstrap";
import { CustomNavBar } from "../../Components/CustomNavBar/CustomNavbar";
import "./NewOccurrence.css";
import { CaretDownIcon } from "@phosphor-icons/react";
import DatePicker, { registerLocale } from "react-datepicker";
import { ptBR } from "date-fns/locale";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { apiRenderLink } from "../../routes/routes";

registerLocale("pt-BR", ptBR);

type Inputs = {
  diretoria: string;
  viatura: string;
  numeroViatura: string;
  numeroAviso: string;
  codigoLocalOcorrencia: string;
  grupamento: string;
  dataHoraAcionamento: Date;
  pontoBase: string;
  formaAcionamento: string;
  localAcionamento: string;
  regiaoAcionamento: string;
  ais: string;
  municipio: string;
  bairro: string;
  tipoLogradouro: string;
  logradouro: string;
  naturezaOcorrencia: string;
  subGrupoOcorrencia: string;
  situacaoOcorrencia: "ATENDIDA" | "EM_ANDAMENTO" | "NAO_ATENDIDA";
};

export function NewOccurrence() {

  const diretorias = ["DIM"];
  const tipoLogradouro = ["Av", "PE", "Travessa", "Rua", "BR", "Outro"];
  const tipoNaturezasOcorrencia = [
    "APH",
    "Incêndio",
    "Salvamento",
    "Produtos perigosos",
    "Prevenção",
  ];

  const navigate = useNavigate();

  const { register, handleSubmit, control } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);

    const dataFormatada = format(
      data.dataHoraAcionamento,
      "yyyy-MM-dd'T'HH:mm:ss"
    );

    const dadosParaApi = {
      ...data,
      dataHoraAcionamento: dataFormatada,
      situacaoOcorrencia: "EM_ANDAMENTO"
      
    };

    try {
      const response = await fetch(`${apiRenderLink}/ocorrencia`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosParaApi),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Falha ao cadastrar ocorrencia.");
      }

      navigate("/Home");

    } catch (erros) {
      console.log(erros);
    }

  };

  return (
    <>
      <CustomNavBar nameMilitary="Major Silva" />

      <Container fluid className="container-new-occurrence-style">
        <Row className="d-flex align-items-center justify-content-center mt-4">
          <Col md={10}>
            <Card>
              <Card.Header className="text-center border-bottom-0">
                Preencha o formulário
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row>
                    <Col className="text-center">
                      <p>Selecione a diretoria</p>
                      <Controller
                        control={control}
                        name="diretoria"
                        defaultValue="Diretorias"
                        render={({ field }) => (
                          <Dropdown>
                            <Dropdown.Toggle
                              size="lg"
                              variant="secondary"
                              className="w-100 no-caret d-flex align-items-center justify-content-between"
                            >
                              {field.value}
                              <CaretDownIcon weight="bold" size={20} />
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="bg-dark-subtle">
                              {diretorias.map((diretoria, index) => (
                                <Dropdown.Item
                                  key={index}
                                  onClick={() => field.onChange(diretoria)}
                                  className="bg-dark-subtle"
                                >
                                  {diretoria}
                                </Dropdown.Item>
                              ))}
                            </Dropdown.Menu>
                          </Dropdown>
                        )}
                      />
                    </Col>
                    <Col className="text-center">
                      <p>Viatura empregada</p>
                      <FormControl
                        className="mx-1 form-control-style"
                        {...register("viatura")}
                      />
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col className="text-center">
                      <p>Digite o número do aviso (I-NETDISPATCHER)</p>
                      <FormControl
                        className="mx-1 form-control-style"
                        {...register("numeroAviso")}
                      />
                    </Col>

                    <Col className="text-center">
                      <p>Digite o n° da viatura</p>
                      <FormControl
                        className="mx-1 form-control-style"
                        {...register("numeroViatura")}
                      />
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col className="text-center">
                      <p>Código do local da ocorrência</p>
                      <FormControl
                        className="mx-1 form-control-style"
                        {...register("codigoLocalOcorrencia")}
                      />
                    </Col>

                    <Col className="text-center">
                      <p>Grupamento</p>
                      <FormControl
                        className="mx-1 form-control-style"
                        {...register("grupamento")}
                      />
                    </Col>
                    <Col md={2} className="text-center">
                      <p>Data/Hora do acionamento</p>
                      <Controller
                        control={control}
                        name="dataHoraAcionamento"
                        render={({ field }) => (
                          <DatePicker
                            locale={"pt-BR"}
                            selected={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            ref={field.ref}
                            showTimeInput
                            timeInputLabel="Hora: "
                            timeFormat="HH:mm"
                            dateFormat="dd/MM/yyyy HH:mm"
                            placeholderText="Selecione a data e hora"
                            autoComplete="off"
                            className="mx-1 form-control-style border-0 rounded"
                          />
                        )}
                      />
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col md={4} className="text-center">
                      <p>Ponto base</p>
                      <FormControl
                        className="mx-1 form-control-style"
                        {...register("pontoBase")}
                      />
                    </Col>

                    <Col className="text-center">
                      <p>Forma de acionamento</p>
                      <FormControl
                        className="mx-1 form-control-style"
                        {...register("formaAcionamento")}
                      />
                    </Col>
                    <Col className="text-center">
                      <p>Local do acionamento</p>
                      <FormControl
                        className="mx-1 form-control-style"
                        {...register("localAcionamento")}
                      />
                    </Col>
                    <Col md={2} className="text-center">
                      <p>Região</p>
                      <FormControl
                        className="mx-1 form-control-style"
                        {...register("regiaoAcionamento")}
                      />
                    </Col>
                  </Row>

                  <Row className="mt-3">
                    <Col className="text-center">
                      <p>AIS</p>
                      <FormControl
                        className="mx-1 form-control-style"
                        {...register("ais")}
                      />
                    </Col>
                    <Col className="text-center">
                      <p>Município</p>
                      <FormControl
                        className="mx-1 form-control-style"
                        {...register("municipio")}
                      />
                    </Col>
                    <Col className="text-center">
                      <p>Bairro</p>
                      <FormControl
                        className="mx-1 form-control-style"
                        {...register("bairro")}
                      />
                    </Col>
                    <Col className="text-center">
                      <p>Tipo de logradouro</p>
                      <Controller
                        control={control}
                        name="tipoLogradouro"
                        defaultValue="Selecione o tipo de logradouro"
                        render={({ field }) => (
                          <Dropdown>
                            <Dropdown.Toggle variant="secondary" size="lg">
                              {field.value}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              {tipoLogradouro.map((logradouro, index) => (
                                <Dropdown.Item
                                  key={index}
                                  onClick={() => field.onChange(logradouro)}
                                >
                                  {logradouro}
                                </Dropdown.Item>
                              ))}
                            </Dropdown.Menu>
                          </Dropdown>
                        )}
                      />
                    </Col>
                    <Col className="text-center">
                      <p>Logradouro</p>
                      <FormControl
                        className="mx-1 form-control-style"
                        {...register("logradouro")}
                      />
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col className="text-center">
                      <p>Natureza da ocorrência</p>
                      <Controller
                        control={control}
                        name="naturezaOcorrencia"
                        defaultValue="Selecione a natureza da ocorrência"
                        render={({ field }) => (
                          <Dropdown>
                            <Dropdown.Toggle variant="secondary" size="lg">
                              {field.value}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              {tipoNaturezasOcorrencia.map(
                                (naturezaOcorrencia, index) => (
                                  <Dropdown.Item
                                    key={index}
                                    onClick={() =>
                                      field.onChange(naturezaOcorrencia)
                                    }
                                  >
                                    {naturezaOcorrencia}
                                  </Dropdown.Item>
                                )
                              )}
                            </Dropdown.Menu>
                          </Dropdown>
                        )}
                      />
                    </Col>
                    <Col className="text-center">
                      <p>Subgrupo da ocorrência</p>
                      <FormControl
                        className="mx-1 form-control-style"
                        {...register("subGrupoOcorrencia")}
                      />
                    </Col>
                  </Row>

                  <Row className=" mt-5">
                    <Col className="d-flex align-items-center justify-content-center w-100">
                      <Button
                        value={"Registrar ocorrência"}
                        as="input"
                        type="submit"
                        size="lg"
                      />
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
