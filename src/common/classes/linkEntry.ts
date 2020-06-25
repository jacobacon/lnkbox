import Entry from "../interfaces/linkEntry";
import ContentType from "../types/contentType";

export default class LinkEntry implements Entry {
  contentType: ContentType;
  creationDate: Date;
  parentID: string[];

  title: string;
  tags: string[];

  constructor(
    public url: string,
    public userID: number,
    options: { parentID?: string[]; title?: string; tags?: string[] }
  ) {
    let { parentID, title, tags } = options;

    this.contentType = "link";
    this.creationDate = new Date();
    if (!parentID) {
      this.parentID = ["root"];
    } else {
      this.parentID = parentID;
    }

    this.title = title || url;

    this.tags = tags;
    //throw new Error("Invalide URL");
  }

  get entryTitle(): string {
    return this.title || this.url;
  }

  validate(): boolean {
    return true;
  }
}
