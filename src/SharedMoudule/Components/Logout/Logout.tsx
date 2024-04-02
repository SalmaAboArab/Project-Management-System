import { Button, Modal } from "react-bootstrap";

export default function Logout({
  handleCloseLogout,
  logout,
  showLogout
}) {
  return (
    <>
      <Modal show={showLogout} onHide={handleCloseLogout}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to logout?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Clicking on the logout button will log you out of the system.
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
