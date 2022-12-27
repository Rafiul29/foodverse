import { useState,useRef } from "react";
import { Route, Routes } from "react-router-dom";
import Favourites from "./components/Favourites";
import Footer from "./components/Footer";

import Home from "./components/Home";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import RecipeItem from "./components/RecipeItem"


const App = () => {
  const [searchQuery,setSearchQuery]=useState("");
  const [recipes,setRecipes]=useState([])
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState("");

  const inputField=useRef(null)

  const searchHandler=((e)=>{

    e.preventDefault()
    
    getData(searchQuery)

    setSearchQuery("")
   inputField.current.blur();
    setRecipes([])
  })

  const getData=async(searchQuery)=>{
    try{
      setLoading(true)
      const res=await fetch(`https://forkify-api.herokuapp.com/api/search?q=${searchQuery}`)
    const data= await res.json()
    if(!res.ok) throw new Error("No recipe found")
    console.log(data)
  setRecipes(data.recipes)
  setLoading(false)
    }catch(err){
      setError(err.message)
    }
  }
  return (
    <>
      <div className="app min-h-screen bg-rose-50 text-gray-600 text-lg">
        <Navbar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery}
        inputField={inputField}
        searchHandler={searchHandler}
        />

        <Routes>
          <Route path="/" element={<Home 
          recipes={recipes}
          loading={loading}
          error={error}
          />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/recipe-item/:id" element={<RecipeItem/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </div>
      
      <Footer />
    </>
  );
};

export default App;
