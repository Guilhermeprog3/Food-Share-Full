export interface IRepository<T> {
  create(data: Partial<T>): Promise<T>;
  findById(id: string): Promise<T | null>;
  findAll(id?: string): Promise<T[]>;
  update(id: string, data: Partial<T>): Promise<T>;
  findAllToken?(): Promise<T[]>;
  delete(id: string): Promise<void>;
} 

export interface IRepositoryWithEmail<T> extends IRepository<T> {
  findByEmail(email: string): Promise<T>;
}

// Interface estendida para adicionar findByCpf
export interface IRepositoryWithCpf<T> extends IRepository<T>, IRepositoryWithEmail<T>{
  findByCpf(cpf: string): Promise<T>;
}