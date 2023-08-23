import { useEffect, useState } from "react";
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
import {
  setSelectedLocations,
  setSelectedSex,
  setSelectedFriend,
} from "@/redux/locationSlice";
import locations from "@/locations/locations";

export function LocationFilter() {
  const [open, setOpen] = useState(0);
  const dispatch = useDispatch();
  const sex = ["男", "女", "其他"];

  const [alertContent, setAlertContent] = useState("");
  const selectedLocations = useSelector(
    (state) => state.selectedLocations.selectedLocations
  );
  const selectedSex = useSelector((state) => state.selectedLocations.sex);
  const selectedFriend = useSelector((state) => state.selectedLocations.friend);
  const numConditions =
    selectedLocations.length + (selectedSex ? 1 : 0) + selectedFriend;
  useEffect(() => {
    if (numConditions === 5) {
      setAlertContent("最多只能選擇五個條件");
    }
  }, [numConditions]);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const handleSelectedLocations = (value) => {
    if (selectedLocations.length > 5) {
      return;
    } else {
      dispatch(setSelectedLocations(value));
      setAlertContent("最多只能選擇五個地點");
    }
  };

  const handleSelectedSex = (value) => {
    console.log("dispatch", value);
    dispatch(setSelectedSex(value));
    setAlertContent("最多只能選擇一個性別");
  };

  const handleSelectedFriend = () => {
    dispatch(setSelectedFriend());
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
          checked={selectedLocations?.includes(item)}
          onClick={() => handleSelectedLocations(item)}
          disabled={numConditions > 4 && !selectedLocations.includes(item)}
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
            (selectedSex.length === 1 && !selectedSex.includes(item)) ||
            numConditions > 4
          }
        />
        {item}
      </label>
    </ListItem>
  ));
  return (
    <List>
      {numConditions > 4 && <AlertCustomAnimation content={alertContent} />}
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
          <List className="p-0 max-h-[500px] overflow-y-auto">
            {locationItems}
          </List>
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
      <Accordion open={open === 3}>
        <ListItem className="p-0" selected={open === 2}>
          <AccordionHeader
            onClick={() => handleOpen(3)}
            className="border-b-0 p-3"
          >
            <Typography color="blue-gray" className="mr-auto font-normal">
              friend
            </Typography>
          </AccordionHeader>
        </ListItem>
        <AccordionBody className="py-1">
          <List className="p-0">
            <ListItem className="p-0">
              <label
                htmlFor="friend"
                className="flex cursor-pointer items-center gap-2 p-2"
              >
                <Checkbox
                  ripple={false}
                  id="item-1"
                  containerProps={{ className: "p-0" }}
                  className="hover:before:content-none"
                  onClick={() => handleSelectedFriend()}
                  disabled={!selectedFriend && numConditions > 4}
                />
                friend
              </label>
            </ListItem>
          </List>
        </AccordionBody>
      </Accordion>
    </List>
  );
}
