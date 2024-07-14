import { toast } from "react-toastify";

type ConfirmToastProp = {
  content: string;
  onConfirm: () => void;
};

const ConfirmToast: React.FC<ConfirmToastProp> = ({ content, onConfirm }) => {
  const closeToast = () => {
    toast.dismiss();
    onConfirm();
  };
  return (
    <div className="flex flex-col items-center gap-2 ">
      <p>{content}</p>
      <button className="px-3 py-1 bg-point text-white rounded-[16px]" onClick={closeToast}>
        확인
      </button>
    </div>
  );
};

export const showConfirmToast = (content: string, onConfirm: () => void) => {
  toast(<ConfirmToast content={content} onConfirm={onConfirm} />, {
    position: "top-center",
    autoClose: false,
    closeOnClick: false,
    draggable: false,
  });
};

export default ConfirmToast;
