import { useContext, useState } from "react";
import { ListContext } from "./ListContext";
function Item({ item, index }) {
  const [list, setList] = useContext(ListContext);

  const handleDelete = (id) => {
    setList(
      list.filter((item) => {
        return item.id !== id;
      })
    );
  };

  const handleCheck = (id, checked) => {
    const newList = [...list].map((item) => {
      if (item.id === id) item.packed = checked;
      return item;
    });

    setList(newList);
  };

  return (
    <div
      key={item.item}
      className="d-flex align-items-center justify-content-between gap-3 w-auto"
    >
      <input
        type="checkbox"
        className="form-check-input cursor-pointer p-0"
        onChange={(e) => {
          handleCheck(item.id, e.target.checked);
        }}
      />
      <div
        className={`text mt-1 ${item.packed && "text-decoration-line-through"}`}
      >
        {item.count + " " + item.item}
      </div>
      <i
        className="fa-solid fa-x text-danger cursor-pointer mt-1"
        onClick={() => {
          handleDelete(item.id);
        }}
      ></i>
    </div>
  );
}

export default function List() {
  const [list, setList] = useContext(ListContext);
  const [sortType, setSortType] = useState("input");

  let sortedList;
  if (sortType === "input") sortedList = [...list];
  if (sortType === "description")
    sortedList = list.slice().sort((a, b) => {
      return a.item.localeCompare(b.item);
    });
  if (sortType === "packed")
    sortedList = list
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  return (
    <div className="list py-4 flex-grow-1 d-flex flex-column">
      <div className="container flex-grow-1 d-flex flex-column justify-content-start">
        <div className="items row gy-2 flex-grow-1 ">
          {sortedList.map((item, index) => (
            <Item key={item.id} item={item} index={index} />
          ))}
        </div>

        {list.length > 0 && (
          <div className="actions d-flex gap-4 justify-content-center ">
            <select
              className="form-select bg-main hover-none border-0 w-auto rounded-pill shadow-none"
              value={sortType}
              onChange={(e) => {
                setSortType(e.target.value);
              }}
            >
              <option value="input">Sort by input order</option>
              <option value="description">Sort by description</option>
              <option value="packed">Sort by packed status</option>
            </select>

            <button
              className="btn bg-main hover-none border-0 w-auto rounded-pill"
              onClick={() => {
                const confirmed = confirm(
                  "You sure, You want to delete all items?"
                );
                if (confirmed) setList([]);
              }}
            >
              CLEAR LIST
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
