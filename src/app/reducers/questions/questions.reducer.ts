import { IQuestionItem } from '../../shared/question-item/question-item.interfaces';
import { QuestionsActions, questionsActionsType } from './questions.actions';

export const questionsFeatureKey = 'questions';

export interface IQuestionState {
  [key: string]: IQuestionItem
}

export const initialState: IQuestionState = {};

export const questionReducer = (state = initialState, action: QuestionsActions) => {
  switch (action.type) {
    case questionsActionsType.addQuestionAction:
      const questionData = action.payload.questionData;
      return {
        ...state,
        [questionData.id]: questionData
      };
    case questionsActionsType.updateQuestionAction:
      const updatedQuestionData = action.payload.questionData;
      const id = updatedQuestionData.id;
      return {
        ...state,
        [id]: {...state[id], ...updatedQuestionData, data: {...state[id].data,...updatedQuestionData.data}}
      };
    case questionsActionsType.changeAnswersAction:
      const questionId = action.payload.id;
      const answer = action.payload.answer;
      return {
        ...state,
        [questionId]: {...state[questionId], data: {...state[questionId].data, answer: [...answer]}}
      };
    case questionsActionsType.deleteQuestionAction:
      const newState = {...state};
      delete newState[action.payload.id];
      return newState;
    case questionsActionsType.setInitialData:
      return action.payload;
    default:
      return state;
  }
};
