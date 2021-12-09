import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

export default function SignUpModal() {
  const { modalState, toggleModals, signIn } = useContext(UserContext);

  const navigate = useNavigate();

  const [validation, setValidation] = useState("");

  const inputs = useRef([]);
  const addInputs = (el) => {
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el);
    }
  };
  const formRef = useRef();

  const handleForm = async (e) => {
    e.preventDefault();
    console.log(inputs);
    try {
      const cred = await signIn(
        inputs.current[0].value,
        inputs.current[1].value
      );
      // à tester
      // formRef.current.reset();
      setValidation("");
      // console.log(cred);
      toggleModals("close");
      navigate("/private/private-home");
    } catch {
      setValidation("Wopsy, email and/or password incorrect")
    }
  };

  const closeModal = () => {
    setValidation("");
    toggleModals("close");
  };

  return (
    <>
      {modalState.signInModal && (
        <div className="position-fixed top-0 vw-100 vh-100">
          <div
            onClick={closeModal}
            className="w-100 h-100 bg-dark bg-opacity-75"
          ></div>
          <div
            className="position-absolute top-50 start-50 translate-middle"
            style={{ minWidth: "400px" }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Sign Up</h5>
                  <button onClick={closeModal} className="btn-close"></button>
                </div>

                <div className="modal-body">
                  <form
                    ref={formRef}
                    onSubmit={handleForm}
                    className="sign-up-form"
                  >
                    <div className="mb-3">
                      <label htmlFor="signInEmail" className="form-label">
                        Email adress
                      </label>
                      <input
                        ref={addInputs}
                        name="email"
                        required
                        type="email"
                        className="form-control"
                        id="signInEmail"
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="signInPwd" className="form-label">
                        Password
                      </label>
                      <input
                        ref={addInputs}
                        name="pwd"
                        required
                        type="password"
                        className="form-control"
                        id="signInPwd"
                      />
                      <p className="text-danger mt-1">{validation}</p>
                    </div>

                    <button className="btn btn-primary">Submit</button>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
