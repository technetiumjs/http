import { HttpController } from "../";

export function Secure(constructor: any, roles?: string | string[]): any {
    return (_TARGET: HttpController, _PROPERTY_KEY: string, descriptor: PropertyDescriptor) => {
        const method: () => void = descriptor.value;
        descriptor.value = async function() {
            // tslint:disable-next-line:no-string-literal
            const req = (this as HttpController)["req"];
            // tslint:disable-next-line:no-string-literal
            const res = (this as HttpController)["res"];
            if (roles !== undefined && !Array.isArray(roles)) {
                roles = [roles];
            }
            const auth = new constructor();
            const status: number | boolean = await auth.canActivate(req, roles);
            if (status === 200 || status === true) {
                return method.apply(this);
            } else {
                res.status(status === false ? 401 : status);
                res.send();
            }
        };
    };
}
