import { Button, Modal } from "react-bootstrap";

export default function Logout({
  handleCloseLogout,
  logout,
  showLogout
}) {
  return (
    <>
      <Modal show={showLogout} onHide={handleCloseLogout} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
        <h5>Are you sure you want to logout?</h5>
          By clicking on this button you will get out of this app
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseLogout}>
            Close
          </Button>
          <Button variant="danger" onClick={logout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
