import React, { FormEvent } from 'react';

import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';

import { useAuthContext } from '../../contexts/Auth';

import View from '../../components/View';
import Upload from '../../components/Upload';

import getMedicalRecords from '../../services/medicalRecords';

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      flexGrow: 1,
      padding: theme.spacing(5),
    },
    find: {
      flexGrow: 1,
    },
    table: {
      minWidth: 700,
    },
    head: {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.common.white,
    },
    fab: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

interface ExamFile {
  id: string;
  file_path: string;
}

interface Exam {
  id: string;
  status: string;
  result: string;
  type: string;
  created_at: string;
  updated_at: string;
  exam_files: ExamFile[];
}

interface MedicalRecord {
  id?: string;
  number?: string;
  exams?: Exam[];
}

interface UploadProps {
  medicalRecordNumber: string;
}

const ClinicalEvaluation: React.FC = () => {
  const classes = useStyles();
  const [medicalRecordNumber, setMedicalRecordNumber] = React.useState<string>(
    '',
  );
  const [medicalRecord, setMedicalRecord] = React.useState<MedicalRecord>({});
  const [response, setResponse] = React.useState<any>({});
  const [loading, setLoading] = React.useState<boolean>(false);
  const { token } = useAuthContext();
  const [showUpload, setShowUpload] = React.useState<boolean>(false);
  const [showExams, setShowExams] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState(false);

  const onChangeValue = (field: string) => ({ target }: any) => {
    setMedicalRecordNumber(target.value);
  };

  async function find(): Promise<void> {
    try {
      setLoading(true);
      const responsea = await getMedicalRecords(token || '');
      setResponse(responsea);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const filterByNumber = (data: any): any => {
    return data.filter(
      (mr: MedicalRecord) => mr.number === medicalRecordNumber,
    );
  };

  // exibir listagem
  React.useEffect(() => {
    if (response.data && medicalRecord !== undefined && medicalRecord.id) {
      setShowExams(true);
    } else {
      setShowExams(false);
    }
  }, [setShowExams, response.data, medicalRecord]);

  // exibir upload
  React.useEffect(() => {
    console.log('medical', medicalRecord);
    if (
      !loading &&
      response.data &&
      (medicalRecord === undefined || !medicalRecord.id)
    ) {
      setShowUpload(true);
    } else {
      setShowUpload(false);
    }
  }, [setShowUpload, response.data, medicalRecord]);

  React.useEffect(() => {
    if (response.data) {
      const tmp = filterByNumber(response.data.data);
      setMedicalRecord(tmp ? tmp[0] : null);
    }
  }, [response.data, setMedicalRecord]);

  const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    console.log('onSubmit', medicalRecordNumber);
    event.preventDefault();
    find();
  };

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <View titlePage="Avaliação Clínica">
      <div className={classes.content}>
        <h3>Avaliação Clínica</h3>
        <Container component="main">
          <form className={classes.find} onSubmit={onSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <TextField
                  size="medium"
                  variant="outlined"
                  margin="normal"
                  required
                  id="medicalRecordNumber"
                  label="Prontuário"
                  name="medicalRecordNumber"
                  autoComplete="medicalRecordNumber"
                  placeholder="Informe o número"
                  autoFocus
                  value={medicalRecordNumber}
                  onChange={onChangeValue('medicalRecordNumber')}
                />
              </Grid>
              <Grid item xs={3}>
                <br />
                <br />
                {!loading && (
                  <>
                    <Button type="submit" variant="contained" color="primary">
                      Pesquisar
                    </Button>
                  </>
                )}
                {loading && <CircularProgress />}
              </Grid>
              <Grid item xs={5} />
              {showExams && (
                <Grid item xs={1}>
                  <br />
                  <Fab
                    aria-label="Adicionar"
                    color="primary"
                    onClick={() => {
                      setShowUpload(true);
                      setShowExams(false);
                    }}
                  >
                    <AddIcon />
                  </Fab>
                </Grid>
              )}
            </Grid>
          </form>
        </Container>
        {showExams && (
          <>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Data de Envio</StyledTableCell>
                    <StyledTableCell>Resultado</StyledTableCell>
                    <StyledTableCell>Status</StyledTableCell>
                    <StyledTableCell>Tipo</StyledTableCell>
                    <StyledTableCell>Total de Arquivos</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {response.data &&
                    medicalRecord &&
                    medicalRecord.exams &&
                    medicalRecord.exams.map((exam) => (
                      <StyledTableRow key={exam.id}>
                        <StyledTableCell>{exam.created_at}</StyledTableCell>
                        <StyledTableCell>
                          {exam.result === 'non-COVID-19'
                            ? 'Negativo'
                            : 'Posititivo'}
                        </StyledTableCell>
                        <StyledTableCell>
                          {exam.status === 'StatusEnum.processed'
                            ? 'Processado'
                            : 'Em Processamento'}
                        </StyledTableCell>
                        <StyledTableCell>{exam.type}</StyledTableCell>
                        <StyledTableCell>
                          {exam.exam_files.length}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  {response.data && medicalRecord && !medicalRecord.exams && (
                    <StyledTableRow>
                      <StyledTableCell colSpan={5}>
                        Não há exames
                      </StyledTableCell>
                    </StyledTableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
        {showUpload && (
          <>
            <div>
              <br />
              <Upload medicalRecordNumber={medicalRecordNumber} find={find} />
            </div>
          </>
        )}
      </div>
    </View>
  );
};

export default ClinicalEvaluation;
