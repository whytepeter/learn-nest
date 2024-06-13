"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
let UsersService = class UsersService {
    constructor() {
        this.users = [
            {
                id: 1,
                name: 'Whyte Peter',
                email: 'whyte@gmail.com',
                role: 'ADMIN',
            },
            {
                id: 2,
                name: 'Alice Smith',
                email: 'alice.smith@example.com',
                role: 'INTERN',
            },
            {
                id: 3,
                name: 'John Doe',
                email: 'john.doe@example.com',
                role: 'ENGINEER',
            },
            {
                id: 4,
                name: 'Emma Johnson',
                email: 'emma.johnson@example.com',
                role: 'ADMIN',
            },
            {
                id: 5,
                name: 'Michael Brown',
                email: 'michael.brown@example.com',
                role: 'INTERN',
            },
        ];
    }
    findAll(role) {
        if (role) {
            const rolesArray = this.users.filter((user) => user.role === role);
            if (!rolesArray?.length)
                throw new common_1.NotFoundException('User Role Not Found');
            return rolesArray;
        }
        return this.users;
    }
    findOne(id) {
        const user = this.users.find((user) => user.id === id);
        if (!user)
            throw new common_1.NotFoundException('User Not Found');
        return user;
    }
    create(createUserDto) {
        const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
        const id = usersByHighestId?.length ? usersByHighestId[0]?.id + 1 : 1;
        const newUser = {
            id,
            ...createUserDto,
        };
        this.users?.push(newUser);
        return newUser;
    }
    update(id, updateUserDto) {
        this.users = this.users.map((user) => {
            if (user.id === id) {
                return { ...user, ...updateUserDto };
            }
            return user;
        });
        return this.findOne(id);
    }
    delete(id) {
        const removedUser = this.findOne(id);
        this.users = this.users.filter((user) => user.id !== id);
        return removedUser;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
//# sourceMappingURL=users.service.js.map