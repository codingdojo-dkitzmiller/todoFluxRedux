export const UPDATE_USERNAME = 'UPDATE_USERNAME';
export const UPDATE_FONTSIZE_PREFERENCE = 'UPDATE_FONTSIZE_PREFERENCE';

export const userNameUpdateAction = (name) => {
    return {
        type: UPDATE_USERNAME,
        value: name
    };
};

export const fontSizePreferenceUpdateAction = (fontsize) => {
    return {
        type: UPDATE_FONTSIZE_PREFERENCE,
        value: fontsize
    }
};

