"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../authMiddleware");
const router = (0, express_1.default)();
router.post("/signup", (req, res) => {
    res.send("signup handler");
});
router.post("/signin", (req, res) => {
    res.send("signin handler");
});
router.get("/user", authMiddleware_1.authMiddleware, (req, res) => {
    res.send("get user");
});
exports.userRouter = router;
