import api from "../services/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialState = {
  fullName: "",
  email: "",
  phone: "",
  gender: "",
  dob: "",
  address: "",
  college: "",
  course: "",
  semester: "",
  skills: [],
  photo: null,
  resume: null,
  agree: false,
};

function RegistrationForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox" && name === "skills") {
      let updatedSkills = [...formData.skills];

      if (checked) {
        updatedSkills.push(value);
      } else {
        updatedSkills = updatedSkills.filter((item) => item !== value);
      }

      setFormData({
        ...formData,
        skills: updatedSkills,
      });
    } else if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else if (type === "file") {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("fullName", formData.fullName);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("gender", formData.gender);
      data.append("dob", formData.dob);
      data.append("address", formData.address);
      data.append("college", formData.college);
      data.append("course", formData.course);
      data.append("semester", formData.semester);
      data.append("agree", formData.agree);

      data.append("skills", JSON.stringify(formData.skills));

      if (formData.photo) {
        data.append("photo", formData.photo);
      }

      if (formData.resume) {
        data.append("resume", formData.resume);
      }

      const response = await api.post("/registrations", data);

      console.log(response.data);

      navigate("/success");
    } catch (error) {
      console.error(error);
      alert("Registration Failed");
    }
  };

  return (
    <div
      className="container-fluid py-5"
      style={{ background: "#f0ebf8", minHeight: "100vh" }}
    >
      <div className="row justify-content-center">
        <div className="col-lg-7 col-md-9">

          <div
            className="bg-white rounded shadow-sm overflow-hidden mb-4"
            style={{ borderTop: "12px solid #673ab7" }}
          >
            <div className="p-4">
              <h2 className="fw-bold">Student Registration Form</h2>

              <p className="text-muted mb-0">
                Fill all required details before submitting.
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="card mb-3 shadow-sm">
              <div className="card-body">
                <label className="form-label fw-semibold">
                  Full Name *
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="card mb-3 shadow-sm">
              <div className="card-body">
                <label className="form-label fw-semibold">
                  Email *
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>
            </div>

            <div className="card mb-3 shadow-sm">
              <div className="card-body">

                <label className="form-label fw-semibold">
                  Phone Number *
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />

              </div>
            </div>

            <div className="card mb-3 shadow-sm">
              <div className="card-body">

                <label className="form-label fw-semibold d-block">
                  Gender
                </label>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    value="Male"
                    onChange={handleChange}
                  />

                  <label className="form-check-label">
                    Male
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    value="Female"
                    onChange={handleChange}
                  />

                  <label className="form-check-label">
                    Female
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    value="Other"
                    onChange={handleChange}
                  />

                  <label className="form-check-label">
                    Other
                  </label>
                </div>

              </div>
            </div>

            <div className="card mb-3 shadow-sm">
              <div className="card-body">

                <label className="form-label fw-semibold">
                  Date of Birth
                </label>

                <input
                  type="date"
                  className="form-control"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                />

              </div>
            </div>

            <div className="card mb-3 shadow-sm">
              <div className="card-body">

                <label className="form-label fw-semibold">
                  Address
                </label>

                <textarea
                  rows="4"
                  className="form-control"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />

              </div>
            </div>

            <div className="card mb-3 shadow-sm">
              <div className="card-body">

                <label className="form-label fw-semibold">
                  College
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                />

              </div>
            </div>

            <div className="card mb-3 shadow-sm">
              <div className="card-body">

                <label className="form-label fw-semibold">
                  Course
                </label>

                <select
                  className="form-select"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                >
                  <option value="">Select Course</option>
                  <option>B.Tech</option>
                  <option>BCA</option>
                  <option>MCA</option>
                  <option>M.Tech</option>
                </select>

              </div>
            </div>

            <div className="card mb-3 shadow-sm">
              <div className="card-body">

                <label className="form-label fw-semibold">
                  Semester
                </label>

                <select
                  className="form-select"
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                >
                  <option value="">Select Semester</option>

                  {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                    <option key={item}>{item}</option>
                  ))}

                </select>

              </div>
            </div>

            <div className="card mb-3 shadow-sm">
              <div className="card-body">

                <label className="form-label fw-semibold d-block">
                  Skills
                </label>

                {["HTML", "CSS", "JavaScript", "React", "Node", "MongoDB"].map((skill) => (
                  <div className="form-check" key={skill}>

                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="skills"
                      value={skill}
                      onChange={handleChange}
                    />

                    <label className="form-check-label">
                      {skill}
                    </label>

                  </div>
                ))}

              </div>
            </div>

            <div className="card mb-3 shadow-sm">
              <div className="card-body">

                <label className="form-label fw-semibold">
                  Upload Profile Photo
                </label>

                <input
                  className="form-control"
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={handleChange}
                />

              </div>
            </div>

            <div className="card mb-3 shadow-sm">
              <div className="card-body">

                <label className="form-label fw-semibold">
                  Upload Resume
                </label>

                <input
                  className="form-control"
                  type="file"
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  onChange={handleChange}
                />

              </div>
            </div>

            <div className="card mb-4 shadow-sm">
              <div className="card-body">

                <div className="form-check">

                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="agree"
                    checked={formData.agree}
                    onChange={handleChange}
                    required
                  />

                  <label className="form-check-label">
                    I agree to the Terms & Conditions
                  </label>

                </div>

              </div>
            </div>

            <button
              className="btn btn-primary px-5"
              style={{ background: "#673ab7", borderColor: "#673ab7" }}
            >
              Submit
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;