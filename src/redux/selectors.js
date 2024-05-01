import { createSelector } from "reselect";

export const chatSelector = createSelector(
  (state) => state,
  ({ chat }) => chat
);
