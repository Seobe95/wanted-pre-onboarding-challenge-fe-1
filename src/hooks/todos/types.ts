/** Todos 결과값 타입 */
export interface TodoFetchResult {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

/** Todos post시 사용되는 타입 */
export interface TodoInputForm {
  title: string;
  content: string;
}
