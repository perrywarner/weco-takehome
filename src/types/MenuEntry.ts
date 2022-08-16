import { Item } from "./Item";

export interface MenuEntry {
  id: number;
  item: Item;
  day: string;
  day_of_week: number;
  seq_no: number;
  sold_out: boolean;
  available: number;
  do_not_include_in_tip_calculation: boolean;
  ingredients_cost: string;
  link_id: string;
  menu: number;
}

const example: MenuEntry = {
  id: 5408,
  item: {
    id: 3394,
    allergens: [],
    date_created: "2022-07-18T20:05:09.368904Z",
    last_updated: "2022-07-18T20:05:09.368932Z",
    name: "dan dan noodles 7/25",
    description:
      '<span data-sheets-value="{&quot;1&quot;:2,&quot;2&quot;:&quot;puffed tofu, snow peas + edamame in Szechuan coconut sauce with fresh lo mein noodles; Korean red pepper flake + cashew crumble; smashed cucumber salad; baby bok choy with black garlic (ingredients ~$10)&quot;}" data-sheets-userformat="{&quot;2&quot;:4537,&quot;3&quot;:{&quot;1&quot;:4,&quot;2&quot;:&quot;\\&quot;$\\&quot;#,##0.00&quot;},&quot;6&quot;:{&quot;1&quot;:[{&quot;1&quot;:2,&quot;2&quot;:0,&quot;5&quot;:{&quot;1&quot;:2,&quot;2&quot;:0}},{&quot;1&quot;:0,&quot;2&quot;:0,&quot;3&quot;:3},{&quot;1&quot;:1,&quot;2&quot;:0,&quot;4&quot;:1}]},&quot;7&quot;:{&quot;1&quot;:[{&quot;1&quot;:2,&quot;2&quot;:0,&quot;5&quot;:{&quot;1&quot;:2,&quot;2&quot;:0}},{&quot;1&quot;:0,&quot;2&quot;:0,&quot;3&quot;:3},{&quot;1&quot;:1,&quot;2&quot;:0,&quot;4&quot;:1}]},&quot;8&quot;:{&quot;1&quot;:[{&quot;1&quot;:2,&quot;2&quot;:0,&quot;5&quot;:{&quot;1&quot;:2,&quot;2&quot;:0}},{&quot;1&quot;:0,&quot;2&quot;:0,&quot;3&quot;:3},{&quot;1&quot;:1,&quot;2&quot;:0,&quot;4&quot;:2}]},&quot;10&quot;:0,&quot;11&quot;:4,&quot;15&quot;:&quot;Calibri&quot;}" data-sheets-formula="=CONCATENATE(Menu!R[4]C[0],&quot; (ingredients ~$&quot;,Menu!R[12]C[2],&quot;)&quot;)">puffed tofu, snow peas + edamame in Szechuan coconut sauce with fresh lo mein noodles; Korean red pepper flake + cashew crumble; smashed cucumber salad; baby bok choy with black garlic (ingredients ~$10)</span>',
    kids_meal: false,
    menu_type: "Weekly Menu",
    item_type: "Entrée",
    wp_id: 186363,
  },
  day: "mon",
  day_of_week: 1,
  seq_no: 1,
  sold_out: true,
  available: 0,
  do_not_include_in_tip_calculation: true,
  ingredients_cost: "11.88",
  link_id: "186341:186363:mon",
  menu: 562,
};
