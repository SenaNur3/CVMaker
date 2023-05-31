import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

//Seeker
import SeekerRegister from "./pages/Seeker/Auth/Register/SeekerRegister";

//Home
import Home from "./pages/Home/Home";
import SeekerLogin from "./pages/Seeker/Auth/Login/SeekerLogin";
import SeekerMainPage from "./pages/Seeker/SeekerMainPage/SeekerMainPage";
import Profile from "./pages/Profile/Profile";
import { Provider } from "react-redux";
import store from "./store";
import AboutForm from "./pages/Seeker/CV/AboutForm/AboutForm";
import EducationsForm from "./pages/Seeker/CV/EducationsForm/EducationsForm";
import ExperienceForm from "./pages/Seeker/CV/ExperienceForm/ExperienceForm";
import MainForm from "./pages/Seeker/CV/MainForm/MainForm";
import MenuCart from "./pages/Seeker/CV/Menu/MenuCart";
import ReferanceForm from "./pages/Seeker/CV/ReferanceForm/ReferanceForm";
import SkillsForm from "./pages/Seeker/CV/SkillsForm/SkillsForm";
import HobiesForm from "./pages/Seeker/CV/HobiesForm/HobiesForm";
import PdfPage from "./pages/Seeker/SeekerMainPage/Cv_pdf/PdfPage";
import Search from "./pages/Seeker/CV-GPT/Search";
import Photo from "./pages/Seeker/CV/PhotoForm/Photo";



setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <Provider store={store}>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/Home">
            <Home />
          </Route>
          <Route exact path="/SeekerLogin">
            <SeekerLogin />
          </Route>
          <Route exact path="/seekerRegister">
            <SeekerRegister />
          </Route>
          <Route exact path="/seekerMainPage">
            <SeekerMainPage />
          </Route>
          <Route exact path="/Profile">
            <Profile />
          </Route>
          <Route exact path="/AboutForm">
            <AboutForm />
          </Route>
          <Route exact path="/EducationsForm">
            <EducationsForm />
          </Route>
          <Route exact path="/ExperienceForm">
            <ExperienceForm />
          </Route>
          <Route exact path="/MainForm">
            <MainForm />
          </Route>
          <Route exact path="/MenuCart">
            <MenuCart />
          </Route>
          <Route exact path="/ReferanceForm">
            <ReferanceForm />
          </Route>
          <Route exact path="/SkillsForm">
            <SkillsForm />
          </Route>
          <Route exact path="/HobiesForm">
            <HobiesForm />
          </Route>
          <Route exact path="/PdfPage">
            <PdfPage/>
          </Route>
          <Route exact path="/Search">
            <Search/>
          </Route>
          <Route exact path="/Photo">
          <Photo label="hello"/>
          </Route>
       
          <Route exact path="/">
            <Redirect to="/Home" />
          </Route>
      
        </IonRouterOutlet>
      </IonReactRouter>
    </Provider>
  </IonApp>
);

export default App;
