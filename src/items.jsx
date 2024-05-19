import "./item.css";
import PropTypes from "prop-types";

const DataDisplay = ({ data, onEditClick, onDeleteClick }) => {
  return (
    <div className="items">
      <h2>Data from Firestore:</h2>
      <div className="row mt-5">
        {data.map((item) => (
          <div className="col-lg-3 col-md-4 mt-3" key={item.id}>
            <div className="card bg-black text-white">
              <img
                src={item.imageURL}
                className="card-img-top img-fluid"
                alt="item"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">Name: {item.name}</h5>
                <p className="card-text">
                  <span>Email: {item.email}</span>
                  <br />
                  <span>Number: {item.number}</span>
                </p>
                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-dark"
                    onClick={() => onEditClick(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => onDeleteClick(item)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

DataDisplay.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      imageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  onEditClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default DataDisplay;
