import {DataTypes, Model} from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
    static init(sequelize) {
        super.init(
            {
                name: DataTypes.STRING,
                email: DataTypes.STRING,
                password: DataTypes.VIRTUAL,
                password_hash: DataTypes.STRING,
                provider: DataTypes.BOOLEAN,
            },
            {
                sequelize,
            });


        this.addHook('beforeSave', async user => {
            if (user.password) {
                user.password_hash = await bcrypt.hash(user.password, 8);
            }
            console.log(user);
        });

        return this;
    }

    static associate(models) {
        this.belongsTo(models.File, {foreignKey: 'avatar_id', as: 'avatar'});
    }

    checkPassword(password) {
        return bcrypt.compare(password, this.password_hash);
    }
}

export default User;
