import Header from "../../../../layouts/Header/Header";
import { IonContent, IonHeader, IonPage, IonInfiniteScrollContent, IonIcon } from "@ionic/react";
import "./ExperienceForm.scss";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { add, save, close } from 'ionicons/icons';
import axios from "axios";
import { getUserCVFunc } from "../../../../actions/cv";
import { useDispatch } from "react-redux";
import  { useState, useRef } from 'react';
import {
  IonButton,
  IonLabel,
  IonItem,
  IonInput,
  IonList,
  IonCard,
  IonTextarea,
  IonButtons,
  IonModal,
  IonToolbar,
  IonTitle,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle
} from "@ionic/react";
import { OverlayEventDetail } from '@ionic/core/components';



const ExperienceForm: any = () => {
  let serviceStates: any = useSelector((state: any) => state?.cv?.userCV.workExperience);
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
        const mutation = [...JSON.parse(userCV.workExperience), data]

        bodyParameters = {
          ...userCV,
          workExperience: JSON.stringify(mutation)
        };
      } else {
        //update 
        const filtered = allData.filter((i: any) => i?.id !== updateData?.id);

        const replaced = [...filtered, data]

        bodyParameters = {
          ...userCV,
          workExperience: JSON.stringify(replaced)
        };

      }
    } else {
      bodyParameters = {
        ...userCV,
        workExperience: JSON.stringify(data)
      };
    }

    return axios.post(API_URL + loginState?.email, bodyParameters,
      config
    ).then((response: any) => {
      dispatch(getUserCVFunc(loginState?.email));
      setAllData(JSON.parse(response.data.cv.workExperience));
      modal.current?.dismiss(input.current?.value, 'confirm');
      reset();
    });
  }


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  //Function
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

  const removeItem = (id: any) => {
    const filtered = allData.filter((i: any) => i?.id !== id);
    callServiceExperience(filtered, true);
  }

  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <Header title={serviceStates ? "Güncelle" : "Yeni Oluştur"} />
        </IonHeader>
        {allData?.map((item: any, index: any) => (
          <IonCard key={index}>
            <IonCardHeader>
              <IonCardTitle>{item.title}</IonCardTitle>
              <IonCardSubtitle>{item.companyName}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                <IonItem >
                  <IonLabel>Şehir</IonLabel>
                  <IonLabel>{item.city}</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>Başlangıç Tarihi</IonLabel>
                  <IonLabel>{item.startDate}</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>Bitiş Tarihi</IonLabel>
                  <IonLabel >{item.endDate === "" ? "Devam ediyor" : item.endDate}</IonLabel>
                </IonItem>
                <IonItem >
                  <IonLabel>Açıklama</IonLabel>
                  <IonLabel>{item.description}</IonLabel>
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
                      <IonLabel position="floating">İş unvanı</IonLabel>
                      <IonInput
                        value={updateData?.title}
                        {...register(`title`)}
                        placeholder="örn: Fen Fakültesi Diploması"
                      ></IonInput>
                      {errors.title && <span>This field is required</span>}
                    </IonItem>

                    <IonItem>
                      <IonLabel position="floating">Sehir/ilçe</IonLabel>
                      <IonInput
                        value={updateData?.city}
                        {...register(`city`)}
                        placeholder="örn: İstanbul"
                      ></IonInput>
                      {errors.city && <span>This field is required</span>}
                    </IonItem>

                    <IonItem>
                      <IonLabel position="floating">İş Veren</IonLabel>
                      <IonInput
                        value={updateData?.companyName}
                        {...register(`companyName`)}
                        placeholder="örn: University of london"
                      ></IonInput>
                      {errors.companyName && <span>This field is required</span>}
                    </IonItem>

                    <IonItem>
                      <IonLabel position="floating">Başlangıç Tarihi</IonLabel>
                      <IonInput type="date" value={updateData?.startDate}
                        {...register(`startDate`)}
                      ></IonInput>
                    </IonItem>

                    <IonItem>
                      <IonLabel position="floating">Bitiş Tarihi</IonLabel>
                      <IonInput type="date" value={updateData?.end}  {...register(`endDate`)}
                      ></IonInput>
                    </IonItem>
                    <IonItem>
                      <IonLabel position="floating">Açıklama</IonLabel>
                      <IonTextarea
                        value={updateData?.description}
                        {...register(`description`)}
                      ></IonTextarea>
                      {errors.description && <span>This field is required</span>}
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
export default ExperienceForm;
