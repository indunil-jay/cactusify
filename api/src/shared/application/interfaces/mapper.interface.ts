export interface Mapper<T, K> {
  toDomain(entity: T): K;
  toPersistence(domainModel: K): T;
}
