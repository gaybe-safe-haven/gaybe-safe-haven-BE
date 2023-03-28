"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dotenv = require("dotenv");
const cors_1 = require("cors");
dotenv.config();
const app = (0, express_1.default)();
if (!process.env.PORT) {
    process.exit(1);
}
const PORT = parseInt(process.env.PORT, 10);
//Configure Global Middlware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
//Start Server
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});
// Example of route organizaiton for endpoints
// app.use('api/v1/example', exampleController)
//# sourceMappingURL=app.js.map