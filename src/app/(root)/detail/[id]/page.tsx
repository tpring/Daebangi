import CommentList from "@/components/comment/CommentList";
import StoreInformation from "@/components/detailMap/StoreInformation";

const DetailPage = () => {
  return (
    <div className="reactive-body mx-auto">
      <div>
        <StoreInformation />
        <CommentList bakery_id={"136284e3-959e-4160-9827-7f7640708bde"} />
      </div>
    </div>
  );
};

export default DetailPage;
