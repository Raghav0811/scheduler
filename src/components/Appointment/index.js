import React from 'react';
import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import Form from 'components/Appointment/Form';
import useVisualMode from 'hooks/useVisualMode';
import 'components/Appointment/styles.scss';
import Status from './Status';
import Confirm from 'components/Appointment/Confirm';
import Error from 'components/Appointment/Error';


export default function Appointment (props) {

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const DELETING = 'DELETING';
const CONFIRM = "CONFIRM";
const EDIT = 'EDITING';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';



  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)

    Promise.resolve(props.bookInterview(props.id, interview))
      .then(() => transition(SHOW))
        .catch(err => {
          transition(ERROR_SAVE, true)
          console.log(err)
        });
      };
      
      const deleteConfirm = () => {
        transition(CONFIRM)
      };
      
      const deleteAppointment = () => {
        transition(DELETING);
        Promise.resolve(props.cancelInterview(props.id))
        .then(() => transition(EMPTY))
        .catch(err => {
          transition(ERROR_SAVE, true)
          console.log(err)
        });
      };
      
      
      
      return (
        <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />} 
      {mode === SHOW && (
        <Show
        id={props.id}
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={() => transition(CONFIRM)}
        onEdit={deleteConfirm}
        />
        )}
      
      { mode === CREATE && (
        <Form
        interviewers={[]}
        onSave={props.onSave}
        onCancel={back}
        />
        )}
      {mode === SAVING && (
        <Status 
        message="Saving"
        />
        )}

      {mode === CONFIRM && (
        <Confirm 
        message="Are you sure you want to delete?"
        onConfirm={deleteAppointment}
        onCancel = {() => back()}
        />
        )}


      {mode === DELETING && (
        <Status 
        message="Deleting"
        />
        )}

      {mode === EDIT && (
        <Form 
        name={props.interview.student}
        interviewer={props.interview.interviewer.id}
        interviewers={props.interviewers}
        onCancel = {() => back()}
        onSave = {save}
        />
        )}

      {mode === ERROR_SAVE && (
        <Error 
        message="Unable to save"
        onClose={() => back()}
        />
        )}
      {mode === ERROR_DELETE && (
        <Error 
        message="Unable to delete"
        onClose={() => back()}
        />
        )}

    </article>
  )

  
}

 