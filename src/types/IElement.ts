export default interface IElement {
  id?: number;
  type: string;
  parent_id: number;
  atributes: object;
  children?: IElement[];
}
