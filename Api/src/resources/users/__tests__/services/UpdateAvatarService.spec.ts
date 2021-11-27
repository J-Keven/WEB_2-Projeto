import IUserRepository from '@modules/users/repositories/IUserRepository';
import FakeUserRepository from '@modules/users/repositories/fake/FakeUserRepository';
import UpdateAvatarService from '@modules/users/services/UpdateAvatarService';
import IStorageProvider from '@shared/container/providers/StorageProvider/model/IStorageProvider';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fake/FakeStorageProvider';
import AppError from '@shared/errors/AppError';

let fakeUserRepository: IUserRepository;
let updateAvatarService: UpdateAvatarService;
let fakeStorageProvider: IStorageProvider;

describe('UpdateAvatar', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateAvatarService = new UpdateAvatarService(
      fakeUserRepository,
      fakeStorageProvider,
    );
  });
  it('Should be able to add an avatar for user', async () => {
    const user = await fakeUserRepository.create({
      email: 'johndoe@example.com',
      firstName: 'John',
      lastName: 'Doe',
      password: '123456',
    });

    const usersUpdate = await updateAvatarService.execute({
      id: user.id,
      filename: 'avatar.jpeg',
    });

    expect(usersUpdate.avatar).not.toBeNull();
    expect(usersUpdate.avatar).toBe('avatar.jpeg');
  });

  it('Should not be able to add an avatar for user with user id not exist', async () => {
    await expect(
      updateAvatarService.execute({
        id: 'user_id',
        filename: 'avatar.jpeg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to update avatar to user', async () => {
    const user = await fakeUserRepository.create({
      email: 'johndoe@example.com',
      firstName: 'John',
      lastName: 'Doe',
      password: '123456',
    });
    const removeAvatar = jest.spyOn(fakeStorageProvider, 'delete');

    await updateAvatarService.execute({
      id: user.id,
      filename: 'avatar1.jpeg',
    });

    const usersUpdate = await updateAvatarService.execute({
      id: user.id,
      filename: 'avatar2.jpeg',
    });

    expect(removeAvatar).toBeCalledWith('avatar1.jpeg');
    expect(usersUpdate.avatar).not.toBeNull();
    expect(usersUpdate.avatar).toBe('avatar2.jpeg');
  });
});
