import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CitaService } from './cita.service';
import { Cita } from './cita.entity';
import { CreateCitaInput } from './dto/create-cita.input';
import { UpdateCitaInput } from './dto/update-cita.input';


@Resolver(() => Cita)
export class CitaResolver {
  constructor(private readonly citaService: CitaService) {}

  // 🔹 Create
  @Mutation(() => Cita)
  crearCita(@Args('data') data: CreateCitaInput): Promise<Cita> {
    // Convert fecha from string to Date
    const citaData = { ...data, fecha: new Date(data.fecha) };
    return this.citaService.crearCita(citaData);
  }

  // 🔹 Read all
  @Query(() => [Cita], { name: 'citas' })
  obtenerCitas(): Promise<Cita[]> {
    return this.citaService.obtenerCitas();
  }

  // 🔹 Read one
  @Query(() => Cita, { name: 'cita', nullable: true })
  obtenerCitaPorId(@Args('id', { type: () => Int }) id: number): Promise<Cita | null> {
    return this.citaService.obtenerCitaPorId(id);
  }

  
// 🔹 Update
@Mutation(() => Cita)
actualizarCita(
  @Args('id', { type: () => Int }) id: number,
  @Args('data') data: UpdateCitaInput,
): Promise<Cita> {
  // Convert fecha de string a Date si existe
  const citaData = { ...data, fecha: data.fecha ? new Date(data.fecha) : undefined };
  return this.citaService.actualizarCita(id, citaData);
}


  // 🔹 Delete
  @Mutation(() => Boolean)
  async eliminarCita(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    await this.citaService.eliminarCita(id);
    return true;
  }
}
