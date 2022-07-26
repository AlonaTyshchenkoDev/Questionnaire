import { IQuestionState } from './questions.reducer';
import { IQuestionItem } from '../../shared/question-item/question-item.interfaces';

export const selectQuestionById = (state: IQuestionState, props: { id: string }): IQuestionItem => state[props.id];

export const selectQuestionsList = (state: IQuestionState): IQuestionItem[] => Object.values(state);

export const selectQuestionState = (state: IQuestionState): IQuestionState => state;
