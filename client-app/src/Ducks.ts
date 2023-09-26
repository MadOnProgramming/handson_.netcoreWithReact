export interface Duck {
  Name: string;
  NoOfLegs: number;
  MakeSound: (sound: string) => void;
}

const Duck1: Duck = {
  Name: "Duck1",
  NoOfLegs: 2,
  MakeSound: (sound: string) => console.log(sound + " from duck1"),
};

const Duck2: Duck = {
  Name: "Duck2",
  NoOfLegs: 2,
  MakeSound: (sound: string) => console.log(sound),
};

export const ducks: Duck[] = [Duck1, Duck2];
