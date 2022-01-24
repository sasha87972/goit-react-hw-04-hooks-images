import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Searchbar from "./components/searchbar";
import SearchResult from "./components/searchResult";

function App() {
  const [query, serQuery] = useState("");
  const submitForm = (searchWord) => {
    serQuery(searchWord);
  };
  return (
    <>
      <Searchbar onSubmit={submitForm} />
      <SearchResult searchQuery={query} />
      <ToastContainer autoClose={3000} />
    </>
  );
}
export default App;
