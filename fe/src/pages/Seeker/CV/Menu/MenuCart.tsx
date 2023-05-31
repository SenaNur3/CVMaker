import Header from "../../../../layouts/Header/Header";
import { IonContent, IonHeader, IonPage } from "@ionic/react";
import "./MenuCart.scss";
import { IonLabel, IonItem } from "@ionic/react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";

const MenuCart: React.FC = () => {
  const history = useHistory();
  const isCvStates = useSelector((state: any) => state?.cv?.userCV);

  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <Header title={isCvStates ? "CV'ni Güncelle" : "Yeni Oluştur"} />
        </IonHeader>
        <IonItem onClick={() => history.push("/MainForm")}>
          <IonLabel>Temel Bilgiler</IonLabel>
        </IonItem>
        <IonItem onClick={() => history.push("/AboutForm")}>
          <IonLabel>Açıklama</IonLabel>
        </IonItem>
        <IonItem onClick={() => history.push("/ExperienceForm")}>
          <IonLabel>İş Deneyimi</IonLabel>
        </IonItem>
        <IonItem onClick={() => history.push("/EducationsForm")}>
          <IonLabel>Eğitim Bilgileri</IonLabel>
        </IonItem>
        <IonItem onClick={() => history.push("/SkillsForm")}>
          <IonLabel>Beceriler</IonLabel>
        </IonItem>
        <IonItem onClick={() => history.push("/HobiesForm")}>
          <IonLabel>Hobiler</IonLabel>
        </IonItem>
        <IonItem onClick={() => history.push("/ReferanceForm")}>
          <IonLabel>Referanslar</IonLabel>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};
export default MenuCart;
