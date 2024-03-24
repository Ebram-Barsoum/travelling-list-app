import { useContext } from "react";
import { ListContext } from "./ListContext.js";
export default function Footer() {
  const [list] = useContext(ListContext);

  if (!list.length)
    return (
      <em className="footer py-3 text-center">
        Start adding some items to your list. 🔥
      </em>
    );

  const numItems = list.length;
  const packedItems = list.filter((item) => item.packed).length;
  const percentage = Math.round((packedItems / list.length) * 100);

  return (
    <footer className="footer py-2">
      <p className="text-center">
        {percentage === 100 ? (
          "You got everything! Ready to go. ✈"
        ) : (
          <span>
            You have {numItems} items in your list.You already packed{" "}
            {packedItems}. ({percentage + "%"})
          </span>
        )}
      </p>
    </footer>
  );
}
