import Entry from "./entry";

export default interface LinkEntry extends Entry {
  url: string;
  title?: string;
}
