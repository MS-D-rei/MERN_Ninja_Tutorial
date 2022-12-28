export interface IResponsePayload {
  name: string;
  email: string;
  idToken: string;
}

export interface INotOkResponse {
  [message: string]: string;
}