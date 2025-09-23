import css from "./SearchBox.module.css"

const function SearchForm{
    return (
        <input
  className={css.input}
  type="text"
  placeholder="Search notes"
 />
    )
}

export default SearchForm