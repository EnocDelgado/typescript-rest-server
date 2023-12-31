"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.postUser = exports.getUser = exports.getUsers = void 0;
const express_1 = require("express");
const user_1 = __importDefault(require("../models/user"));
const getUsers = (req, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.findAll();
    try {
        res.json({
            msg: 'Ok',
            users
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Call to administrator'
        });
    }
});
exports.getUsers = getUsers;
const getUser = (req, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield user_1.default.findByPk(id);
        if (user) {
            res.json({
                msg: 'Ok!',
                id
            });
        }
        else {
            res.status(404).json({
                msg: `Does not exist user with id ${id}`
            });
        }
    }
    catch (error) {
        res.status(500).json({
            msg: 'Call to administrator'
        });
    }
});
exports.getUser = getUser;
const postUser = (req, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const existEmail = yield user_1.default.findOne({
            where: {
                email: body.email
            }
        });
        if (existEmail) {
            return res.status(400).json({
                msg: `Alrady exist user with email: ${body.email}`
            });
        }
        const user = new user_1.default(body);
        yield user.save();
        res.json({
            msg: 'Ok!',
            user
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Call to administrator'
        });
    }
});
exports.postUser = postUser;
const updateUser = (req, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const user = yield user_1.default.findByPk(id);
        if (!user) {
            res.status(404).json({
                msg: `Does not exist user with id ${id}`
            });
        }
        yield user.update(body);
        res.json({
            msg: 'Ok!',
            user
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Call to administrator'
        });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield user_1.default.findByPk(id);
        if (!user) {
            res.status(404).json({
                msg: `Does not exist user with id ${id}`
            });
        }
        // physic delete
        // await user.destroy();
        // logic delete
        yield user.update({ status: false });
        res.json({
            msg: 'Ok!',
            user
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Call to administrator'
        });
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.js.map