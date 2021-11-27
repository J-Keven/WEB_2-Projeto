import User from '@resources/users/infra/typeorm/entities/Users';
import ITokenProvider from '../model/ITokenProvider';

class FakeTokenProvider implements ITokenProvider {
  public async generete(payload: User): Promise<string> {
    return payload.email;
  }
}

export default FakeTokenProvider;
