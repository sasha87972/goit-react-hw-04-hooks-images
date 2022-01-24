import { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  SearchbarEl,
  SearchForm,
  SearchFormBtn,
  SearchFormBtnLabel,
  SearchFormInput,
} from "./searchbar.styles";
import { ReactComponent as SearchIcon } from "../icons/search.svg";
import { ReactComponent as CleanIcon } from "../icons/clean.svg";

function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState("");
  const handleChange = (e) => {
    setSearchQuery(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") {
      toast.error("Empty searchfield!!!");
      return;
    }
    onSubmit(searchQuery);
  };

  return (
    <SearchbarEl>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormBtn type="submit">
          <SearchIcon width="40" heiht="40" />
          <SearchFormBtnLabel>Search</SearchFormBtnLabel>
        </SearchFormBtn>

        <SearchFormInput
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={handleChange}
        />
        <SearchFormBtn type="button" onClick={() => setSearchQuery("")}>
          <CleanIcon width="40" heiht="40" />
          <SearchFormBtnLabel>Search</SearchFormBtnLabel>
        </SearchFormBtn>
      </SearchForm>
    </SearchbarEl>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default Searchbar;
