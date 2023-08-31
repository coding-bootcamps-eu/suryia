"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
//origin: "https://google.com",
}));
app.use(body_parser_1.default.json());
app.get("/corstest", (req, res) => {
    res.json({
        status: "ok",
    });
});
app.listen(process.env.PORT, () => {
    console.log("Server runnig at http://localhost:" + process.env.PORT);
});
//# sourceMappingURL=index.js.map