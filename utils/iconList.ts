import { Beef, Car, Droplet, Landmark, PlugZap2 } from "lucide-react";

export type IconListType = {
  [key: string]: React.ElementType;
};

const iconList: IconListType = {
  water: Droplet,
  electricity: PlugZap2,
  food: Beef,
  tax: Landmark,
  car: Car,
};

export default iconList;
