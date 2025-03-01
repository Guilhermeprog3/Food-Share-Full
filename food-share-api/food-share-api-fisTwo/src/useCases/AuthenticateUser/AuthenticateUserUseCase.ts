import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { AppError } from '../../errors/AppError';
import { IRepositoryWithEmail } from '../../repositories/IRepository';

interface IAuthenticateUserDTO {
  email: string;
  password: string;
}

interface IResponse {
  user: any;
  token: string;
}

export class AuthenticateUserUseCase {
  constructor(private usersRepository: IRepositoryWithEmail<any>) {}

  async execute({ email, password }: IAuthenticateUserDTO): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email ou senha incorretos', 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Email ou senha incorretos', 401);
    }

    // Determina o tipo de usuário baseado no repositório
    const userType = this.usersRepository.constructor.name.includes('Donor') ? 'donor' : 'vulnerable';

    const token = sign(
      { type: userType },
      process.env.JWT_SECRET as string,
      {
        subject: user.id,
        expiresIn: '1d',
      }
    );

    return {
      user,
      token,
    };
  }
} 