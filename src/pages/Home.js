// Components
import HomeCTA from "../components/HomeCTA";
import HomePostsList from "../components/posts/HomePostsList";

const Home = () => {
  return (
    <div className="mt-4 max-w-screen-sm mx-auto">
      <HomeCTA />
      <HomePostsList />
    </div>
  );
};

export default Home;
