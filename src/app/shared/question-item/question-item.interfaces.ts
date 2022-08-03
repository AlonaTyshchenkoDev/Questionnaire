export interface IQuestionItem {
  id: string,
  createAt?: Date,
  updateAt: Date,
  type: string,
  data: {
    question: string,
    options: string[],
    answer: string[]
  }
}
