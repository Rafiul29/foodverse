import FryingPan from "./FryingPan";
import Recipe from "./Recipe";

const Home = ({ recipes, loading, error ,stable}) => {
  return (
    <div className="home container mx-auto py-10 flex flex-wrap justify-center gap-5">

      {!loading && !error && recipes.length === 0 ? (
        <div className="text-2xl lg:text-4xl fornt-semibold text-rose-300">
         <p>{stable}</p>
         <FryingPan/>
        </div>
      ) : null}

      {loading && <p>{error ? error : "Loading...."}</p>}

      {recipes?.length > 0 &&
        recipes.map((recipe) => (
          <Recipe recipe={recipe} key={recipe.id} /> ))}

    </div>
  );
};

export default Home;
