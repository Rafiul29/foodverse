
import { NavLink } from "react-router-dom"

const Navbar = ({searchQuery,setSearchQuery,searchHandler,inputField,savedItems}) => {

 
  const navActive=(({isActive})=>{
    return {
      color:isActive ? "#f43f5e": null,
    }
  })

  return (
    <div className="navbar flex justify-between items-center container mx-auto py-8 flex-col lg:flex-row gap-5 lg:gap-0">
      <h2 className="logo text-2xl font-bold lowercase italic "> 
      Food<span className="text-rose-500">verse</span></h2>
      <form className="search-bar" onSubmit={searchHandler}>
        <input type="search"  placeholder="search recipe..." required
        ref={inputField}
        value={searchQuery}
        onChange={((e)=>{
          setSearchQuery(e.target.value)
        })}
        className="bg-white/75 p-3 px-8 lg:w-95 rounded-full outline-none shadow-lg shadow-rose-100 focus:shadow-rose-200 duration-300"
        />
      </form>
     <ul className="menu flex gap-5">
      <li>
      <NavLink end  to="/" 
      style={navActive}
      className="text-gray-400 hover:text-gra-600"
      > Home</NavLink>
      </li>
      <li>
      <NavLink style={navActive} end  to="/favourites"
       className="text-gray-400 hover:text-gra-600"
      > Favourites
      <span className="favourite-count font-bold text-sky-400">({savedItems.length})</span></NavLink>
      </li>
     </ul>
    </div>
  )
}

export default Navbar
