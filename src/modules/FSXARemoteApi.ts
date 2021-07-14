import { FSXAApiErrors } from './../enums'
type FSXARemoteApiConfig = {
  apikey: string // `${number}${number}${number}${number}-${number}${number}${number}${number}`
  caasURL: string
  navigationServiceURL: string
  tenantID: string
  projectID: string
}

export default class FSXARemoteApi {
  private _apikey: string = this.apikey
  private _caasURL: string = this.caasURL
  private _navigationServiceURL: string = this.navigationServiceURL
  private _tenantID: string = this.tenantID
  private _projectID: string = this.projectID

  constructor({ apikey, caasURL, navigationServiceURL, tenantID, projectID }: FSXARemoteApiConfig) {
    this.apikey = apikey
    this.caasURL = caasURL
    this.navigationServiceURL = navigationServiceURL
    this.tenantID = tenantID
    this.projectID = projectID
  }

  public get apikey(): string {
    return this._apikey
  }
  public set apikey(value: string) {
    if (!value) {
      throw new Error(FSXAApiErrors.MISSING_API_KEY)
    }
    this._apikey = value
  }
  public get caasURL(): string {
    return this._caasURL
  }
  public set caasURL(value: string) {
    if (!value) {
      throw new Error(FSXAApiErrors.MISSING_CAAS_URL)
    }
    this._caasURL = value
  }
  public get projectID(): string {
    return this._projectID
  }
  public set projectID(value: string) {
    if (!value) {
      throw new Error(FSXAApiErrors.MISSING_PROJECT_ID)
    }
    this._projectID = value
  }
  public get tenantID(): string {
    return this._tenantID
  }
  public set tenantID(value: string) {
    if (!value) {
      throw new Error(FSXAApiErrors.MISSING_TENANT_ID)
    }
    this._tenantID = value
  }
  public get navigationServiceURL(): string {
    return this._navigationServiceURL
  }
  public set navigationServiceURL(value: string) {
    if (!value) {
      throw new Error(FSXAApiErrors.MISSING_NAVIGATION_SERVICE_URL)
    }
    this._navigationServiceURL = value
  }
}
