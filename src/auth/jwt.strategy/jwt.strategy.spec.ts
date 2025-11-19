import { JwtStrategy } from './jwt.strategy';

describe('JwtStrategy', () => {
    let jwtStrategy: JwtStrategy;

    beforeEach(() => {
        jwtStrategy = new JwtStrategy();
    });

    it('should be defined', () => {
        expect(jwtStrategy).toBeDefined();
    });

    it('should validate payload correctly', async () => {
        const payload = {
            sub: '12345',
            username: 'testuser',
            realm_access: { roles: ['internal-service'] },
        };

        const user = await jwtStrategy.validate(payload);

        expect(user).toEqual({
            sub: '12345',
            username: 'testuser',
            roles: ['internal-service'],
        });
    });

    it('should handle payload with no roles', async () => {
        const payload = { sub: '12345', username: 'testuser' };

        const user = await jwtStrategy.validate(payload);

        expect(user).toEqual({
            sub: '12345',
            username: 'testuser',
            roles: [],
        });
    });
});
