import * as bcrypt from "bcrypt"

class Util {
    async create(password: String) {
        const salt = await bcrypt.genSalt();
        return bcrypt.hashSync(password, salt)
    }

    async compare(password: string, passwordUser: string) {
        return await bcrypt.compare(password, passwordUser)
    }
}

export default Util;
