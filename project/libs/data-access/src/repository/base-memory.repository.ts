import { randomUUID } from 'node:crypto';

import { Entity, StorableEntity, EntityFactory } from '@project/shared-core';
import { Repository } from './repository.interface';

export abstract class BaseMemoryRepository<
  T extends Entity & StorableEntity<ReturnType<T['toPOJO']>>,
> implements Repository<T>
{
  protected entities: Map<T['id'], ReturnType<T['toPOJO']>> = new Map();

  constructor(protected entityFactory: EntityFactory<T>) {}

  public async findById(id: T['id']): Promise<T> {
    const foundEntity = this.entities.get(id) || null;
    if (!foundEntity) {
      return null;
    }

    return this.entityFactory.create(foundEntity);
  }

  public async save(entity: T): Promise<T> {
    if (!entity.id) {
      entity.id = randomUUID();
    }
    const newEntity = entity.toPOJO();
    this.entities.set(entity.id, newEntity);
    return entity;
  }

  public async update(entity: T): Promise<T> {
    if (!this.entities.has(entity.id)) {
      throw new Error('Entity not found');
    }

    const newEntity = entity.toPOJO();
    this.entities.set(entity.id, newEntity);
    return entity;
  }

  public async deleteById(id: T['id']): Promise<void> {
    if (!this.entities.has(id)) {
      throw new Error('Entity not found');
    }

    this.entities.delete(id);
  }
}
