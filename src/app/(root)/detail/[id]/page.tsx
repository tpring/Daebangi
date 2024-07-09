import Comment from "@/components/comment/Comment";
import StoreInformation from "@/components/detailMap/StoreInformation";

const DetailPage = () => {
  return (
    <div className="reactive-body mx-auto">
      <div>
        <StoreInformation />
        <Comment />
      </div>
    </div>
  );
};

export default DetailPage;
