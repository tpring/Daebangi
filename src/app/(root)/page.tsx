import { BakeryList } from "@/components/bakeries/BakeryList";
import SearchBar from "@/components/commons/SearchBar";
import UpButton from "@/components/commons/UpButton";
import BouncingBread from "@/components/main/BouncingBread";

const Home = () => {
  return (
    <>
      <BouncingBread />
      <div className="relative">
        <div className="flex justify-center items-center h-60">
          <SearchBar />
        </div>
        <div className="flex justify-center items-center">
          <BakeryList />
        </div>
      </div>
      <UpButton />
    </>
  );
};

export default Home;
