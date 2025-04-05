import { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Todo from "./components/Todo";

function App() {
  const [store, setStore] = useState([]);
  const doneTodos = store.filter((item) => item.done).length;
  const total = store.length;

  return (
    <>
      <Header />
      <div className="min-h-screen">
        <Todo store={store} setStore={setStore} />
      </div>
      <Footer total={total} doneTodos={doneTodos} />
    </>
  );
}

export default App;
