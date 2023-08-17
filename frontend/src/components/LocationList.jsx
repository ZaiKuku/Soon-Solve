import {
  Menu,
  MenuHandler,
  Button,
  MenuList,
  MenuItem,
  Checkbox,
} from "@material-tailwind/react";
import locations from "../locations/locations.js";

export function LocationList() {
  console.log(locations.NTU);
  const location = locations.NTU;
  return (
    <Menu
      dismiss={{
        itemPress: false,
      }}
    >
      <MenuHandler>
        <Button>Open Menu</Button>
      </MenuHandler>
      <MenuList>
        {location.map((item) => (
          <MenuItem key={item}>
            <label
              htmlFor={item}
              className="flex cursor-pointer items-center gap-2 p-2"
            >
              <Checkbox
                ripple={false}
                id="item-1"
                containerProps={{ className: "p-0" }}
                className="hover:before:content-none"
              />
              {item}
            </label>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}


