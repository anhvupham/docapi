
export class Route {
  path: string;
  method: string;
  requestHeader: string;
  requestBody: string;
  responseSuccessHeader: string;
  responseSuccessBody: string;
  responseFailHeader: string;
  responseFailBody: string;
  project: string;
  id: string;

  constructor(data?: any) {
    if (!data) return;
    this.id = data.id;
    this.path = data.path;
    this.method = data.method;
    this.requestHeader = data.requestHeader;
    this.requestBody = data.requestBody;
    this.responseSuccessHeader = data.responseSuccessHeader;
    this.responseSuccessBody = data.responseSuccessBody;
    this.responseFailHeader = data.responseFailHeader;
    this.responseFailBody = data.responseFailBody;
    this.project = data.project;
  }
}
