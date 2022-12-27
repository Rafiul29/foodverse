import { useParams } from "react-router-dom";
import { useFetch } from "./hooks/useFetch";
import { HiOutlineCheck } from "react-icons/hi";
const RecipeItem = () => {
  const { id } = useParams();

  const { data:recipe, loading, error } = useFetch(id);

const durationCalc=(duration)=>{
  if(!duration) return;
  if(!String(duration).includes(".")){
    return duration+"h"
  }
  if(String(duration).includes(".")){
    return String(duration).replace(".","h")+"min"
  }
}
  return (
    <div className="recipe-item-section container mx-auto py-20 grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="left">
        <div className="img">
         <img src={recipe.image_url} alt="" />
        </div>
        <div className="ings">
          <span className="ing-title">Ingredients</span>
          <ul>
            {recipe?.ingredients?.map((ing,i)=>{
              return(
                <li className="flex flex-row" key={i}><HiOutlineCheck/>{ing.description}</li>
              )
            })}
          </ul>
        </div>
      </div>
      <div className="right">
        <span className="publisher">
              {recipe?.publisher}
        </span>
        <h2 className="title"> {recipe?.title}</h2>
        <div className="serving-cooking-time">
          <div className="servings">Served for : {recipe?.servings} people</div>
          <div className="cooking-time">{recipe?.cooking_time < 60? String(recipe?.cooking_time)+"min":durationCalc(recipe?.cooking_time/60) }</div>
        </div>
      </div>
    </div>
  );
};

export default RecipeItem;
