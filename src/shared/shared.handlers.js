const { replaceByLabel } = require("../global/global.methods");
const { SHARED_STATUS, SHARED_MESSAGES } = require("./shared.message")

// ! (*Error Response Handler)
exports.GOT_ERROR = (res, error, replace_LABEL_NAME_text, customMessage) => {
    return res.status(SHARED_STATUS.errorStatusCode).send({
        status: SHARED_STATUS.error,
        error: error,
        message: customMessage ? customMessage : replaceByLabel(SHARED_MESSAGES.gotError, replace_LABEL_NAME_text)
    });
};

// ! Data Not Found (* Error Response Hanlder)
exports.DATA_NOT_FOUND_ERROR = (res, replace_LABEL_NAME_text, customMessage) => {
    return res.status(SHARED_STATUS.errorStatusCode).send({
        status: SHARED_STATUS.error,
        message: customMessage ? customMessage : replaceByLabel(SHARED_MESSAGES.gotError, replace_LABEL_NAME_text)
    });
};

//* Data saved successfully (*Success Response Handler)
exports.DATA_SAVED_SUCCESSFULLY = (res, replace_LABEL_NAME_text, customMessage) => {
    return res.status(SHARED_STATUS.successStatusCode).send({
        status: SHARED_STATUS.success,
        message: customMessage ? customMessage : replaceByLabel(SHARED_MESSAGES.successfullySaved, replace_LABEL_NAME_text)
    });
};