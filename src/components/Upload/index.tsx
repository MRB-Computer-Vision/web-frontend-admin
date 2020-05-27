import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import { sign } from '../../util/AWSUtil';
import Message from '../Message';

import {
  UploadFile,
  ImagePreviewBox,
  Form,
  FileChooserButton,
  FileInput,
  UploadButton,
  Result,
} from './styles';

// tipando componente no formato de funcao
const Upload: React.FC = (): JSX.Element => {
  const acceptedTypes: string[] = ['image/png', 'image/jpg', 'image/jpeg'];

  const [file, setFile] = useState();
  const [data, setData] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const [uploadMessage, setUploadMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [erroUpload, setErroUpload] = useState(false);

  const isValidFileType = (fileType: string): boolean => {
    return acceptedTypes.includes(fileType);
  };

  async function submitExame(dataSubmitExame: any): Promise<any> {
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const url = `${process.env.REACT_APP_BASE_URL || ''}/exams/`;
    const uploadResult = await axios.post(url, dataSubmitExame, options);
    return uploadResult;
  }

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
      const dataS3 = await axios.put(signedUrl, file, options);
      if (dataS3.status === 200) {
        const files = [{ file_path: file.name }];
        const dataSubmit = {
          type: file.name,
          exam_files: files,
        };
        const result = await submitExame(dataSubmit);
        setData(result.data.exam);
        setUploadMessage(result.data.message);
        setUploading(false);
        setFile(undefined);
      } else {
        setData(null);
        setUploadMessage(dataS3.statusText);
      }
      setErroUpload(false);
    } catch (err) {
      setUploading(false);
      setErroUpload(true);
      setUploadMessage(`${err}`);
    }
    setUploading(false);
    setShowMessage(true);
  }

  return (
    <>
      <UploadFile>
        <ImagePreviewBox />
        <Message show={showMessage} message={uploadMessage} erro={erroUpload} />
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
            Send File
          </UploadButton>
        </Form>
        {data ? <Result>{data}</Result> : <span />}
      </UploadFile>
    </>
  );
};
export default Upload;
