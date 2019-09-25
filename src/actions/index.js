import { CLICK_UPDATE_VALUE, CONTAINER_LOADING } from './actionTypes';

export const clickButton = value => ({
    type: CLICK_UPDATE_VALUE,
    newValue: value
});

export const updateContainerLoading = state => ({
    type: CONTAINER_LOADING,
    newValue: state
});