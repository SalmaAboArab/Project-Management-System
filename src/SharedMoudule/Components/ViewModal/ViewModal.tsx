import { Modal } from 'react-bootstrap'

export default function ViewModal({userDetails,handleCloseView,showView}) {



  return <>
  
 <div className="d-flex justify-content-center "> {/* Wrap modal within this div */}
  <Modal
   centered
    show={showView}
    onHide={handleCloseView}
    keyboard={true}
  >
    <Modal.Header closeButton>
      <Modal.Title>User Details📑🙋‍♂️</Modal.Title>
    </Modal.Header>

    <Modal.Body className="h5">
      <div>
        <h5>
          User Name:<span> {userDetails.userName}</span>
        </h5>
        <h5>
          Email:<span> {userDetails.email}</span>
        </h5>
        <h5>
          This user:
          <span> {userDetails.isActivated ? "Active" : "no Active"}</span>
        </h5>
        <h5>
          PhoneNumber:<span>{userDetails.phoneNumber}</span>
        </h5>
      </div>
    </Modal.Body>
  </Modal>
</div>

  
  </>
}
