export type Serialized<T> = {
  id: number;
  type: string;
  attributes: Omit<T, "id"> 
}

export type Serializer<T> = (data: T) => Serialized<T>;

