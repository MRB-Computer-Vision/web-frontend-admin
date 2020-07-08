import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import UploadButton from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Snackbar, SnackbarOrigin } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { sign } from '../../util/AWSUtil';
import Message from '../Message';
import { useAuthContext } from '../../contexts/Auth';

import {
  UploadFile,
  ImagePreviewBox,
  Form,
  FileChooserButton,
  FileInput,
  Result,
} from './styles';

interface UploadProps {
  medicalRecordNumber?: string;
  find?: () => void;
}

function Alert(props: AlertProps): any {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export interface State extends SnackbarOrigin {
  open: boolean;
}

// tipando componente no formato de funcao
const Upload: React.FC<UploadProps> = ({
  medicalRecordNumber,
  find,
}: UploadProps): JSX.Element => {
  const acceptedTypes: string[] = ['image/png', 'image/jpg', 'image/jpeg'];

  const [file, setFile] = useState();
  const [data, setData] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  // remover
  const [showMessage, setShowMessage] = useState(false);
  const [erroUpload, setErroUpload] = useState(false);
  const [message, setMessage] = useState('');
  const [severitySuccess, setSeveritySuccess] = useState(true);
  // novo
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;

  const { token } = useAuthContext();

  const handleClose = (): void => {
    setState({ ...state, open: false });
  };

  const isValidFileType = (fileType: string): boolean => {
    return acceptedTypes.includes(fileType);
  };

  async function submitExame(dataSubmitExame: any): Promise<any> {
    try {
      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const url = `${process.env.REACT_APP_BASE_URL || ''}/exams/`;
      const uploadResult = await axios.post(url, dataSubmitExame, options);
      return uploadResult;
    } catch (err) {
      console.log('Erro upload', err);
    }
    return {};
  }

  async function handleFileUpload(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    if (!isValidFileType(file.type)) {
      setMessage(`Formato não suportado`);
      return;
    }
    setUploading(true);
    try {
      const signedUrl = await sign(file.name, file.type);
      const options = {
        headers: {
          'Content-Type': file.type,
        },
      };
      const dataS3 = await axios.put(signedUrl, file, options);
      console.log('dados enviados para amazon', dataS3);
      if (dataS3.status === 200) {
        const files = [{ file_path: file.name }];
        const dataSubmit = {
          type: 'raio-x',
          number: medicalRecordNumber,
          exam_files: files,
        };
        const result = await submitExame(dataSubmit);
        setData(result.data.exam);
        setMessage(result.data.message);
        setUploading(false);
        setFile(undefined);
        setSeveritySuccess(true);
        if (find) {
          find();
        }
      } else {
        setData(null);
        setMessage(dataS3.statusText);
        setSeveritySuccess(false);
      }
      setErroUpload(false);
    } catch (err) {
      setSeveritySuccess(false);
      setUploading(false);
      setErroUpload(true);
      setMessage(`${err}`);
    } finally {
      setUploading(false);
      setShowMessage(true);
      setState({ open: true, vertical: 'top', horizontal: 'center' });
    }
  }

  return (
    <>
      <UploadFile>
        <ImagePreviewBox />
        <Form onSubmit={handleFileUpload}>
          {uploading && <LinearProgress />}
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
          {!uploading && (
            <UploadButton
              type="submit"
              disabled={uploading}
              variant="contained"
              color="primary"
            >
              Enviar Arquivo
            </UploadButton>
          )}
        </Form>
        {data ? <Result>{data}</Result> : <span />}
      </UploadFile>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert
          onClose={handleClose}
          severity={severitySuccess ? 'success' : 'error'}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};
export default Upload;
