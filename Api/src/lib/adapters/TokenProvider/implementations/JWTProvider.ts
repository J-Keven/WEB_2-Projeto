import jwt from 'jsonwebtoken';
import tokenConfigs from '@configs/token';
import User from '@resources/users/infra/typeorm/entities/Users';
import ITokenProvider from '../model/ITokenProvider';

class Token implements ITokenProvider {
  public async generete(payload: User): Promise<string> {
    const { expiresIn, secretKey } = tokenConfigs;
    const token = jwt.sign({}, secretKey, {
      subject: payload.id,
      expiresIn,
    });

    return token;
  }
}

export default Token;
