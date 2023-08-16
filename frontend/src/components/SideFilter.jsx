import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setOpenSideFilter } from "../redux/reducers";
import { LocationList } from "./LocationList";

export function DrawerDefault() {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.openSideFilter.openSideFilter);

  const closeDrawer = () => {
    dispatch(setOpenSideFilter(false));
    console.log(open);
  };

  return (
    <Fragment>
      <Drawer open={open} onClose={closeDrawer} className="p-4">
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            Material Tailwind
          </Typography>
        </div>
        <LocationList />
      </Drawer>
    </Fragment>
  );
}
