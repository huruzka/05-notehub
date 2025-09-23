
import SearchForm from '../SearchBox/SearchBox'
import css from './App.module.css'


function App{



  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchForm />
        
        <button className={css.button}>Create note +</button>
		{/* Компонент SearchBox */}
		{/* Пагінація */}
		{/* Кнопка створення нотатки */}
  </header>
</div>
  )
}
export default App
