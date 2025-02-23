import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import type { AppState } from "../store";
import * as C from "../store/counter";

export default function CounterTest() {
  const dispatch = useDispatch();
  // 중요: rootReducer와 AppState의 속성명을 동일하게 해야 한다. 틀리면 속성을 못찾는다.
  const counter = useSelector<AppState, C.State>(({ counter }) => counter);
  console.log("counter", counter);
  const increase = useCallback(() => dispatch(C.setCount(1)), [dispatch]);
  const decrease = useCallback(() => dispatch(C.setCount(-1)), [dispatch]);

  return (
    <section className="mt-4">
      <div className="flex justify-center p-4 mt-4">
        <div className="flex items-center justify-around w-1/3 text-blue-500 text-bold">
          <button className="btn btn-primary btn-lg" onClick={increase}>
            +
          </button>
          {counter}
          <button className="btn btn-primary btn-lg" onClick={decrease}>
            -
          </button>
        </div>
      </div>
    </section>
  );
}
