import { createBrowserRouter } from "react-router-dom";
import MainPage from "../views/main-page";
import PianoRollDetail from "../views/pianoRollDetail";
import LandingPage from "../views/landing";
import NavBar from "../components/NavBar";

// Since it's a small app, creating a whole layout it's not necessary, I'm redering the navbar and the component

const router = createBrowserRouter([
  {
    index: true,
    element: <LandingPage />,
  },
  {
    path: "/home",
    element: (
      <div>
        <NavBar />
        <MainPage />
      </div>
    ),
  },
  {
    path: "/roll/:id",
    element: (
      <div>
        <NavBar />
        <PianoRollDetail />
      </div>
    ),
  },
]);

export default router;
