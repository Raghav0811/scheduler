export function getAppointmentsForDay(state, day) {
  const results = [];
  const dayData = state.days.filter(d => d.name === day)

  if(!dayData[0]) {
    return results;
  }
  for (const i of dayData[0].appointments) {
    results.push(state.appointments[i]);
  }

  return results;
}

export function getInterview(state, interview) {


  if (interview) {
    const interviewerId = interview.interviewer;

    let output = {
        student: interview.student,
        interviewer: {
          id: interviewerId,
          name: state.interviewers[interviewerId].name,
          avatar: state.interviewers[interviewerId].avatar
      }
    }

    return output;
  }

  return null;
}; 

export function getInterviewersForDay(state, day) {
  const result = [];
  const dayData = state.days.filter(d => d.name === day)

  if (!dayData[0]) return result;
  for (const a of dayData[0].interviewers) {
    result.push(state.interviewers[a]);
  }
  
  return result;
};

