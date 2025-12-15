import "./RegisterUser.css";
import { Button, Dropdown, Form, FormGroup } from "react-bootstrap";
import { useForm, type SubmitHandler } from "react-hook-form";
import { AuthCardLayout } from "../../Components/AuthCardLayout/AuthCardLayout";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type Inputs = {
  nome: string;
  email: string;
  matricula: string;
  tipoUsuario: string;
};

export function RegisterUser() {
  const navigate = useNavigate();

  const [tipoUsuarioSelecionado, setTipoUsuarioSelecionado] = useState(
    "Selecione o tipo de usuário"
  );
  const tiposUsuarios = ["ADMIN", "CHEFE", "ANALISTA"];

  const handleSelecaoTipoUsuario = (tipoUsuario: string) => {
    setTipoUsuarioSelecionado(tipoUsuario);
    setValue("tipoUsuario", tipoUsuario)
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  register("tipoUsuario", {required: true});

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    navigate("02", { state: data });
  };

  watch();
  return (
    <AuthCardLayout title="Cadastro de usuário">
      <Form
        className="d-flex align-itens-center justify-content-center flex-column"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Form.Group className="form-group-style-register" controlId="formBasicCPF">
          <div className="w-100">
            <div className="d-flex align-items-start ms-1 mt-4">
              <Form.Label className="form-label-style">
                Digite o nome do militar
              </Form.Label>
            </div>
            <Form.Control
              {...register("nome", { required: true })}
              className="form-control-style-register"
              placeholder="Nome"
            />
            {errors.nome && (
              <p className="m-0 text-danger">
                Esse campo precisa ser preenchido
              </p>
            )}
          </div>
        </Form.Group>

        <Form.Group className="form-group-style-register">
          <div className="w-100 mt-5">
            <div className="d-flex align-items-start ms-1">
              <Form.Label className="form-label-style">Email</Form.Label>
            </div>
            <Form.Control
              {...register("email", { required: true })}
              className="form-control-style-register"
              placeholder="Email"
            />
            {errors.email && (
              <p className="m-0 text-danger">
                Esse campo precisa ser preenchido
              </p>
            )}
          </div>
        </Form.Group>
        <Form.Group className="form-group-style-register">
          <div className="w-100 mt-5">
            <div className="d-flex align-items-start ms-1">
              <Form.Label className="form-label-style">Matrícula</Form.Label>
            </div>
            <Form.Control
              {...register("matricula", { required: true })}
              className="form-control-style-register"
              placeholder="Matrícula"
            />
            {errors.matricula && (
              <p className="m-0 text-danger">
                Esse campo precisa ser preenchido
              </p>
            )}
          </div>
        </Form.Group>

        <FormGroup>
          <div className="w-100 mt-3">
            <div className="d-flex align-items-start justify-content-center">
              <Dropdown>
                <Dropdown.Toggle variant="secondary">
                  {tipoUsuarioSelecionado}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {tiposUsuarios.map((tipoUsuario, index) => (
                    <Dropdown.Item
                      key={index}
                      onClick={() => handleSelecaoTipoUsuario(tipoUsuario)}
                    >
                      {tipoUsuario}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
                {errors.tipoUsuario && (
                  <p className="m-0 text-danger">
                   É necessário selecionar o tipo de usuário
                  </p>
                )}
              </Dropdown>
            </div>
          </div>
        </FormGroup>

        <div className="d-flex align-items-center justify-content-center flex-column">
          <Button
            as="input"
            type="submit"
            className="register-user-next-style mt-5"
            value={"Próximo passo"}
          />
        </div>
      </Form>
    </AuthCardLayout>
  );
}
