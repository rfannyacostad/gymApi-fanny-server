import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Admin } from './entities/admin.entity';

@Controller('admins')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  create(@Body() data: Partial<Admin>) {
    return this.adminService.create(data);
  }

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Admin>) {
    return this.adminService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
