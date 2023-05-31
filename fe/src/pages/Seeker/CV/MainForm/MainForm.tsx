import Header from "../../../../layouts/Header/Header";
import { IonContent, IonHeader, IonPage, IonInfiniteScrollContent } from "@ionic/react";
import "./MainForm.scss";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useState, useRef } from 'react';
import { useDispatch } from "react-redux";
import { add, save, close } from 'ionicons/icons';
import axios from "axios";
import { getUserCVFunc } from "../../../../actions/cv";
import {
  IonButton,
  IonLabel,
  IonItem,
  IonInput,
  IonList,
  IonCard,
  IonIcon,
  IonButtons,
  IonModal,
  IonToolbar,
  IonTitle,
  IonCardContent,
} from "@ionic/react";

const MainForm: any = () => {

  let serviceStates: any = useSelector((state: any) => state?.cv?.userCV
  );
  let userCV: any = useSelector((state: any) => state?.cv?.userCV);
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);
  const ionInputEl = useRef<HTMLIonInputElement>(null);

  const API_URL = "http://localhost:3000/cv/";
  const dispatch: any = useDispatch();
  const loginState = useSelector((state: any) => state?.auth?.user);
  const user: any = JSON.parse(localStorage.getItem("user") || '{}');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [adres, setAdres] = useState('');
  const [phone, setPhone] = useState('');
  const [driverLicance, setDriverLicance] = useState('');
  const [martialStatus, setMartialStatus] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState('');
  
  const onInput = (ev: Event, Setter: any) => {
    const value = (ev.target as HTMLIonInputElement).value as string;

    // Removes non alphanumeric characters

    /**
     * Update both the state variable and
     * the component to keep them in sync.
     */
    Setter(value);

    const inputCmp = ionInputEl.current;
    if (inputCmp !== null) {
      inputCmp.value = value;
    }
  }

  const callServiceExperience = () => {
    const config = {
      headers: { token: `${JSON.stringify(user.token)}` }
    };

    let bodyParameters = {
      ...userCV,
      name,
      surname,
      email,
      username: loginState?.email,
      gender,
      adres,
      phone,
      driverLicance,
      martialStatus,
      birthday,
    };

    return axios.post(API_URL + loginState?.email, bodyParameters,
      config
    ).then((response: any) => {
      dispatch(getUserCVFunc(loginState?.email));
      modal.current?.dismiss(input.current?.value, 'confirm');
    });
  }

  const handleUpdateAbout = () => {
    modal.current?.present()
  }

  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <Header
            title="Güncelle"
          />
        </IonHeader>

        <IonCard>
          <IonCardContent>
            <IonList>
              <IonItem>
                <IonLabel>İsim</IonLabel>
                <IonLabel>{serviceStates?.name}</IonLabel>
              </IonItem>

              <IonItem>
                <IonLabel>Soy isim</IonLabel>
                <IonLabel>{serviceStates?.surname}</IonLabel>
              </IonItem>

              <IonItem>
                <IonLabel>Email</IonLabel>
                <IonLabel>{serviceStates?.email}</IonLabel>
              </IonItem>

              <IonItem>
                <IonLabel>Adres</IonLabel>
                <IonLabel>{serviceStates?.adres}</IonLabel>
              </IonItem>

              <IonItem>
                <IonLabel>Telefon Numarası</IonLabel>
                <IonLabel>{serviceStates?.phone}</IonLabel>
              </IonItem>

              <IonItem>
                <IonLabel>Sürücü Ehliyeti</IonLabel>
                <IonLabel>{serviceStates?.driverLicance}</IonLabel>
              </IonItem>

              <IonItem>
                <IonLabel>Medeni Durum</IonLabel>
                <IonLabel>{serviceStates?.martialStatus}</IonLabel>
              </IonItem>

              <IonItem>
                <IonLabel>Cinsiyet</IonLabel>
                <IonLabel>{serviceStates?.gender}</IonLabel>
              </IonItem>

              <IonItem>
                <IonLabel>Doğum Tarihi</IonLabel>
                <IonLabel>{serviceStates?.birthday}</IonLabel>
              </IonItem>

              <IonButton className="update-button" fill="outline" expand="block" onClick={() => handleUpdateAbout()}>
                <IonIcon slot="start" icon={save}></IonIcon>
                Güncelle
              </IonButton>
            </IonList>
          </IonCardContent>
        </IonCard>

        <IonModal ref={modal}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => modal.current?.dismiss()}>Geri</IonButton>
              </IonButtons>
              <IonTitle>Düzenle</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>


            <IonList>
              <IonItem>
                <IonLabel>İsim: </IonLabel>
                <IonInput
                  placeholder={serviceStates?.name}
                  value={name}
                  onIonInput={(e) => onInput(e, setName)}
                  ref={ionInputEl}
                ></IonInput>
              </IonItem>
            </IonList>

            <IonList>
              <IonItem>
                <IonLabel>Soy isim: </IonLabel>
                <IonInput
                  placeholder={serviceStates?.surname}
                  value={surname}
                  onIonInput={(e) => onInput(e, setSurname)}
                  ref={ionInputEl}
                ></IonInput>
              </IonItem>
            </IonList>

            <IonList>
              <IonItem>
                <IonLabel>Email: </IonLabel>
                <IonInput
                  placeholder={serviceStates?.email}
                  value={email}
                  onIonInput={(e) => onInput(e, setEmail)}
                  ref={ionInputEl}
                ></IonInput>
              </IonItem>
            </IonList>


            <IonList>
              <IonItem>
                <IonLabel>Adres: </IonLabel>
                <IonInput
                  placeholder={serviceStates?.adres}
                  value={adres}
                  onIonInput={(e) => onInput(e, setAdres)}
                  ref={ionInputEl}
                ></IonInput>
              </IonItem>
            </IonList>

            <IonList>
              <IonItem>
                <IonLabel>Telefon: </IonLabel>
                <IonInput
                  placeholder={serviceStates?.phone}
                  value={phone}
                  onIonInput={(e) => onInput(e, setPhone)}
                  ref={ionInputEl}
                ></IonInput>
              </IonItem>
            </IonList>


            <IonList>
              <IonItem>
                <IonLabel>Sürücü Belgesi: </IonLabel>
                <IonInput
                  placeholder={serviceStates?.driverLicance}
                  value={driverLicance}
                  onIonInput={(e) => onInput(e, setDriverLicance)}
                  ref={ionInputEl}
                ></IonInput>
              </IonItem>
            </IonList>

            <IonList>
              <IonItem>
                <IonLabel>Medeni Durum: </IonLabel>
                <IonInput
                  placeholder={serviceStates?.martialStatus}
                  value={martialStatus}
                  onIonInput={(e) => onInput(e, setMartialStatus)}
                  ref={ionInputEl}
                ></IonInput>
              </IonItem>
            </IonList>

            <IonList>
              <IonItem>
                <IonLabel>Cinsiyet: </IonLabel>
                <IonInput
                  placeholder={serviceStates?.gender}
                  value={gender}
                  onIonInput={(e) => onInput(e, setGender)}
                  ref={ionInputEl}
                ></IonInput>
              </IonItem>
            </IonList>

            <IonList>
              <IonItem>
                <IonLabel>Doğum Tarihi: </IonLabel>
                <IonInput
                  placeholder={serviceStates?.birthday}
                  value={birthday}
                  onIonInput={(e) => onInput(e, setBirthday)}
                  ref={ionInputEl}
                ></IonInput>
              </IonItem>
            </IonList>

            <IonList style={{"display": "none"}}>
              <IonItem>
                <IonLabel> </IonLabel>
                <IonInput
                  placeholder={serviceStates?.birthday2}
                  onIonInput={(e) => onInput(e, setBirthday)}
                  ref={ionInputEl}
                ></IonInput>
              </IonItem>
            </IonList>

            <div className="buttonContainer">
              <IonButton className="width100" strong={true} onClick={() => callServiceExperience()}>Kaydet</IonButton>
            </div>
          </IonContent>
        </IonModal>

      </IonContent>
    </IonPage>
  );
};
export default MainForm;











