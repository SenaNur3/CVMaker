import Header from "../../../../layouts/Header/Header";
import { IonContent, IonHeader, IonPage, IonInfiniteScrollContent, IonIcon } from "@ionic/react";
import { add, save, close } from 'ionicons/icons';
import axios from "axios";
import { getUserCVFunc } from "../../../../actions/cv";
import { useDispatch } from "react-redux";
import { useState, useRef } from 'react';
import "./SkillsForm.scss";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { OverlayEventDetail } from '@ionic/core/components';
import { IonButton, IonItem, IonInput, IonList } from "@ionic/react";
import {
  IonSelectOption,
  IonSelect,
  IonCard,
  IonTextarea,
  IonButtons,
  IonModal,
  IonToolbar,
  IonTitle,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonLabel,
} from "@ionic/react";


const SkillsForm: any = () => {
  let serviceStates: any = useSelector((state: any) => state?.cv?.userCV.skills);
  let userCV: any = useSelector((state: any) => state?.cv?.userCV);

  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);

  const dispatch: any = useDispatch();

  serviceStates = serviceStates !== undefined ? JSON.parse(serviceStates) : [];
  const API_URL = "http://localhost:3000/cv/";

  const [allData, setAllData] = useState<any>(serviceStates);
  const loginState = useSelector((state: any) => state?.auth?.user);
  const user: any = JSON.parse(localStorage.getItem("user") || '{}');
  const [updateData, setUpdateData] = useState<any>(null);

  function onWillPresent(ev: any) {

  }
  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    setUpdateData(null);
  }

  const callServiceExperience = (data: any, isRemove?: any) => {
    const config = {
      headers: { token: `${JSON.stringify(user.token)}` }
    };

    let bodyParameters = {}

    if (!isRemove) {
      if (updateData === null) {
        const mutation = [...JSON.parse(userCV.skills), data]

        bodyParameters = {
          ...userCV,
          skills: JSON.stringify(mutation)
        };
      } else {
        //update 
        const filtered = allData.filter((i: any) => i?.id !== updateData?.id);

        const replaced = [...filtered, data]

        bodyParameters = {
          ...userCV,
          skills: JSON.stringify(replaced)
        };

      }
    } else {
      bodyParameters = {
        ...userCV,
        skills: JSON.stringify(data)
      };
    }

    return axios.post(API_URL + loginState?.email, bodyParameters,
      config
    ).then((response: any) => {
      dispatch(getUserCVFunc(loginState?.email));
      setAllData(JSON.parse(response.data.cv.skills));
      modal.current?.dismiss(input.current?.value, 'confirm');
      reset();
    });
  }

  const handleUpdateExperience = (values: any) => {
    setUpdateData(values);
    modal.current?.present()
  }
  const onSubmit: any = (data: any) => {
    if (updateData === null) {
      data.id = allData.length + 1
    } else {
      data.id = updateData.id
    }
    callServiceExperience(data);
  }
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const removeItem = (id: any) => {
    const filtered = allData.filter((i: any) => i?.id !== id);
    callServiceExperience(filtered, true);
  }
  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <Header title={serviceStates ? " *Beceriler" : "Beceriler"} />
        </IonHeader>
        {allData?.map((item: any, index: any) => (
          <IonCard key={index}>
            <IonCardHeader>
              <IonCardTitle>{item.title}</IonCardTitle>
              <IonCardSubtitle>{item.companyName}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList >
                <IonItem>
                  <IonLabel>Yetenek</IonLabel>
                  <IonLabel>{item.ability}</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>Seviye</IonLabel>
                  <IonLabel>{item.level}</IonLabel>
                </IonItem>
                <IonButton className="update-button" fill="outline" expand="block" onClick={() => handleUpdateExperience(item)}>
                  <IonIcon slot="start" icon={save}></IonIcon>
                  Güncelle
                </IonButton>
              </IonList>
            </IonCardContent>
          </IonCard>
        ))}

        <IonModal ref={modal} onWillPresent={(ev) => onWillPresent(ev)} onWillDismiss={(ev) => onWillDismiss(ev)}>
          <form onSubmit={handleSubmit(onSubmit)} className="form-style">
            <IonHeader>
              <IonToolbar>
                <IonButtons slot="start">
                  <IonButton onClick={() => modal.current?.dismiss()}>Geri</IonButton>
                </IonButtons>
                <IonTitle>{updateData ? "Düzenle" : "Yeni Ekle"}</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <IonInfiniteScrollContent className="main-container"
              >
                <IonList>
                  <IonCard>
                    <IonItem>
                      <IonInput
                        value={updateData?.ability}
                        {...register(`ability`)}
                        placeholder="örn: Microsoft word"
                      ></IonInput>
                      {errors.ability && <span>This field is required</span>}
                    </IonItem>

                    <IonItem>
                      <IonSelect interface="action-sheet" placeholder="seviye seç" value={updateData?.level}  {...register(`level`)}>
                        <IonSelectOption>Uzman</IonSelectOption>
                        <IonSelectOption>İyi</IonSelectOption>
                        <IonSelectOption>Orta</IonSelectOption>
                        <IonSelectOption>Başlangıç</IonSelectOption>
                      </IonSelect>
                    </IonItem>

                  </IonCard>

                </IonList>

              </IonInfiniteScrollContent>

              <div className="buttonContainer">
                <IonButton className="width50" color="danger" fill="outline" expand="block" size="default" onClick={() => removeItem(updateData?.id)}>
                  <IonIcon icon={close}></IonIcon> SİL
                </IonButton>

                <IonButton className="width50" strong={true} type="submit">Kaydet</IonButton>
              </div>
            </IonContent>

          </form>
        </IonModal>




        <div className="buttonContainer">
          <IonButton fill="outline" className="width100" color="secondary" expand="block" onClick={() => modal.current?.present()}>
            <IonIcon slot="start" icon={add}></IonIcon>
            Yeni Ekle
          </IonButton>
        </div>


      </IonContent>
    </IonPage>
  );
};
export default SkillsForm;