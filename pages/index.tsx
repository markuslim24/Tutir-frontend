//imports
import { useSelector } from "react-redux";
import { getUser } from "../store/slice/auth";
import Navbar from "../components/Navbar";
import Recommended from "../components/Recommended";
import { Container } from "@material-ui/core";

//Home page
export default function Home() {
  const user = useSelector(getUser);
  return (
    <>
      <Navbar />
      <Container maxWidth="xl">
        <Recommended />
      </Container>
    </>
  );
}
