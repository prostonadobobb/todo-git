import React, { useState } from "react";
import "./RepoInput.scss";
import { Button, Form } from "react-bootstrap";
import { fetchIssues } from "../../api/fetchData";
import { setData, setUserUrl } from "../../Redux/actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Section } from "../../type/section";

type Props = {
  setError: (error: boolean) => void;
};

export const RepoInput: React.FC<Props> = ({ setError }) => {
  const [url, setUrl] = useState("");
  const [currentOwner, setCurrentOwner] = useState("");

  const dispatch = useDispatch();
  const currentData = useSelector((state: { data: Section[] }) => state.data);

  const handleSubmit = async () => {
    const repoCustomer = url
      .replace("https://github.com/", "")
      .split("/")
      .filter((item) => item !== "");
    const [owner, repo] = repoCustomer;

    if (currentOwner !== "") {
      localStorage.setItem(currentOwner, JSON.stringify(currentData));
    }

    const savedData = localStorage.getItem(`${owner}/${repo}`);

    if (savedData !== null) {
      console.log("Данні знайдені", `${owner}/${repo}`);
      setCurrentOwner(`${owner}/${repo}`);
      dispatch(setData(JSON.parse(savedData)));
      dispatch(setUserUrl(url));
      setError(false);
    } else {
      try {
        console.log(
          "Данні не знайдені в localStorage. Виконуємо запит до сервера"
        );

        const data = await fetchIssues(owner, repo);

        setCurrentOwner(`${owner}/${repo}`);
        dispatch(setData(data));
        dispatch(setUserUrl(url));
        localStorage.setItem(`${owner}/${repo}`, JSON.stringify(data));

        setError(false);
      } catch (error) {
        console.error("Помилка запиту до GitHub API:", error);
        setError(true);
      }
    }
  };

  const handleAddInput = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const spanText = (e.target as HTMLSpanElement).textContent;

    if (spanText) {
      setUrl(spanText);
    }
  };
  
  return (
    <div className="repoInput">
      <Form.Group className="repoInput__group">
        <div className="repoInput__group--example">
          Example:{" "}
          <span onClick={handleAddInput}>
            https://github.com/prostonadobobb/digital-proj/
          </span>
        </div>
        <Form.Control
          id="input"
          type="text"
          placeholder="Введіть URL репозиторію"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </Form.Group>
      <div className="button-group">
        <Button
          className="btn btn-secondary"
          style={{ whiteSpace: "nowrap" }}
          onClick={handleSubmit}
        >
          Load/Save issues
        </Button>
      </div>
    </div>
  );
};
