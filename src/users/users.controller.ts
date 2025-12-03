import { Controller, Get, Param, Put, Body, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateData: any) {
        return this.usersService.update(id, updateData);
    }

    @Post(':id/ban')
    ban(@Param('id') id: string) {
        return this.usersService.banUser(id);
    }

    @Post(':id/coins')
    addCoins(@Param('id') id: string, @Body() body: { amount: number }) {
        return this.usersService.addCoins(id, body.amount);
    }
}
