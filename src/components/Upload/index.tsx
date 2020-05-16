import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import { sign } from './AWSUtil';

import {
  App,
  ImagePreviewBox,
  Form,
  FileChooserButton,
  FileInput,
  UploadButton,
  Result,
  Message,
} from './styles';

// tipando componente no formato de funcao
const Upload: React.FC = (): JSX.Element => {
  const acceptedTypes: string[] = ['image/png', 'image/jpg', 'image/jpeg'];

  const [file, setFile] = useState();
  const [uploadMessage, setUploadMessage] = useState('');
  const [data, setData] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const isValidFileType = (fileType: string): boolean => {
    return acceptedTypes.includes(fileType);
  };

  async function handleFileUpload(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (!isValidFileType(file.type)) {
      setUploadMessage(`Formato não suportado`);
      return;
    }

    try {
      const signedUrl = await sign(file.name, file.type);

      const options = {
        headers: {
          'Content-Type': file.type,
        },
      };

      const result = axios.put(signedUrl, file, options);
      console.log(result);
      setData('Arquivo no S3');
      setUploading(false);
      setUploadMessage('Upload realizado com sucesso');
    } catch (err) {
      setUploading(false);
      setUploadMessage(`Ocorreu um erro: ${err}`);
    }
  }

  return (
    <>
      <App>
        <ImagePreviewBox />
        <Form onSubmit={handleFileUpload}>
          <FileChooserButton type="button">
            Choose File
            <FileInput
              type="file"
              name="file"
              accept={acceptedTypes.toString()}
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setFile(e.target.files[0]);
                }
              }}
            />
          </FileChooserButton>
          <UploadButton type="submit" disabled={uploading}>
            Upload
          </UploadButton>
        </Form>
        {uploadMessage ? <Message>{uploadMessage}</Message> : <span />}
        {data ? <Result>{data}</Result> : <span />}
      </App>
    </>
  );
};
export default Upload;
