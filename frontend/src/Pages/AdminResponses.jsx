import { useEffect, useState } from "react";
import api from "../services/api";

function AdminResponses() {
  const [registrations, setRegistrations] = useState([]);
  const [search, setSearch] = useState("");

  const fetchRegistrations = async () => {
    try {
      const res = await api.get("/registrations");
      setRegistrations(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const deleteRegistration = async (id) => {
    if (!window.confirm("Delete this registration?")) return;

    try {
      await api.delete(`/registrations/${id}`);

      setRegistrations((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const filteredData = registrations.filter((item) =>
    item.fullName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container py-5">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>All Registrations</h2>

        <input
          type="text"
          className="form-control w-25"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="table-responsive">

        <table className="table table-bordered table-hover align-middle">

          <thead className="table-dark">

            <tr>
              <th>#</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Course</th>
              <th>Resume</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={item._id}>

                  <td>{index + 1}</td>

                  <td>
                    {item.photo && (
                      <img
                        src={`http://localhost:5000/uploads/${item.photo}`}
                        width="60"
                        height="60"
                        className="rounded-circle"
                        alt=""
                      />
                    )}
                  </td>

                  <td>{item.fullName}</td>

                  <td>{item.email}</td>

                  <td>{item.phone}</td>

                  <td>{item.course}</td>

                  <td>
                    {item.resume && (
                      <a
                        href={`http://localhost:5000/uploads/${item.resume}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-success btn-sm"
                      >
                        View Resume
                      </a>
                    )}
                  </td>

                  <td>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteRegistration(item._id)}
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  No Registration Found
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>
    </div>
  );
}

export default AdminResponses;