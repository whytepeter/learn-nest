import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@Injectable()
export class UsersService {
  private users = [
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

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);
      if (!rolesArray?.length)
        throw new NotFoundException('User Role Not Found');
      return rolesArray;
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User Not Found');
    return user;
  }

  create(createUserDto: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const id = usersByHighestId?.length ? usersByHighestId[0]?.id + 1 : 1;

    const newUser = {
      id,
      ...createUserDto,
    };

    this.users?.push(newUser);

    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUserDto };
      }
      return user;
    });

    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);

    this.users = this.users.filter((user) => user.id !== id);

    return removedUser;
  }
}
