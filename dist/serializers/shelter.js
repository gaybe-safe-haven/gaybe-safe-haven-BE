"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeShelter = void 0;
function serializeShelter(shelter) {
    if (shelter) {
        return {
            id: shelter.id,
            type: 'shelter',
            attributes: {
                name: shelter.name,
                streetAddress: shelter.streetAddress,
                state: shelter.state,
                zip: shelter.zip,
                websiteUrl: shelter.websiteUrl,
                phoneNumber: shelter.phoneNumber,
                verified: shelter.verified,
            },
        };
    }
    else {
        return { data: {} };
    }
}
exports.serializeShelter = serializeShelter;
//# sourceMappingURL=shelter.js.map