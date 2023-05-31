import React, { useState } from 'react';
import { IonLabel, IonButton, IonImg } from '@ionic/react';

interface FileUploadProps {
  label: string;
}
const Photo: React.FC<FileUploadProps> = ({ label }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Yüklemek için burada seçilen dosyayı kullanabilirsiniz
      console.log('Yüklenecek dosya:', selectedFile);
    }
  };

  return (
    <div>
      <IonLabel>{label}</IonLabel>
      <input type="file" accept=".jpeg,.jpg,.png" onChange={handleFileSelect} />

      {previewUrl && <IonImg src={previewUrl} alt="Preview" />}

      <IonButton onClick={handleUpload} disabled={!selectedFile}>
        Yükle
      </IonButton>

      {selectedFile && (
        <div>
          <h4>Seçilen Dosya:</h4>
          <p>{selectedFile.name}</p>
          <h4>Önizleme:</h4>
          <IonImg src={previewUrl} alt="Preview" />
        </div>
      )}
    </div>
  );
};

export default Photo;