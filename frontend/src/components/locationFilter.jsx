import { useState } from "react";
import {
  List,
  ListItem,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Typography,
} from "@material-tailwind/react";

import { AlertCustomAnimation } from "./Alert";

import { Checkbox } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedLocations, setSelectedSex } from "@/redux/locationSlice";
import locations from "@/locations/locations";

export function LocationFilter() {
  const [open, setOpen] = useState(0);
  const dispatch = useDispatch();
  const sex = ["男", "女", "其他"];
  const selectedSex = useSelector((state) => state.selectedLocations.sex);
  const selectedLocations = useSelector(
    (state) => state.selectedLocations.selectedLocations
  );
  const numConditions = selectedLocations.length + selectedSex.length;
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const handleSelectedLocations = (value) => {
    if (selectedLocations.length > 5) {
      return;
    } else {
      dispatch(setSelectedLocations(value));
    }
  };

  const handleSelectedSex = (value) => {
    dispatch(setSelectedSex(value));
  };

  const locationItems = locations.NTU.map((item) => (
    <ListItem key={item} className="p-0">
      <label
        htmlFor={item}
        className="flex cursor-pointer items-center gap-2 p-2"
      >
        <Checkbox
          ripple={false}
          id="item-1"
          containerProps={{ className: "p-0" }}
          className="hover:before:content-none"
          onClick={() => handleSelectedLocations(item)}
          disabled={
            selectedLocations.length > 4 && !selectedLocations.includes(item)
          }
        />
        {item}
      </label>
    </ListItem>
  ));

  const sexItems = sex.map((item) => (
    <ListItem key={item} className="p-0">
      <label
        htmlFor={item}
        className="flex cursor-pointer items-center gap-2 p-2"
      >
        <Checkbox
          ripple={false}
          id="item-1"
          containerProps={{ className: "p-0" }}
          className="hover:before:content-none"
          onClick={() => handleSelectedSex(item)}
          disabled={
            selectedLocations.length > 4 && !selectedLocations.includes(item)
          }
        />
        {item}
      </label>
    </ListItem>
  ));

  return (
    <List>
      {selectedLocations.length > 4 && (
        <AlertCustomAnimation content="You can only select up to 5 locations" />
      )}
      <Accordion open={open === 1}>
        <ListItem className="p-0" selected={open === 1}>
          <AccordionHeader
            onClick={() => handleOpen(1)}
            className="border-b-0 p-3"
          >
            <Typography color="blue-gray" className="mr-auto font-normal">
              Location
            </Typography>
          </AccordionHeader>
        </ListItem>
        <AccordionBody className="py-1">
          <List className="p-0">{locationItems}</List>
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2}>
        <ListItem className="p-0" selected={open === 2}>
          <AccordionHeader
            onClick={() => handleOpen(2)}
            className="border-b-0 p-3"
          >
            <Typography color="blue-gray" className="mr-auto font-normal">
              Sex
            </Typography>
          </AccordionHeader>
        </ListItem>
        <AccordionBody className="py-1">
          <List className="p-0">{sexItems}</List>
        </AccordionBody>
      </Accordion>
    </List>
  );
}
