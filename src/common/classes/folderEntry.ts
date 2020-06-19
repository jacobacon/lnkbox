import Entry from "../interfaces/folderEntry";
import ContentType from "../types/contentType";

export default class FolderEntry implements Entry {
  contentType: ContentType;
  creationDate: Date;
  parentID: string[];
  tags?: string[];
  constructor(
    public name: string,
    public userID: number,
    options: { parentID?: string[]; tags?: string[] }
  ) {
    let { parentID, tags } = options;
    this.contentType = "folder";
    this.creationDate = new Date();
    if (!parentID) {
      this.parentID = ["root"];
    } else {
      this.parentID = parentID;
    }

    this.tags = tags;
  }

  validate(): boolean {
    return true;
  }
}
