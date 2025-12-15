import { Navbar, Offcanvas } from "react-bootstrap";
import "./CustomNavBar.css";
import { useState } from "react";
import {
  ChartBarIcon,
  FileMagnifyingGlassIcon,
  FileTextIcon,
  GearSixIcon,
  HouseIcon,
  ListIcon,
  PencilSimpleIcon,
  SignOutIcon,
  UserCircleIcon,
  UsersThreeIcon,
  XIcon,
} from "@phosphor-icons/react";

type props = {
  nameMilitary: string;
};
export function CustomNavBar({ nameMilitary }: props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Navbar className="navbar-style">
      <div className="content-navbar-style">
        <ListIcon className="list-icon-style" onClick={handleShow} />
        <a href="">
          {nameMilitary}
          <UserCircleIcon className="ms-3" size={41} color="#000000" />
        </a>
      </div>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header className="d-flex justify-content-end align-ites-center">
          <XIcon weight="bold" onClick={handleClose} className="x-icon-style" />
        </Offcanvas.Header>

        <hr className="divider-style" />

        <Offcanvas.Body className="d-flex align-items-start flex-column w-100">
          <div className="content-div-style">
            <a href="/Home">
              <HouseIcon size={33} className="me-3" />
              Início
            </a>
          </div>

          <div className="content-div-style">
            <a href="/">
              <FileTextIcon size={33} className="me-3" />
              Relatórios e exportação
            </a>
          </div>

          <div className="content-div-style">
            <a href="/UserManagement">
              <UsersThreeIcon size={33} className="me-3" />
              Gestão de usuários
            </a>
          </div>

          <div className="content-div-style">
            <a href="/Logs">
              <FileMagnifyingGlassIcon size={33} className="me-3" />
              Auditoria e Logs
            </a>
          </div>

          <div className="content-div-style">
            <a href="/Dashboard">
              <ChartBarIcon size={33} className="me-3" />
              Dashboard operacional
            </a>
          </div>

          <div className="content-div-style">
            <a href="/">
              <PencilSimpleIcon size={33} className="me-3" />
              Criação/Edição de campos do formulário
            </a>
          </div>

          <div className="content-div-style">
            <a href="/">
              <GearSixIcon size={33} className="me-3" />
              Configurações
            </a>
          </div>
          
        <div className="d-flex align-items-center justify-content-center w-100 mt-3">
          <a href="/" className="sign-out-style">
            Sair
            <SignOutIcon className="ms-2" size={20} weight="bold"/>
          </a>
        </div>
        </Offcanvas.Body>

      </Offcanvas>
    </Navbar>
  );
}
