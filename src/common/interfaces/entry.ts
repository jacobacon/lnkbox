import ContentType from "../types/contentType";

export default interface Entry {
  readonly contentType: ContentType;
  readonly creationDate: Date;
  readonly userID: string;
  readonly parent: string;

  tags: string[];

  [key: string]: any;
}
