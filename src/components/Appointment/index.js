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



const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const DELETING = 'DELETING';
const EDITING = 'EDITING';
const CONFIRMING = 'CONFIRMING';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';


export default function Appointment (props) {

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
  }

  const deleteConfirm = () => {
    transition(CONFIRM)
  };

  const deleteAppointment = () => {
    transition(DELETING);
    Promise.resolve(props.cancelInterview(props.id))
      .then(() => transition(EMPTY))
      .catch(err => console.log(err));
  };



  return (
    <article className="appointment">
     {/* {props.time} */}
      <Header time={props.time} />
      {/* {props.interview ? <Show student={interview.student} interviewer={interview.interviewer}/> : <Empty />} */}
      {mode === EMPTY && <Empty onAdd={onAdd} />}
      {mode === SHOW && (
        <Show
          id={props.id}
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={deleteAppointment}
          onEdit={deleteConfirm}
          />
      )}
      
      { mode === CREATE && (
        <Form
        interviewers={[]}
        onSave={props.onSave}
        onCancel={onCancel}
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

    </article>
  )
} 