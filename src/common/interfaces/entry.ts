import ContentType from "../types/contentType";

export default interface Entry {
  readonly contentType: ContentType;
  readonly creationDate: Date;
  readonly userID: number;
  readonly parentID: number[];

  tags: string[];

  [key: string]: any;
}
