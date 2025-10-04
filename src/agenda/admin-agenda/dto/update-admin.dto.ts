import { PartialType } from '@nestjs/mapped-types';
import { CreateUserAgendaDto } from './create-admin.dto';

export class UpdateUserAgendaDto extends PartialType(CreateUserAgendaDto) {}
