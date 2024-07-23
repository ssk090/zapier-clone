"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.zapRouter = void 0;
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../authMiddleware");
const router = (0, express_1.default)();
router.post("/", authMiddleware_1.authMiddleware, (req, res) => {
    res.send("create a zap");
});
router.get("/", authMiddleware_1.authMiddleware, (req, res) => {
    res.send("hello from zap router");
});
router.get("/:zapId", authMiddleware_1.authMiddleware, (req, res) => {
    res.send("hello from zap router");
});
exports.zapRouter = router;
