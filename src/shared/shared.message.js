// * _LABEL_NAME will be replace with specific lable.

const REPLACE_BY_TEXT = '_LABEL_NAME';

const SHARED_MESSAGES = Object.freeze({
    notUniqueError: `${REPLACE_BY_TEXT} is already used.`,
    gotError: `An unwanted error occured while ${REPLACE_BY_TEXT}.`,
    dataNotFound: `${REPLACE_BY_TEXT} data not found.`,
    successfullySaved: `Successfully saved ${REPLACE_BY_TEXT}.`,
    provideValidDataError: `Please provide valid ${REPLACE_BY_TEXT}.`,
    requiredFieldError: `${REPLACE_BY_TEXT} field is required.`
});

const SHARED_STATUS = Object.freeze({
    error: `Error`,
    errorStatusCode: 200,
    success: `Success`,
    successStatusCode: 200
});

module.exports = {
    SHARED_MESSAGES,
    SHARED_STATUS,
    REPLACE_BY_TEXT
};