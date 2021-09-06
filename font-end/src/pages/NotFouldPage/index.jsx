import { Link } from "react-router-dom";

export default function NotFoundPage(props) {
  const { resetError } = props;
  return (
    <div>
      <p>404 not found!</p>
      <p>Back to homepage at </p>
      <Link to="/" onClick={resetError}>
        http://localhost:3000
      </Link>{" "}
    </div>
  );
}
