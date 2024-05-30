import LoginContext from "../store/loginContext";
import { fromServer } from "../services/normalizeFromServer";
import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import validateSchema from "../validation/gameValidation";
import axios from "axios";
import ROUTES from "../routes/ROUTES";

const useInputs = () => {
  const [inputsValue, setInputsValue] = useState({
    title: "",
    description: "",
    category: [],
    rating: '',
    discount: '',
    price: '',
    trailer: "",
    url: "",
    alt: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    category: "",
    rating: '',
    discount: '',
    price: '',
    trailer: "",
  });
  const { login } = useContext(LoginContext);
  const navigate = useNavigate();
  let { id } = useParams();
  useEffect(() => {
    const fetchInfo = async () => {
      if (!id || !login) {
        return;
      }
      try {
        const { data } =
          await axios.get("/games/" + id);
        if (data.user_id === login._id) {
          setInputsValue(fromServer(data));
        } else {
          alert("Unauthorized access");
          navigate(ROUTES.HOME);
        }
      } catch (err) {
        alert("Failed to fetch game data");
      }
    };

    fetchInfo();
  }, [id, login, navigate]);

  let keysArray = Object.keys(inputsValue);
  const handleInputsBlur = (e) => {
    const { error } = validateSchema[e.target.id]({
      [e.target.id]: inputsValue[e.target.id],
    });
    if (error) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [e.target.id]: error.details[0].message,
      }));
    } else {
      setErrors((currentErrors) => {
        delete currentErrors[e.target.id];
        return { ...currentErrors };
      });
    }
  };
  const isRequired = (keyName) => {
    return errors[keyName] !== undefined;
  };
  const handleInputsChange = (e) => {
    const value = ["category"].includes(e.target.id)
      ? [e.target.value]
      : e.target.value;

    setInputsValue((currentInputsValue) => ({
      ...currentInputsValue,
      [e.target.id]: e.target.value,
    }));
  };

  return {
    id,
    inputsValue,
    setInputsValue,
    handleInputsChange,
    handleInputsBlur,
    errors,
    navigate,
    keysArray,
    isRequired,
  };
};

export default useInputs;
