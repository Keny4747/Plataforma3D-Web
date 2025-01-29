export interface Book {
  id?: number;
  title: string;
  description: string;
  coverPath: string;
  filePath: string| null;
  createdAt?: Date;
}
