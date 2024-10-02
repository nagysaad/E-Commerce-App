

import { jwtDecode } from "jwt-decode";
import { Helmet } from "react-helmet";


export default function Profile() {



    const decode = jwtDecode(localStorage.getItem("userToken"));
  

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Profile</title>
      </Helmet>
      <div className="container">
        <div className="row mt-5">
          <div className="shadow p-5">
            <div className="d-flex align-items-center">
              <i className="fa-solid fa-circle-user mt-2 fs-3 me-3 mb-3"></i>
              <h2>Your Info</h2>
            </div>
            <ul className="list-unstyled px-5">
              <li>
                Name : <span className="fw-bold">{decode.name}</span>
              </li>
              <li>
                Email : <span className="fw-bold">{localStorage.getItem("userEmail")}</span>
              </li>
              <li>
                Role : <span className="fw-bold">{decode?.role}</span>
              </li>
            </ul>

            
           
          </div>
        </div>
      </div>
    </>
  );
}
