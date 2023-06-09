import { AppDispatch } from "../store";
import axios from "axios";
import { pictureSlice } from "./PictureSlice";
import { tabsSlice } from "./TabsSlice";
import { appSlice } from "./AppSlice";

export const mainEndPoint = "https://ildan-dev.ru/shared/";

export const switchAppMode = () => (dispatch: AppDispatch) => {
	dispatch(appSlice.actions.switchAppMode());
};

export const fetchPictures = () => async (dispatch: AppDispatch) => {
	try {
		dispatch(pictureSlice.actions.picturesFetching);
		const response = await axios.get<string>(
			mainEndPoint + "photos-config.json",
		);
		const data = JSON.parse(JSON.stringify(response.data));
		dispatch(pictureSlice.actions.picturesFetchingSuccess(data));
		dispatch(tabsSlice.actions.setTabsCount(data.length));
	} catch (e) {
		dispatch(pictureSlice.actions.picturesFetchingFailed("error"));
	}
};

export const nextTab = () => (dispatch: AppDispatch) => {
	dispatch(tabsSlice.actions.switchIsLoading());
	setTimeout(() => dispatch(tabsSlice.actions.nextTab()), 200);
};

export const prevTab = () => (dispatch: AppDispatch) => {
	dispatch(tabsSlice.actions.switchIsLoading());
	setTimeout(() => dispatch(tabsSlice.actions.prevTab()), 200);
};

export const clearTabs = () => (dispatch: AppDispatch) => {
	dispatch(tabsSlice.actions.clearTabs());
};

export const setTabLoaded = () => (dispatch: AppDispatch) => {
	dispatch(tabsSlice.actions.switchIsLoading());
};

export const setTab = () => (dispatch: AppDispatch, tabNumber: number) => {
	dispatch(tabsSlice.actions.switchIsLoading());
	setTimeout(() => dispatch(tabsSlice.actions.setTab(tabNumber)), 200);
	setTimeout(() => dispatch(tabsSlice.actions.switchIsLoading()), 215);
};
