import {
  Beef,
  Car,
  Cookie,
  CupSoda,
  Droplet,
  Landmark,
  Microwave,
  PiggyBank,
  PlugZap2,
  ShieldPlus,
  ShoppingBag,
  Utensils,
} from "lucide-react";

export type IconListType = {
  [key: string]: React.ElementType;
};

const iconList: IconListType = {
  water: Droplet,
  electricity: PlugZap2,
  food: Beef,
  tax: Landmark,
  car: Car,
  shoppingBag: ShoppingBag,
  bank: PiggyBank,
  cookie: Cookie,
  meal: Utensils,
  drinks: CupSoda,
  appliance: Microwave,
  shield: ShieldPlus,
};

export default iconList;
