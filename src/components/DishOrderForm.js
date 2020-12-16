import "../styles/DishOrderForm.css";

function DishOrderForm(props) {
  return (
    <>
      <div className="container">
        <form
          style={{ borderRadius: "10px" }}
          className="m-5 border bg-light mx-auto col-xl-4 col-lg-4 col-sm-6  col-10 offset-xl-4 offset-lg-4 offset-sm-3 offset-1"
          onSubmit={props.handleSubmit}
        >
          <h4 className="p-3 d-flex justify-content-center">Dishes Form</h4>
          <div className="form-group">
            <label className="label">
              <b>Name:</b>
            </label>
            <input
              className="form-control"
              type="text"
              name="name"
              placeholder="Name of dish"
              onChange={props.handleChangeGeneralValues}
            />
          </div>
          <div className="form-group">
            <label className="label">
              <b>Preparation time:</b>
            </label>

            <input
              style={{ cursor: "pointer" }}
              type="time"
              className="form-control"
              name="preparation_time"
              value={props.preparation_time}
              id="settime"
              step="1"
              onChange={props.handleChangeGeneralValues}
            />
          </div>
          <div className="form-group">
            <label className="label">
              <b>Type:</b>
            </label>

            <select
              className="form-control"
              name="type"
              id=""
              onChange={props.handleChangeGeneralValues}
            >
              <option value="pizza">pizza</option>
              <option value="soup">soup</option>
              <option value="sandwich">sandwich</option>
            </select>
          </div>
          {props.getPositionForType()}
          <div className="d-flex justify-content-center">
            <button className=" btn btn-primary" type="submit">
              Submit
            </button>
          </div>
          <br />
        </form>
      </div>
    </>
  );
}

export default DishOrderForm;
