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

  return (
    <article className="appointment">
     {/* {props.time} */}
      <Header time={props.time} />
      {/* {props.interview ? <Show student={interview.student} interviewer={interview.interviewer}/> : <Empty />} */}
      {mode === EMPTY && <Empty onAdd={onAdd} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
        />
      )}
      { mode === CREATE && (
        <Form
        interviewers={[]}
        onSave={props.onSave}
        onCancel={onCancel}
        />
      )}
    </article>
  )
} 