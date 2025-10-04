import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EventoService } from './evento.service';
import { CreateEventoInput } from './dto/create-evento.input';
import { UpdateEventoInput } from './dto/update-evento.input';
import { Evento } from './entities/evento.entity';

@Resolver(() => Evento)
export class EventoResolver {
  constructor(private readonly eventoService: EventoService) {}

  // 🔹 Crear evento
  @Mutation(() => Evento)
  createEvento(@Args('data') data: CreateEventoInput) {
    return this.eventoService.create(data);
  }

  // 🔹 Obtener eventos de un admin
  @Query(() => [Evento], { name: 'eventosByAdmin' })
  findAllByAdmin(@Args('adminId', { type: () => Int }) adminId: number) {
    return this.eventoService.findAllByAdmin(adminId);
  }

  // 🔹 Obtener un evento por ID
  @Query(() => Evento, { name: 'evento', nullable: true })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.eventoService.findOne(id);
  }

  // 🔹 Eliminar evento
  @Mutation(() => Boolean)
  async removeEvento(@Args('id', { type: () => Int }) id: number) {
    await this.eventoService.delete(id);
    return true;
  }

  // 🔹 Actualizar evento
  @Mutation(() => Evento)
  updateEvento(@Args('data') data: UpdateEventoInput) {
    return this.eventoService.update(data.id, data);
  }
}
