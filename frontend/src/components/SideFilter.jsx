import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setOpenSideFilter } from "../redux/reducers";
import { LocationFilter } from "./locationFilter";

export function DrawerDefault() {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.openSideFilter.openSideFilter);
  const closeDrawer = () => {
    dispatch(setOpenSideFilter(false));
  };

  return (
    <Fragment>
      <Drawer open={open} onClose={closeDrawer} className="p-4">
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            Filter
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        <LocationFilter />
      </Drawer>
    </Fragment>
  );
}
