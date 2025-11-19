export function extractRoles(token: any): string[] {
    const realmRoles = token.realm_access?.roles || [];

    const clientRoles = Object.values(token.resource_access || {})
        .flatMap((r: any) => r.roles);

    return [...realmRoles, ...clientRoles];
}
