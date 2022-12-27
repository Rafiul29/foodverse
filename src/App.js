import { data } from "autoprefixer";
import { useState,useRef, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
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

  const [savedItems,setSavedItems]=useState(()=>{
    const localData=localStorage.getItem("recipes");
    return localData? JSON.parse(localData) :[];
  })
  const inputField=useRef(null)
const navigate=useNavigate()
  const searchHandler=((e)=>{

    e.preventDefault()
    
    getData(searchQuery)

    setSearchQuery("")
   inputField.current.blur();
    setRecipes([])
    setError("")
    navigate("/")
  })


  const getData=async(searchQuery)=>{
    try{
      setLoading(true)
      const res=await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchQuery}`)
      if(!res.ok) throw new Error("Something Went wrong")
    const data= await res.json()
   if(data.results===0) throw new Error("No recipe found!")
  setRecipes(data?.data?.recipes)
  setLoading(false)
    }catch(err){
      setError(err.message)
    }
  }



  const checkLocalData = (data) => {
    const localData = JSON.parse(localStorage.getItem("recipes"));
    const dataExistance = localData.some((local) => local.id === data.id);

    if (!dataExistance) {
      setSavedItems((prevState) => [...prevState, data]);
    } else {
      const filteredLocalData = localData.filter(
        (local) => local.id !== data.id
      );
      setSavedItems(filteredLocalData);
    }
  };

  const favouriteHandler = (id) => {
    fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => checkLocalData(data.data.recipe));

    navigator("favourites");
  };

  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(savedItems));
  }, [savedItems]);

  return (
    <>
      <div className="app min-h-screen bg-rose-50 text-gray-600 text-lg">
        <Navbar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery}
        inputField={inputField}
        searchHandler={searchHandler}
        savedItems={savedItems}
        />

        <Routes>
          <Route path="/" element={<Home 
          recipes={recipes}
          loading={loading}
          error={error}
          />} />
          <Route path="/favourites" element={<Favourites savedItems={savedItems}/>} />
          <Route path="/recipe-item/:id" element={<RecipeItem favouriteHandler={favouriteHandler}/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </div>
      
      <Footer />
    </>
  );
};

export default App;
