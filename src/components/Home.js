import Recipe from "./Recipe";

const Home = ({ recipes, loading, error }) => {
  return (
    <div className="home container mx-auto py-10 flex flex-wrap justify-center gap-5">

      {!loading && !error && recipes.length === 0 ? (
        <p className="text-2xl lg:text-4xl fornt-semibold text-rose-300">
          Nothing to show , please search something
        </p>
      ) : null}

      {loading && <p>{error ? error : "Loading...."}</p>}

      {recipes?.length > 0 &&
        recipes.map((recipe) => (
          <Recipe recipe={recipe} key={recipe.id} /> ))}

    </div>
  );
};

export default Home;
