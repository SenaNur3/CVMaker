import { IonContent, IonFooter, IonHeader, IonPage } from "@ionic/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCVFunc } from "../../../actions/cv";
import Header from "../../../layouts/Header/Header";

import "./SeekerMainPage.scss";
import CvBoxComponent from "./_partials/CvBoxComponent/cvBoxComponent";
import RecommendationJobsCart from "./_partials/RecommendationJobsCart/recommendationJobsCart";
import WelcomeCart from "./_partials/WelcomeCart/welcomeCart";
import RecommendationDesc from "./_partials/RecommendationDesc/RecommendationDesc";

const SeekerMainPage: React.FC = () => {
  // Store States

  const dispatch: any = useDispatch();

  const loginState = useSelector((state: any) => state?.auth?.user);

  //useEffect
  dispatch(getUserCVFunc(loginState?.email));

  return (
    <IonPage className="SeekerMainPage">
      <IonHeader>
        <Header title="CV Maker" isHasBack={false} />
      </IonHeader>
      <IonContent fullscreen={true}>
        <WelcomeCart />
        <CvBoxComponent />
        <RecommendationDesc />
        <RecommendationJobsCart />
      </IonContent>
      <IonFooter translucent={true}>{/* <Footer /> */}</IonFooter>
    </IonPage>
  );
};

export default SeekerMainPage;
