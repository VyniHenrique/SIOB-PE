import { Button, Form, FormCheck } from "react-bootstrap";
import "./Login.css";
import { useForm, type SubmitHandler } from "react-hook-form";
import { AuthCardLayout } from "../../Components/AuthCardLayout/AuthCardLayout";
import { useNavigate } from "react-router-dom";
import { apiRenderLink } from "../../routes/routes";

type Inputs = {
  matricula: string;
  senha: string;
};

export function Login() {

  const navigate = useNavigate();
   


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {


    try {
      const response = await fetch(`${apiRenderLink}/usuario?matricula=${data.matricula}&senha=${data.senha}`);

      if (response.ok){
        console.log("Login realizado com sucesso!");
        navigate('/Home', {state: data.matricula});
      } else {
          console.error("Falha no login: ", response.status);
      }
    } catch (error) {
      console.error(error);
    }

  };



  watch();

  return (
    <AuthCardLayout title="Bem-vindo ao SIOB-PE" >
      <Form
        className="d-flex align-itens-center justify-content-center flex-column"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Form.Group className="form-group-style" controlId="formBasicCPF">
          <div className="w-100">
            <div className="d-flex align-items-start ms-1 mt-5">
              <Form.Label className="form-label-style">Matrícula</Form.Label>
            </div>
            <Form.Control
              {...register("matricula", { required: true })}
              className="form-control-style"
              placeholder="matrícula"
            />
            {errors.matricula && (
              <p className="m-0 text-danger">
                Esse campo precisa ser preenchido
              </p>
            )}
          </div>
        </Form.Group>

        <Form.Group className="form-group-style">
          <div className="w-100 mt-5">
            <div className="d-flex align-items-start ms-1">
              <Form.Label className="form-label-style">Senha</Form.Label>
            </div>
            <Form.Control
              {...register("senha", { required: true })}
              className="form-control-style"
              placeholder="senha"
            />
            {errors.senha && (
              <p className="m-0 text-danger">
                Esse campo precisa ser preenchido
              </p>
            )}
          </div>
        </Form.Group>
        <div className="div-checkbox">
          {['checkbox'].map( (type) => (
            <div key={`inline-${type}`}>
              <FormCheck className="checkbox-style" inline label="Lembre-se de mim" />
            </div>
          ))}
        </div>
        <div className="d-flex align-items-center justify-content-center flex-column mt-4">
          <Button
            as="input"
            type="submit"
            className="button-style"
            value={"Entrar"}
          />
          <a className="mt-2 text-dark" href="/">Esqueci minha senha</a>
        </div>
      </Form>
    </AuthCardLayout>
  );
}
