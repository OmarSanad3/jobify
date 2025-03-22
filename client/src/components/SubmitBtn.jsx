import { useNavigation } from "react-router-dom";

const SubmitBtn = ({ isFormBtn, isDeleteBtn, btnText }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <button
      type="submit"
      className={`btn btn-block ${isFormBtn && "form-btn"} ${
        isDeleteBtn && "delete-btn"
      }`}
      disabled={isSubmitting}
    >
      {isSubmitting ? "submitting..." : btnText || "submit"}
    </button>
  );
};

export default SubmitBtn;
