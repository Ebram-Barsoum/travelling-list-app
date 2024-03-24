import { useContext, useState } from "react";
import { ListContext } from "./ListContext";

export default function AddForm() {
  const [item, setItem] = useState("");
  const [count, setCount] = useState(1);
  const [list, setList] = useContext(ListContext);

  const handleSubmit = () => {
    if (item.trim()) {
      const newItem = {
        id: Date.now(),
        count,
        item,
        packed: false,
      };

      setList([...list, newItem]);
      setItem("");
      setCount(1);
    }
  };

  return (
    <div className="add-form py-4 mt-0">
      <div className="container">
        <form
          className="row gy-3 align-items-center justify-content-center"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <h6 className="col-md-5 text-center">
            What you need for your trip ?
          </h6>
          <div className="input w-auto">
            <select
              name="count"
              id="count"
              className="form-control cursor-pointer form-select rounded-pill"
              value={count}
              onChange={(e) => setCount(e.target.value)}
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => {
                return (
                  <option value={num} key={num}>
                    {num}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="input col-6 col-md-4">
            <input
              type="text"
              placeholder="Item name"
              className="form-control rounded-pill"
              value={item}
              onChange={(e) => {
                setItem(e.target.value);
              }}
            />
          </div>
          <button
            className="btn bg-main hover-none border-0 w-auto rounded-pill"
            type="submit"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
