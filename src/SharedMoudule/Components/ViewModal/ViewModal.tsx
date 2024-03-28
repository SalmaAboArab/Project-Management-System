import { Modal } from "react-bootstrap";

export default function ViewModal({ userDetails, handleCloseView, showView }) {
  return (
    <>
      <div className="d-flex justify-content-center ">
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
            
              <div className="d-flex flex-column gap-3 ">
                <h5 className="text-success">
                ✅ User Name <span className="mx-1 fw-bold text-black">:</span>
                  <span className="text-black"> {userDetails.userName}</span>
                </h5>

                <h5 className="text-success">
                👤 This user<span className="mx-1 fw-bold text-black">:</span>
                  <span className={`${userDetails.isActivated ? "bg-success " : "bg-danger"} text-black p-1 rounded-2
                    `}>
                    
                    {userDetails.isActivated ? "Active" : "no Active"}
                  </span>
                </h5>
                <h5 className="text-success">
                📞PhoneNumber<span className="mx-1 fw-bold text-black">:</span>
                  <span className="text-black"> {userDetails.phoneNumber}</span>
                </h5>
                <h5 className="text-success">
                📧 Email<span className="mx-1 fw-bold text-black">:</span>
                  <span className="text-black"> {userDetails.email}</span>
                </h5>
              </div>
          
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}
