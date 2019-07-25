export default class Node {
  id: string;
  pos_x: number;
  pos_y: number;
  type: string;
  label: string;

  constructor(id: string, pos_x: any, pos_y: any, type: any, label: any) {
    this.id = id;
    this.pos_x = pos_x;
    this.pos_y = pos_y;
    this.type = type;
    this.label = label;
  }
}
